
import React, { useState } from 'react';
import { AIStrategicGoal, CompanyProfile } from '../types';

interface Props {
  onSubmit: (profile: CompanyProfile) => void;
  isLoading: boolean;
}

const StrategyForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [profile, setProfile] = useState<CompanyProfile>({
    name: '',
    industry: '',
    size: '',
    primaryGoals: [],
    currentTechStack: '',
    challenges: ''
  });

  const toggleGoal = (goal: AIStrategicGoal) => {
    setProfile(prev => ({
      ...prev,
      primaryGoals: prev.primaryGoals.includes(goal)
        ? prev.primaryGoals.filter(g => g !== goal)
        : [...prev.primaryGoals, goal]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (profile.primaryGoals.length === 0) {
      alert("Por favor, seleccione al menos un objetivo estratégico.");
      return;
    }
    if (!profile.size) {
      alert("Por favor, indique el tamaño de la organización.");
      return;
    }

    onSubmit(profile);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 md:p-10 rounded-3xl shadow-2xl shadow-slate-200/50 border border-white transition-all relative overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-md z-50 flex flex-col items-center justify-center space-y-6 animate-in fade-in duration-300">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-slate-100 rounded-full"></div>
            <div className="absolute top-0 w-20 h-20 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="text-center space-y-2">
            <p className="font-black text-2xl text-slate-900 tracking-tight">Generando Hoja de Ruta</p>
            <p className="text-slate-500 text-sm animate-pulse italic">Esto suele tardar menos de 10 segundos...</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Organización</label>
          <input
            required
            type="text"
            className="w-full p-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-indigo-200 outline-none transition-all text-slate-800 placeholder:text-slate-300"
            placeholder="Ej. Goldman Sachs"
            value={profile.name}
            onChange={e => setProfile({ ...profile, name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sector Industrial</label>
          <input
            required
            type="text"
            className="w-full p-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-indigo-200 outline-none transition-all text-slate-800 placeholder:text-slate-300"
            placeholder="Ej. Logística Farmacéutica"
            value={profile.industry}
            onChange={e => setProfile({ ...profile, industry: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Tamaño de la Empresa</label>
        <div className="flex flex-wrap justify-center gap-3">
          {['Startup', 'PYME', 'Corporación', 'Global 500'].map(s => (
            <button
              key={s}
              type="button"
              onClick={() => setProfile({ ...profile, size: s })}
              className={`px-6 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${
                profile.size === s 
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' 
                : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Ejes Estratégicos</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { id: AIStrategicGoal.OPTIMIZATION, label: 'Optimización', color: 'indigo' },
            { id: AIStrategicGoal.INNOVATION, label: 'Innovación', color: 'emerald' },
            { id: AIStrategicGoal.DECISION_MAKING, label: 'Decisiones', color: 'amber' },
          ].map(goal => {
            const isSelected = profile.primaryGoals.includes(goal.id);
            return (
              <button
                key={goal.id}
                type="button"
                onClick={() => toggleGoal(goal.id)}
                className={`p-6 rounded-3xl border-2 text-center transition-all ${
                  isSelected
                    ? `border-${goal.color}-500 bg-${goal.color}-50 shadow-inner scale-105`
                    : 'border-slate-50 bg-slate-50 text-slate-400 hover:bg-slate-100'
                }`}
              >
                <div className={`font-black text-lg ${isSelected ? `text-${goal.color}-700` : ''}`}>
                  {goal.label}
                </div>
                <div className="text-[10px] mt-1 font-bold uppercase opacity-60">
                  {isSelected ? 'Activo' : 'Inactivo'}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Stack Tecnológico</label>
          <textarea
            required
            className="w-full p-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-indigo-200 outline-none h-32 text-slate-800 text-sm"
            placeholder="Ej. SAP, AWS, silos de datos manuales..."
            value={profile.currentTechStack}
            onChange={e => setProfile({ ...profile, currentTechStack: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Puntos de Dolor</label>
          <textarea
            required
            className="w-full p-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-indigo-200 outline-none h-32 text-slate-800 text-sm"
            placeholder="Ej. Altos costos operativos, demora en reportes..."
            value={profile.challenges}
            onChange={e => setProfile({ ...profile, challenges: e.target.value })}
          />
        </div>
      </div>

      <button
        disabled={isLoading}
        type="submit"
        className={`w-full py-5 rounded-2xl font-black text-xl text-white tracking-tight shadow-xl transition-all ${
          isLoading 
            ? 'bg-slate-300 shadow-none' 
            : 'bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-1 active:scale-95 shadow-indigo-200'
        }`}
      >
        GENERAR ESTRATEGIA EJECUTIVA
      </button>
    </form>
  );
};

export default StrategyForm;
