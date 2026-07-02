const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

type RequestOptions = {
  params?: Record<string, string | number | undefined>;
  revalidate?: number | false;
  tags?: string[];
};

export async function apiFetch<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`, "http://localhost");

  if (options.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        url.searchParams.set(key, String(value));
      }
    });
  }

  const fetchOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: options.revalidate,
      tags: options.tags,
    },
  };

  const res = await fetch(url.toString(), fetchOptions);

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
