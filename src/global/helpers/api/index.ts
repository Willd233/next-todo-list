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
