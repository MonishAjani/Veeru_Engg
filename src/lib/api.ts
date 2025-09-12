export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000/api'

export async function apiFetch<T>(path: string, init?: RequestInit & { method?: HttpMethod }) {
  const url = `${API_BASE}${path}`
  const res = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    cache: 'no-store',
  })
  if (!res.ok) {
    throw new Error(`API error ${res.status}`)
  }
  return (await res.json()) as T
}

// Service types
export interface Service {
  id: number
  title: string
  description: string
  icon: string
  order: number
  is_active: boolean
  created_at?: string
  updated_at?: string
}

// Project types
export interface Project {
  id: number
  name: string
  project_type: 'live' | 'completed'
  details: string
  quantity: string
  created_at: string
  updated_at: string
}

// Certificate types
export interface Certificate {
  id: number
  name: string
  details: string
  image: string | null
  image_url: string | null
  created_at: string
  updated_at: string
}

// Paginated response type
export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

// Function to fetch services from the Django backend
export async function getServices(): Promise<Service[]> {
  try {
    const response = await apiFetch<PaginatedResponse<Service>>('/services/');
    return response.results || [];
  } catch (error) {
    console.error('Error fetching services:', error);
    return []; // Return empty array on error
  }
}

// Function to fetch certificates from the Django backend
export async function getCertificates(): Promise<Certificate[]> {
  try {
    console.log('Fetching certificates');
    const response = await apiFetch<PaginatedResponse<Certificate>>('/certificates/');
    console.log('Certificates response:', response);
    return response.results || [];
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return []; // Return empty array on error
  }
}

// Function to fetch a single certificate by ID
export async function getCertificate(id: number): Promise<Certificate | null> {
  try {
    return await apiFetch<Certificate>(`/certificates/${id}/`);
  } catch (error) {
    console.error(`Error fetching certificate ${id}:`, error);
    return null;
  }
}

// Function to fetch projects from the Django backend
export async function getProjects(projectType?: 'live' | 'completed'): Promise<Project[]> {
  try {
    const url = projectType
      ? `/projects/?project_type=${projectType}`
      : '/projects/';
    console.log('Fetching projects from URL:', url);
    const response = await apiFetch<PaginatedResponse<Project>>(url);
    console.log('Projects response:', response);
    return response.results || [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return []; // Return empty array on error
  }
}

// Function to fetch a single project by ID
export async function getProject(id: number): Promise<Project | null> {
  try {
    return await apiFetch<Project>(`/projects/${id}/`);
  } catch (error) {
    console.error(`Error fetching project ${id}:`, error);
    return null;
  }
}
