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
  image?: string
  image_url?: string
  created_at: string
  updated_at: string
}

export interface LiveProject {
  id: number
  name: string
  details: string
  quantity: string
  location?: string
  image?: string
  image_url?: string
  created_at: string
  updated_at: string
}

export interface CompletedProject {
  id: number
  name: string
  details: string
  quantity: string
  client?: string
  completion_date?: string
  image?: string
  image_url?: string
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

// Function to fetch legacy projects from the Django backend (for backward compatibility)
export async function getProjects(projectType?: 'live' | 'completed'): Promise<Project[]> {
  try {
    const url = projectType
      ? `/projects/legacy/?project_type=${projectType}`
      : '/projects/legacy/';
    console.log('Fetching legacy projects from URL:', url);
    const response = await apiFetch<PaginatedResponse<Project>>(url);
    console.log('Projects response:', response);
    return response.results || [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return []; // Return empty array on error
  }
}

// Function to fetch live projects
export async function getLiveProjects(): Promise<LiveProject[]> {
  try {
    console.log('Fetching live projects');
    const response = await apiFetch<PaginatedResponse<LiveProject>>('/projects/live/');
    console.log('Live projects response:', response);
    return response.results || [];
  } catch (error) {
    console.error('Error fetching live projects:', error);
    return []; // Return empty array on error
  }
}

// Function to fetch completed projects
export async function getCompletedProjects(): Promise<CompletedProject[]> {
  try {
    console.log('Fetching completed projects');
    const response = await apiFetch<PaginatedResponse<CompletedProject>>('/projects/completed/');
    console.log('Completed projects response:', response);
    return response.results || [];
  } catch (error) {
    console.error('Error fetching completed projects:', error);
    return []; // Return empty array on error
  }
}

// Function to fetch a single project by ID (legacy)
export async function getProject(id: number): Promise<Project | null> {
  try {
    return await apiFetch<Project>(`/projects/legacy/${id}/`);
  } catch (error) {
    console.error(`Error fetching project ${id}:`, error);
    return null;
  }
}

// Function to fetch a single live project by ID
export async function getLiveProject(id: number): Promise<LiveProject | null> {
  try {
    return await apiFetch<LiveProject>(`/projects/live/${id}/`);
  } catch (error) {
    console.error(`Error fetching live project ${id}:`, error);
    return null;
  }
}

// Function to fetch a single completed project by ID
export async function getCompletedProject(id: number): Promise<CompletedProject | null> {
  try {
    return await apiFetch<CompletedProject>(`/projects/completed/${id}/`);
  } catch (error) {
    console.error(`Error fetching completed project ${id}:`, error);
    return null;
  }
}
