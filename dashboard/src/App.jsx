import { useState } from 'react'
import Sidebar from './components/Sidebar'
import KanbanBoard from './components/KanbanBoard'
import ReportViewer from './components/ReportViewer'

function App() {
  const [activeTab, setActiveTab] = useState('leads')

  return (
    <div className="flex min-h-screen bg-dark">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 p-8 overflow-hidden flex flex-col">
        <header className="flex justify-between items-center mb-10 px-4">
          <div>
            <h1 className="text-3xl font-bold">Olá, Vanderson 👋</h1>
            <p className="text-omd-gray text-sm mt-1">Sua agência está crescendo! Veja o que há de novo.</p>
          </div>

          <div className="flex gap-4">
            <div className="glass-card px-4 py-2 flex items-center gap-3">
              <span className="text-xs text-omd-gray uppercase font-bold tracking-widest">Leads Hoje</span>
              <span className="text-xl font-bold text-primary-cyan">+12</span>
            </div>
            <div className="glass-card px-4 py-2 flex items-center gap-3">
              <span className="text-xs text-omd-gray uppercase font-bold tracking-widest">ROI Médio</span>
              <span className="text-xl font-bold text-primary-magenta">4.8x</span>
            </div>
          </div>
        </header>

        <section className="flex-1 overflow-hidden">
          {activeTab === 'leads' && <KanbanBoard />}
          {activeTab === 'reports' && <ReportViewer />}
          {activeTab === 'settings' && (
            <div className="glass-card p-10 text-center">
              <h2 className="text-xl font-bold mb-4">Configurações do Sistema</h2>
              <p className="text-omd-gray">Em breve mais opções de personalização para sua agência.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
