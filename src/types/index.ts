// Types matching FastAPI + MySQL backend models

export interface Doctor {
  id: number;
  name: string;
  email: string;
  specialty: string;
  phone: string;
  experience_years: number;
  avatar?: string;
  bio?: string;
  available: boolean;
}

export interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  gender: string;
  address?: string;
  avatar?: string;
}

export interface Appointment {
  id: number;
  patient_id: number;
  doctor_id: number;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  reason: string;
  notes?: string;
  doctor?: Doctor;
  patient?: Patient;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData extends LoginCredentials {
  name: string;
  phone: string;
  specialty?: string; // doctor only
  date_of_birth?: string; // patient only
  gender?: string; // patient only
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user_type: "doctor" | "patient";
  user: Doctor | Patient;
}

export interface DashboardStats {
  total_appointments: number;
  upcoming_appointments: number;
  completed_appointments: number;
  cancelled_appointments: number;
}
