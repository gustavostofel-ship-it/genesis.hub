export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string | null
          role: string | null
          department: string | null
          avatar_url: string | null
          ramal: string | null
          email: string | null
          location: string | null
          skills: string[] | null
          status: string | null
          role_type: 'admin' | 'marketing' | 'rh' | 'gestor' | 'colaborador'
          created_at: string
        }
        Insert: {
          id: string
          name?: string | null
          role?: string | null
          department?: string | null
          avatar_url?: string | null
          ramal?: string | null
          email?: string | null
          location?: string | null
          skills?: string[] | null
          status?: string | null
          role_type?: 'admin' | 'marketing' | 'rh' | 'gestor' | 'colaborador'
          created_at?: string
        }
        Update: {
          id?: string
          name?: string | null
          role?: string | null
          department?: string | null
          avatar_url?: string | null
          ramal?: string | null
          email?: string | null
          location?: string | null
          skills?: string[] | null
          status?: string | null
          role_type?: 'admin' | 'marketing' | 'rh' | 'gestor' | 'colaborador'
          created_at?: string
        }
      }
      // Outras tabelas: posts, requests, notifications
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
