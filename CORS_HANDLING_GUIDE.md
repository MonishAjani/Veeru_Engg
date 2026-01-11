# CORS Handling Guide

This guide explains how to handle Cross-Origin Resource Sharing (CORS) issues in your application, which is especially important for responsive applications that work across different devices and networks.

## Table of Contents

1. [Understanding CORS](#understanding-cors)
2. [CORS Configuration in Django Backend](#cors-configuration-in-django-backend)
3. [CORS Configuration in Next.js Frontend](#cors-configuration-in-nextjs-frontend)
4. [Testing CORS Configuration](#testing-cors-configuration)
5. [Common CORS Issues and Solutions](#common-cors-issues-and-solutions)
6. [CORS in Production vs Development](#cors-in-production-vs-development)

## Understanding CORS

Cross-Origin Resource Sharing (CORS) is a security feature implemented by browsers that restricts web pages from making requests to a different domain than the one that served the original page. This is a critical security mechanism but can cause issues in applications with separate frontend and backend services.

### When CORS Issues Occur

CORS issues typically arise when:

1. Your frontend and backend are served from different domains, subdomains, or ports
2. Your API makes requests to third-party services
3. You're testing locally with different development servers
4. Your mobile responsive site is accessed from various networks and devices

### CORS Headers

The key CORS headers include:

- `Access-Control-Allow-Origin`: Specifies which origins can access the resource
- `Access-Control-Allow-Methods`: Specifies the allowed HTTP methods
- `Access-Control-Allow-Headers`: Specifies which headers can be used
- `Access-Control-Allow-Credentials`: Indicates whether credentials can be included
- `Access-Control-Max-Age`: Specifies how long preflight results can be cached

## CORS Configuration in Django Backend

Our Django backend uses the `django-cors-headers` package to handle CORS. Here's how it's configured:

### Installation

The package should already be installed, but if needed:

```bash
pip install django-cors-headers
```

### Configuration in settings.py

Ensure these settings are in your `django_backend/django_backend/settings.py`:

```python
INSTALLED_APPS = [
    # ...
    'corsheaders',
    # ...
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # This should be as high as possible
    'django.middleware.common.CommonMiddleware',
    # ...
]

# CORS settings
CORS_ALLOW_ALL_ORIGINS = False  # Don't enable this in production

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Next.js development server
    "http://127.0.0.1:3000",
    "https://veeruengineering.com",  # Production domain
    # Add any other domains that need access
]

# Allow credentials (cookies, authorization headers)
CORS_ALLOW_CREDENTIALS = True

# Allow these headers in requests
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

# Allow these HTTP methods
CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]
```

## CORS Configuration in Next.js Frontend

### Next.js API Configuration

If you're using Next.js API routes, you can configure CORS for those routes:

```javascript
// Example Next.js API route with CORS headers
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust in production
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Your API logic here
  res.status(200).json({ message: 'Hello from Next.js API' });
}
```

### Fetch API Configuration

In our frontend API client (`src/lib/api.ts`), we've configured fetch requests to handle CORS:

```typescript
export async function apiFetch<T>(path: string, init?: RequestInit & { method?: HttpMethod }) {
  const url = `${API_BASE}${path}`;
  
  try {
    const res = await fetch(url, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers || {}),
      },
      cache: 'no-store',
      mode: 'cors',  // Explicitly set CORS mode
      credentials: 'include',  // Include credentials if needed
    });
    
    if (!res.ok) {
      throw new Error(`API error ${res.status}`);
    }
    
    return (await res.json()) as T;
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error;
  }
}
```

## Testing CORS Configuration

To test your CORS configuration:

1. **Browser Console Test**:
   ```javascript
   fetch('http://localhost:8000/api/test-cors/', {
     method: 'GET',
     mode: 'cors',
     credentials: 'include'
   })
   .then(response => response.json())
   .then(data => console.log(data))
   .catch(error => console.error('Error:', error));
   ```

2. **Using the Network Tab**:
   - Open your browser's developer tools
   - Go to the Network tab
   - Make a request to your API
   - Check for CORS-related errors in the response headers

3. **Testing with Different Origins**:
   - Test from different ports, domains, and devices
   - Verify that authorized origins work and unauthorized ones fail

## Common CORS Issues and Solutions

### 1. "No 'Access-Control-Allow-Origin' header is present"

**Issue**: The server isn't sending the proper CORS headers.

**Solution**:
- Ensure `corsheaders.middleware.CorsMiddleware` is in your Django middleware
- Verify the requesting origin is in `CORS_ALLOWED_ORIGINS`
- Check that the middleware order is correct (CORS middleware should be first)

### 2. Preflight Request Failing

**Issue**: The OPTIONS request sent before the actual request is failing.

**Solution**:
- Ensure your server properly handles OPTIONS requests
- Check that all required headers are in `CORS_ALLOW_HEADERS`
- Verify the HTTP method is in `CORS_ALLOW_METHODS`

### 3. Credentials Issues

**Issue**: Requests with credentials (cookies, HTTP authentication) are failing.

**Solution**:
- Set `CORS_ALLOW_CREDENTIALS = True` in Django
- Set `credentials: 'include'` in fetch requests
- Ensure the `Access-Control-Allow-Origin` header doesn't use a wildcard (`*`) when using credentials

### 4. Mobile-Specific CORS Issues

**Issue**: CORS works on desktop but fails on mobile devices.

**Solution**:
- Check for any mobile-specific proxies or network settings
- Ensure your SSL certificates are valid (mobile browsers can be stricter)
- Test with mobile network and Wi-Fi to rule out network-specific issues

## CORS in Production vs Development

### Development Configuration

In development, you might use more permissive CORS settings:

```python
# Development settings
if DEBUG:
    CORS_ALLOW_ALL_ORIGINS = True  # Only in development!
    CORS_ALLOW_CREDENTIALS = True
```

### Production Configuration

In production, use stricter CORS settings:

```python
# Production settings
if not DEBUG:
    CORS_ALLOW_ALL_ORIGINS = False
    CORS_ALLOWED_ORIGINS = [
        "https://veeruengineering.com",
        # Add other production domains
    ]
    CORS_ALLOW_CREDENTIALS = True
```

### Environment-Specific Frontend Configuration

Adjust your frontend API calls based on the environment:

```typescript
// Base API URL - use different URLs for development and production
const API_BASE = process.env.NODE_ENV === 'production'
  ? 'https://api.veeruengineering.com/api'
  : 'http://localhost:8000/api';
```

## Conclusion

Proper CORS configuration is essential for your responsive application to work correctly across different devices and networks. By following this guide, you can ensure that your frontend and backend communicate properly while maintaining security.

Remember that CORS is a security feature, not a bug. It's designed to protect users, so it's important to configure it correctly rather than trying to bypass it.