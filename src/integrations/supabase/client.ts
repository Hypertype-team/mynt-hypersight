
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pzppkiwucwxdopggylmd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6cHBraXd1Y3d4ZG9wZ2d5bG1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0NTM2ODksImV4cCI6MjA1MzAyOTY4OX0.psSYEMD0jKzAlmSs06PSa0anp5Jj9v2GIUJm9qnzY2I';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true, // Enables detecting and parsing auth params from URL
    flowType: 'implicit' // For SPA applications
  },
  // Global error handler to log issues
  global: {
    fetch: (...args) => {
      return fetch(...args).catch(error => {
        console.error('Supabase fetch error:', error);
        throw error;
      });
    }
  }
});

// Export a helper function to check if user is authenticated
export const isAuthenticated = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};
