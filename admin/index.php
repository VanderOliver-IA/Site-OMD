<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OMD Admin - Dashboard</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;700&family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    
    <!-- Supabase -->
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script src="../assets/js/supabase-config.js"></script>

    <style>
        /* Admin Specific Styles */
        body {
            display: flex;
            min-height: 100vh;
            background: #0f0f0f;
        }
        
        .sidebar {
            width: 250px;
            background: #050505;
            border-right: 1px solid rgba(255,255,255,0.05);
            padding: 2rem 1rem;
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }

        .main-content {
            flex: 1;
            padding: 2rem;
            overflow-y: auto;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            margin-bottom: 3rem;
        }

        .stat-card {
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.05);
            padding: 1.5rem;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .stat-icon {
            font-size: 2.5rem;
            color: var(--primary-cyan);
        }

        .table-responsive {
            overflow-x: auto;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            color: var(--text-secondary);
        }

        th, td {
            text-align: left;
            padding: 1rem;
            border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        th {
            color: var(--primary-cyan);
            font-weight: 600;
        }

        tr:hover {
            background: rgba(255,255,255,0.02);
        }

        /* Admin Mobile Tweaks */
        @media (max-width: 768px) {
            .sidebar { display: none !important; }
            .main-content { padding: 1rem; padding-bottom: 80px; }
            .mobile-bottom-nav { display: flex !important; }
        }
    </style>
</head>
<body style="display: none;"> <!-- Hidden until auth check -->

    <!-- Sidebar (Desktop) -->
    <aside class="sidebar">
        <div class="logo">
            <img src="../assets/img/logo-omd.png" alt="OMD" style="height: 40px;">
        </div>
        
        <nav style="display: flex; flex-direction: column; gap: 0.5rem;">
            <a href="index.php" class="nav-link active" style="color: var(--primary-cyan); font-weight: 600;">
                <span class="material-icons" style="vertical-align: middle; margin-right: 10px;">dashboard</span>
                Dashboard
            </a>
            <a href="services.php" class="nav-link">
                <span class="material-icons" style="vertical-align: middle; margin-right: 10px;">grid_view</span>
                Serviços
            </a>
            <a href="settings.php" class="nav-link">
                <span class="material-icons" style="vertical-align: middle; margin-right: 10px;">settings</span>
                Configurações
            </a>
        </nav>

        <div style="margin-top: auto;">
            <button id="logoutBtn" class="btn btn-secondary" style="width: 100%; padding: 0.8rem;">Sair</button>
        </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
        <header style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
            <h2>Visão Geral</h2>
            <div style="display: flex; gap: 1rem; align-items: center;">
                <span id="userEmail" style="color: var(--text-secondary); font-size: 0.9rem;">...</span>
                <span class="material-icons" style="font-size: 2rem; color: var(--primary-magenta);">account_circle</span>
            </div>
        </header>

        <!-- Stats -->
        <div class="stats-grid">
            <div class="stat-card">
                <span class="material-icons stat-icon">visibility</span>
                <div>
                    <h3 id="stat-views" style="margin: 0; font-size: 1.5rem;">--</h3>
                    <span style="font-size: 0.8rem; color: var(--text-secondary);">Visitas (Simulado)</span>
                </div>
            </div>
            <div class="stat-card">
                <span class="material-icons stat-icon">grid_view</span>
                <div>
                    <h3 id="stat-services" style="margin: 0; font-size: 1.5rem;">--</h3>
                    <span style="font-size: 0.8rem; color: var(--text-secondary);">Serviços Ativos</span>
                </div>
            </div>
            <div class="stat-card">
                <span class="material-icons stat-icon">contact_mail</span>
                <div>
                    <h3 id="stat-leads" style="margin: 0; font-size: 1.5rem;">--</h3>
                    <span style="font-size: 0.8rem; color: var(--text-secondary);">Leads (Estimado)</span>
                </div>
            </div>
        </div>

        <!-- Recent Content -->
        <div class="card" style="padding: 1.5rem; border-radius: 12px; background: rgba(255,255,255,0.02);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h3>Serviços Atuais</h3>
                <a href="services.php" class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.8rem;">Gerenciar</a>
            </div>
            
            <div class="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Status</th>
                            <th>Última Edição</th>
                        </tr>
                    </thead>
                    <tbody id="servicesTableBody">
                        <tr><td colspan="3">Carregando dados...</td></tr>
                    </tbody>
                </table>
            </div>
        </div>

    </main>

    <!-- Mobile Bottom Nav (Admin) -->
    <nav class="mobile-bottom-nav" style="display: none; position: fixed; bottom: 0; left: 0; width: 100%; background: #050505; border-top: 1px solid rgba(255,255,255,0.1); z-index: 1000; padding: 10px 0; justify-content: space-around; align-items: center;">
        <a href="index.php" class="mobile-nav-item active" style="display: flex; flex-direction: column; align-items: center; color: var(--primary-cyan); text-decoration: none; font-size: 0.75rem;">
            <span class="material-icons">dashboard</span>
            <span>Unresumo</span>
        </a>
        <a href="services.php" class="mobile-nav-item" style="display: flex; flex-direction: column; align-items: center; color: var(--text-secondary); text-decoration: none; font-size: 0.75rem;">
            <span class="material-icons">grid_view</span>
            <span>Serviços</span>
        </a>
        <a href="settings.php" class="mobile-nav-item" style="display: flex; flex-direction: column; align-items: center; color: var(--text-secondary); text-decoration: none; font-size: 0.75rem;">
            <span class="material-icons">settings</span>
            <span>Config</span>
        </a>
         <a href="#" onclick="document.getElementById('logoutBtn').click()" class="mobile-nav-item" style="display: flex; flex-direction: column; align-items: center; color: var(--text-secondary); text-decoration: none; font-size: 0.75rem;">
            <span class="material-icons">logout</span>
            <span>Sair</span>
        </a>
    </nav>

    <script>
        // Safety timeout
        const safetyTimer = setTimeout(() => {
            console.warn('Auth check timed out. Redirecting...');
            window.location.replace('login.php');
        }, 5000); // Increased to 5s to be safe

        async function initAdmin() {
            try {
                if (typeof supabase === 'undefined') throw new Error('Supabase SDK not loaded');
                
                // Hardcoded Creds to match login.php and ensure session sharing
                const SUPABASE_URL = 'https://lriapvoderqzvecjezpe.supabase.co';
                const SUPABASE_KEY = 'sb_publishable_0LC5NFaOnDhc7oySD11G1w_7HPBP2td'; 

                const { createClient } = supabase;
                const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

                // Check Session
                const { data: { session }, error } = await supabaseClient.auth.getSession();
                
                if (error || !session) {
                    throw new Error('No session');
                }

                // SECURITY CHECK: Email Whitelist
                const ALLOWED_EMAIL = 'agenciaolamundodigital@gmail.com';
                if (session.user.email !== ALLOWED_EMAIL) {
                    await supabaseClient.auth.signOut(); // Force logout
                    throw new Error('Acesso Negado: Este usuário não é administrador.');
                }

                // Success
                clearTimeout(safetyTimer);
                document.body.style.display = 'flex';
                document.getElementById('userEmail').textContent = session.user.email;
                
                // Load Data
                loadDashboardData(supabaseClient);

                // Setup Logout
                document.getElementById('logoutBtn').addEventListener('click', async () => {
                    await supabaseClient.auth.signOut();
                    window.location.href = 'login.php';
                });

            } catch (err) {
                console.error('Auth critical error:', err);
                // Only redirect if we are SURE it failed
                window.location.replace('login.php');
            }
        }

        async function loadDashboardData(client) {
            try {
                const { count, error } = await client
                    .from('services')
                    .select('*', { count: 'exact', head: true });
                
                if (!error) document.getElementById('stat-services').textContent = count;

                const { data: services, error: listError } = await client
                    .from('services')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(5);

                const tbody = document.getElementById('servicesTableBody');
                if (tbody) {
                    tbody.innerHTML = '';
                    if (services && services.length > 0) {
                        services.forEach(service => {
                            const tr = document.createElement('tr');
                            tr.innerHTML = `
                                <td>${service.title}</td>
                                <td><span style="color: #00ff88;">Ativo</span></td>
                                <td>${new Date(service.created_at).toLocaleDateString()}</td>
                            `;
                            tbody.appendChild(tr);
                        });
                    } else {
                        tbody.innerHTML = '<tr><td colspan="3">Nenhum serviço.</td></tr>';
                    }
                }
            } catch (e) {
                console.error('Data load error', e);
            }
        }

        initAdmin();
    </script>
</body>
</html>
