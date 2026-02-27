import { LayoutDashboard, Users, BarChart3, Settings, LogOut } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
    const menuItems = [
        { id: 'leads', label: 'CRM de Leads', icon: Users },
        { id: 'reports', label: 'Relatórios IA', icon: BarChart3 },
        { id: 'settings', label: 'Configurações', icon: Settings },
    ];

    return (
        <aside className="w-64 glass-card h-[calc(100vh-2rem)] sticky top-4 flex flex-col p-6 m-4">
            <div className="flex items-center gap-2 mb-10 px-2">
                <div className="w-8 h-8 rounded-lg bg-omd-gradient" />
                <span className="text-xl font-bold tracking-tight">OMD CRM</span>
            </div>

            <nav className="flex-1 space-y-2">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id
                                ? 'bg-primary-cyan/10 text-primary-cyan border border-primary-cyan/20'
                                : 'text-omd-gray hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <item.icon size={20} />
                        <span className="font-medium text-sm">{item.label}</span>
                    </button>
                ))}
            </nav>

            <button className="flex items-center gap-3 px-4 py-3 mt-auto text-omd-gray hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all">
                <LogOut size={20} />
                <span className="font-medium text-sm">Sair</span>
            </button>
        </aside>
    );
}
