# Frontend Update Guide

This guide will help you update your Next.js frontend to use the new PHP API backend deployed on Hostinger.

## Step 1: Update API Base URL

1. **Locate your frontend's `.env` file**:
   - This should be in the root of your Next.js project (`infra-corp/.env`)

2. **Update the API base URL**:
   ```
   NEXT_PUBLIC_API_BASE=https://api.veeruengineering.com/api.php/api
   ```

3. **If you're using a `.env.local` file**, update that as well:
   ```
   NEXT_PUBLIC_API_BASE=https://api.veeruengineering.com/api.php/api
   ```

## Step 2: Verify API Client Code

1. **Check your API client code** (likely in `src/lib/api.ts`):
   - Make sure it's using the environment variable for the API base URL
   - Ensure it's handling the response format correctly

2. **Example API client code**:
   ```typescript
   // src/lib/api.ts
   const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '';

   export async function fetchServices() {
     const response = await fetch(`${API_BASE}/services`);
     const data = await response.json();
     return data.results || [];
   }

   export async function fetchProjects() {
     const response = await fetch(`${API_BASE}/projects`);
     const data = await response.json();
     return data.results || [];
   }

   export async function fetchCertificates() {
     const response = await fetch(`${API_BASE}/certificates`);
     const data = await response.json();
     return data.results || [];
   }

   export async function fetchPrestigiousProjects() {
     const response = await fetch(`${API_BASE}/prestigious-projects`);
     const data = await response.json();
     return data.results || [];
   }
   ```

## Step 3: Add Error Handling

1. **Enhance your API client with better error handling**:
   ```typescript
   export async function fetchServices() {
     try {
       const response = await fetch(`${API_BASE}/services`);
       if (!response.ok) {
         throw new Error(`API error: ${response.status}`);
       }
       const data = await response.json();
       return data.results || [];
     } catch (error) {
       console.error('Error fetching services:', error);
       return []; // Return empty array as fallback
     }
   }
   ```

2. **Add loading states** to your components:
   ```jsx
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [data, setData] = useState([]);

   useEffect(() => {
     async function loadData() {
       try {
         setLoading(true);
         const result = await fetchServices();
         setData(result);
         setError(null);
       } catch (err) {
         setError(err.message);
       } finally {
         setLoading(false);
       }
     }
     
     loadData();
   }, []);

   if (loading) return <div>Loading...</div>;
   if (error) return <div>Error: {error}</div>;
   if (data.length === 0) return <div>No data available</div>;
   ```

## Step 4: Rebuild and Redeploy

1. **Rebuild your Next.js application**:
   ```bash
   npm run build
   ```

2. **Deploy to your hosting provider**:
   - If using Vercel, push to your GitHub repository
   - If using another provider, follow their deployment instructions

## Step 5: Test the Integration

1. **Visit your frontend website**
2. **Navigate to pages that fetch data from the backend**:
   - Services page
   - Projects page
   - Certificates page
3. **Open browser developer tools** (F12):
   - Go to the Network tab
   - Look for API requests to your new backend
   - Verify they're successful (status 200)
4. **Check for any errors in the Console tab**

## Troubleshooting

### If Data Isn't Loading

1. **Check API URL**:
   - Make sure the API base URL is correct
   - Verify the environment variable is being used

2. **Check CORS**:
   - Look for CORS errors in the browser console
   - Make sure your frontend domain is allowed in the API's CORS configuration

3. **Check API Response**:
   - Use the API test tool at `https://api.veeruengineering.com/api_test.html`
   - Verify the API is returning the expected data

4. **Check Data Structure**:
   - Make sure your frontend code is expecting the same data structure that the API returns
   - The PHP API returns data in the format: `{ "results": [...] }`

### If Images Aren't Loading

1. **Update image URLs**:
   - Make sure image URLs are using the correct domain
   - Example: `https://api.veeruengineering.com/media/projects/image.jpg`

2. **Add image error handling**:
   ```jsx
   <img 
     src={imageUrl} 
     alt={title}
     onError={(e) => {
       e.target.onerror = null;
       e.target.src = '/fallback-image.jpg';
     }}
   />
   ```

## Need Help?

If you encounter any issues updating your frontend, please refer to the API test tool at `https://api.veeruengineering.com/api_test.html` to verify the API is working correctly.