const API_BASE_URL = "/api";

export async function apiGet<T>(path: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${path}`);

    if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
    }

    return response.json() as Promise<T>;
}

export async function apiPost<TRequest, TResponse>(
    path: string,
    data: TRequest
): Promise<TResponse> {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
    }

    return response.json() as Promise<TResponse>;
}