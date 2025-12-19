
import React, { useState } from 'react';
import StrategyForm from './components/StrategyForm';
import StrategyDashboard from './components/StrategyDashboard';
import { CompanyProfile, AIStrategyReport } from './types';
import { generateAIStrategy } from './services/geminiService';

const App: React.FC = () => {
  const [report, setReport] = useState<AIStrategyReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleProfileSubmit = async (profile: CompanyProfile) => {
    setIsLoading(true);
    setError(null);
    console.log("Enviando perfil a StratAI Engine...");

    try {
      const result = await generateAIStrategy(profile);
      if (result && result.pillars) {
        setReport(result);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error("El formato del informe es incorrecto.");
      }
    } catch (err: any) {
      console.error("Error en el flujo principal:", err);
      setError('No pudimos procesar la estrategia. Esto suele ocurrir por un pico de demanda o por datos insuficientes. Por favor, revisa tu conexión e inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setReport(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 py-4 px-8 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={handleReset}>
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md">S</div>
            <span className="text-slate-900 font-bold text-lg tracking-tight">StratAI <span className="text-indigo-600 font-medium">Suite</span></span>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">IA Conectada</span>
          </div>
        </div>
      </nav>

      <main className="flex-grow container mx-auto px-4 py-12">
        {!report ? (
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-6">
              <h1 className="serif text-5xl md:text-7xl text-slate-900 tracking-tight leading-none">
                Diseñe su ventaja <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">competitiva</span>
              </h1>
              <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
                Herramienta de nivel ejecutivo para transformar objetivos de negocio en una hoja de ruta de Inteligencia Artificial accionable.
              </p>
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 p-6 rounded-2xl flex items-center gap-4 shadow-sm animate-in slide-in-from-top-2">
                <div className="text-2xl">⚠️</div>
                <div className="text-sm font-medium">{error}</div>
              </div>
            )}

            <StrategyForm onSubmit={handleProfileSubmit} isLoading={isLoading} />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60">
              <div className="p-6 border border-slate-200 rounded-2xl text-center space-y-2">
                <div className="font-bold text-slate-800">Eficiencia</div>
                <p className="text-xs text-slate-500 leading-relaxed">Reducción de costes mediante automatización inteligente.</p>
              </div>
              <div className="p-6 border border-slate-200 rounded-2xl text-center space-y-2">
                <div className="font-bold text-slate-800">Crecimiento</div>
                <p className="text-xs text-slate-500 leading-relaxed">Nuevos productos impulsados por capacidades de IA.</p>
              </div>
              <div className="p-6 border border-slate-200 rounded-2xl text-center space-y-2">
                <div className="font-bold text-slate-800">Decisión</div>
                <p className="text-xs text-slate-500 leading-relaxed">Soporte de datos en tiempo real para el C-Level.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in duration-1000">
            <StrategyDashboard report={report} onReset={handleReset} />
          </div>
        )}
      </main>

      <footer className="bg-white py-8 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-[10px] font-semibold uppercase tracking-widest">
          <p>© 2025 StratAI Executive Suite. Procesado con Gemini 3 Pro.</p>
          <div className="flex gap-6">
            <span className="hover:text-indigo-600 cursor-pointer">Protocolo de Datos</span>
            <span className="hover:text-indigo-600 cursor-pointer">Gobernanza IA</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
