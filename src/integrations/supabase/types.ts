export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          created_at: string | null
          full_name: string
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          full_name: string
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          full_name?: string
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      qr_profiles: {
        Row: {
          brochure_description: string | null
          brochure_title: string | null
          brochure_url: string | null
          created_at: string | null
          email_address: string | null
          id: string
          is_active: boolean | null
          phone_number: string | null
          profile_name: string
          profile_type: Database["public"]["Enums"]["profile_type"]
          updated_at: string | null
          user_id: string
          vcard_address: string | null
          vcard_company_name: string | null
          vcard_company_number: string | null
          vcard_email: string | null
          vcard_full_name: string | null
          vcard_linkedin: string | null
          vcard_mobile_number: string | null
          vcard_title: string | null
          vcard_website: string | null
          website_url: string | null
          whatsapp_message: string | null
          whatsapp_number: string | null
        }
        Insert: {
          brochure_description?: string | null
          brochure_title?: string | null
          brochure_url?: string | null
          created_at?: string | null
          email_address?: string | null
          id?: string
          is_active?: boolean | null
          phone_number?: string | null
          profile_name: string
          profile_type: Database["public"]["Enums"]["profile_type"]
          updated_at?: string | null
          user_id: string
          vcard_address?: string | null
          vcard_company_name?: string | null
          vcard_company_number?: string | null
          vcard_email?: string | null
          vcard_full_name?: string | null
          vcard_linkedin?: string | null
          vcard_mobile_number?: string | null
          vcard_title?: string | null
          vcard_website?: string | null
          website_url?: string | null
          whatsapp_message?: string | null
          whatsapp_number?: string | null
        }
        Update: {
          brochure_description?: string | null
          brochure_title?: string | null
          brochure_url?: string | null
          created_at?: string | null
          email_address?: string | null
          id?: string
          is_active?: boolean | null
          phone_number?: string | null
          profile_name?: string
          profile_type?: Database["public"]["Enums"]["profile_type"]
          updated_at?: string | null
          user_id?: string
          vcard_address?: string | null
          vcard_company_name?: string | null
          vcard_company_number?: string | null
          vcard_email?: string | null
          vcard_full_name?: string | null
          vcard_linkedin?: string | null
          vcard_mobile_number?: string | null
          vcard_title?: string | null
          vcard_website?: string | null
          website_url?: string | null
          whatsapp_message?: string | null
          whatsapp_number?: string | null
        }
        Relationships: []
      }
      user_qr_codes: {
        Row: {
          created_at: string | null
          id: string
          qr_code_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          qr_code_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          qr_code_id?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      profile_type:
        | "website"
        | "email"
        | "phone"
        | "whatsapp"
        | "brochure"
        | "vcard"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      profile_type: [
        "website",
        "email",
        "phone",
        "whatsapp",
        "brochure",
        "vcard",
      ],
    },
  },
} as const
