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
      locations_prod: {
        Row: {
          accessibility_features: Json | null
          age_group_focus: number | null
          average_wait_time: number | null
          blue_light_filtering_options: boolean | null
          borough: string | null
          business_hours: Json | null
          children_eyewear_available: boolean | null
          city: string | null
          contact_lens: boolean | null
          country: string | null
          created_at: string | null
          descriptions: Json | null
          dry_eye_treatment_options: Json | null
          email: string | null
          emergency: boolean | null
          environmental_sustainability_practices: Json | null
          eye_exam_technologies: Json | null
          eyewear_accessories_available: boolean | null
          eyewear_brands_carried: Json | null
          featured: boolean | null
          frame_styles_offered: Json | null
          gallery: Json | null
          id: number
          insurance_accepted: boolean | null
          languages_spoken: Json | null
          latitude: number | null
          lens_types_offered: Json | null
          location_type: string | null
          longitude: number | null
          low_vision_services: boolean | null
          occupation_type: Json | null
          ocular_disease_management: boolean | null
          online_ordering_available: boolean | null
          optical_lab_on_site: boolean | null
          parking_availability: string | null
          payment_options: Json | null
          permanent_promotion: string | null
          phone: string | null
          postal_code: string | null
          protective_eyewear_options: boolean | null
          province: string | null
          public_transport_accessibility: boolean | null
          same_day_service_available: boolean | null
          services_offered: Json | null
          slug: string | null
          specialization: Json | null
          specialty_contact_lens_options: boolean | null
          sports_eyewear_collection: boolean | null
          storefrontphoto: string | null
          street_address: string | null
          telehealth_services: boolean | null
          title: string | null
          updated_at: string | null
          walk_ins_welcome: boolean | null
          website: string | null
        }
        Insert: {
          accessibility_features?: Json | null
          age_group_focus?: number | null
          average_wait_time?: number | null
          blue_light_filtering_options?: boolean | null
          borough?: string | null
          business_hours?: Json | null
          children_eyewear_available?: boolean | null
          city?: string | null
          contact_lens?: boolean | null
          country?: string | null
          created_at?: string | null
          descriptions?: Json | null
          dry_eye_treatment_options?: Json | null
          email?: string | null
          emergency?: boolean | null
          environmental_sustainability_practices?: Json | null
          eye_exam_technologies?: Json | null
          eyewear_accessories_available?: boolean | null
          eyewear_brands_carried?: Json | null
          featured?: boolean | null
          frame_styles_offered?: Json | null
          gallery?: Json | null
          id: number
          insurance_accepted?: boolean | null
          languages_spoken?: Json | null
          latitude?: number | null
          lens_types_offered?: Json | null
          location_type?: string | null
          longitude?: number | null
          low_vision_services?: boolean | null
          occupation_type?: Json | null
          ocular_disease_management?: boolean | null
          online_ordering_available?: boolean | null
          optical_lab_on_site?: boolean | null
          parking_availability?: string | null
          payment_options?: Json | null
          permanent_promotion?: string | null
          phone?: string | null
          postal_code?: string | null
          protective_eyewear_options?: boolean | null
          province?: string | null
          public_transport_accessibility?: boolean | null
          same_day_service_available?: boolean | null
          services_offered?: Json | null
          slug?: string | null
          specialization?: Json | null
          specialty_contact_lens_options?: boolean | null
          sports_eyewear_collection?: boolean | null
          storefrontphoto?: string | null
          street_address?: string | null
          telehealth_services?: boolean | null
          title?: string | null
          updated_at?: string | null
          walk_ins_welcome?: boolean | null
          website?: string | null
        }
        Update: {
          accessibility_features?: Json | null
          age_group_focus?: number | null
          average_wait_time?: number | null
          blue_light_filtering_options?: boolean | null
          borough?: string | null
          business_hours?: Json | null
          children_eyewear_available?: boolean | null
          city?: string | null
          contact_lens?: boolean | null
          country?: string | null
          created_at?: string | null
          descriptions?: Json | null
          dry_eye_treatment_options?: Json | null
          email?: string | null
          emergency?: boolean | null
          environmental_sustainability_practices?: Json | null
          eye_exam_technologies?: Json | null
          eyewear_accessories_available?: boolean | null
          eyewear_brands_carried?: Json | null
          featured?: boolean | null
          frame_styles_offered?: Json | null
          gallery?: Json | null
          id?: number
          insurance_accepted?: boolean | null
          languages_spoken?: Json | null
          latitude?: number | null
          lens_types_offered?: Json | null
          location_type?: string | null
          longitude?: number | null
          low_vision_services?: boolean | null
          occupation_type?: Json | null
          ocular_disease_management?: boolean | null
          online_ordering_available?: boolean | null
          optical_lab_on_site?: boolean | null
          parking_availability?: string | null
          payment_options?: Json | null
          permanent_promotion?: string | null
          phone?: string | null
          postal_code?: string | null
          protective_eyewear_options?: boolean | null
          province?: string | null
          public_transport_accessibility?: boolean | null
          same_day_service_available?: boolean | null
          services_offered?: Json | null
          slug?: string | null
          specialization?: Json | null
          specialty_contact_lens_options?: boolean | null
          sports_eyewear_collection?: boolean | null
          storefrontphoto?: string | null
          street_address?: string | null
          telehealth_services?: boolean | null
          title?: string | null
          updated_at?: string | null
          walk_ins_welcome?: boolean | null
          website?: string | null
        }
        Relationships: []
      }
      users_production: {
        Row: {
          age: number | null
          borough: string | null
          city: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          user_type: string | null
        }
        Insert: {
          age?: number | null
          borough?: string | null
          city?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          user_type?: string | null
        }
        Update: {
          age?: number | null
          borough?: string | null
          city?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          user_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_production_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
