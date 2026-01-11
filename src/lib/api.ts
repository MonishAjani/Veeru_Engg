export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

// Base API URL - use environment variable in production, fallback to local in development
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

export async function apiFetch<T>(path: string, init?: RequestInit & { method?: HttpMethod }) {
  const url = `${API_BASE}${path}`
  
  // No need to check for production API since we're always using the local backend
  // Log the request in development
  if (process.env.NODE_ENV !== 'production') {
    console.log('Fetching:', url)
  }
  
  try {
    const res = await fetch(url, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers || {}),
      },
      cache: 'no-store',
      mode: 'cors',
      credentials: 'include', // Include credentials for cross-origin requests
    })
    
    if (!res.ok) {
      throw new Error(`API error ${res.status}`)
    }
    
    return (await res.json()) as T
  } catch (error) {
    // Log the error in development
    if (process.env.NODE_ENV !== 'production') {
      console.error('Fetch failed:', error)
    }
    
    // In production, we might want to handle errors differently
    // For example, redirect to an error page or show a notification
    if (process.env.NODE_ENV === 'production') {
      // You could implement error reporting here
      // reportError(error);
    }
    
    throw error
  }
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
  details: string
  quantity: string
  location?: string
  work?: string
  images?: ProjectImage[]
  main_image_url?: string
  created_at: string
  updated_at: string
}

export interface ProjectImage {
  id: number
  image: string
  image_url: string
  caption?: string
  order: number
}

export interface LiveProject {
  id: number
  name: string
  details: string
  quantity: string
  location?: string
  image?: string
  image_url?: string
  status?: string
  category?: string
  year?: string
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

// Prestigious Project types
export interface PrestigiousProject {
  id: number
  name: string
  details: string
  work_details?: string
  quantity: string
  location?: string
  client?: string
  image?: string
  image_url?: string
  order: number
  is_active: boolean
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
    let allResults: Service[] = [];
    let nextUrl: string | null = '/services/';
    
    // Fetch all pages of results
    while (nextUrl) {
      const response = await apiFetch<PaginatedResponse<Service>>(nextUrl);
      
      if (response.results && response.results.length > 0) {
        allResults = [...allResults, ...response.results];
      }
      
      nextUrl = response.next ? response.next.replace(API_BASE, '') : null;
    }
    
    return allResults;
  } catch (error) {
    console.error('Error fetching services:', error);
    return []; // Return empty array on error
  }
}

