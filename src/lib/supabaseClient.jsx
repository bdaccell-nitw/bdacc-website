import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// This safety check will tell you if the variables are still "undefined"
if (!supabaseUrl || !supabaseKey) {
    console.error("Vite environment variables are not loading! Check your .env file naming.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);