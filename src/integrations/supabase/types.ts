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
      chat_tickets: {
        Row: {
          category: string | null
          common_issue: string | null
          company_name: string | null
          created_at: string | null
          extracted_keywords: string[] | null
          id: string
          issue: string | null
          issue_summary: string | null
          link: string | null
          priority: string | null
          read: boolean | null
          report_period: string | null
          responsible_department: string | null
          responsible_department_justification: string | null
          sentiment: string | null
          state: string | null
          summary: string | null
          theme: string | null
        }
        Insert: {
          category?: string | null
          common_issue?: string | null
          company_name?: string | null
          created_at?: string | null
          extracted_keywords?: string[] | null
          id: string
          issue?: string | null
          issue_summary?: string | null
          link?: string | null
          priority?: string | null
          read?: boolean | null
          report_period?: string | null
          responsible_department?: string | null
          responsible_department_justification?: string | null
          sentiment?: string | null
          state?: string | null
          summary?: string | null
          theme?: string | null
        }
        Update: {
          category?: string | null
          common_issue?: string | null
          company_name?: string | null
          created_at?: string | null
          extracted_keywords?: string[] | null
          id?: string
          issue?: string | null
          issue_summary?: string | null
          link?: string | null
          priority?: string | null
          read?: boolean | null
          report_period?: string | null
          responsible_department?: string | null
          responsible_department_justification?: string | null
          sentiment?: string | null
          state?: string | null
          summary?: string | null
          theme?: string | null
        }
        Relationships: []
      }
      chat_vectors: {
        Row: {
          embedding: string | null
          id: string
          metadata: Json | null
        }
        Insert: {
          embedding?: string | null
          id: string
          metadata?: Json | null
        }
        Update: {
          embedding?: string | null
          id?: string
          metadata?: Json | null
        }
        Relationships: []
      }
      embeddings: {
        Row: {
          embedding: string | null
          id: number
          text: string
          ticket_id: number
        }
        Insert: {
          embedding?: string | null
          id?: number
          text: string
          ticket_id: number
        }
        Update: {
          embedding?: string | null
          id?: number
          text?: string
          ticket_id?: number
        }
        Relationships: []
      }
      mynt_chat_vectors: {
        Row: {
          embedding: string | null
          id: string
          metadata: Json | null
        }
        Insert: {
          embedding?: string | null
          id: string
          metadata?: Json | null
        }
        Update: {
          embedding?: string | null
          id?: string
          metadata?: Json | null
        }
        Relationships: []
      }
      Mynt_Hypersight: {
        Row: {
          category: string | null
          common_issue: string | null
          company_name: string | null
          created_at: string | null
          id: number
          issue: string | null
          issue_summary: string | null
          link: string | null
          priority: string | null
          read: boolean | null
          report_period: string | null
          responsible_department: string | null
          responsible_department_justification: string | null
          sentiment: string | null
          state: string | null
          subcategory: string | null
          summary: string | null
        }
        Insert: {
          category?: string | null
          common_issue?: string | null
          company_name?: string | null
          created_at?: string | null
          id: number
          issue?: string | null
          issue_summary?: string | null
          link?: string | null
          priority?: string | null
          read?: boolean | null
          report_period?: string | null
          responsible_department?: string | null
          responsible_department_justification?: string | null
          sentiment?: string | null
          state?: string | null
          subcategory?: string | null
          summary?: string | null
        }
        Update: {
          category?: string | null
          common_issue?: string | null
          company_name?: string | null
          created_at?: string | null
          id?: number
          issue?: string | null
          issue_summary?: string | null
          link?: string | null
          priority?: string | null
          read?: boolean | null
          report_period?: string | null
          responsible_department?: string | null
          responsible_department_justification?: string | null
          sentiment?: string | null
          state?: string | null
          subcategory?: string | null
          summary?: string | null
        }
        Relationships: []
      }
      ticket_analysis: {
        Row: {
          category: string | null
          common_issue: string | null
          company_name: string | null
          created_at: string | null
          id: number | null
          issue: string | null
          issue_summary: string | null
          link: string | null
          priority: string | null
          read: boolean | null
          report_period: string | null
          responsible_department: string | null
          responsible_department_justification: string | null
          sentiment: string | null
          state: string | null
          subcategory: string | null
          summary: string | null
        }
        Insert: {
          category?: string | null
          common_issue?: string | null
          company_name?: string | null
          created_at?: string | null
          id?: number | null
          issue?: string | null
          issue_summary?: string | null
          link?: string | null
          priority?: string | null
          read?: boolean | null
          report_period?: string | null
          responsible_department?: string | null
          responsible_department_justification?: string | null
          sentiment?: string | null
          state?: string | null
          subcategory?: string | null
          summary?: string | null
        }
        Update: {
          category?: string | null
          common_issue?: string | null
          company_name?: string | null
          created_at?: string | null
          id?: number | null
          issue?: string | null
          issue_summary?: string | null
          link?: string | null
          priority?: string | null
          read?: boolean | null
          report_period?: string | null
          responsible_department?: string | null
          responsible_department_justification?: string | null
          sentiment?: string | null
          state?: string | null
          subcategory?: string | null
          summary?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_table_schema: {
        Args: { table_name: string }
        Returns: {
          column_name: string
          data_type: string
          description: string
        }[]
      }
      match_chat_vectors: {
        Args: { query_embedding: string; match_count?: number }
        Returns: {
          id: string
          metadata: Json
          similarity: number
        }[]
      }
      match_mynt_chat_vectors: {
        Args: { query_embedding: string; match_count?: number }
        Returns: {
          id: string
          metadata: Json
          similarity: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
