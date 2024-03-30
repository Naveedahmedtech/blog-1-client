/**
 * Formats the ISO date string to a more human-readable form.
 * Example output: "March 30, 2024 at 1:43 PM"
 *
 * @param {string} dateString - The ISO date string to format.
 * @returns {string} The formatted date string.
 */
export const formatDate = (dateString: string) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true, // Use AM/PM format
  };
  const date = new Date(dateString) as any;
  return date.toLocaleString("en-US", options).replace(",", " at");
};
