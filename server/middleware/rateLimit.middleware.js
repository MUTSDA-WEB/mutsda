import Redis from "ioredis";

const REDIS_URL = process.env.REDIS_URL;

// Create Redis client for rate limiting
let redis = null;
try {
   if (REDIS_URL) {
      redis = new Redis(REDIS_URL, {
         maxRetriesPerRequest: 3,
         lazyConnect: true,
         retryStrategy: (times) => {
            if (times > 3) {
               console.warn("Redis rate limit: max retries reached, disabling");
               return null;
            }
            return Math.min(times * 100, 3000);
         },
      });
      redis.on("error", (err) => {
         console.warn("Redis rate limit error:", err.message);
      });
      // Attempt connection
      redis.connect().catch(() => {
         redis = null;
      });
   }
} catch (err) {
   console.warn("Redis not available for rate limiting:", err.message);
}

/**
 * Rate limiter middleware factory
 * @param {Object} options - Rate limit options
 * @param {number} options.windowMs - Time window in milliseconds (default: 60000 = 1 minute)
 * @param {number} options.max - Maximum requests per window (default: 100)
 * @param {string} options.keyPrefix - Redis key prefix (default: "ratelimit")
 * @param {Function} options.keyGenerator - Custom key generator function
 * @param {string} options.message - Error message when rate limited
 */
export function rateLimit(options = {}) {
   const {
      windowMs = 60 * 1000, // 1 minute default
      max = 100, // 100 requests per window
      keyPrefix = "ratelimit",
      keyGenerator = null,
      message = "Too many requests, please try again later.",
   } = options;

   const windowSec = Math.floor(windowMs / 1000);

   return async (c, next) => {
      // If Redis is not available, skip rate limiting
      if (!redis) {
         return next();
      }

      try {
         // Generate key: use custom generator or default to IP-based
         let key;
         if (keyGenerator) {
            key = keyGenerator(c);
         } else {
            // Get client IP
            const ip =
               c.req.header("x-forwarded-for")?.split(",")[0]?.trim() ||
               c.req.header("x-real-ip") ||
               "unknown";
            key = `${keyPrefix}:${ip}`;
         }

         // Increment counter and set expiry
         const current = await redis.incr(key);

         // Set expiry only on first request in window
         if (current === 1) {
            await redis.expire(key, windowSec);
         }

         // Get remaining TTL for headers
         const ttl = await redis.ttl(key);

         // Set rate limit headers
         c.header("X-RateLimit-Limit", max.toString());
         c.header(
            "X-RateLimit-Remaining",
            Math.max(0, max - current).toString(),
         );
         c.header("X-RateLimit-Reset", (Date.now() + ttl * 1000).toString());

         // Check if rate limit exceeded
         if (current > max) {
            c.header("Retry-After", ttl.toString());
            return c.json(
               {
                  error: message,
                  retryAfter: ttl,
               },
               429,
            );
         }

         return next();
      } catch (err) {
         console.error("Rate limit error:", err.message);
         // On error, allow request to proceed
         return next();
      }
   };
}

/**
 * Pre-configured rate limiters for common use cases
 */

// Strict rate limit for auth routes (login, register)
export const authRateLimit = rateLimit({
   windowMs: 15 * 60 * 1000, // 15 minutes
   max: 10, // 10 attempts per 15 minutes
   keyPrefix: "ratelimit:auth",
   message: "Too many authentication attempts, please try again in 15 minutes.",
});

// Standard rate limit for API routes
export const apiRateLimit = rateLimit({
   windowMs: 60 * 1000, // 1 minute
   max: 100, // 100 requests per minute
   keyPrefix: "ratelimit:api",
   message: "Too many requests, please slow down.",
});

// Rate limit for message sending (chat)
export const messageRateLimit = rateLimit({
   windowMs: 60 * 1000, // 1 minute
   max: 60, // 60 messages per minute (1 per second average)
   keyPrefix: "ratelimit:message",
   message: "You're sending messages too quickly. Please wait a moment.",
});

// Rate limit for file uploads
export const uploadRateLimit = rateLimit({
   windowMs: 60 * 1000, // 1 minute
   max: 10, // 10 uploads per minute
   keyPrefix: "ratelimit:upload",
   message: "Too many file uploads, please wait before uploading again.",
});

export default rateLimit;
