import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Download, Share2, Sparkles } from 'lucide-react';

const DUMMY_DATA = [
    { name: 'Seg', invest: 120, conversions: 12 },
    { name: 'Ter', invest: 300, conversions: 25 },
    { name: 'Qua', invest: 200, conversions: 18 },
    { name: 'Qui', invest: 450, conversions: 40 },
    { name: 'Sex', invest: 400, conversions: 35 },
    { name: 'Sab', invest: 150, conversions: 15 },
    { name: 'Dom', invest: 80, conversions: 8 },
];

export default function ReportViewer() {
    return (
        <div className="space-y-6 h-full overflow-y-auto pr-4">
            <div className="flex justify-between items-center bg-white/5 p-6 rounded-3xl border border-white/10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-omd-gradient flex items-center justify-center">
                        <Sparkles className="text-white" size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Relatório Estratégico Mensal</h2>
                        <p className="text-sm text-omd-gray">Análise gerada por IA para o Cliente: <span className="text-white">Agência OMD Premium</span></p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="btn-omd bg-white/5 border border-white/10 flex items-center gap-2 text-sm">
                        <Share2 size={16} /> Compartilhar
                    </button>
                    <button className="btn-omd bg-omd-gradient flex items-center gap-2 text-sm">
                        <Download size={16} /> Baixar PDF
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-card p-6 h-80">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-primary-cyan mb-6">Investimento vs Retorno</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={DUMMY_DATA}>
                            <defs>
                                <linearGradient id="colorInvest" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#00f3ff" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                            />
                            <Area type="monotone" dataKey="invest" stroke="#00f3ff" fillOpacity={1} fill="url(#colorInvest)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="glass-card p-6 h-80">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-primary-magenta mb-6">Conversões Reais</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={DUMMY_DATA}>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                            />
                            <Bar dataKey="conversions" fill="#ff00ff" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="glass-card p-8 border-l-4 border-l-primary-cyan">
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles size={18} className="text-primary-cyan" />
                    <h3 className="font-bold uppercase tracking-widest text-xs">Análise da IA (Insights OMD)</h3>
                </div>
                <p className="text-omd-gray leading-relaxed">
                    Os dados mostram um pico de engajamento na Quinta-feira, coincidindo com a nova campanha de Criativos Dinâmicos.
                    O CPV (Custo por Lead) reduziu em <span className="text-white font-bold">14%</span> comparado à semana anterior.
                    <br /><br />
                    <span className="text-primary-cyan font-semibold italic">Sugestão Estratégica:</span> Escalar o orçamento nas sextas e sábados para aproveitar o baixo CPM observado nas últimas 48 horas.
                </p>
            </div>
        </div>
    );
}
