export interface Database {
  public: {
    Tables: {
      clubs: {
        Row: {
          id: number;
          name: string;
          slug: string;
          description: string;
          image_url: string;
          category: string | null;
          member_size: string | null;
          commitment: string | null;
          type: string | null;
          website_url: string | null;
          meeting_times: string | null;
          location: string | null;
          contact_email: string | null;
          created_at?: string;
          updated_at?: string;
          eboard: {
            name: string;
            role: string;
            image_path?: string;
          }[] | null;
        };
        Insert: Omit<Database['public']['Tables']['clubs']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['clubs']['Insert']>;
      };
    };
  };
} 