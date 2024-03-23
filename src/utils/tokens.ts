/**
 * Decodes a base64-url string for browser environments.
 *
 * @param {string} str - The base64-url encoded string.
 * @returns {string} - The decoded string.
 */
function base64UrlDecode(str: string): string {
  // Convert base64-url to base64 by replacing URL-specific chars with base64 equivalents
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/');

  // Use `atob` to decode base64 string
  const decoded = atob(base64);

  return decoded;
}

/**
 * Decodes the payload of a JWT token.
 *
 * @param {string} token - The JWT token.
 * @returns {Object | null} - The decoded payload or null if decoding fails.
 */
export const decodeToken = (token: string): Object | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT token format');
    }
    const payload = parts[1];
    const decodedString = base64UrlDecode(payload);

    // Convert the decoded string to a JSON object
    const decodedPayload = JSON.parse(decodedString);
    console.log(decodedPayload);
    return decodedPayload;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

// Example usage