// Function to fetch certificates from the Django backend
export async function getCertificates(): Promise<Certificate[]> {
  try {
    console.log('Fetching certificates');
    let allResults: Certificate[] = [];
    let nextUrl: string | null = '/certificates/';
    
    // Fetch all pages of results
    while (nextUrl) {
      const response = await apiFetch<PaginatedResponse<Certificate>>(nextUrl);
      console.log('Certificates response:', response);
      
      if (response.results && response.results.length > 0) {
        allResults = [...allResults, ...response.results];
      }
      
      nextUrl = response.next ? response.next.replace(API_BASE, '') : null;
    }
    
    return allResults;
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
export async function getProjects(): Promise<Project[]> {
  try {
    console.log('Fetching projects from the Projects table');
    let allResults: Project[] = [];
    let nextUrl: string | null = '/projects/';
    
    // Fetch all pages of results
    while (nextUrl) {
      const response = await apiFetch<PaginatedResponse<Project>>(nextUrl);
      console.log('Projects response:', response);
      
      if (response.results && response.results.length > 0) {
        allResults = [...allResults, ...response.results];
      }
      
      nextUrl = response.next ? response.next.replace(API_BASE, '') : null;
    }
    
    return allResults;
  } catch (error) {
    console.error('Error fetching projects:', error);
    // Return mock project data
    return [
      {
        id: 10,
        name: "S.S Fabricators & Manufacturers Pvt. Ltd.",
        details: "(Engineers & contractors)",
        quantity: "10000 MT",
        location: "Wardha",
        work: "Manufacturing of M.S. Pipes at SB-04 PDN Project, Lower Wardha Radial Gate Fabrication & Erection.",
        main_image_url: "/images/Projects/%281%29%20%20%20%20SS%20FABRICATIONS/Thumbnail.jpg",
        images: [
          {
            id: 1,
            image: "Thumbnail.jpg",
            image_url: "/images/Projects/%281%29%20%20%20%20SS%20FABRICATIONS/Thumbnail.jpg",
            caption: "S.S Fabricators & Manufacturers Pvt. Ltd. Project",
            order: 1
          }
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 9,
        name: "MAHAGENCO",
        details: "",
        quantity: "11000 MT",
        location: "Koradi- (M.H)",
        work: "3X660 MW TPS Expansion Project (units 8, 9 & 10), CW, ACW Pipe, Fabrication & Erection.",
        main_image_url: "/images/Projects/%28-2%29%20Mahagenco%20-%20Koradi/Thumbnail.png",
        images: [
          {
            id: 1,
            image: "Thumbnail.png",
            image_url: "/images/Projects/%28-2%29%20Mahagenco%20-%20Koradi/Thumbnail.png",
            caption: "MAHAGENCO Project",
            order: 1
          },
          {
            id: 2,
            image: "1.png",
            image_url: "/images/Projects/%28-2%29%20Mahagenco%20-%20Koradi/1.png",
            caption: "MAHAGENCO Project",
            order: 2
          },
          {
            id: 3,
            image: "3.png",
            image_url: "/images/Projects/%28-2%29%20Mahagenco%20-%20Koradi/3.png",
            caption: "MAHAGENCO Project",
            order: 3
          },
          {
            id: 4,
            image: "4.png",
            image_url: "/images/Projects/%28-2%29%20Mahagenco%20-%20Koradi/4.png",
            caption: "MAHAGENCO Project",
            order: 4
          }
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 8,
        name: "Jindal Power Project",
        details: "",
        quantity: "9500 MT",
        location: "Tamnar, Raigarh – C.G.",
        work: "CW and ACW Pipe, Fabrication, Erection, Commissioning & Painting.",
        main_image_url: "/images/Projects/(2)  Jindal Power/01 Thumbnail.jpg",
        images: [
          {
            id: 1,
            image: "01 Thumbnail.jpg",
            image_url: "/images/Projects/(2)  Jindal Power/01 Thumbnail.jpg",
            caption: "Jindal Power Project",
            order: 1
          },
          {
            id: 2,
            image: "02.jpg",
            image_url: "/images/Projects/(2)  Jindal Power/02.jpg",
            caption: "Jindal Power Project",
            order: 2
          },
          {
            id: 3,
            image: "03.jpg",
            image_url: "/images/Projects/(2)  Jindal Power/03.jpg",
            caption: "Jindal Power Project",
            order: 3
          },
          {
            id: 4,
            image: "05.jpg",
            image_url: "/images/Projects/(2)  Jindal Power/05.jpg",
            caption: "Jindal Power Project",
            order: 4
          },
          {
            id: 5,
            image: "06.jpg",
            image_url: "/images/Projects/(2)  Jindal Power/06.jpg",
            caption: "Jindal Power Project",
            order: 5
          },
          {
            id: 6,
            image: "07.jpg",
            image_url: "/images/Projects/(2)  Jindal Power/07.jpg",
            caption: "Jindal Power Project",
            order: 6
          },
          {
            id: 7,
            image: "08.jpg",
            image_url: "/images/Projects/(2)  Jindal Power/08.jpg",
            caption: "Jindal Power Project",
            order: 7
          },
          {
            id: 8,
            image: "09.jpg",
            image_url: "/images/Projects/(2)  Jindal Power/09.jpg",
            caption: "Jindal Power Project",
            order: 8
          }
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 7,
        name: "NTPC",
        details: "",
        quantity: "5400 MT",
        location: "MEJA ALLAHABAD",
        work: "CW System and make-up water system civil works package Stage 1 (2x660 MW). Fabrication, Erection & Painting.",
        main_image_url: "/images/Projects/(3)  NTPC Mejja allahbad/Thumbnail.jpg",
        images: [
          {
            id: 1,
            image: "Thumbnail.jpg",
            image_url: "/images/Projects/(3)  NTPC Mejja allahbad/Thumbnail.jpg",
            caption: "NTPC Project",
            order: 1
          },
          {
            id: 2,
            image: "5868a85a-3662-4744-8ffd-102e32dc3c67.jpg",
            image_url: "/images/Projects/(3)  NTPC Mejja allahbad/5868a85a-3662-4744-8ffd-102e32dc3c67.jpg",
            caption: "NTPC Project",
            order: 2
          },
          {
            id: 3,
            image: "322032e5-2dcc-448b-97dc-8fd807a49f97.jpg",
            image_url: "/images/Projects/(3)  NTPC Mejja allahbad/322032e5-2dcc-448b-97dc-8fd807a49f97.jpg",
            caption: "NTPC Project",
            order: 3
          },
          {
            id: 4,
            image: "29666709-b15b-4e24-8bc5-e51c6e73407e.jpg",
            image_url: "/images/Projects/(3)  NTPC Mejja allahbad/29666709-b15b-4e24-8bc5-e51c6e73407e.jpg",
            caption: "NTPC Project",
            order: 4
          },
          {
            id: 5,
            image: "a1f0f012-76ca-4eb8-8597-e5dba8027b2a.jpg",
            image_url: "/images/Projects/(3)  NTPC Mejja allahbad/a1f0f012-76ca-4eb8-8597-e5dba8027b2a.jpg",
            caption: "NTPC Project",
            order: 5
          },
          {
            id: 6,
            image: "a7158aeb-06bf-4799-8d17-2b9e99f488b4.jpg",
            image_url: "/images/Projects/(3)  NTPC Mejja allahbad/a7158aeb-06bf-4799-8d17-2b9e99f488b4.jpg",
            caption: "NTPC Project",
            order: 6
          },
          {
            id: 7,
            image: "c0b3ac08-5f05-4044-89eb-644f99a8a192.jpg",
            image_url: "/images/Projects/(3)  NTPC Mejja allahbad/c0b3ac08-5f05-4044-89eb-644f99a8a192.jpg",
            caption: "NTPC Project",
            order: 7
          },
          {
            id: 8,
            image: "c02003aa-442b-4f3d-ab46-6221ee88cea8.jpg",
            image_url: "/images/Projects/(3)  NTPC Mejja allahbad/c02003aa-442b-4f3d-ab46-6221ee88cea8.jpg",
            caption: "NTPC Project",
            order: 8
          },
          {
            id: 9,
            image: "d369d10b-e2b0-44bc-aecd-3672c58d2e23.jpg",
            image_url: "/images/Projects/(3)  NTPC Mejja allahbad/d369d10b-e2b0-44bc-aecd-3672c58d2e23.jpg",
            caption: "NTPC Project",
            order: 9
          },
          {
            id: 10,
            image: "de9b771b-132b-412e-a8f1-bfb17605551c.jpg",
            image_url: "/images/Projects/(3)  NTPC Mejja allahbad/de9b771b-132b-412e-a8f1-bfb17605551c.jpg",
            caption: "NTPC Project",
            order: 10
          },
          {
            id: 11,
            image: "e5e9cd84-c710-4039-9f84-7933af1fc32b.jpg",
            image_url: "/images/Projects/(3)  NTPC Mejja allahbad/e5e9cd84-c710-4039-9f84-7933af1fc32b.jpg",
            caption: "NTPC Project",
            order: 11
          },
          {
            id: 12,
            image: "edd5a1d0-495a-442f-98a7-49701796c04d.jpg",
            image_url: "/images/Projects/(3)  NTPC Mejja allahbad/edd5a1d0-495a-442f-98a7-49701796c04d.jpg",
            caption: "NTPC Project",
            order: 12
          },
          {
            id: 13,
            image: "f30387e3-5a58-4269-a87f-d63cdd2baab4.jpg",
            image_url: "/images/Projects/(3)  NTPC Mejja allahbad/f30387e3-5a58-4269-a87f-d63cdd2baab4.jpg",
            caption: "NTPC Project",
            order: 13
          },
          {
            id: 14,
            image: "fef7c420-ef92-45ab-ad04-7c39621bc81d.jpg",
            image_url: "/images/Projects/(3)  NTPC Mejja allahbad/fef7c420-ef92-45ab-ad04-7c39621bc81d.jpg",
            caption: "NTPC Project",
            order: 14
          }
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 6,
        name: "DRN Infrastructure Engineers & Contractors",
        details: "",
        quantity: "40 KM",
        location: "Jamkhandi (KA)",
        work: "TBLIS LIFT IRRIGATION PROJECT. Cross Country Pipeline 3500 Dia to 2700 Dia Erection",
        main_image_url: "/images/Projects/(4). DRN/Thubnail.jpg",
        images: [
          {
            id: 1,
            image: "Thubnail.jpg",
            image_url: "/images/Projects/(4). DRN/Thubnail.jpg",
            caption: "DRN Infrastructure Engineers & Contractors Project",
            order: 1
          },
          {
            id: 2,
            image: "0b0a7086-670d-47dc-8601-51b5b66b8858.jpg",
            image_url: "/images/Projects/(4). DRN/0b0a7086-670d-47dc-8601-51b5b66b8858.jpg",
            caption: "DRN Infrastructure Engineers & Contractors Project",
            order: 2
          },
          {
            id: 3,
            image: "1b9401a1-e2a4-4511-9f02-b78d1fec602f.jpg",
            image_url: "/images/Projects/(4). DRN/1b9401a1-e2a4-4511-9f02-b78d1fec602f.jpg",
            caption: "DRN Infrastructure Engineers & Contractors Project",
            order: 3
          },
          {
            id: 4,
            image: "1f453151-9c68-492d-b6f7-9f8ad6354cb2.jpg",
            image_url: "/images/Projects/(4). DRN/1f453151-9c68-492d-b6f7-9f8ad6354cb2.jpg",
            caption: "DRN Infrastructure Engineers & Contractors Project",
            order: 4
          },
          {
            id: 5,
            image: "2ee0b940-63ad-499b-b75a-f775658b469f.jpg",
            image_url: "/images/Projects/(4). DRN/2ee0b940-63ad-499b-b75a-f775658b469f.jpg",
            caption: "DRN Infrastructure Engineers & Contractors Project",
            order: 5
          },
          {
            id: 6,
            image: "7ec456b3-0c46-4367-9b3f-b4a57b68cf04.jpg",
            image_url: "/images/Projects/(4). DRN/7ec456b3-0c46-4367-9b3f-b4a57b68cf04.jpg",
            caption: "DRN Infrastructure Engineers & Contractors Project",
            order: 6
          },
          {
            id: 7,
            image: "53efe13a-2205-4171-ac90-f05c66caeb03.jpg",
            image_url: "/images/Projects/(4). DRN/53efe13a-2205-4171-ac90-f05c66caeb03.jpg",
            caption: "DRN Infrastructure Engineers & Contractors Project",
            order: 7
          },
          {
            id: 8,
            image: "216ec507-7fe3-48c3-8597-33e2855baf12.jpg",
            image_url: "/images/Projects/(4). DRN/216ec507-7fe3-48c3-8597-33e2855baf12.jpg",
            caption: "DRN Infrastructure Engineers & Contractors Project",
            order: 8
          },
          {
            id: 9,
            image: "4945b450-c490-4c0f-9027-fa071b700952.jpg",
            image_url: "/images/Projects/(4). DRN/4945b450-c490-4c0f-9027-fa071b700952.jpg",
            caption: "DRN Infrastructure Engineers & Contractors Project",
            order: 9
          },
          {
            id: 10,
            image: "b4ddad8c-cab3-48d8-b3d4-5a8098cf4af4.jpg",
            image_url: "/images/Projects/(4). DRN/b4ddad8c-cab3-48d8-b3d4-5a8098cf4af4.jpg",
            caption: "DRN Infrastructure Engineers & Contractors Project",
            order: 10
          },
          {
            id: 11,
            image: "d146c4d6-137b-4303-8fa7-c9c7c2334420.jpg",
            image_url: "/images/Projects/(4). DRN/d146c4d6-137b-4303-8fa7-c9c7c2334420.jpg",
            caption: "DRN Infrastructure Engineers & Contractors Project",
            order: 11
          },
          {
            id: 12,
            image: "f25a32d7-9559-4377-b059-d477ec7c8a15.jpg",
            image_url: "/images/Projects/(4). DRN/f25a32d7-9559-4377-b059-d477ec7c8a15.jpg",
            caption: "DRN Infrastructure Engineers & Contractors Project",
            order: 12
          },
          {
            id: 13,
            image: "fdaf058d-db8f-4eca-bff9-5826ebd2e5ce.jpg",
            image_url: "/images/Projects/(4). DRN/fdaf058d-db8f-4eca-bff9-5826ebd2e5ce.jpg",
            caption: "DRN Infrastructure Engineers & Contractors Project",
            order: 13
          }
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 5,
        name: "ADANI INFRA. (INDIA) LIMITED.",
        details: "",
        quantity: "18 KM",
        location: "Village Motia, Dist. Godda J.H. PROJECT",
        work: "2 X 800 MW Ultra Supercritical Coal-based Thermal Power Project Intake Pipeline, Raw Water Pipeline 1350 Dia, Fabrication, Erection & Painting.",
        main_image_url: "/images/Projects/(5)  Adani Infra godda/Thumbnail.jpg",
        images: [
          {
            id: 1,
            image: "Thumbnail.jpg",
            image_url: "/images/Projects/(5)  Adani Infra godda/Thumbnail.jpg",
            caption: "ADANI INFRA. (INDIA) LIMITED. Project",
            order: 1
          },
          {
            id: 2,
            image: "WhatsApp Image 2025-10-21 at 04.31.20_3046afe1.jpg",
            image_url: "/images/Projects/(5)  Adani Infra godda/WhatsApp Image 2025-10-21 at 04.31.20_3046afe1.jpg",
            caption: "ADANI INFRA. (INDIA) LIMITED. Project",
            order: 2
          },
          {
            id: 3,
            image: "WhatsApp Image 2025-10-21 at 04.31.20_f4b4834e.jpg",
            image_url: "/images/Projects/(5)  Adani Infra godda/WhatsApp Image 2025-10-21 at 04.31.20_f4b4834e.jpg",
            caption: "ADANI INFRA. (INDIA) LIMITED. Project",
            order: 3
          },
          {
            id: 4,
            image: "WhatsApp Image 2025-10-21 at 04.31.21_88888c89.jpg",
            image_url: "/images/Projects/(5)  Adani Infra godda/WhatsApp Image 2025-10-21 at 04.31.21_88888c89.jpg",
            caption: "ADANI INFRA. (INDIA) LIMITED. Project",
            order: 4
          },
          {
            id: 5,
            image: "WhatsApp Image 2025-10-21 at 04.31.21_a1b91766.jpg",
            image_url: "/images/Projects/(5)  Adani Infra godda/WhatsApp Image 2025-10-21 at 04.31.21_a1b91766.jpg",
            caption: "ADANI INFRA. (INDIA) LIMITED. Project",
            order: 5
          },
          {
            id: 6,
            image: "WhatsApp Image 2025-10-21 at 04.31.21_f70e0198.jpg",
            image_url: "/images/Projects/(5)  Adani Infra godda/WhatsApp Image 2025-10-21 at 04.31.21_f70e0198.jpg",
            caption: "ADANI INFRA. (INDIA) LIMITED. Project",
            order: 6
          },
          {
            id: 7,
            image: "WhatsApp Image 2025-10-21 at 04.31.22_34a231ac.jpg",
            image_url: "/images/Projects/(5)  Adani Infra godda/WhatsApp Image 2025-10-21 at 04.31.22_34a231ac.jpg",
            caption: "ADANI INFRA. (INDIA) LIMITED. Project",
            order: 7
          },
          {
            id: 8,
            image: "WhatsApp Image 2025-10-21 at 04.31.22_caa7c549.jpg",
            image_url: "/images/Projects/(5)  Adani Infra godda/WhatsApp Image 2025-10-21 at 04.31.22_caa7c549.jpg",
            caption: "ADANI INFRA. (INDIA) LIMITED. Project",
            order: 8
          },
          {
            id: 9,
            image: "WhatsApp Image 2025-10-21 at 04.31.22_e50ce31d.jpg",
            image_url: "/images/Projects/(5)  Adani Infra godda/WhatsApp Image 2025-10-21 at 04.31.22_e50ce31d.jpg",
            caption: "ADANI INFRA. (INDIA) LIMITED. Project",
            order: 9
          }
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 4,
        name: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED",
        details: "",
        quantity: "17000 MT",
        location: "NANDAWADAGI DRIP IRRIGATION SCHEME PACKAGE - 1 (BLOCK - A , 12000 HA) PROJECT",
        work: "Pipe Fabrication 3000 dia.",
        main_image_url: "/images/Projects/(6)  VITAL ENVIRONMENT INDIA PRIVATE LIMITED/Thumbnail.jpg",
        images: [
          {
            id: 1,
            image: "Thumbnail.jpg",
            image_url: "/images/Projects/(6)  VITAL ENVIRONMENT INDIA PRIVATE LIMITED/Thumbnail.jpg",
            caption: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED Project",
            order: 1
          },
          {
            id: 2,
            image: "0cbeb934-344b-440a-89d2-dd7aa6574a9e.jpg",
            image_url: "/images/Projects/(6)  VITAL ENVIRONMENT INDIA PRIVATE LIMITED/0cbeb934-344b-440a-89d2-dd7aa6574a9e.jpg",
            caption: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED Project",
            order: 2
          },
          {
            id: 3,
            image: "3e623156-eb2c-44e0-9ff8-6a81e3152798.jpg",
            image_url: "/images/Projects/(6)  VITAL ENVIRONMENT INDIA PRIVATE LIMITED/3e623156-eb2c-44e0-9ff8-6a81e3152798.jpg",
            caption: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED Project",
            order: 3
          },
          {
            id: 4,
            image: "7aa69298-8865-41ef-a2c8-aad79f328c55.jpg",
            image_url: "/images/Projects/(6)  VITAL ENVIRONMENT INDIA PRIVATE LIMITED/7aa69298-8865-41ef-a2c8-aad79f328c55.jpg",
            caption: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED Project",
            order: 4
          },
          {
            id: 5,
            image: "54a6c950-87df-4954-acb0-db4f617f89d0.jpg",
            image_url: "/images/Projects/(6)  VITAL ENVIRONMENT INDIA PRIVATE LIMITED/54a6c950-87df-4954-acb0-db4f617f89d0.jpg",
            caption: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED Project",
            order: 5
          },
          {
            id: 6,
            image: "83dc8cbe-3f48-448d-a332-ec9157c22c69.jpg",
            image_url: "/images/Projects/(6)  VITAL ENVIRONMENT INDIA PRIVATE LIMITED/83dc8cbe-3f48-448d-a332-ec9157c22c69.jpg",
            caption: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED Project",
            order: 6
          },
          {
            id: 7,
            image: "86a84b74-500d-4c9b-ac7f-5cc36ef2acb1.jpg",
            image_url: "/images/Projects/(6)  VITAL ENVIRONMENT INDIA PRIVATE LIMITED/86a84b74-500d-4c9b-ac7f-5cc36ef2acb1.jpg",
            caption: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED Project",
            order: 7
          },
          {
            id: 8,
            image: "288c3cf9-179c-425e-aaaa-7b4b9cdf23d4.jpg",
            image_url: "/images/Projects/(6)  VITAL ENVIRONMENT INDIA PRIVATE LIMITED/288c3cf9-179c-425e-aaaa-7b4b9cdf23d4.jpg",
            caption: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED Project",
            order: 8
          },
          {
            id: 9,
            image: "346f6d01-d034-4f44-84ac-1bf99fe0395e.jpg",
            image_url: "/images/Projects/(6)  VITAL ENVIRONMENT INDIA PRIVATE LIMITED/346f6d01-d034-4f44-84ac-1bf99fe0395e.jpg",
            caption: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED Project",
            order: 9
          },
          {
            id: 10,
            image: "2376c358-8b89-469c-a500-1ffd3c01418d.jpg",
            image_url: "/images/Projects/(6)  VITAL ENVIRONMENT INDIA PRIVATE LIMITED/2376c358-8b89-469c-a500-1ffd3c01418d.jpg",
            caption: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED Project",
            order: 10
          },
          {
            id: 11,
            image: "488122e0-81f1-4328-ac5b-c79a6609ad42.jpg",
            image_url: "/images/Projects/(6)  VITAL ENVIRONMENT INDIA PRIVATE LIMITED/488122e0-81f1-4328-ac5b-c79a6609ad42.jpg",
            caption: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED Project",
            order: 11
          },
          {
            id: 12,
            image: "ad1b98ef-4115-4109-9ed3-837795cde9ca.jpg",
            image_url: "/images/Projects/(6)  VITAL ENVIRONMENT INDIA PRIVATE LIMITED/ad1b98ef-4115-4109-9ed3-837795cde9ca.jpg",
            caption: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED Project",
            order: 12
          },
          {
            id: 13,
            image: "cb8125db-f71e-4b89-8f41-be6cd45680a9.jpg",
            image_url: "/images/Projects/(6)  VITAL ENVIRONMENT INDIA PRIVATE LIMITED/cb8125db-f71e-4b89-8f41-be6cd45680a9.jpg",
            caption: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED Project",
            order: 13
          },
          {
            id: 14,
            image: "d84b0b46-4ac7-4a56-8ba8-fb5f2c743711.jpg",
            image_url: "/images/Projects/(6)  VITAL ENVIRONMENT INDIA PRIVATE LIMITED/d84b0b46-4ac7-4a56-8ba8-fb5f2c743711.jpg",
            caption: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED Project",
            order: 14
          },
          {
            id: 15,
            image: "d4655dd7-02df-46ca-b477-30af004661a0.jpg",
            image_url: "/images/Projects/(6)  VITAL ENVIRONMENT INDIA PRIVATE LIMITED/d4655dd7-02df-46ca-b477-30af004661a0.jpg",
            caption: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED Project",
            order: 15
          },
          {
            id: 16,
            image: "dd10300f-0b52-4641-8eeb-e993d33fe9f0.jpg",
            image_url: "/images/Projects/(6)  VITAL ENVIRONMENT INDIA PRIVATE LIMITED/dd10300f-0b52-4641-8eeb-e993d33fe9f0.jpg",
            caption: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED Project",
            order: 16
          },
          {
            id: 17,
            image: "e7f34280-a4f6-4eab-96e2-32b44b1c237f.jpg",
            image_url: "/images/Projects/(6)  VITAL ENVIRONMENT INDIA PRIVATE LIMITED/e7f34280-a4f6-4eab-96e2-32b44b1c237f.jpg",
            caption: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED Project",
            order: 17
          },
          {
            id: 18,
            image: "ef4f41bb-6c94-4250-8b38-3842e41f7f47.jpg",
            image_url: "/images/Projects/(6)  VITAL ENVIRONMENT INDIA PRIVATE LIMITED/ef4f41bb-6c94-4250-8b38-3842e41f7f47.jpg",
            caption: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED Project",
            order: 18
          },
          {
            id: 19,
            image: "fb2ef9ab-a78d-45c2-ba8e-48b86d48af1e.jpg",
            image_url: "/images/Projects/(6)  VITAL ENVIRONMENT INDIA PRIVATE LIMITED/fb2ef9ab-a78d-45c2-ba8e-48b86d48af1e.jpg",
            caption: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED Project",
            order: 19
          }
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 3,
        name: "AFCONS INFRASTRUCTURE LIMITED",
        details: "",
        quantity: "6400 MT",
        location: "Maldives",
        work: "AFC | 5752 | SC - Pile Liner And TAB Superstructure Fabrication",
        main_image_url: "/images/Projects/(7)  AFCONS INFRSTRUCTURE LTD Finalized/01 Thumbnail.jpg",
        images: [
          {
            id: 1,
            image: "01 Thumbnail.jpg",
            image_url: "/images/Projects/(7)  AFCONS INFRSTRUCTURE LTD Finalized/01 Thumbnail.jpg",
            caption: "AFCONS INFRASTRUCTURE LIMITED Project",
            order: 1
          },
          {
            id: 2,
            image: "IMG_20220911_122358.jpg",
            image_url: "/images/Projects/(7)  AFCONS INFRSTRUCTURE LTD Finalized/IMG_20220911_122358.jpg",
            caption: "AFCONS INFRASTRUCTURE LIMITED Project",
            order: 2
          },
          {
            id: 3,
            image: "IMG_20220912_172011.jpg",
            image_url: "/images/Projects/(7)  AFCONS INFRSTRUCTURE LTD Finalized/IMG_20220912_172011.jpg",
            caption: "AFCONS INFRASTRUCTURE LIMITED Project",
            order: 3
          },
          {
            id: 4,
            image: "IMG_20220912_172029.jpg",
            image_url: "/images/Projects/(7)  AFCONS INFRSTRUCTURE LTD Finalized/IMG_20220912_172029.jpg",
            caption: "AFCONS INFRASTRUCTURE LIMITED Project",
            order: 4
          },
          {
            id: 5,
            image: "IMG_20220912_172035.jpg",
            image_url: "/images/Projects/(7)  AFCONS INFRSTRUCTURE LTD Finalized/IMG_20220912_172035.jpg",
            caption: "AFCONS INFRASTRUCTURE LIMITED Project",
            order: 5
          },
          {
            id: 6,
            image: "IMG_20220913_171208.jpg",
            image_url: "/images/Projects/(7)  AFCONS INFRSTRUCTURE LTD Finalized/IMG_20220913_171208.jpg",
            caption: "AFCONS INFRASTRUCTURE LIMITED Project",
            order: 6
          },
          {
            id: 7,
            image: "IMG_20220914_182326.jpg",
            image_url: "/images/Projects/(7)  AFCONS INFRSTRUCTURE LTD Finalized/IMG_20220914_182326.jpg",
            caption: "AFCONS INFRASTRUCTURE LIMITED Project",
            order: 7
          },
          {
            id: 8,
            image: "IMG_20220915_083812.jpg",
            image_url: "/images/Projects/(7)  AFCONS INFRSTRUCTURE LTD Finalized/IMG_20220915_083812.jpg",
            caption: "AFCONS INFRASTRUCTURE LIMITED Project",
            order: 8
          },
          {
            id: 9,
            image: "IMG_20220915_153518.jpg",
            image_url: "/images/Projects/(7)  AFCONS INFRSTRUCTURE LTD Finalized/IMG_20220915_153518.jpg",
            caption: "AFCONS INFRASTRUCTURE LIMITED Project",
            order: 9
          },
          {
            id: 10,
            image: "IMG_20220920_162804.jpg",
            image_url: "/images/Projects/(7)  AFCONS INFRSTRUCTURE LTD Finalized/IMG_20220920_162804.jpg",
            caption: "AFCONS INFRASTRUCTURE LIMITED Project",
            order: 10
          },
          {
            id: 11,
            image: "IMG_20220922_081719.jpg",
            image_url: "/images/Projects/(7)  AFCONS INFRSTRUCTURE LTD Finalized/IMG_20220922_081719.jpg",
            caption: "AFCONS INFRASTRUCTURE LIMITED Project",
            order: 11
          },
          {
            id: 12,
            image: "IMG_20220925_155318.jpg",
            image_url: "/images/Projects/(7)  AFCONS INFRSTRUCTURE LTD Finalized/IMG_20220925_155318.jpg",
            caption: "AFCONS INFRASTRUCTURE LIMITED Project",
            order: 12
          },
          {
            id: 13,
            image: "IMG_20220925_163410.jpg",
            image_url: "/images/Projects/(7)  AFCONS INFRSTRUCTURE LTD Finalized/IMG_20220925_163410.jpg",
            caption: "AFCONS INFRASTRUCTURE LIMITED Project",
            order: 13
          },
          {
            id: 14,
            image: "IMG_20220927_081410.jpg",
            image_url: "/images/Projects/(7)  AFCONS INFRSTRUCTURE LTD Finalized/IMG_20220927_081410.jpg",
            caption: "AFCONS INFRASTRUCTURE LIMITED Project",
            order: 14
          },
          {
            id: 15,
            image: "IMG_20221002_165930.jpg",
            image_url: "/images/Projects/(7)  AFCONS INFRSTRUCTURE LTD Finalized/IMG_20221002_165930.jpg",
            caption: "AFCONS INFRASTRUCTURE LIMITED Project",
            order: 15
          },
          {
            id: 16,
            image: "IMG_20221004_190421.jpg",
            image_url: "/images/Projects/(7)  AFCONS INFRSTRUCTURE LTD Finalized/IMG_20221004_190421.jpg",
            caption: "AFCONS INFRASTRUCTURE LIMITED Project",
            order: 16
          },
          {
            id: 17,
            image: "IMG_20221006_165254.jpg",
            image_url: "/images/Projects/(7)  AFCONS INFRSTRUCTURE LTD Finalized/IMG_20221006_165254.jpg",
            caption: "AFCONS INFRASTRUCTURE LIMITED Project",
            order: 17
          },
          {
            id: 18,
            image: "IMG_20221007_075150.jpg",
            image_url: "/images/Projects/(7)  AFCONS INFRSTRUCTURE LTD Finalized/IMG_20221007_075150.jpg",
            caption: "AFCONS INFRASTRUCTURE LIMITED Project",
            order: 18
          },
          {
            id: 19,
            image: "IMG_20221009_084156.jpg",
            image_url: "/images/Projects/(7)  AFCONS INFRSTRUCTURE LTD Finalized/IMG_20221009_084156.jpg",
            caption: "AFCONS INFRASTRUCTURE LIMITED Project",
            order: 19
          },
          {
            id: 20,
            image: "IMG_20221011_082852.jpg",
            image_url: "/images/Projects/(7)  AFCONS INFRSTRUCTURE LTD Finalized/IMG_20221011_082852.jpg",
            caption: "AFCONS INFRASTRUCTURE LIMITED Project",
            order: 20
          }
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 2,
        name: "Adani Power Limited",
        details: "",
        quantity: "11000 MT",
        location: "Raipur",
        work: "CW, ACW and RW Piping along with fittings, valves and accessories for 2x800 MW (Phase-II) Ultra Super Critical Thermal Power Project, Fabrication, Erection & Painting",
        main_image_url: "/images/Projects/(8) Adani Power Raipur/Thumbnail.jpg",
        images: [
          {
            id: 1,
            image: "003.jpg",
            image_url: "/images/Projects/(8) Adani Power Raipur/003.jpg",
            caption: "Adani Power Raipur Project",
            order: 1
          },
          {
            id: 2,
            image: "asdasfasdfv_.jpg",
            image_url: "/images/Projects/(8) Adani Power Raipur/asdasfasdfv_.jpg",
            caption: "Adani Power Raipur Project",
            order: 2
          },
          {
            id: 3,
            image: "gbxdcfh.jpg",
            image_url: "/images/Projects/(8) Adani Power Raipur/gbxdcfh.jpg",
            caption: "Adani Power Raipur Project",
            order: 3
          },
          {
            id: 4,
            image: "last.png",
            image_url: "/images/Projects/(8) Adani Power Raipur/last.png",
            caption: "Adani Power Raipur Project",
            order: 4
          },
          {
            id: 5,
            image: "Thumbnail.jpg",
            image_url: "/images/Projects/(8) Adani Power Raipur/Thumbnail.jpg",
            caption: "Adani Power Raipur Project",
            order: 5
          },
          {
            id: 6,
            image: "WhatsApp Image 2025-10-21 at 04.09.50_4d44d77a.jpg",
            image_url: "/images/Projects/(8) Adani Power Raipur/WhatsApp Image 2025-10-21 at 04.09.50_4d44d77a.jpg",
            caption: "Adani Power Raipur Project",
            order: 6
          },
          {
            id: 7,
            image: "WhatsApp Image 2025-10-21 at 04.09.50_12857087.jpg",
            image_url: "/images/Projects/(8) Adani Power Raipur/WhatsApp Image 2025-10-21 at 04.09.50_12857087.jpg",
            caption: "Adani Power Raipur Project",
            order: 7
          },
          {
            id: 8,
            image: "WhatsApp Image 2025-10-21 at 04.09.50_b7734269.jpg",
            image_url: "/images/Projects/(8) Adani Power Raipur/WhatsApp Image 2025-10-21 at 04.09.50_b7734269.jpg",
            caption: "Adani Power Raipur Project",
            order: 8
          },
          {
            id: 9,
            image: "WhatsApp Image 2025-10-21 at 04.09.51_7df47f0c.jpg",
            image_url: "/images/Projects/(8) Adani Power Raipur/WhatsApp Image 2025-10-21 at 04.09.51_7df47f0c.jpg",
            caption: "Adani Power Raipur Project",
            order: 9
          },
          {
            id: 10,
            image: "WhatsApp Image 2025-10-21 at 04.09.51_8fcfd91b.jpg",
            image_url: "/images/Projects/(8) Adani Power Raipur/WhatsApp Image 2025-10-21 at 04.09.51_8fcfd91b.jpg",
            caption: "Adani Power Raipur Project",
            order: 10
          },
          {
            id: 11,
            image: "WhatsApp Image 2025-10-21 at 04.09.51_da2a2b14.jpg",
            image_url: "/images/Projects/(8) Adani Power Raipur/WhatsApp Image 2025-10-21 at 04.09.51_da2a2b14.jpg",
            caption: "Adani Power Raipur Project",
            order: 11
          },
          {
            id: 12,
            image: "WhatsApp Image 2025-10-29 at 22.20.17_cf8af055.jpg",
            image_url: "/images/Projects/(8) Adani Power Raipur/WhatsApp Image 2025-10-29 at 22.20.17_cf8af055.jpg",
            caption: "Adani Power Raipur Project",
            order: 12
          },
          {
            id: 13,
            image: "WhatsApp Image 2025-10-29 at 22.20.19_0d1849fb.jpg",
            image_url: "/images/Projects/(8) Adani Power Raipur/WhatsApp Image 2025-10-29 at 22.20.19_0d1849fb.jpg",
            caption: "Adani Power Raipur Project",
            order: 13
          },
          {
            id: 14,
            image: "WhatsApp Image 2025-10-29 at 22.20.19_65d44760.jpg",
            image_url: "/images/Projects/(8) Adani Power Raipur/WhatsApp Image 2025-10-29 at 22.20.19_65d44760.jpg",
            caption: "Adani Power Raipur Project",
            order: 14
          },
          {
            id: 15,
            image: "WhatsApp Image 2025-10-29 at 22.20.20_6bffe6bb.jpg",
            image_url: "/images/Projects/(8) Adani Power Raipur/WhatsApp Image 2025-10-29 at 22.20.20_6bffe6bb.jpg",
            caption: "Adani Power Raipur Project",
            order: 15
          },
          {
            id: 16,
            image: "WhatsApp Image 2025-10-29 at 22.20.20_6696fd13.jpg",
            image_url: "/images/Projects/(8) Adani Power Raipur/WhatsApp Image 2025-10-29 at 22.20.20_6696fd13.jpg",
            caption: "Adani Power Raipur Project",
            order: 16
          },
          {
            id: 17,
            image: "WhatsApp Image 2025-10-29 at 22.20.21_304c3075.jpg",
            image_url: "/images/Projects/(8) Adani Power Raipur/WhatsApp Image 2025-10-29 at 22.20.21_304c3075.jpg",
            caption: "Adani Power Raipur Project",
            order: 17
          },
          {
            id: 18,
            image: "WhatsApp Image 2025-10-29 at 22.20.22_c8c195e0.jpg",
            image_url: "/images/Projects/(8) Adani Power Raipur/WhatsApp Image 2025-10-29 at 22.20.22_c8c195e0.jpg",
            caption: "Adani Power Raipur Project",
            order: 18
          },
          {
            id: 19,
            image: "WhatsApp Image 2025-10-29 at 22.20.23_df039d3c.jpg",
            image_url: "/images/Projects/(8) Adani Power Raipur/WhatsApp Image 2025-10-29 at 22.20.23_df039d3c.jpg",
            caption: "Adani Power Raipur Project",
            order: 19
          },
          {
            id: 20,
            image: "WhatsApp Image 2025-10-29 at 22.20.23_ecb9dfee.jpg",
            image_url: "/images/Projects/(8) Adani Power Raipur/WhatsApp Image 2025-10-29 at 22.20.23_ecb9dfee.jpg",
            caption: "Adani Power Raipur Project",
            order: 20
          },
          {
            id: 21,
            image: "WhatsApp Image 2025-10-29 at 22.20.24_5c2a9c34.jpg",
            image_url: "/images/Projects/(8) Adani Power Raipur/WhatsApp Image 2025-10-29 at 22.20.24_5c2a9c34.jpg",
            caption: "Adani Power Raipur Project",
            order: 21
          }
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 1,
        name: "Adani Power Limited",
        details: "",
        quantity: "6000 MT",
        location: "Mirzapur, Uttar Pradesh",
        work: "CW, ACW, RW System of 2x800 MW Power Plant, Fabrication, Erection & Painting.",
        main_image_url: "/images/Projects/(9). Adani Power Mirzapur/Thumbnail.jpg",
        images: [
          {
            id: 1,
            image: "1.jpeg",
            image_url: "/images/Projects/(9). Adani Power Mirzapur/1.jpeg",
            caption: "Adani Power Mirzapur Project",
            order: 1
          },
          {
            id: 2,
            image: "2.png",
            image_url: "/images/Projects/(9). Adani Power Mirzapur/2.png",
            caption: "Adani Power Mirzapur Project",
            order: 2
          },
          {
            id: 3,
            image: "3.png",
            image_url: "/images/Projects/(9). Adani Power Mirzapur/3.png",
            caption: "Adani Power Mirzapur Project",
            order: 3
          },
          {
            id: 4,
            image: "75cf43d8-3a50-42ef-9a7e-8c8c8464df83.jpg",
            image_url: "/images/Projects/(9). Adani Power Mirzapur/75cf43d8-3a50-42ef-9a7e-8c8c8464df83.jpg",
            caption: "Adani Power Mirzapur Project",
            order: 4
          },
          {
            id: 5,
            image: "ec771527-f5f7-4e02-9bb5-24637eedba62.jpg",
            image_url: "/images/Projects/(9). Adani Power Mirzapur/ec771527-f5f7-4e02-9bb5-24637eedba62.jpg",
            caption: "Adani Power Mirzapur Project",
            order: 5
          },
          {
            id: 6,
            image: "Thumbnail.jpg",
            image_url: "/images/Projects/(9). Adani Power Mirzapur/Thumbnail.jpg",
            caption: "Adani Power Mirzapur Project",
            order: 6
          },
          {
            id: 7,
            image: "WhatsApp Image 2025-12-24 at 12.59.39--.jpeg",
            image_url: "/images/Projects/(9). Adani Power Mirzapur/WhatsApp Image 2025-12-24 at 12.59.39--.jpeg",
            caption: "Adani Power Mirzapur Project",
            order: 7
          },
          {
            id: 8,
            image: "WhatsApp Image 2025-12-24 at 12.59.39-.jpeg",
            image_url: "/images/Projects/(9). Adani Power Mirzapur/WhatsApp Image 2025-12-24 at 12.59.39-.jpeg",
            caption: "Adani Power Mirzapur Project",
            order: 8
          },
          {
            id: 9,
            image: "WhatsApp Image 2025-12-24 at 13.00.37.jpeg",
            image_url: "/images/Projects/(9). Adani Power Mirzapur/WhatsApp Image 2025-12-24 at 13.00.37.jpeg",
            caption: "Adani Power Mirzapur Project",
            order: 9
          }
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
  }
}

// Function to fetch live projects
export async function getLiveProjects(): Promise<LiveProject[]> {
  try {
    console.log('Fetching live projects');
    let allResults: LiveProject[] = [];
    let nextUrl: string | null = '/projects/live/';
    
    // Fetch all pages of results
    while (nextUrl) {
      const response = await apiFetch<PaginatedResponse<LiveProject>>(nextUrl);
      console.log('Live projects response:', response);
      
      if (response.results && response.results.length > 0) {
        allResults = [...allResults, ...response.results];
      }
      
      nextUrl = response.next ? response.next.replace(API_BASE, '') : null;
    }
    
    return allResults;
  } catch (error) {
    console.error('Error fetching live projects:', error);
    // Return dummy live project data when API fails
    return [
      {
        id: 10,
        name: "S.S Fabricators & Manufacturers Pvt. Ltd.",
        details: "(Engineers & contractors)",
        quantity: "10000 MT",
        location: "Wardha",
        image_url: "/images/Projects/%281%29%20%20%20%20SS%20FABRICATIONS/Thumbnail.jpg",
        status: "In Progress",
        category: "Manufacturing",
        year: "2025",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 9,
        name: "MAHAGENCO",
        details: "",
        quantity: "11000 MT",
        location: "Koradi- (M.H)",
        image_url: "/images/Projects/%28-2%29%20Mahagenco%20-%20Koradi/Thumbnail.png",
        status: "In Progress",
        category: "Power Plant",
        year: "2025",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 8,
        name: "Jindal Power Project",
        details: "",
        quantity: "9500 MT",
        location: "Tamnar, Raigarh – C.G.",
        image_url: "/images/Projects/(2)  Jindal Power/01 Thumbnail.jpg",
        status: "In Progress",
        category: "Power Plant",
        year: "2025",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 7,
        name: "NTPC",
        details: "",
        quantity: "5400 MT",
        location: "MEJA ALLAHABAD",
        image_url: "/images/Projects/(3)  NTPC Mejja allahbad/Thumbnail.jpg",
        status: "In Progress",
        category: "Power Plant",
        year: "2025",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 6,
        name: "DRN Infrastructure Engineers & Contractors",
        details: "",
        quantity: "40 KM",
        location: "Jamkhandi (KA)",
        image_url: "/images/Projects/(4). DRN/Thubnail.jpg",
        status: "In Progress",
        category: "Irrigation",
        year: "2025",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 5,
        name: "ADANI INFRA. (INDIA) LIMITED.",
        details: "",
        quantity: "18 KM",
        location: "Village Motia, Dist. Godda J.H. PROJECT",
        image_url: "/images/Projects/(5)  Adani Infra godda/Thumbnail.jpg",
        status: "In Progress",
        category: "Power Plant",
        year: "2025",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 4,
        name: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED",
        details: "",
        quantity: "17000 MT",
        location: "NANDAWADAGI DRIP IRRIGATION SCHEME PACKAGE - 1 (BLOCK - A , 12000 HA) PROJECT",
        image_url: "/images/Projects/(6)  VITAL ENVIRONMENT INDIA PRIVATE LIMITED/Thumbnail.jpg",
        status: "In Progress",
        category: "Irrigation",
        year: "2025",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 3,
        name: "AFCONS INFRASTRUCTURE LIMITED",
        details: "",
        quantity: "6400 MT",
        location: "Maldives",
        image_url: "/images/Projects/(7)  AFCONS INFRSTRUCTURE LTD Finalized/01 Thumbnail.jpg",
        status: "In Progress",
        category: "Infrastructure",
        year: "2025",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 2,
        name: "Adani Power Limited",
        details: "",
        quantity: "11000 MT",
        location: "Raipur",
        image_url: "/images/Projects/(8) Adani Power Raipur/Thumbnail.jpg",
        status: "In Progress",
        category: "Power Plant",
        year: "2025",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 1,
        name: "Adani Power Limited",
        details: "",
        quantity: "6000 MT",
        location: "Mirzapur, Uttar Pradesh",
        image_url: "/images/Projects/(9). Adani Power Mirzapur/Thumbnail.jpg",
        status: "In Progress",
        category: "Power Plant",
        year: "2025",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
  }
}

// Function to fetch completed projects
export async function getCompletedProjects(): Promise<CompletedProject[]> {
  try {
    console.log('Fetching completed projects');
    let allResults: CompletedProject[] = [];
    let nextUrl: string | null = '/projects/completed/';
    
    // Fetch all pages of results
    while (nextUrl) {
      const response = await apiFetch<PaginatedResponse<CompletedProject>>(nextUrl);
      console.log('Completed projects response:', response);
      
      if (response.results && response.results.length > 0) {
        allResults = [...allResults, ...response.results];
      }
      
      nextUrl = response.next ? response.next.replace(API_BASE, '') : null;
    }
    
    return allResults;
  } catch (error) {
    console.error('Error fetching completed projects:', error);
    // Return dummy completed project data when API fails
    return [
      {
        id: 10,
        name: "S.S Fabricators & Manufacturers Pvt. Ltd.",
        details: "(Engineers & contractors)",
        quantity: "10000 MT",
        client: "S.S Fabricators & Manufacturers Pvt. Ltd.",
        completion_date: "2025-12-31",
        image_url: "/images/Projects/%281%29%20%20%20%20SS%20FABRICATIONS/Thumbnail.jpg",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 9,
        name: "MAHAGENCO",
        details: "",
        quantity: "11000 MT",
        client: "MAHAGENCO",
        completion_date: "2025-12-31",
        image_url: "/images/Projects/%28-2%29%20Mahagenco%20-%20Koradi/Thumbnail.png",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 8,
        name: "Jindal Power Project",
        details: "",
        quantity: "9500 MT",
        client: "Jindal Power",
        completion_date: "2025-12-31",
        image_url: "/images/Projects/(2)  Jindal Power/01 Thumbnail.jpg",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 7,
        name: "NTPC",
        details: "",
        quantity: "5400 MT",
        client: "NTPC",
        completion_date: "2025-12-31",
        image_url: "/images/Projects/(3)  NTPC Mejja allahbad/Thumbnail.jpg",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 6,
        name: "DRN Infrastructure Engineers & Contractors",
        details: "",
        quantity: "40 KM",
        client: "DRN Infrastructure Engineers & Contractors",
        completion_date: "2025-12-31",
        image_url: "/images/Projects/(4). DRN/Thubnail.jpg",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 5,
        name: "ADANI INFRA. (INDIA) LIMITED.",
        details: "",
        quantity: "18 KM",
        client: "ADANI INFRA. (INDIA) LIMITED.",
        completion_date: "2025-12-31",
        image_url: "/images/Projects/(5)  Adani Infra godda/Thumbnail.jpg",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 4,
        name: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED",
        details: "",
        quantity: "17000 MT",
        client: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED",
        completion_date: "2025-12-31",
        image_url: "/images/Projects/(6)  VITAL ENVIRONMENT INDIA PRIVATE LIMITED/Thumbnail.jpg",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 3,
        name: "AFCONS INFRASTRUCTURE LIMITED",
        details: "",
        quantity: "6400 MT",
        client: "AFCONS INFRASTRUCTURE LIMITED",
        completion_date: "2025-12-31",
        image_url: "/images/Projects/(7)  AFCONS INFRSTRUCTURE LTD Finalized/01 Thumbnail.jpg",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 2,
        name: "Adani Power Limited",
        details: "",
        quantity: "11000 MT",
        client: "Adani Power Limited",
        completion_date: "2025-12-31",
        image_url: "/images/Projects/(8) Adani Power Raipur/Thumbnail.jpg",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 1,
        name: "Adani Power Limited",
        details: "",
        quantity: "6000 MT",
        client: "Adani Power Limited",
        completion_date: "2025-12-31",
        image_url: "/images/Projects/(9). Adani Power Mirzapur/Thumbnail.jpg",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
  }
}

// Function to fetch a single project by ID (legacy)
export async function getProject(id: number): Promise<Project | null> {
  try {
    return await apiFetch<Project>(`/projects/legacy/${id}/`);
  } catch (error) {
    console.error(`Error fetching project ${id}:`, error);
    // Return dummy project data when API fails
    if (id === 10) {
      return {
        id: 10,
        name: "S.S Fabricators & Manufacturers Pvt. Ltd.",
        details: "(Engineers & contractors)",
        quantity: "10000 MT",
        location: "Wardha",
        work: "Manufacturing of M.S. Pipes at SB-04 PDN Project, Lower Wardha Radial Gate Fabrication & Erection.",
        main_image_url: "/images/Projects/%281%29%20%20%20%20SS%20FABRICATIONS/Thumbnail.jpg",
        images: [
          {
            id: 1,
            image: "Thumbnail.jpg",
            image_url: "/images/Projects/%281%29%20%20%20%20SS%20FABRICATIONS/Thumbnail.jpg",
            caption: "S.S Fabricators & Manufacturers Pvt. Ltd. Project",
            order: 1
          }
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } else if (id === 9) {
      return {
        id: 9,
        name: "MAHAGENCO",
        details: "",
        quantity: "11000 MT",
        location: "Koradi- (M.H)",
        work: "3X660 MW TPS Expansion Project (units 8, 9 & 10), CW, ACW Pipe, Fabrication & Erection.",
        main_image_url: "/images/Projects/%28-2%29%20Mahagenco%20-%20Koradi/Thumbnail.png",
        images: [
          {
            id: 1,
            image: "Thumbnail.png",
            image_url: "/images/Projects/%28-2%29%20Mahagenco%20-%20Koradi/Thumbnail.png",
            caption: "MAHAGENCO Project",
            order: 1
          },
          {
            id: 2,
            image: "1.png",
            image_url: "/images/Projects/%28-2%29%20Mahagenco%20-%20Koradi/1.png",
            caption: "MAHAGENCO Project",
            order: 2
          },
          {
            id: 3,
            image: "3.png",
            image_url: "/images/Projects/%28-2%29%20Mahagenco%20-%20Koradi/3.png",
            caption: "MAHAGENCO Project",
            order: 3
          },
          {
            id: 4,
            image: "4.png",
            image_url: "/images/Projects/%28-2%29%20Mahagenco%20-%20Koradi/4.png",
            caption: "MAHAGENCO Project",
            order: 4
          }
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } else if (id === 8) {
      return {
        id: 8,
        name: "Jindal Power Project",
        details: "",
        quantity: "9500 MT",
        location: "Tamnar, Raigarh – C.G.",
        work: "CW and ACW Pipe, Fabrication, Erection, Commissioning & Painting.",
        main_image_url: "/images/Projects/(2)  Jindal Power/01 Thumbnail.jpg",
        images: [
          {
            id: 1,
            image: "01 Thumbnail.jpg",
            image_url: "/images/Projects/(2)  Jindal Power/01 Thumbnail.jpg",
            caption: "Jindal Power Project",
            order: 1
          },
          {
            id: 2,
            image: "02.jpg",
            image_url: "/images/Projects/(2)  Jindal Power/02.jpg",
            caption: "Jindal Power Project",
            order: 2
          },
          {
            id: 3,
            image: "03.jpg",
            image_url: "/images/Projects/(2)  Jindal Power/03.jpg",
            caption: "Jindal Power Project",
            order: 3
          },
          {
            id: 4,
            image: "05.jpg",
            image_url: "/images/Projects/(2)  Jindal Power/05.jpg",
            caption: "Jindal Power Project",
            order: 4
          },
          {
            id: 5,
            image: "06.jpg",
            image_url: "/images/Projects/(2)  Jindal Power/06.jpg",
            caption: "Jindal Power Project",
            order: 5
          },
          {
            id: 6,
            image: "07.jpg",
            image_url: "/images/Projects/(2)  Jindal Power/07.jpg",
            caption: "Jindal Power Project",
            order: 6
          },
          {
            id: 7,
            image: "08.jpg",
            image_url: "/images/Projects/(2)  Jindal Power/08.jpg",
            caption: "Jindal Power Project",
            order: 7
          },
          {
            id: 8,
            image: "09.jpg",
            image_url: "/images/Projects/(2)  Jindal Power/09.jpg",
            caption: "Jindal Power Project",
            order: 8
          }
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } else if (id === 7) {
      return {
        id: 7,
        name: "NTPC",
        details: "",
        quantity: "5400 MT",
        location: "MEJA ALLAHABAD",
        work: "CW System and make-up water system civil works package Stage 1 (2x660 MW). Fabrication, Erection & Painting.",
        main_image_url: "/images/Projects/(3)  NTPC Mejja allahbad/Thumbnail.jpg",
        images: [
          {
            id: 1,
            image: "Thumbnail.jpg",
            image_url: "/images/Projects/(3)  NTPC Mejja allahbad/Thumbnail.jpg",
            caption: "NTPC Project",
            order: 1
          },
          {
            id: 2,
            image: "5868a85a-3662-4744-8ffd-102e32dc3c67.jpg",
            image_url: "/images/Projects/(3)  NTPC Mejja allahbad/5868a85a-3662-4744-8ffd-102e32dc3c67.jpg",
            caption: "NTPC Project",
            order: 2
          },
          {
            id: 3,
            image: "322032e5-2dcc-448b-97dc-8fd807a49f97.jpg",
            image_url: "/images/Projects/(3)  NTPC Mejja allahbad/322032e5-2dcc-448b-97dc-8fd807a49f97.jpg",
            caption: "NTPC Project",
            order: 3
          },
          {
            id: 4,
            image: "29666709-b15b-4e24-8bc5-e51c6e73407e.jpg",
            image_url: "/images/Projects/(3)  NTPC Mejja allahbad/29666709-b15b-4e24-8bc5-e51c6e73407e.jpg",
            caption: "NTPC Project",
            order: 4
          },
          {
            id: 5,
            image: "a1f0f012-76ca-4eb8-8597-e5dba8027b2a.jpg",
            image_url: "/images/Projects/(3)  NTPC Mejja allahbad/a1f0f012-76ca-4eb8-8597-e5dba8027b2a.jpg",
            caption: "NTPC Project",
            order: 5
          },
          {
            id: 6,
            image: "a7158aeb-06bf-4799-8d17-2b9e99f488b4.jpg",
            image_url: "/images/Projects/(3)  NTPC Mejja allahbad/a7158aeb-06bf-4799-8d17-2b9e99f488b4.jpg",
            caption: "NTPC Project",
            order: 6
          },
          {
            id: 7,
            image: "c0b3ac08-5f05-4044-89eb-644f99a8a192.jpg",
            image_url: "/images/Projects/(3)  NTPC Mejja allahbad/c0b3ac08-5f05-4044-89eb-644f99a8a192.jpg",
            caption: "NTPC Project",
            order: 7
          },
          {
            id: 8,
            image: "c02003aa-442b-4f3d-ab46-6221ee88cea8.jpg",
            image_url: "/images/Projects/(3)  NTPC Mejja allahbad/c02003aa-442b-4f3d-ab46-6221ee88cea8.jpg",
            caption: "NTPC Project",
            order: 8
          },
          {
            id: 9,
            image: "d369d10b-e2b0-44bc-aecd-3672c58d2e23.jpg",
            image_url: "/images/Projects/(3)  NTPC Mejja allahbad/d369d10b-e2b0-44bc-aecd-3672c58d2e23.jpg",
            caption: "NTPC Project",
            order: 9
          },
          {
            id: 10,
            image: "de9b771b-132b-412e-a8f1-bfb17605551c.jpg",
            image_url: "/images/Projects/(3)  NTPC Mejja allahbad/de9b771b-132b-412e-a8f1-bfb17605551c.jpg",
            caption: "NTPC Project",
            order: 10
          },
          {
            id: 11,
            image: "e5e9cd84-c710-4039-9f84-7933af1fc32b.jpg",
            image_url: "/images/Projects/(3)  NTPC Mejja allahbad/e5e9cd84-c710-4039-9f84-7933af1fc32b.jpg",
            caption: "NTPC Project",
            order: 11
          },
          {
            id: 12,
            image: "edd5a1d0-495a-442f-98a7-49701796c04d.jpg",
            image_url: "/images/Projects/(3)  NTPC Mejja allahbad/edd5a1d0-495a-442f-98a7-49701796c04d.jpg",
            caption: "NTPC Project",
            order: 12
          },
          {
            id: 13,
            image: "f30387e3-5a58-4269-a87f-d63cdd2baab4.jpg",
            image_url: "/images/Projects/(3)  NTPC Mejja allahbad/f30387e3-5a58-4269-a87f-d63cdd2baab4.jpg",
            caption: "NTPC Project",
            order: 13
          },
          {
            id: 14,
            image: "fef7c420-ef92-45ab-ad04-7c39621bc81d.jpg",
            image_url: "/images/Projects/(3)  NTPC Mejja allahbad/fef7c420-ef92-45ab-ad04-7c39621bc81d.jpg",
            caption: "NTPC Project",
            order: 14
          }
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } else if (id === 6) {
      return {
        id: 6,
        name: "DRN Infrastructure Engineers & Contractors",
        details: "",
        quantity: "40 KM",
        location: "Jamkhandi (KA)",
        work: "TBLIS LIFT IRRIGATION PROJECT. Cross Country Pipeline 3500 Dia to 2700 Dia Erection",
        main_image_url: "/images/Projects/(4). DRN/Thubnail.jpg",
        images: [
          {
            id: 1,
            image: "Thubnail.jpg",
            image_url: "/images/Projects/(4). DRN/Thubnail.jpg",
            caption: "DRN Infrastructure Engineers & Contractors Project",
            order: 1
          },
          {
            id: 2,
            image: "0b0a7086-670d-47dc-8601-51b5b66b8858.jpg",
            image_url: "/images/Projects/(4). DRN/0b0a7086-670d-47dc-8601-51b5b66b8858.jpg",
            caption: "DRN Infrastructure Engineers & Contractors Project",
            order: 2
          },
          {
            id: 3,
            image: "1b9401a1-e2a4-4511-9f02-b78d1fec602f.jpg",
            image_url: "/images/Projects/(4). DRN/1b9401a1-e2a4-4511-9f02-b78d1fec602f.jpg",
            caption: "DRN Infrastructure Engineers & Contractors Project",
            order: 3
          },
          {
            id: 4,
            image: "1f453151-9c68-492d-b6f7-9f8ad6354cb2.jpg",
            image_url: "/images/Projects/(4). DRN/1f453151-9c68-492d-b6f7-9f8ad6354cb2.jpg",
            caption: "DRN Infrastructure Engineers & Contractors Project",
            order: 4
          },
          {
            id: 5,
            image: "2ee0b940-63ad-499b-b75a-f775658b469f.jpg",
            image_url: "/images/Projects/(4). DRN/2ee0b940-63ad-499b-b75a-f775658b469f.jpg",
            caption: "DRN Infrastructure Engineers & Contractors Project",
            order: 5
          },
          {
            id: 6,
            image: "7ec456b3-0c46-4367-9b3f-b4a57b68cf04.jpg",
            image_url: "/images/Projects/(4). DRN/7ec456b3-0c46-4367-9b3f-b4a57b68cf04.jpg",
            caption: "DRN Infrastructure Engineers & Contractors Project",
            order: 6
          },
          {
            id: 7,
            image: "53efe13a-2205-4171-ac90-f05c66caeb03.jpg",
            image_url: "/images/Projects/(4). DRN/53efe13a-2205-4171-ac90-f05c66caeb03.jpg",
            caption: "DRN Infrastructure Engineers & Contractors Project",
            order: 7
          },
          {
            id: 8,
            image: "216ec507-7fe3-48c3-8597-33e2855baf12.jpg",
            image_url: "/images/Projects/(4). DRN/216ec507-7fe3-48c3-8597-33e2855baf12.jpg",
            caption: "DRN Infrastructure Engineers & Contractors Project",
            order: 8
          },
          {
            id: 9,
            image: "4945b450-c490-4c0f-9027-fa071b700952.jpg",
            image_url: "/images/Projects/(4). DRN/4945b450-c490-4c0f-9027-fa071b700952.jpg",
            caption: "DRN Infrastructure Engineers & Contractors Project",
            order: 9
          },
          {
            id: 10,
            image: "b4ddad8c-cab3-48d8-b3d4-5a8098cf4af4.jpg",
            image_url: "/images/Projects/(4). DRN/b4ddad8c-cab3-48d8-b3d4-5a8098cf4af4.jpg",
            caption: "DRN Infrastructure Engineers & Contractors Project",
            order: 10
          },
          {
            id: 11,
            image: "d146c4d6-137b-4303-8fa7-c9c7c2334420.jpg",
            image_url: "/images/Projects/(4). DRN/d146c4d6-137b-4303-8fa7-c9c7c2334420.jpg",
            caption: "DRN Infrastructure Engineers & Contractors Project",
            order: 11
          },
          {
            id: 12,
            image: "f25a32d7-9559-4377-b059-d477ec7c8a15.jpg",
            image_url: "/images/Projects/(4). DRN/f25a32d7-9559-4377-b059-d477ec7c8a15.jpg",
            caption: "DRN Infrastructure Engineers & Contractors Project",
            order: 12
          },
          {
            id: 13,
            image: "fdaf058d-db8f-4eca-bff9-5826ebd2e5ce.jpg",
            image_url: "/images/Projects/(4). DRN/fdaf058d-db8f-4eca-bff9-5826ebd2e5ce.jpg",
            caption: "DRN Infrastructure Engineers & Contractors Project",
            order: 13
          }
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } else if (id === 5) {
      return {
        id: 5,
        name: "ADANI INFRA. (INDIA) LIMITED.",
        details: "",
        quantity: "18 KM",
        location: "Village Motia, Dist. Godda J.H. PROJECT",
        work: "2 X 800 MW Ultra Supercritical Coal-based Thermal Power Project Intake Pipeline, Raw Water Pipeline 1350 Dia, Fabrication, Erection & Painting.",
        main_image_url: "/images/Projects/(5)  Adani Infra godda/Thumbnail.jpg",
        images: [
          {
            id: 1,
            image: "Thumbnail.jpg",
            image_url: "/images/Projects/(5)  Adani Infra godda/Thumbnail.jpg",
            caption: "ADANI INFRA. (INDIA) LIMITED. Project",
            order: 1
          },
          {
            id: 2,
            image: "WhatsApp Image 2025-10-21 at 04.31.20_3046afe1.jpg",
            image_url: "/images/Projects/(5)  Adani Infra godda/WhatsApp Image 2025-10-21 at 04.31.20_3046afe1.jpg",
            caption: "ADANI INFRA. (INDIA) LIMITED. Project",
            order: 2
          },
          {
            id: 3,
            image: "WhatsApp Image 2025-10-21 at 04.31.20_f4b4834e.jpg",
            image_url: "/images/Projects/(5)  Adani Infra godda/WhatsApp Image 2025-10-21 at 04.31.20_f4b4834e.jpg",
            caption: "ADANI INFRA. (INDIA) LIMITED. Project",
            order: 3
          },
          {
            id: 4,
            image: "WhatsApp Image 2025-10-21 at 04.31.21_88888c89.jpg",
            image_url: "/images/Projects/(5)  Adani Infra godda/WhatsApp Image 2025-10-21 at 04.31.21_88888c89.jpg",
            caption: "ADANI INFRA. (INDIA) LIMITED. Project",
            order: 4
          },
          {
            id: 5,
            image: "WhatsApp Image 2025-10-21 at 04.31.21_a1b91766.jpg",
            image_url: "/images/Projects/(5)  Adani Infra godda/WhatsApp Image 2025-10-21 at 04.31.21_a1b91766.jpg",
            caption: "ADANI INFRA. (INDIA) LIMITED. Project",
            order: 5
          },
          {
            id: 6,
            image: "WhatsApp Image 2025-10-21 at 04.31.21_f70e0198.jpg",
            image_url: "/images/Projects/(5)  Adani Infra godda/WhatsApp Image 2025-10-21 at 04.31.21_f70e0198.jpg",
            caption: "ADANI INFRA. (INDIA) LIMITED. Project",
            order: 6
          },
          {
            id: 7,
            image: "WhatsApp Image 2025-10-21 at 04.31.22_34a231ac.jpg",
            image_url: "/images/Projects/(5)  Adani Infra godda/WhatsApp Image 2025-10-21 at 04.31.22_34a231ac.jpg",
            caption: "ADANI INFRA. (INDIA) LIMITED. Project",
            order: 7
          },
          {
            id: 8,
            image: "WhatsApp Image 2025-10-21 at 04.31.22_caa7c549.jpg",
            image_url: "/images/Projects/(5)  Adani Infra godda/WhatsApp Image 2025-10-21 at 04.31.22_caa7c549.jpg",
            caption: "ADANI INFRA. (INDIA) LIMITED. Project",
            order: 8
          },
          {
            id: 9,
            image: "WhatsApp Image 2025-10-21 at 04.31.22_e50ce31d.jpg",
            image_url: "/images/Projects/(5)  Adani Infra godda/WhatsApp Image 2025-10-21 at 04.31.22_e50ce31d.jpg",
            caption: "ADANI INFRA. (INDIA) LIMITED. Project",
            order: 9
          }
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } else if (id === 4) {
      return {
        id: 4,
        name: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED",
        details: "",
        quantity: "17000 MT",
        location: "NANDAWADAGI DRIP IRRIGATION SCHEME PACKAGE - 1 (BLOCK - A , 12000 HA) PROJECT",
        work: "Pipe Fabrication 3000 dia.",
        main_image_url: "/images/Projects/(6)  VITAL ENVIRONMENT INDIA PRIVATE LIMITED/Thumbnail.jpg",
        images: [
          {
            id: 1,
            image: "Thumbnail.jpg",
            image_url: "/images/Projects/(6)  VITAL ENVIRONMENT INDIA PRIVATE LIMITED/Thumbnail.jpg",
            caption: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED Project",
            order: 1
          },
          {
            id: 2,
            image: "0cbeb934-344b-440a-89d2-dd7aa6574a9e.jpg",
            image_url: "/images/Projects/(6)  VITAL ENVIRONMENT INDIA PRIVATE LIMITED/0cbeb934-344b-440a-89d2-dd7aa6574a9e.jpg",
            caption: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED Project",
            order: 2
          },
          {
            id: 3,
            image: "3e623156-eb2c-44e0-9ff8-6a81e3152798.jpg",
            image_url: "/images/Projects/(6)  VITAL ENVIRONMENT INDIA PRIVATE LIMITED/3e623156-eb2c-44e0-9ff8-6a81e3152798.jpg",
            caption: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED Project",
            order: 3
          },
          {
            id: 4,
            image: "7aa69298-8865-41ef-a2c8-aad79f328c55.jpg",
            image_url: "/images/Projects/(6)  VITAL ENVIRONMENT INDIA PRIVATE LIMITED/7aa69298-8865-41ef-a2c8-aad79f328c55.jpg",
            caption: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED Project",
            order: 4
          },
          {
            id: 5,
            image: "54a6c950-87df-4954-acb0-db4f617f89d0.jpg",
            image_url: "/images/Projects/(6)  VITAL ENVIRONMENT INDIA PRIVATE LIMITED/54a6c950-87df-4954-acb0-db4f617f89d0.jpg",
            caption: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED Project",
            order: 5
          },
          {
            id: 6,
            image: "83dc8cbe-3f48-448d-a332-ec9157c22c69.jpg",
            image_url: "/images/Projects/(6)  VITAL ENVIRONMENT INDIA PRIVATE LIMITED/83dc8cbe-3f48-448d-a332-ec9157c22c69.jpg",
            caption: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED Project",
            order: 6
          },
          {
            id: 7,
            image: "86a84b74-500d-4c9b-ac7f-5cc36ef2acb1.jpg",
            image_url: "/images/Projects/(6)  VITAL ENVIRONMENT INDIA PRIVATE LIMITED/86a84b74-500d-4c9b-ac7f-5cc36ef2acb1.jpg",
            caption: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED Project",
            order: 7
          },
          {
            id: 8,
            image: "288c3cf9-179c-425e-aaaa-7b4b9cdf23d4.jpg",
            image_url: "/images/Projects/(6)  VITAL ENVIRONMENT INDIA PRIVATE LIMITED/288c3cf9-179c-425e-aaaa-7b4b9cdf23d4.jpg",
            caption: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED Project",
            order: 8
          },
          {
            id: 9,
            image: "346f6d01-d034-4f44-84ac-1bf99fe0395e.jpg",
            image_url: "/images/Projects/(6)  VITAL ENVIRONMENT INDIA PRIVATE LIMITED/346f6d01-d034-4f44-84ac-1bf99fe0395e.jpg",
            caption: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED Project",
            order: 9
          },
          {
            id: 10,
            image: "2376c358-8b89-469c-a500-1ffd3c01418d.jpg",
            image_url: "/images/Projects/(6)  VITAL ENVIRONMENT INDIA PRIVATE LIMITED/2376c358-8b89-469c-a500-1ffd3c01418d.jpg",
            caption: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED Project",
            order: 10
          },
          {
            id: 11,
            image: "488122e0-81f1-4328-ac5b-c79a6609ad42.jpg",
            image_url: "/images/Projects/(6)  VITAL ENVIRONMENT INDIA PRIVATE LIMITED/488122e0-81f1-4328-ac5b-c79a6609ad42.jpg",
            caption: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED Project",
            order: 11
          },
          {
            id: 12,
            image: "ad1b98ef-4115-4109-9ed3-837795cde9ca.jpg",
            image_url: "/images/Projects/(6)  VITAL ENVIRONMENT INDIA PRIVATE LIMITED/ad1b98ef-4115-4109-9ed3-837795cde9ca.jpg",
            caption: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED Project",
            order: 12
          },
          {
            id: 13,
            image: "cb8125db-f71e-4b89-8f41-be6cd45680a9.jpg",
            image_url: "/images/Projects/(6)  VITAL ENVIRONMENT INDIA PRIVATE LIMITED/cb8125db-f71e-4b89-8f41-be6cd45680a9.jpg",
            caption: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED Project",
            order: 13
          },
          {
            id: 14,
            image: "d84b0b46-4ac7-4a56-8ba8-fb5f2c743711.jpg",
            image_url: "/images/Projects/(6)  VITAL ENVIRONMENT INDIA PRIVATE LIMITED/d84b0b46-4ac7-4a56-8ba8-fb5f2c743711.jpg",
            caption: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED Project",
            order: 14
          },
          {
            id: 15,
            image: "d4655dd7-02df-46ca-b477-30af004661a0.jpg",
            image_url: "/images/Projects/%286%29%20%20VITAL%20ENVIRONMENT%20INDIA%20PRIVATE%20LIMITED/d4655dd7-02df-46ca-b477-30af004661a0.jpg",
            caption: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED Project",
            order: 15
          },
          {
            id: 16,
            image: "dd10300f-0b52-4641-8eeb-e993d33fe9f0.jpg",
            image_url: "/images/Projects/%286%29%20%20VITAL%20ENVIRONMENT%20INDIA%20PRIVATE%20LIMITED/dd10300f-0b52-4641-8eeb-e993d33fe9f0.jpg",
            caption: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED Project",
            order: 16
          },
          {
            id: 17,
            image: "e7f34280-a4f6-4eab-96e2-32b44b1c237f.jpg",
            image_url: "/images/Projects/%286%29%20%20VITAL%20ENVIRONMENT%20INDIA%20PRIVATE%20LIMITED/e7f34280-a4f6-4eab-96e2-32b44b1c237f.jpg",
            caption: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED Project",
            order: 17
          },
          {
            id: 18,
            image: "ef4f41bb-6c94-4250-8b38-3842e41f7f47.jpg",
            image_url: "/images/Projects/%286%29%20%20VITAL%20ENVIRONMENT%20INDIA%20PRIVATE%20LIMITED/ef4f41bb-6c94-4250-8b38-3842e41f7f47.jpg",
            caption: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED Project",
            order: 18
          },
          {
            id: 19,
            image: "fb2ef9ab-a78d-45c2-ba8e-48b86d48af1e.jpg",
            image_url: "/images/Projects/%286%29%20%20VITAL%20ENVIRONMENT%20INDIA%20PRIVATE%20LIMITED/fb2ef9ab-a78d-45c2-ba8e-48b86d48af1e.jpg",
            caption: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED Project",
            order: 19
          }
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } else if (id === 3) {
      return {
        id: 3,
        name: "AFCONS INFRASTRUCTURE LIMITED",
        details: "",
        quantity: "6400 MT",
        location: "Maldives",
        work: "AFC | 5752 | SC - Pile Liner And TAB Superstructure Fabrication",
        main_image_url: "/images/Projects/%287%29%20%20AFCONS%20INFRSTRUCTURE%20LTD%20Finalized/01%20Thumbnail.jpg",
        images: [
          {
            id: 1,
            image: "01 Thumbnail.jpg",
            image_url: "/images/Projects/%287%29%20%20AFCONS%20INFRSTRUCTURE%20LTD%20Finalized/01%20Thumbnail.jpg",
            caption: "AFCONS INFRASTRUCTURE LIMITED Project",
            order: 1
          },
          {
            id: 2,
            image: "IMG_20220911_122358.jpg",
            image_url: "/images/Projects/%287%29%20%20AFCONS%20INFRSTRUCTURE%20LTD%20Finalized/IMG_20220911_122358.jpg",
            caption: "AFCONS INFRASTRUCTURE LIMITED Project",
            order: 2
          },
          {
            id: 3,
            image: "IMG_20220912_172011.jpg",
            image_url: "/images/Projects/%287%29%20%20AFCONS%20INFRSTRUCTURE%20LTD%20Finalized/IMG_20220912_172011.jpg",
            caption: "AFCONS INFRASTRUCTURE LIMITED Project",
            order: 3
          },
          {
            id: 4,
            image: "IMG_20220912_172029.jpg",
            image_url: "/images/Projects/%287%29%20%20AFCONS%20INFRSTRUCTURE%20LTD%20Finalized/IMG_20220912_172029.jpg",
            caption: "AFCONS INFRASTRUCTURE LIMITED Project",
            order: 4
          },
          {
            id: 5,
            image: "IMG_20220912_172035.jpg",
            image_url: "/images/Projects/%287%29%20%20AFCONS%20INFRSTRUCTURE%20LTD%20Finalized/IMG_20220912_172035.jpg",
            caption: "AFCONS INFRASTRUCTURE LIMITED Project",
            order: 5
          },
          {
            id: 6,
            image: "IMG_20220913_171208.jpg",
            image_url: "/images/Projects/%287%29%20%20AFCONS%20INFRSTRUCTURE%20LTD%20Finalized/IMG_20220913_171208.jpg",
            caption: "AFCONS INFRASTRUCTURE LIMITED Project",
            order: 6
          },
          {
            id: 7,
            image: "IMG_20220914_182326.jpg",
            image_url: "/images/Projects/%287%29%20%20AFCONS%20INFRSTRUCTURE%20LTD%20Finalized/IMG_20220914_182326.jpg",
            caption: "AFCONS INFRASTRUCTURE LIMITED Project",
            order: 7
          },
          {
            id: 8,
            image: "IMG_20220915_083812.jpg",
            image_url: "/images/Projects/%287%29%20%20AFCONS%20INFRSTRUCTURE%20LTD%20Finalized/IMG_20220915_083812.jpg",
            caption: "AFCONS INFRASTRUCTURE LIMITED Project",
            order: 8
          },
          {
            id: 9,
            image: "IMG_20220915_153518.jpg",
            image_url: "/images/Projects/%287%29%20%20AFCONS%20INFRSTRUCTURE%20LTD%20Finalized/IMG_20220915_153518.jpg",
            caption: "AFCONS INFRASTRUCTURE LIMITED Project",
            order: 9
          },
          {
            id: 10,
            image: "IMG_20220920_162804.jpg",
            image_url: "/images/Projects/%287%29%20%20AFCONS%20INFRSTRUCTURE%20LTD%20Finalized/IMG_20220920_162804.jpg",
            caption: "AFCONS INFRASTRUCTURE LIMITED Project",
            order: 10
          },
          {
            id: 11,
            image: "IMG_20220922_081719.jpg",
            image_url: "/images/Projects/%287%29%20%20AFCONS%20INFRSTRUCTURE%20LTD%20Finalized/IMG_20220922_081719.jpg",
            caption: "AFCONS INFRASTRUCTURE LIMITED Project",
            order: 11
          },
          {
            id: 12,
            image: "IMG_20220925_155318.jpg",
            image_url: "/images/Projects/%287%29%20%20AFCONS%20INFRSTRUCTURE%20LTD%20Finalized/IMG_20220925_155318.jpg",
            caption: "AFCONS INFRASTRUCTURE LIMITED Project",
            order: 12
          },
          {
            id: 13,
            image: "IMG_20220925_163410.jpg",
            image_url: "/images/Projects/%287%29%20%20AFCONS%20INFRSTRUCTURE%20LTD%20Finalized/IMG_20220925_163410.jpg",
            caption: "AFCONS INFRASTRUCTURE LIMITED Project",
            order: 13
          },
          {
            id: 14,
            image: "IMG_20220927_081410.jpg",
            image_url: "/images/Projects/%287%29%20%20AFCONS%20INFRSTRUCTURE%20LTD%20Finalized/IMG_20220927_081410.jpg",
            caption: "AFCONS INFRASTRUCTURE LIMITED Project",
            order: 14
          },
          {
            id: 15,
            image: "IMG_20221002_165930.jpg",
            image_url: "/images/Projects/%287%29%20%20AFCONS%20INFRSTRUCTURE%20LTD%20Finalized/IMG_20221002_165930.jpg",
            caption: "AFCONS INFRASTRUCTURE LIMITED Project",
            order: 15
          },
          {
            id: 16,
            image: "IMG_20221004_190421.jpg",
            image_url: "/images/Projects/%287%29%20%20AFCONS%20INFRSTRUCTURE%20LTD%20Finalized/IMG_20221004_190421.jpg",
            caption: "AFCONS INFRASTRUCTURE LIMITED Project",
            order: 16
          },
          {
            id: 17,
            image: "IMG_20221006_165254.jpg",
            image_url: "/images/Projects/%287%29%20%20AFCONS%20INFRSTRUCTURE%20LTD%20Finalized/IMG_20221006_165254.jpg",
            caption: "AFCONS INFRASTRUCTURE LIMITED Project",
            order: 17
          },
          {
            id: 18,
            image: "IMG_20221007_075150.jpg",
            image_url: "/images/Projects/%287%29%20%20AFCONS%20INFRSTRUCTURE%20LTD%20Finalized/IMG_20221007_075150.jpg",
            caption: "AFCONS INFRASTRUCTURE LIMITED Project",
            order: 18
          },
          {
            id: 19,
            image: "IMG_20221009_084156.jpg",
            image_url: "/images/Projects/%287%29%20%20AFCONS%20INFRSTRUCTURE%20LTD%20Finalized/IMG_20221009_084156.jpg",
            caption: "AFCONS INFRASTRUCTURE LIMITED Project",
            order: 19
          },
          {
            id: 20,
            image: "IMG_20221011_082852.jpg",
            image_url: "/images/Projects/%287%29%20%20AFCONS%20INFRSTRUCTURE%20LTD%20Finalized/IMG_20221011_082852.jpg",
            caption: "AFCONS INFRASTRUCTURE LIMITED Project",
            order: 20
          }
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } else if (id === 2) {
      return {
        id: 2,
        name: "Adani Power Limited",
        details: "",
        quantity: "11000 MT",
        location: "Raipur",
        work: "CW, ACW and RW Piping along with fittings, valves and accessories for 2x800 MW (Phase-II) Ultra Super Critical Thermal Power Project, Fabrication, Erection & Painting",
        main_image_url: "/images/Projects/%288%29%20Adani%20Power%20Raipur/Thumbnail.jpg",
        images: [
          {
            id: 1,
            image: "003.jpg",
            image_url: "/images/Projects/%288%29%20Adani%20Power%20Raipur/003.jpg",
            caption: "Adani Power Raipur Project",
            order: 1
          },
          {
            id: 2,
            image: "asdasfasdfv_.jpg",
            image_url: "/images/Projects/%288%29%20Adani%20Power%20Raipur/asdasfasdfv_.jpg",
            caption: "Adani Power Raipur Project",
            order: 2
          },
          {
            id: 3,
            image: "gbxdcfh.jpg",
            image_url: "/images/Projects/%288%29%20Adani%20Power%20Raipur/gbxdcfh.jpg",
            caption: "Adani Power Raipur Project",
            order: 3
          },
          {
            id: 4,
            image: "last.png",
            image_url: "/images/Projects/%288%29%20Adani%20Power%20Raipur/last.png",
            caption: "Adani Power Raipur Project",
            order: 4
          },
          {
            id: 5,
            image: "Thumbnail.jpg",
            image_url: "/images/Projects/%288%29%20Adani%20Power%20Raipur/Thumbnail.jpg",
            caption: "Adani Power Raipur Project",
            order: 5
          },
          {
            id: 6,
            image: "WhatsApp Image 2025-10-21 at 04.09.50_4d44d77a.jpg",
            image_url: "/images/Projects/%288%29%20Adani%20Power%20Raipur/WhatsApp%20Image%202025-10-21%20at%2004.09.50_4d44d77a.jpg",
            caption: "Adani Power Raipur Project",
            order: 6
          },
          {
            id: 7,
            image: "WhatsApp Image 2025-10-21 at 04.09.50_12857087.jpg",
            image_url: "/images/Projects/%288%29%20Adani%20Power%20Raipur/WhatsApp%20Image%202025-10-21%20at%2004.09.50_12857087.jpg",
            caption: "Adani Power Raipur Project",
            order: 7
          },
          {
            id: 8,
            image: "WhatsApp Image 2025-10-21 at 04.09.50_b7734269.jpg",
            image_url: "/images/Projects/%288%29%20Adani%20Power%20Raipur/WhatsApp%20Image%202025-10-21%20at%2004.09.50_b7734269.jpg",
            caption: "Adani Power Raipur Project",
            order: 8
          },
          {
            id: 9,
            image: "WhatsApp Image 2025-10-21 at 04.09.51_7df47f0c.jpg",
            image_url: "/images/Projects/%288%29%20Adani%20Power%20Raipur/WhatsApp%20Image%202025-10-21%20at%2004.09.51_7df47f0c.jpg",
            caption: "Adani Power Raipur Project",
            order: 9
          },
          {
            id: 10,
            image: "WhatsApp Image 2025-10-21 at 04.09.51_8fcfd91b.jpg",
            image_url: "/images/Projects/%288%29%20Adani%20Power%20Raipur/WhatsApp%20Image%202025-10-21%20at%2004.09.51_8fcfd91b.jpg",
            caption: "Adani Power Raipur Project",
            order: 10
          },
          {
            id: 11,
            image: "WhatsApp Image 2025-10-21 at 04.09.51_da2a2b14.jpg",
            image_url: "/images/Projects/%288%29%20Adani%20Power%20Raipur/WhatsApp%20Image%202025-10-21%20at%2004.09.51_da2a2b14.jpg",
            caption: "Adani Power Raipur Project",
            order: 11
          },
          {
            id: 12,
            image: "WhatsApp Image 2025-10-29 at 22.20.17_cf8af055.jpg",
            image_url: "/images/Projects/%288%29%20Adani%20Power%20Raipur/WhatsApp%20Image%202025-10-29%20at%2022.20.17_cf8af055.jpg",
            caption: "Adani Power Raipur Project",
            order: 12
          },
          {
            id: 13,
            image: "WhatsApp Image 2025-10-29 at 22.20.19_0d1849fb.jpg",
            image_url: "/images/Projects/%288%29%20Adani%20Power%20Raipur/WhatsApp%20Image%202025-10-29%20at%2022.20.19_0d1849fb.jpg",
            caption: "Adani Power Raipur Project",
            order: 13
          },
          {
            id: 14,
            image: "WhatsApp Image 2025-10-29 at 22.20.19_65d44760.jpg",
            image_url: "/images/Projects/%288%29%20Adani%20Power%20Raipur/WhatsApp%20Image%202025-10-29%20at%2022.20.19_65d44760.jpg",
            caption: "Adani Power Raipur Project",
            order: 14
          },
          {
            id: 15,
            image: "WhatsApp Image 2025-10-29 at 22.20.20_6bffe6bb.jpg",
            image_url: "/images/Projects/%288%29%20Adani%20Power%20Raipur/WhatsApp%20Image%202025-10-29%20at%2022.20.20_6bffe6bb.jpg",
            caption: "Adani Power Raipur Project",
            order: 15
          },
          {
            id: 16,
            image: "WhatsApp Image 2025-10-29 at 22.20.20_6696fd13.jpg",
            image_url: "/images/Projects/%288%29%20Adani%20Power%20Raipur/WhatsApp%20Image%202025-10-29%20at%2022.20.20_6696fd13.jpg",
            caption: "Adani Power Raipur Project",
            order: 16
          },
          {
            id: 17,
            image: "WhatsApp Image 2025-10-29 at 22.20.21_304c3075.jpg",
            image_url: "/images/Projects/%288%29%20Adani%20Power%20Raipur/WhatsApp%20Image%202025-10-29%20at%2022.20.21_304c3075.jpg",
            caption: "Adani Power Raipur Project",
            order: 17
          },
          {
            id: 18,
            image: "WhatsApp Image 2025-10-29 at 22.20.22_c8c195e0.jpg",
            image_url: "/images/Projects/%288%29%20Adani%20Power%20Raipur/WhatsApp%20Image%202025-10-29%20at%2022.20.22_c8c195e0.jpg",
            caption: "Adani Power Raipur Project",
            order: 18
          },
          {
            id: 19,
            image: "WhatsApp Image 2025-10-29 at 22.20.23_df039d3c.jpg",
            image_url: "/images/Projects/%288%29%20Adani%20Power%20Raipur/WhatsApp%20Image%202025-10-29%20at%2022.20.23_df039d3c.jpg",
            caption: "Adani Power Raipur Project",
            order: 19
          },
          {
            id: 20,
            image: "WhatsApp Image 2025-10-29 at 22.20.23_ecb9dfee.jpg",
            image_url: "/images/Projects/%288%29%20Adani%20Power%20Raipur/WhatsApp%20Image%202025-10-29%20at%2022.20.23_ecb9dfee.jpg",
            caption: "Adani Power Raipur Project",
            order: 20
          },
          {
            id: 21,
            image: "WhatsApp Image 2025-10-29 at 22.20.24_5c2a9c34.jpg",
            image_url: "/images/Projects/%288%29%20Adani%20Power%20Raipur/WhatsApp%20Image%202025-10-29%20at%2022.20.24_5c2a9c34.jpg",
            caption: "Adani Power Raipur Project",
            order: 21
          }
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } else if (id === 1) {
      return {
        id: 1,
        name: "Adani Power Limited",
        details: "",
        quantity: "6000 MT",
        location: "Mirzapur, Uttar Pradesh",
        work: "CW, ACW, RW System of 2x800 MW Power Plant, Fabrication, Erection & Painting.",
        main_image_url: "/images/Projects/%289%29.%20Adani%20Power%20Mirzapur/Thumbnail.jpg",
        images: [
          {
            id: 1,
            image: "1.jpeg",
            image_url: "/images/Projects/(9). Adani Power Mirzapur/1.jpeg",
            caption: "Adani Power Mirzapur Project",
            order: 1
          },
          {
            id: 2,
            image: "2.png",
            image_url: "/images/Projects/(9). Adani Power Mirzapur/2.png",
            caption: "Adani Power Mirzapur Project",
            order: 2
          },
          {
            id: 3,
            image: "3.png",
            image_url: "/images/Projects/(9). Adani Power Mirzapur/3.png",
            caption: "Adani Power Mirzapur Project",
            order: 3
          },
          {
            id: 4,
            image: "75cf43d8-3a50-42ef-9a7e-8c8c8464df83.jpg",
            image_url: "/images/Projects/(9). Adani Power Mirzapur/75cf43d8-3a50-42ef-9a7e-8c8c8464df83.jpg",
            caption: "Adani Power Mirzapur Project",
            order: 4
          },
          {
            id: 5,
            image: "ec771527-f5f7-4e02-9bb5-24637eedba62.jpg",
            image_url: "/images/Projects/(9). Adani Power Mirzapur/ec771527-f5f7-4e02-9bb5-24637eedba62.jpg",
            caption: "Adani Power Mirzapur Project",
            order: 5
          },
          {
            id: 6,
            image: "Thumbnail.jpg",
            image_url: "/images/Projects/(9). Adani Power Mirzapur/Thumbnail.jpg",
            caption: "Adani Power Mirzapur Project",
            order: 6
          },
          {
            id: 7,
            image: "WhatsApp Image 2025-12-24 at 12.59.39--.jpeg",
            image_url: "/images/Projects/(9). Adani Power Mirzapur/WhatsApp Image 2025-12-24 at 12.59.39--.jpeg",
            caption: "Adani Power Mirzapur Project",
            order: 7
          },
          {
            id: 8,
            image: "WhatsApp Image 2025-12-24 at 12.59.39-.jpeg",
            image_url: "/images/Projects/(9). Adani Power Mirzapur/WhatsApp Image 2025-12-24 at 12.59.39-.jpeg",
            caption: "Adani Power Mirzapur Project",
            order: 8
          },
          {
            id: 9,
            image: "WhatsApp Image 2025-12-24 at 13.00.37.jpeg",
            image_url: "/images/Projects/(9). Adani Power Mirzapur/WhatsApp Image 2025-12-24 at 13.00.37.jpeg",
            caption: "Adani Power Mirzapur Project",
            order: 9
          }
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    }
    return null;
  }
}

// Function to fetch a single live project by ID
export async function getLiveProject(id: number): Promise<LiveProject | null> {
  try {
    return await apiFetch<LiveProject>(`/projects/live/${id}/`);
  } catch (error) {
    console.error(`Error fetching live project ${id}:`, error);
    // Return dummy live project data when API fails
    if (id === 10) {
      return {
        id: 10,
        name: "S.S Fabricators & Manufacturers Pvt. Ltd.",
        details: "(Engineers & contractors)",
        quantity: "10000 MT",
        location: "Wardha",
        image_url: "/images/Projects/%281%29%20%20%20%20SS%20FABRICATIONS/Thumbnail.jpg",
        status: "In Progress",
        category: "Manufacturing",
        year: "2025",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } else if (id === 9) {
      return {
        id: 9,
        name: "MAHAGENCO",
        details: "",
        quantity: "11000 MT",
        location: "Koradi- (M.H)",
        image_url: "/images/Projects/%28-2%29%20Mahagenco%20-%20Koradi/Thumbnail.png",
        status: "In Progress",
        category: "Power Plant",
        year: "2025",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } else if (id === 8) {
      return {
        id: 8,
        name: "Jindal Power Project",
        details: "",
        quantity: "9500 MT",
        location: "Tamnar, Raigarh – C.G.",
        image_url: "/images/Projects/(2)  Jindal Power/01 Thumbnail.jpg",
        status: "In Progress",
        category: "Power Plant",
        year: "2025",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } else if (id === 7) {
      return {
        id: 7,
        name: "NTPC",
        details: "",
        quantity: "5400 MT",
        location: "MEJA ALLAHABAD",
        image_url: "/images/Projects/(3)  NTPC Mejja allahbad/Thumbnail.jpg",
        status: "In Progress",
        category: "Power Plant",
        year: "2025",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } else if (id === 6) {
      return {
        id: 6,
        name: "DRN Infrastructure Engineers & Contractors",
        details: "",
        quantity: "40 KM",
        location: "Jamkhandi (KA)",
        image_url: "/images/Projects/(4). DRN/Thubnail.jpg",
        status: "In Progress",
        category: "Irrigation",
        year: "2025",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } else if (id === 5) {
      return {
        id: 5,
        name: "ADANI INFRA. (INDIA) LIMITED.",
        details: "",
        quantity: "18 KM",
        location: "Village Motia, Dist. Godda J.H. PROJECT",
        image_url: "/images/Projects/(5)  Adani Infra godda/Thumbnail.jpg",
        status: "In Progress",
        category: "Power Plant",
        year: "2025",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } else if (id === 4) {
      return {
        id: 4,
        name: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED",
        details: "",
        quantity: "17000 MT",
        location: "NANDAWADAGI DRIP IRRIGATION SCHEME PACKAGE - 1 (BLOCK - A , 12000 HA) PROJECT",
        image_url: "/images/Projects/(6)  VITAL ENVIRONMENT INDIA PRIVATE LIMITED/Thumbnail.jpg",
        status: "In Progress",
        category: "Irrigation",
        year: "2025",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } else if (id === 3) {
      return {
        id: 3,
        name: "AFCONS INFRASTRUCTURE LIMITED",
        details: "",
        quantity: "6400 MT",
        location: "Maldives",
        image_url: "/images/Projects/(7)  AFCONS INFRSTRUCTURE LTD Finalized/01 Thumbnail.jpg",
        status: "In Progress",
        category: "Infrastructure",
        year: "2025",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } else if (id === 2) {
      return {
        id: 2,
        name: "Adani Power Limited",
        details: "",
        quantity: "11000 MT",
        location: "Raipur",
        image_url: "/images/Projects/(8) Adani Power Raipur/Thumbnail.jpg",
        status: "In Progress",
        category: "Power Plant",
        year: "2025",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } else if (id === 1) {
      return {
        id: 1,
        name: "Adani Power Limited",
        details: "",
        quantity: "6000 MT",
        location: "Mirzapur, Uttar Pradesh",
        image_url: "/images/Projects/(9). Adani Power Mirzapur/Thumbnail.jpg",
        status: "In Progress",
        category: "Power Plant",
        year: "2025",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    }
    return null;
  }
}

// Function to fetch a single completed project by ID
export async function getCompletedProject(id: number): Promise<CompletedProject | null> {
  try {
    return await apiFetch<CompletedProject>(`/projects/completed/${id}/`);
  } catch (error) {
    console.error(`Error fetching completed project ${id}:`, error);
    // Return dummy completed project data when API fails
    if (id === 10) {
      return {
        id: 10,
        name: "S.S Fabricators & Manufacturers Pvt. Ltd.",
        details: "(Engineers & contractors)",
        quantity: "10000 MT",
        client: "S.S Fabricators & Manufacturers Pvt. Ltd.",
        completion_date: "2025-12-31",
        image_url: "/images/Projects/%281%29%20%20%20%20SS%20FABRICATIONS/Thumbnail.jpg",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } else if (id === 9) {
      return {
        id: 9,
        name: "MAHAGENCO",
        details: "",
        quantity: "11000 MT",
        client: "MAHAGENCO",
        completion_date: "2025-12-31",
        image_url: "/images/Projects/%28-2%29%20Mahagenco%20-%20Koradi/Thumbnail.png",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } else if (id === 8) {
      return {
        id: 8,
        name: "Jindal Power Project",
        details: "",
        quantity: "9500 MT",
        client: "Jindal Power",
        completion_date: "2025-12-31",
        image_url: "/images/Projects/(2)  Jindal Power/01 Thumbnail.jpg",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } else if (id === 7) {
      return {
        id: 7,
        name: "NTPC",
        details: "",
        quantity: "5400 MT",
        client: "NTPC",
        completion_date: "2025-12-31",
        image_url: "/images/Projects/(3)  NTPC Mejja allahbad/Thumbnail.jpg",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } else if (id === 6) {
      return {
        id: 6,
        name: "DRN Infrastructure Engineers & Contractors",
        details: "",
        quantity: "40 KM",
        client: "DRN Infrastructure Engineers & Contractors",
        completion_date: "2025-12-31",
        image_url: "/images/Projects/(4). DRN/Thubnail.jpg",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } else if (id === 5) {
      return {
        id: 5,
        name: "ADANI INFRA. (INDIA) LIMITED.",
        details: "",
        quantity: "18 KM",
        client: "ADANI INFRA. (INDIA) LIMITED.",
        completion_date: "2025-12-31",
        image_url: "/images/Projects/(5)  Adani Infra godda/Thumbnail.jpg",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } else if (id === 4) {
      return {
        id: 4,
        name: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED",
        details: "",
        quantity: "17000 MT",
        client: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED",
        completion_date: "2025-12-31",
        image_url: "/images/Projects/(6)  VITAL ENVIRONMENT INDIA PRIVATE LIMITED/Thumbnail.jpg",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } else if (id === 3) {
      return {
        id: 3,
        name: "AFCONS INFRASTRUCTURE LIMITED",
        details: "",
        quantity: "6400 MT",
        client: "AFCONS INFRASTRUCTURE LIMITED",
        completion_date: "2025-12-31",
        image_url: "/images/Projects/(7)  AFCONS INFRSTRUCTURE LTD Finalized/01 Thumbnail.jpg",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } else if (id === 2) {
      return {
        id: 2,
        name: "Adani Power Limited",
        details: "",
        quantity: "11000 MT",
        client: "Adani Power Limited",
        completion_date: "2025-12-31",
        image_url: "/images/Projects/%288%29%20Adani%20Power%20Raipur/Thumbnail.jpg",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } else if (id === 1) {
      return {
        id: 1,
        name: "Adani Power Limited",
        details: "",
        quantity: "6000 MT",
        client: "Adani Power Limited",
        completion_date: "2025-12-31",
        image_url: "/images/Projects/%289%29.%20Adani%20Power%20Mirzapur/Thumbnail.jpg",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    }
    return null;
  }
}

// Function to fetch prestigious projects from the Django backend
export async function getPrestigiousProjects(): Promise<PrestigiousProject[]> {
  try {
    console.log('Fetching prestigious projects');
    let allResults: PrestigiousProject[] = [];
    let nextUrl: string | null = '/prestigious-projects/';
    
    // Fetch all pages of results
    while (nextUrl) {
      const response = await apiFetch<PaginatedResponse<PrestigiousProject>>(nextUrl);
      console.log('Prestigious projects response:', response);
      
      if (response.results && response.results.length > 0) {
        allResults = [...allResults, ...response.results];
      }
      
      nextUrl = response.next ? response.next.replace(API_BASE, '') : null;
    }
    
    return allResults;
  } catch (error) {
    console.error('Error fetching prestigious projects:', error);
    
    // Return mock data as fallback
    return [
      {
        id: 1,
        name: "Jindal Power Project",
        details: "CW and ACW Pipe, Fabrication, Erection, Commissioning & Painting.",
        work_details: "Completed the fabrication and installation of cooling water systems for this major power plant.",
        quantity: "9500 MT",
        location: "Tamnar, Raigarh – C.G.",
        client: "Jindal Power Ltd.",
        image_url: "/images/Projects/(2)  Jindal Power/01 Thumbnail.jpg",
        order: 1,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 2,
        name: "NTPC Meja Project",
        details: "CW System and make-up water system civil works package Stage 1 (2x660 MW).",
        work_details: "Fabrication, Erection & Painting of cooling water systems for this major NTPC power plant.",
        quantity: "5400 MT",
        location: "MEJA ALLAHABAD",
        client: "NTPC Limited",
        image_url: "/images/Projects/(3)  NTPC Mejja allahbad/Thumbnail.jpg",
        order: 2,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 3,
        name: "Adani Power Godda Project",
        details: "2 X 800 MW Ultra Supercritical Coal-based Thermal Power Project",
        work_details: "Intake Pipeline, Raw Water Pipeline 1350 Dia, Fabrication, Erection & Painting.",
        quantity: "18 KM",
        location: "Village Motia, Dist. Godda J.H.",
        client: "ADANI INFRA. (INDIA) LIMITED",
        image_url: "/images/Projects/(5)  Adani Infra godda/Thumbnail.jpg",
        order: 3,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
  }
}

// Function to fetch a single prestigious project by ID
export async function getPrestigiousProject(id: number): Promise<PrestigiousProject | null> {
  try {
    return await apiFetch<PrestigiousProject>(`/prestigious-projects/${id}/`);
  } catch (error) {
    console.error(`Error fetching prestigious project ${id}:`, error);
    
    // Return mock data as fallback based on ID
    if (id === 1) {
      return {
        id: 1,
        name: "Jindal Power Project",
        details: "CW and ACW Pipe, Fabrication, Erection, Commissioning & Painting.",
        work_details: "Completed the fabrication and installation of cooling water systems for this major power plant.",
        quantity: "9500 MT",
        location: "Tamnar, Raigarh – C.G.",
        client: "Jindal Power Ltd.",
        image_url: "/images/Projects/(2)  Jindal Power/01 Thumbnail.jpg",
        order: 1,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } else if (id === 2) {
      return {
        id: 2,
        name: "NTPC Meja Project",
        details: "CW System and make-up water system civil works package Stage 1 (2x660 MW).",
        work_details: "Fabrication, Erection & Painting of cooling water systems for this major NTPC power plant.",
        quantity: "5400 MT",
        location: "MEJA ALLAHABAD",
        client: "NTPC Limited",
        image_url: "/images/Projects/(3)  NTPC Mejja allahbad/Thumbnail.jpg",
        order: 2,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } else if (id === 3) {
      return {
        id: 3,
        name: "Adani Power Godda Project",
        details: "2 X 800 MW Ultra Supercritical Coal-based Thermal Power Project",
        work_details: "Intake Pipeline, Raw Water Pipeline 1350 Dia, Fabrication, Erection & Painting.",
        quantity: "18 KM",
        location: "Village Motia, Dist. Godda J.H.",
        client: "ADANI INFRA. (INDIA) LIMITED",
        image_url: "/images/Projects/(5)  Adani Infra godda/Thumbnail.jpg",
        order: 3,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    }
    
    return null;
  }
}
