<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OMD Admin - Login</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;700&family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    
    <!-- Supabase -->
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script src="../assets/js/supabase-config.js"></script>
</head>
<body style="display: flex; justify-content: center; align-items: center; min-height: 100vh; background-image: linear-gradient(rgba(10, 10, 10, 0.95), rgba(10, 10, 10, 0.95)), url('../assets/img/fundo-linhas-omd.png');">

    <div class="login-container" style="width: 100%; max-width: 400px; padding: 2rem;">
        <div class="card" style="background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 2rem; text-align: center;">
            <img src="../assets/img/logo-omd.png" alt="OMD Logo" style="height: 50px; margin: 0 auto 1.5rem; display: block;">
            <h2 style="margin-bottom: 2rem; font-family: 'Outfit', sans-serif;">Acesso Restrito</h2>
            
            <form id="loginForm" style="display: flex; flex-direction: column; gap: 1rem;">
                <div class="form-group">
                    <input type="email" id="email" placeholder="E-mail" required 
                           style="width: 100%; padding: 1rem; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); color: white; border-radius: 8px;">
                </div>
                <div class="form-group">
                    <input type="password" id="password" placeholder="Senha" required 
                           style="width: 100%; padding: 1rem; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); color: white; border-radius: 8px;">
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">Entrar</button>
            </form>
            <p id="errorMsg" style="color: #ff4d4d; margin-top: 1rem; font-size: 0.9rem; display: none;"></p>
        </div>
        <p style="text-align: center; margin-top: 1rem; font-size: 0.8rem; color: var(--text-secondary);">
            &copy; 2026 OláMundoDigital - Painel Admin
        </p>
    </div>

    <script>
        // Direct Credentials to avoid loading issues
        const SUPABASE_URL = 'https://lriapvoderqzvecjezpe.supabase.co';
        const SUPABASE_KEY = 'sb_publishable_0LC5NFaOnDhc7oySD11G1w_7HPBP2td'; // Using the key found in config

        // Initialize Supabase
        const { createClient } = supabase;
        const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

        // Auto-Redirect if Session Exists
        async function checkSession() {
            const { data: { session } } = await supabaseClient.auth.getSession();
            if (session) {
                console.log('Session found, redirecting...');
                window.location.href = 'index.php';
            }
        }
        checkSession();

        // Login Handler
        const loginForm = document.getElementById('loginForm');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const errorMsg = document.getElementById('errorMsg');
        const submitBtn = document.querySelector('button[type="submit"]');

        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Visual Feedback
            submitBtn.textContent = 'Verificando...';
            submitBtn.disabled = true;
            errorMsg.style.display = 'none';
            
            const email = emailInput.value;
            const password = passwordInput.value;

            console.log('Attempting login for:', email);

            try {
                const { data, error } = await supabaseClient.auth.signInWithPassword({
                    email: email,
                    password: password,
                });

                if (error) {
                    console.error('Login Error:', error);
                    throw error;
                }

                if (data.session) {
                    const ALLOWED_EMAIL = 'agenciaolamundodigital@gmail.com';
                    if (data.session.user.email !== ALLOWED_EMAIL) {
                        await supabaseClient.auth.signOut();
                        throw new Error('Acesso Negado: Você não tem permissão de administrador.');
                    }
                    console.log('Login Success!', data);
                    submitBtn.textContent = 'Sucesso! Redirecionando...';
                    window.location.href = 'index.php';
                } else {
                    throw new Error('Sessão não criada. Verifique seu email.');
                }
            } catch (err) {
                submitBtn.textContent = 'Entrar';
                submitBtn.disabled = false;
                errorMsg.style.display = 'block';
                errorMsg.textContent = err.message || 'Erro desconhecido.';
                errorMsg.style.color = '#ff4d4d';
            }
        });
    </script>
</body>
</html>
