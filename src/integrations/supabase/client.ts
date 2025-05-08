
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pzppkiwucwxdopggylmd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6cHBraXd1Y3d4ZG9wZ2d5bG1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0NTM2ODksImV4cCI6MjA1MzAyOTY4OX0.psSYEMD0jKzAlmSs06PSa0anp5Jj9v2GIUJm9qnzY2I';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true
  }
});
