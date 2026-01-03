# CORS Handling Guide

This guide explains how we handle Cross-Origin Resource Sharing (CORS) issues when developing locally.

## What is CORS?

CORS (Cross-Origin Resource Sharing) is a security feature implemented by browsers that restricts web pages from making requests to a different domain than the one that served the web page. This is a security measure to prevent malicious websites from making unauthorized requests to other websites on behalf of the user.

## The Problem

When developing locally (e.g., running your React application on `http://localhost:3000`), you may encounter CORS errors when trying to access APIs on different domains. This happens because the browser enforces the same-origin policy, and the API server needs to explicitly allow requests from your local development server.

## Solution: Direct Connection to Local Backend

We've implemented a simple but effective solution to handle CORS issues during local development:

1. **Server-side CORS configuration** - The Django backend is configured to allow requests from your local development server
2. **Direct connection to local backend** - The frontend always connects directly to the local backend at `http://localhost:8000/api`

## How It Works

### 1. Server-side CORS Configuration

The Django backend has been configured with proper CORS headers:

```python
# CORS settings
CORS_ALLOWED_ORIGINS = os.environ.get('CORS_ALLOWED_ORIGINS', 'http://localhost:3000').split(',')
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_METHODS = ['DELETE', 'GET', 'OPTIONS', 'PATCH', 'POST', 'PUT']
CORS_ALLOW_HEADERS = [
    'accept', 'accept-encoding', 'authorization', 'content-type', 'dnt',
    'origin', 'user-agent', 'x-csrftoken', 'x-requested-with',
]
```

This configuration allows your local frontend (running on `http://localhost:3000`) to make requests to your local backend (running on `http://localhost:8000`).

### 2. Direct Connection to Local Backend

The API client is configured to always connect to the local backend:

```typescript
// Base API URL - always use the local backend for local development
const API_BASE = 'http://localhost:8000/api'

export async function apiFetch<T>(path: string, init?: RequestInit & { method?: HttpMethod }) {
  const url = `${API_BASE}${path}`
  
  // No need to check for production API since we're always using the local backend
  console.log('Fetching from local backend:', url)
  
  try {
    // For all other cases, make a direct API request
    console.log('Fetching:', url)
    
    const res = await fetch(url, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers || {}),
      },
      cache: 'no-store',
      mode: 'cors',
    })
    
    if (!res.ok) {
      throw new Error(`API error ${res.status}`)
    }
    
    return (await res.json()) as T
  } catch (error) {
    // Log all errors since we're always using the local backend
    console.error('Fetch failed:', error)
    throw error
  }
}
```

This ensures that your frontend always connects to your local backend, avoiding CORS issues.

## Running the Local Backend

To use this solution, you need to run both your frontend and backend servers:

1. **Start the Django backend**:
   ```bash
   cd django_backend
   python manage.py runserver
   ```

2. **Start the Next.js frontend**:
   ```bash
   npm run dev
   ```

The frontend will automatically connect to the backend running on `http://localhost:8000/api`.

## Fallback Mock Data

If you encounter errors when connecting to the backend, the API functions include fallback mock data:

```typescript
export async function getProjects(): Promise<Project[]> {
  try {
    console.log('Fetching projects from the Projects table');
    // API request logic...
    return allResults;
  } catch (error) {
    console.error('Error fetching projects:', error);
    // Return mock project data
    return [
      // Mock data...
    ];
  }
}
```

This ensures that even if the backend is not available, the frontend can still display meaningful content.

## Troubleshooting

If you're still having issues:

1. Make sure your Django backend is running on port 8000
2. Check that the Django backend has the correct CORS configuration
3. Check the browser console for specific error messages
4. Make sure you've restarted both the frontend and backend after making changes
5. Clear your browser cache if you're still seeing old behavior