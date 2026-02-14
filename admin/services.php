<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OMD Admin - Serviços</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;700&family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script src="../assets/js/supabase-config.js"></script>

    <style>
        /* Admin Styles Reuse */
        body { display: flex; min-height: 100vh; background: #0f0f0f; }
        .sidebar { width: 250px; background: #050505; border-right: 1px solid rgba(255,255,255,0.05); padding: 2rem 1rem; display: flex; flex-direction: column; gap: 2rem; }
        .main-content { flex: 1; padding: 2rem; overflow-y: auto; }
        
        /* Modal Styles */
        .modal {
            display: none; 
            position: fixed; z-index: 1000; left: 0; top: 0; width: 100%; height: 100%;
            background-color: rgba(0,0,0,0.8); backdrop-filter: blur(5px);
            align-items: center; justify-content: center;
        }
        .modal-content {
            background: #1a1a1a; padding: 2rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);
            width: 100%; max-width: 500px; position: relative;
        }
        .close { float: right; font-size: 1.5rem; cursor: pointer; color: var(--text-secondary); }
        .close:hover { color: white; }

        input, textarea {
            width: 100%; padding: 0.8rem; margin-bottom: 1rem;
            background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
            color: white; border-radius: 8px; font-family: var(--font-body);
        }
        label { display: block; margin-bottom: 0.5rem; color: var(--text-secondary); font-size: 0.9rem; }

        /* Admin Mobile Tweaks */
        @media (max-width: 768px) {
            .sidebar { display: none !important; }
            .main-content { padding: 1rem; padding-bottom: 80px; }
            .mobile-bottom-nav { display: flex !important; }
        }
    </style>
</head>
<body style="display: none;"> <!-- Protected -->

    <!-- Sidebar -->
    <aside class="sidebar">
        <div class="logo">
            <img src="../assets/img/logo-omd.png" alt="OMD" style="height: 40px;">
        </div>
        <nav style="display: flex; flex-direction: column; gap: 0.5rem;">
            <a href="index.php" class="nav-link">
                <span class="material-icons" style="vertical-align: middle; margin-right: 10px;">dashboard</span> Dashboard
            </a>
            <a href="services.php" class="nav-link active" style="color: var(--primary-cyan); font-weight: 600;">
                <span class="material-icons" style="vertical-align: middle; margin-right: 10px;">grid_view</span> Serviços
            </a>
            <a href="settings.php" class="nav-link">
                <span class="material-icons" style="vertical-align: middle; margin-right: 10px;">settings</span> Configurações
            </a>
        </nav>
        <div style="margin-top: auto;">
            <button id="logoutBtn" class="btn btn-secondary" style="width: 100%; padding: 0.8rem;">Sair</button>
        </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
        <header style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
            <h2>Gerenciar Serviços</h2>
            <button onclick="openModal()" class="btn btn-primary" style="padding: 0.8rem 1.5rem; font-size: 0.9rem;">
                + Novo Serviço
            </button>
        </header>

        <div class="card" style="padding: 1.5rem; border-radius: 12px; background: rgba(255,255,255,0.02);">
            <table style="width: 100%; border-collapse: collapse; color: var(--text-secondary);">
                <thead>
                    <tr style="text-align: left; border-bottom: 1px solid rgba(255,255,255,0.1);">
                        <th style="padding: 1rem; color: var(--primary-cyan);">Ícone</th>
                        <th style="padding: 1rem; color: var(--primary-cyan);">Título</th>
                        <th style="padding: 1rem; color: var(--primary-cyan);">Ordem</th>
                        <th style="padding: 1rem; color: var(--primary-cyan); text-align: right;">Ações</th>
                    </tr>
                </thead>
                <tbody id="servicesList">
                    <!-- Loaded dynamically -->
                </tbody>
            </table>
        </div>
    </main>

    <!-- Mobile Bottom Nav (Admin) -->
    <nav class="mobile-bottom-nav" style="display: none; position: fixed; bottom: 0; left: 0; width: 100%; background: #050505; border-top: 1px solid rgba(255,255,255,0.1); z-index: 1000; padding: 10px 0; justify-content: space-around; align-items: center;">
        <a href="index.php" class="mobile-nav-item" style="display: flex; flex-direction: column; align-items: center; color: var(--text-secondary); text-decoration: none; font-size: 0.75rem;">
            <span class="material-icons">dashboard</span>
            <span>Unresumo</span>
        </a>
        <a href="services.php" class="mobile-nav-item active" style="display: flex; flex-direction: column; align-items: center; color: var(--primary-cyan); text-decoration: none; font-size: 0.75rem;">
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

    <!-- Modal Form -->
    <div id="serviceModal" class="modal">
        <div class="modal-content">
            <span class="close" onclick="closeModal()">&times;</span>
            <h3 id="modalTitle" style="margin-bottom: 1.5rem;">Adicionar Serviço</h3>
            
            <form id="serviceForm">
                <input type="hidden" id="serviceId">
                
                <label>Título</label>
                <input type="text" id="title" required placeholder="Ex: Consultoria de IA">
                
                <label>Descrição</label>
                <textarea id="description" rows="3" required placeholder="Breve descrição..."></textarea>
                
                <label>Ícone (Nome do Material Icon ou URL)</label>
                <input type="text" id="icon_name" required placeholder="Ex: rocket_launch">
                
                <label>Link de Destino</label>
                <input type="text" id="link_url" placeholder="Ex: #contato">

                <label>Ordem de Exibição</label>
                <input type="number" id="display_order" value="0">
                
                <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                    <button type="submit" class="btn btn-primary" style="flex: 1;">Salvar</button>
                    <button type="button" onclick="closeModal()" class="btn btn-secondary" style="flex: 1;">Cancelar</button>
                </div>
            </form>
        </div>
    </div>

    <script>
        // Safety timeout
        const safetyTimeout = setTimeout(() => {
             console.warn('Auth check slow. Redirecting...');
             window.location.replace('login.php');
        }, 5000); // 5s timeout

        async function initServices() {
            try {
                if (typeof supabase === 'undefined') throw new Error('Supabase SDK missing');
                
                // Hardcoded Creds
                const SUPABASE_URL = 'https://lriapvoderqzvecjezpe.supabase.co';
                const SUPABASE_KEY = 'sb_publishable_0LC5NFaOnDhc7oySD11G1w_7HPBP2td';

                const { createClient } = supabase;
                const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

                // Auth Check
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
                clearTimeout(safetyTimeout);
                document.body.style.display = 'flex'; // Allow Access
                
                // Setup Listeners
                document.getElementById('logoutBtn').addEventListener('click', async () => {
                     await supabaseClient.auth.signOut();
                     window.location.href = 'login.php';
                });

                // Load Data
                loadServices(supabaseClient);

                // Modal Logic
                setupModal(supabaseClient);

            } catch (err) {
                console.error('Auth error:', err);
                window.location.replace('login.php');
            }
        }

        async function loadServices(client) {
            const tbody = document.getElementById('servicesList');
            tbody.innerHTML = '<tr><td colspan="4" style="padding:1rem;">Carregando...</td></tr>';

            const { data, error } = await client
                .from('services')
                .select('*')
                .order('display_order', { ascending: true });

            if (error) {
                console.error(error);
                tbody.innerHTML = '<tr><td colspan="4">Erro ao carregar.</td></tr>';
                return;
            }

            tbody.innerHTML = '';
            if (!data || data.length === 0) {
                 tbody.innerHTML = '<tr><td colspan="4">Nenhum serviço encontrado.</td></tr>';
                 return;
            }

            data.forEach(service => {
                const tr = document.createElement('tr');
                tr.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
                tr.innerHTML = `
                    <td style="padding: 1rem;"><span class="material-icons">${service.icon_name}</span></td>
                    <td style="padding: 1rem;"><strong>${service.title}</strong><br><small>${service.description.substring(0, 30)}...</small></td>
                    <td style="padding: 1rem;">${service.display_order}</td>
                    <td style="padding: 1rem; text-align: right;">
                        <button onclick='editService(${JSON.stringify(service)})' style="background:none; border:none; color:white; cursor:pointer; margin-right:10px;"><span class="material-icons">edit</span></button>
                        <button onclick="deleteService(${service.id})" style="background:none; border:none; color:#ff4d4d; cursor:pointer;"><span class="material-icons">delete</span></button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }

        // Modal Logic
        const modal = document.getElementById('serviceModal');
        
        function setupModal(client) {
            window.openModal = () => {
                document.getElementById('serviceForm').reset();
                document.getElementById('serviceId').value = '';
                document.getElementById('modalTitle').textContent = 'Adicionar Serviço';
                modal.style.display = 'flex';
            };
            window.closeModal = () => modal.style.display = 'none';
            
            window.editService = (service) => {
                document.getElementById('serviceId').value = service.id;
                document.getElementById('title').value = service.title;
                document.getElementById('description').value = service.description;
                document.getElementById('icon_name').value = service.icon_name;
                document.getElementById('link_url').value = service.link_url;
                document.getElementById('display_order').value = service.display_order;
                document.getElementById('modalTitle').textContent = 'Editar Serviço';
                modal.style.display = 'flex';
            };

            document.getElementById('serviceForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                const id = document.getElementById('serviceId').value;
                const formData = {
                    title: document.getElementById('title').value,
                    description: document.getElementById('description').value,
                    icon_name: document.getElementById('icon_name').value,
                    link_url: document.getElementById('link_url').value,
                    display_order: parseInt(document.getElementById('display_order').value)
                };

                let actionError;
                if (id) {
                    const { error } = await client.from('services').update(formData).eq('id', id);
                    actionError = error;
                } else {
                    const { error } = await client.from('services').insert([formData]);
                    actionError = error;
                }

                if (actionError) alert('Erro: ' + actionError.message);
                else {
                    closeModal();
                    loadServices(client);
                }
            });

            window.deleteService = async (id) => {
                if (confirm('Tem certeza?')) {
                    const { error } = await client.from('services').delete().eq('id', id);
                    if (error) alert('Erro: ' + error.message);
                    else loadServices(client);
                }
            };
        }

        initServices();
    </script>
</body>
</html>
