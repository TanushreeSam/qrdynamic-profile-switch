// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://bfqzaczutidqfnotzlzi.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmcXphY3p1dGlkcWZub3R6bHppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1MTY0NTIsImV4cCI6MjA2NDA5MjQ1Mn0.IDgZuvLYoXlGDp6tYjsPTb8BIyD7bpCsWHJ_Sn3eoRc";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);