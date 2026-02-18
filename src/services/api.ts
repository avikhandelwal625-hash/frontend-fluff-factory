// API service layer for FastAPI + MySQL backend
// Update BASE_URL to point to your FastAPI server

import type {
  Doctor,
  Patient,
  Appointment,
  LoginCredentials,
  SignupData,
  AuthResponse,
  DashboardStats,
} from "@/types";

const BASE_URL = "http://localhost:8000/api"; // Change to your FastAPI URL

function getHeaders(): HeadersInit {
  const token = localStorage.getItem("access_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: getHeaders(),
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(err.detail || "Request failed");
  }
  return res.json();
}

// ── Auth ──────────────────────────────────────────
export const authApi = {
  loginPatient: (creds: LoginCredentials) =>
    request<AuthResponse>("/auth/patient/login", {
      method: "POST",
      body: JSON.stringify(creds),
    }),

  loginDoctor: (creds: LoginCredentials) =>
    request<AuthResponse>("/auth/doctor/login", {
      method: "POST",
      body: JSON.stringify(creds),
    }),

  signupPatient: (data: SignupData) =>
    request<AuthResponse>("/auth/patient/signup", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  signupDoctor: (data: SignupData) =>
    request<AuthResponse>("/auth/doctor/signup", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

// ── Doctors ───────────────────────────────────────
export const doctorsApi = {
  getAll: () => request<Doctor[]>("/doctors"),
  getById: (id: number) => request<Doctor>(`/doctors/${id}`),
};

// ── Appointments ──────────────────────────────────
export const appointmentsApi = {
  getMyAppointments: () => request<Appointment[]>("/appointments/me"),

  create: (data: { doctor_id: number; date: string; time: string; reason: string }) =>
    request<Appointment>("/appointments", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateStatus: (id: number, status: string) =>
    request<Appointment>(`/appointments/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),

  cancel: (id: number) =>
    request<Appointment>(`/appointments/${id}/cancel`, { method: "PATCH" }),
};

// ── Dashboard ─────────────────────────────────────
export const dashboardApi = {
  getStats: () => request<DashboardStats>("/dashboard/stats"),
};
