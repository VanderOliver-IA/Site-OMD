import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { MoreVertical, Flame, ThermometerSnowflake, Clock } from 'lucide-react';

const COLUMNS = [
    { id: 'new', label: 'Novos', color: '#00f3ff' },
    { id: 'contacting', label: 'Em Contato', color: '#ff00ff' },
    { id: 'qualified', label: 'Qualificados', color: '#ffd700' },
    { id: 'converted', label: 'Convertidos', color: '#00ff88' },
];

export default function KanbanBoard() {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeads();
    }, []);

    async function fetchLeads() {
        const { data, error } = await supabase
            .from('leads')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error) setLeads(data);
        setLoading(false);
    }

    const getStatusLeads = (status) => leads.filter(lead => lead.status === status);

    return (
        <div className="flex gap-6 h-full overflow-x-auto pb-4">
            {COLUMNS.map(column => (
                <div key={column.id} className="flex-shrink-0 w-80 flex flex-col gap-4">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: column.color }} />
                            <h3 className="font-semibold text-sm uppercase tracking-wider">{column.label}</h3>
                            <span className="text-xs bg-white/5 px-2 py-0.5 rounded-full text-omd-gray">
                                {getStatusLeads(column.id).length}
                            </span>
                        </div>
                    </div>

                    <div className="flex-1 space-y-4">
                        {getStatusLeads(column.id).map(lead => (
                            <div key={lead.id} className="glass-card p-4 hover:border-white/20 cursor-pointer group transition-all">
                                <div className="flex justify-between items-start mb-3">
                                    <div className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${lead.ia_score > 70 ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-500/20 text-blue-400'
                                        }`}>
                                        {lead.ia_score > 70 ? <Flame size={10} /> : <ThermometerSnowflake size={10} />}
                                        Score: {lead.ia_score}
                                    </div>
                                    <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        <MoreVertical size={14} className="text-omd-gray" />
                                    </button>
                                </div>

                                <h4 className="font-semibold text-sm mb-1">{lead.full_name}</h4>
                                <p className="text-xs text-omd-gray line-clamp-2 mb-3">{lead.ia_summary || lead.message_raw}</p>

                                <div className="flex items-center justify-between text-[10px] text-omd-gray">
                                    <div className="flex items-center gap-1">
                                        <Clock size={10} />
                                        {new Date(lead.created_at).toLocaleDateString()}
                                    </div>
                                    <div className="capitalize">{lead.source}</div>
                                </div>
                            </div>
                        ))}

                        {getStatusLeads(column.id).length === 0 && (
                            <div className="border-2 border-dashed border-white/5 rounded-2xl h-32 flex items-center justify-center text-xs text-omd-gray">
                                Vazio
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
