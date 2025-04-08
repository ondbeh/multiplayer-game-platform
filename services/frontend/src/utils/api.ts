const BASE_URL = '/api';

// Function to refresh the access token using refresh token
async function refreshToken(): Promise<boolean> {
    const refreshToken = localStorage.getItem('refresh_token');
    
    if (!refreshToken) {
        return false;
    }
    
    try {
        const response = await fetch(`${BASE_URL}/token/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refresh_token: refreshToken,
            }),
        });
        
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
            return true;
        } else {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            return false;
        }
    } catch (error) {
        console.error("Failed to refresh token:", error);
        return false;
    }
}

export async function apiRequest(
    endpoint: string, 
    options: RequestInit = {}
): Promise<any> {
    const accessToken = localStorage.getItem('access_token');
    let headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
    };
    
    if (accessToken) {
        (headers as Record<string, string>)['Authorization'] = `Bearer ${accessToken}`;
    }
    
    const requestOptions: RequestInit = {
        ...options,
        headers,
    };
    
    try {
        let response = await fetch(`${BASE_URL}${endpoint}`, requestOptions);
        if (response.status === 401 && localStorage.getItem('refresh_token')) {
            const refreshSuccess = await refreshToken();
            if (refreshSuccess) {
                (headers as Record<string, string>)['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
                response = await fetch(`${BASE_URL}${endpoint}`, {
                    ...requestOptions,
                    headers,
                });
            } else {
                throw new Error('Authentication failed');
            }
        }
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`API request failed: ${error}`);
        throw error;
    }
}