// Initialize Supabase Client
// Ensure supabase-js is loaded before this script runs

let supabaseClient = null;

if (typeof supabase !== 'undefined') {
    const { createClient } = supabase;
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log('Supabase Client Initialized');
} else {
    console.error('Supabase library not loaded. Make sure to include the CDN script.');
}

// Helper function to test connection
async function testSupabaseConnection() {
    if (!supabaseClient) return;
    
    // Simple query to check if we can connect (even if table doesn't exist, it should return an error or empty)
    const { data, error } = await supabaseClient.from('services').select('*').limit(1);
    
    if (error) {
        console.warn('Supabase Connection Test Warning:', error.message);
        // It's likely the table doesn't exist yet, which is fine for now.
    } else {
        console.log('Supabase Connection Successful:', data);
    }
}

// Run test on load
document.addEventListener('DOMContentLoaded', testSupabaseConnection);
