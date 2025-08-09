/**
 * A helper function to make API requests.
 * @param url The API endpoint URL.
 * @param options Optional fetch options (e.g., method, headers, body).
 * @returns The JSON response from the API or throws an error if the request fails.
 */

export const api = async (url: string, options?: RequestInit) => {
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options?.headers,
    },
    method: options?.method || "GET",
  };

  const res = await fetch(url, config);
  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};
