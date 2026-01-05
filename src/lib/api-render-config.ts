// This file shows how to update the API client to connect to the Render backend
// Copy the relevant parts to your api.ts file after deploying to Render

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

// Base API URL - use environment variable or default to Render URL
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://veeru-engineering-api.onrender.com/api';

// Function to determine if we're in development or production
const isDevelopment = () => {
  return typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
};

export async function apiFetch<T>(path: string, init?: RequestInit & { method?: HttpMethod }) {
  const url = `${API_BASE}${path}`;
  
  try {
    console.log(`Fetching from ${isDevelopment() ? 'development' : 'production'} API:`, url);
    
    const res = await fetch(url, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers || {}),
      },
      cache: 'no-store',
      mode: 'cors',
    });
    
    if (!res.ok) {
      throw new Error(`API error ${res.status}`);
    }
    
    return (await res.json()) as T;
  } catch (error) {
    console.error('Fetch failed:', error);
    
    // If we're in development, we can use mock data as fallback
    if (isDevelopment()) {
      console.log('Using mock data in development');
      // Return mock data based on the path
      return getMockData<T>(path);
    }
    
    // In production, propagate the error
    throw error;
  }
}

// Function to get mock data based on the path
function getMockData<T>(path: string): T {
  // This is just an example - you should use your actual mock data
  if (path.startsWith('/services')) {
    return [
      {
        id: 1,
        title: 'Fabrication',
        description: 'Precision metal fabrication services for industrial applications.',
        icon: 'building',
        order: 1,
        is_active: true
      },
      {
        id: 2,
        title: 'Erection',
        description: 'Professional structural erection services for industrial projects.',
        icon: 'crane',
        order: 2,
        is_active: true
      }
    ] as unknown as T;
  }
  
  if (path.startsWith('/projects')) {
    return [
      {
        id: 1,
        name: 'Project 1',
        details: 'Sample project details',
        quantity: '1000 MT',
        location: 'Sample Location',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ] as unknown as T;
  }
  
  // Default empty response
  return [] as unknown as T;
}

// Example of how to use this in your components:
/*
import { apiFetch } from '../lib/api';

// In your component
const fetchServices = async () => {
  try {
    const services = await apiFetch<Service[]>('/services/');
    setServices(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    // Handle error
  }
};
*/