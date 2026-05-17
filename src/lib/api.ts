import { supabase } from './supabase';

const BASE_URL = 'https://backend-production-099d.up.railway.app';

export async function getToken(): Promise<string | null> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token || null;
  } catch (e) {
    return null;
  }
}

export async function apiGet<T = unknown>(path: string, token?: string): Promise<T> {
  const authToken = token || await getToken();
  if (!authToken) throw new Error('Not authenticated. Please sign in again.');
  
  console.log(`API [GET] ${path} - Starting`);
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'GET',
    headers,
  });
  
  const json = await res.json();
  console.log(`API [GET] ${path} - Response:`, json);
  
  if (!json.meta?.status) throw new Error(json.error || 'Request failed');
  return json.data as T;
}

export async function apiPostPublic<T = unknown>(path: string, body: unknown): Promise<T> {
  console.log(`API [PUBLIC POST] ${path} - Starting`);
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  
  const json = await res.json();
  console.log(`API [PUBLIC POST] ${path} - Response:`, json);
  
  if (!json.meta?.status) throw new Error(json.error || 'Request failed');
  return json.data as T;
}

export async function apiPost<T = unknown>(path: string, body: unknown): Promise<T> {
  const token = await getToken();
  if (!token) throw new Error('Not authenticated. Please sign in again.');
  
  console.log(`API [POST] ${path} - Starting`);
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  
  const json = await res.json();
  console.log(`API [POST] ${path} - Response:`, json);
  
  if (!json.meta?.status) throw new Error(json.error || 'Request failed');
  return json.data as T;
}

export async function apiUpload<T = unknown>(path: string, form: FormData, token: string): Promise<T> {
  console.log(`API [UPLOAD] ${path} - Starting`);
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: form,
  });
  
  const json = await res.json();
  console.log(`API [UPLOAD] ${path} - Response:`, json);
  
  if (!json.meta?.status) throw new Error(json.error || 'Upload failed');
  return json.data as T;
}

export async function uploadDoc(
  file: File,
  documentType: 'id_card' | 'admission_letter',
): Promise<{ uploaded: boolean }> {
  const token = await getToken();
  if (!token) throw new Error('Not authenticated. Please sign in again.');

  const form = new FormData();
  form.append('file', file);
  form.append('document_type', documentType);

  return apiUpload<{ uploaded: boolean }>('/auth/verification-doc', form, token);
}

// All admin operations use POST /admin/actions with a discriminated action field.
// Token must be a valid admin JWT.
export async function adminAction<T = unknown>(payload: object, token?: string): Promise<T> {
  const authToken = token || await getToken();
  if (!authToken) throw new Error('Not authenticated. Please sign in again.');

  console.log(`[Admin] action:`, (payload as any).action);
  const res = await fetch(`${BASE_URL}/admin/actions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json();
  console.log(`[Admin] response:`, json);

  if (!json.meta?.status) throw new Error(json.error || json.message || 'Admin action failed');
  return json.data as T;
}

// Fetches paginated pending verifications queue.
export async function getAdminVerifications(page = 1, perPage = 20): Promise<unknown> {
  return apiGet(`/admin/pending-verifications?page=${page}&per_page=${perPage}`);
}

// Fetches a signed S3 URL for a user's verification document.
export async function getVerificationDocUrl(userId: string): Promise<{ url: string; expires_in: number }> {
  return apiGet<{ url: string; expires_in: number }>(`/admin/pending-verifications/${userId}/doc`);
}
