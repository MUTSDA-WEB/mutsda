/**
 * Date utilities for formatting DateTime from Prisma schema
 * Schema fields: startDateTime (DateTime), endDateTime (DateTime?), createdAt (DateTime)
 */

/**
 * Format ISO DateTime to display date parts
 * @param {string|Date} isoDateTime - ISO-8601 DateTime string or Date object
 * @returns {{ month: string, day: number, year: number, fullDate: string }}
 */
export const formatEventDate = (isoDateTime) => {
   if (!isoDateTime) return { month: "", day: "", year: "", fullDate: "" };

   const date = new Date(isoDateTime);

   if (isNaN(date.getTime())) {
      return { month: "", day: "", year: "", fullDate: "" };
   }

   return {
      month: date.toLocaleString("default", { month: "short" }).toUpperCase(),
      monthLong: date.toLocaleString("default", { month: "long" }),
      day: date.getDate(),
      year: date.getFullYear(),
      fullDate: date.toLocaleDateString("en-US", {
         weekday: "long",
         year: "numeric",
         month: "long",
         day: "numeric",
      }),
      shortDate: date.toLocaleDateString("en-US", {
         month: "short",
         day: "numeric",
         year: "numeric",
      }),
   };
};

/**
 * Format ISO DateTime to display time
 * @param {string|Date} isoDateTime - ISO-8601 DateTime string or Date object
 * @returns {string} - Formatted time string (e.g., "9:00 AM")
 */
export const formatEventTime = (isoDateTime) => {
   if (!isoDateTime) return "";

   const date = new Date(isoDateTime);

   if (isNaN(date.getTime())) return "";

   return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
   });
};

/**
 * Format ISO DateTime to display both date and time
 * @param {string|Date} isoDateTime - ISO-8601 DateTime string or Date object
 * @returns {string} - Formatted date and time string
 */
export const formatDateTime = (isoDateTime) => {
   if (!isoDateTime) return "";

   const date = new Date(isoDateTime);

   if (isNaN(date.getTime())) return "";

   return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
   });
};

/**
 * Get relative time string (e.g., "2 days ago", "in 3 hours")
 * @param {string|Date} isoDateTime - ISO-8601 DateTime string or Date object
 * @returns {string} - Relative time string
 */
export const getRelativeTime = (isoDateTime) => {
   if (!isoDateTime) return "";

   const date = new Date(isoDateTime);

   if (isNaN(date.getTime())) return "";

   const now = new Date();
   const diffMs = date - now;
   const diffMins = Math.round(diffMs / 60000);
   const diffHours = Math.round(diffMs / 3600000);
   const diffDays = Math.round(diffMs / 86400000);

   if (diffMins === 0) return "Just now";
   if (diffMins > 0 && diffMins < 60)
      return `in ${diffMins} minute${diffMins > 1 ? "s" : ""}`;
   if (diffMins < 0 && diffMins > -60)
      return `${Math.abs(diffMins)} minute${Math.abs(diffMins) > 1 ? "s" : ""} ago`;
   if (diffHours > 0 && diffHours < 24)
      return `in ${diffHours} hour${diffHours > 1 ? "s" : ""}`;
   if (diffHours < 0 && diffHours > -24)
      return `${Math.abs(diffHours)} hour${Math.abs(diffHours) > 1 ? "s" : ""} ago`;
   if (diffDays > 0 && diffDays < 7)
      return `in ${diffDays} day${diffDays > 1 ? "s" : ""}`;
   if (diffDays < 0 && diffDays > -7)
      return `${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? "s" : ""} ago`;

   return formatEventDate(isoDateTime).shortDate;
};

/**
 * Check if a date is today
 * @param {string|Date} isoDateTime - ISO-8601 DateTime string or Date object
 * @returns {boolean}
 */
export const isToday = (isoDateTime) => {
   if (!isoDateTime) return false;

   const date = new Date(isoDateTime);
   const today = new Date();

   return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
   );
};

/**
 * Check if a date is in the past
 * @param {string|Date} isoDateTime - ISO-8601 DateTime string or Date object
 * @returns {boolean}
 */
export const isPast = (isoDateTime) => {
   if (!isoDateTime) return false;
   return new Date(isoDateTime) < new Date();
};

/**
 * Check if a date is in the future
 * @param {string|Date} isoDateTime - ISO-8601 DateTime string or Date object
 * @returns {boolean}
 */
export const isFuture = (isoDateTime) => {
   if (!isoDateTime) return false;
   return new Date(isoDateTime) > new Date();
};

/**
 * Format duration between two dates
 * @param {string|Date} startDateTime - Start ISO-8601 DateTime
 * @param {string|Date} endDateTime - End ISO-8601 DateTime
 * @returns {string} - Duration string (e.g., "2 hours", "1 day")
 */
export const formatDuration = (startDateTime, endDateTime) => {
   if (!startDateTime || !endDateTime) return "";

   const start = new Date(startDateTime);
   const end = new Date(endDateTime);

   if (isNaN(start.getTime()) || isNaN(end.getTime())) return "";

   const diffMs = end - start;
   const diffMins = Math.round(diffMs / 60000);
   const diffHours = Math.round(diffMs / 3600000);
   const diffDays = Math.round(diffMs / 86400000);

   if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? "s" : ""}`;
   if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? "s" : ""}`;
   return `${diffDays} day${diffDays !== 1 ? "s" : ""}`;
};
