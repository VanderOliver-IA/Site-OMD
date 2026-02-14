---
name: supabase-auth-setup
description: Complete guide to setting up robust Supabase Authentication and Database integration in web projects.
---

# Supabase Auth & Database Integration Skill

This skill provides a definitive workflow for integrating Supabase into web applications, ensuring authentication works reliably without login loops, race conditions, or configuration errors.

## 1. Pre-Requisites (Ask User First)
Before writing code, request the following from the user:
- **Supabase Project URL**: (e.g., `https://xyz.supabase.co`)
- **Supabase Anon Key**: (Public API Key)
- **Database Schema Goal**: What data needs to be stored? (Tables, columns)
- **Auth Provider Settings**: Confirm if "Email Confirmation" is disabled in Supabase Dashboard -> Authentication -> Providers -> Email. **CRITICAL:** If enabled, users cannot login immediately after signup.

## 2. Directory Structure
Avoid scattering config. Centralize or Embed to prevent loading race conditions.

### Recommended Structure:
```
/assets/js/supabase-client.js  <-- (Optional) Central config
/admin/login.php               <-- Entry Point
/admin/index.php               <-- Protected Dashboard
/admin/services.php            <-- Protected Feature Page
```

## 3. Implementation Rules (The "Golden Path")

### A. The Configuration Trap
**Problem:** Loading credentials from an external `.js` file often fails due to async loading or browser caching, causing `SUPABASE_URL not defined` errors.
**Solution:** For critical Auth pages (`login.php`, `index.php`), **EMBED** the credentials directly in the `<script>` block at the bottom of the body. It solves 99% of "connection failed" issues.

### B. The Login Page (`login.php`)
Must handle visual feedback and explicit session checking.

**Code Pattern:**
```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
    const SUPABASE_URL = 'YOUR_URL'; // Embed here for reliability
    const SUPABASE_KEY = 'YOUR_KEY';
    const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    // 1. Auto-Redirect if Session Exists
    async function checkSession() {
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (session) window.location.href = 'index.php';
    }
    checkSession();

    // 2. Explicit Event Handling
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.querySelector('button');
        const err = document.getElementById('errorMsg');
        
        btn.disabled = true;
        btn.textContent = 'Verificando...';
        err.style.display = 'none';

        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        });

        if (error) {
            btn.disabled = false;
            btn.textContent = 'Entrar';
            err.textContent = error.message;
            err.style.display = 'block';
        } else if (data.session) {
            window.location.href = 'index.php'; // FORCE Redirect on success
        }
    });
</script>
```

### C. The Protected Page (`index.php`) - The Anti-Loop Strategy
**Problem:** "Login Loop". User logs in -> Redirects to Index -> Index fails to find session -> Redirects to Login -> Cycle repeats.
**Cause:** `index.php` initializes Supabase differently than `login.php` (e.g., using a failed external config file), so it doesn't see the session cookie.
**Solution:** Use **IDENTICAL initialization code** in protected pages.

**Code Pattern:**
```html
<body style="display: none;"> <!-- Hide by default -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
    const SUPABASE_URL = 'YOUR_URL'; // MUST MATCH LOGIN.PHP EXACTLY
    const SUPABASE_KEY = 'YOUR_KEY';
    const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    // Safety Timeout (Prevents White Screen of Death)
    const timer = setTimeout(() => window.location.replace('login.php'), 4000);

    async function init() {
        try {
            const { data: { session }, error } = await supabaseClient.auth.getSession();
            
            if (error || !session) throw new Error('No Session');

            // Success: Show Content
            clearTimeout(timer);
            document.body.style.display = 'block'; 
            
            // Load Data...
            
        } catch (e) {
            console.error('Auth Failed:', e);
            window.location.replace('login.php'); // Kick back/out
        }
    }
    init();
</script>
```

## 4. Troubleshooting Guide

### Issue: "Click button, nothing happens"
- **Diagnosis:** Check Console (F12). If clean, the event listener isn't attached (ID mismatch).
- **Fix:** Verify `id="loginForm"` matches the script. Ensure button is `type="submit"`.

### Issue: "White screen on Dashboard"
- **Diagnosis:** The script is stuck waiting for Supabase `getSession()`.
- **Fix:** Always include the **Safety Timeout** pattern (shown above) to force a redirect if network hangs.

### Issue: "Redirect Loop" (Login -> Dashboard -> Login)
- **Diagnosis:** Credentials mismatch or Browser Cookie policy (rare on localhost).
- **Fix:** Hardcode URL/KEY in both files to guarantee they access the same project. Clear Browser Cookies/Storage.

### Issue: "Auth confirms but data doesn't load"
- **Diagnosis:** RLS (Row Level Security) Policies on Database.
- **Fix:** In Supabase Dashboard -> Table Editor -> Edit Table -> Policies. Ensure "Enable RLS" is ON but add a policy "Enable Read/Write for Authenticated Users".

## 5. Deployment Checklist
1.  **Environment Variables**: On production, try to move keys to a secure config, but if site is static/PHP-simple, hardcoding the **Public** Anon Key is acceptable (it's designed to be public).
2.  **HTTPS**: Supabase Auth cookies require Secure context (HTTPS) in production.
3.  **Site URL**: Update "Site URL" and "Redirect URLs" in Supabase Auth Settings to match the live domain.
