export const API_URL = "https://pokeapi.co/api/v2";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export async function fetchApi<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      // force caching for 1 hour
      'Cache-Control': 'public, max-age=3600',
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(response.status, data.message || 'Something went wrong');
  }

  return data as T;
}

export function useApiClient() {
  const fetcher = async <T>(
    path: string,
    options: RequestInit = {}
  ): Promise<T> => {
    return fetchApi<T>(path, {
      ...options,
      headers: {
        ...options.headers,
      },
    });
  };

  return {
    get: <T>(path: string) => fetcher<T>(path, { method: 'GET' }),
    post: <T>(path: string, data: unknown) =>
      fetcher<T>(path, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    put: <T>(path: string, data: unknown) =>
      fetcher<T>(path, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: <T>(path: string) =>
      fetcher<T>(path, { method: 'DELETE' }),
  };
}