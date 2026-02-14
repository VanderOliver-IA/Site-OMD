require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://lriapvoderqzvecjezpe.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_SERVICE_KEY) {
    console.error('ERROR: SUPABASE_SERVICE_KEY environment variable is required');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

async function verifyAdminAccess() {
    console.log('Testing Admin Access with Service Key...');

    // Try to list users (requires service_role)
    const { data: { users }, error } = await supabase.auth.admin.listUsers();

    if (error) {
        console.error('Admin Access Failed:', error.message);
        if (error.message.includes('JWT')) {
            console.error('Possible cause: The Service Key provided seems invalid (too short or wrong format). It should start with eyJ...');
        }
    } else {
        console.log('Success! Admin Access Verified.');
        console.log('Number of users found:', users.length);
    }
}

verifyAdminAccess();
