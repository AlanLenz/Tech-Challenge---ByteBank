import { auth } from "@/lib/firebase";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// This wrapper intercepts every request to attach the Firebase token
export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const user = auth.currentUser;
  
  if (!user) {
    throw new Error("Usuário não autenticado");
  }

  const token = await user.getIdToken();

  // Merge the security headers with whatever other options you pass in
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    // Default to cache-busting for all secure API calls
    'Cache-Control': 'no-cache', 
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    // By default, tell Next.js not to aggressively cache dynamic user data
    cache: options.cache || 'no-store', 
  });

  if (!response.ok) {
    throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
  }

  return response.json();
}