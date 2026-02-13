import crypto from "crypto";

/**
 * Generate a default username from email
 * @param {string} email - User email
 * @returns {string} Generated username
 */
export function generateUsername(email) {
   const namePart = email.split("@")[0];
   const randomSuffix = Math.random().toString(36).substring(2, 8);
   return `${namePart}${randomSuffix}`.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/**
 * Generate a secure random password
 * @param {number} length - Password length (default: 12)
 * @returns {string} Generated password
 */
export function generatePassword(length = 12) {
   const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
   const lowercase = "abcdefghijklmnopqrstuvwxyz";
   const numbers = "0123456789";
   const symbols = "!@#$%^&*()_+-={}[]|:;<>?,./";

   const allChars = uppercase + lowercase + numbers + symbols;
   let password = "";

   // Ensure at least one character from each category
   password += uppercase[Math.floor(Math.random() * uppercase.length)];
   password += lowercase[Math.floor(Math.random() * lowercase.length)];
   password += numbers[Math.floor(Math.random() * numbers.length)];

   // Fill remaining characters randomly
   for (let i = 3; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
   }

   // Shuffle password
   return password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
}

/**
 * Generate credentials for a new board member
 * @param {string} email - User email
 * @returns {object} { username, password }
 */
export function generateCredentials(email) {
   return {
      username: generateUsername(email),
      password: generatePassword(12),
   };
}
