
import React from 'react';
import { AIStrategyReport, StrategyRecommendation } from '../types.ts';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

interface Props {
  report: AIStrategyReport;
  onReset: () => void;
}

const RecommendationCard: React.FC<{ rec: StrategyRecommendation; color: string }> = ({ rec, color }) => (
  <div className="bg-white p-5 rounded-xl border-l-4 shadow-sm hover:shadow-md transition-shadow" style={{ borderLeftColor: color }}>
    <h4 className="font-bold text-slate-800 text-lg">{rec.title}</h4>
    <p className="text-slate-600 text-sm mt-2 leading-relaxed">{rec.description}</p>
    <div className="mt-4 flex justify-between items-center text-xs font-semibold uppercase tracking-wider">
      <span className="text-indigo-600 bg-indigo-50 px-2 py-1 rounded">ROI: {rec.roiEstimate}</span>
      <div className="flex gap-4 text-slate-400">
        <span>Impacto: {rec.impactScore}</span>
        <span>Esfuerzo: {rec.complexityScore}</span>
      </div>
    </div>
  </div>
);

const StrategyDashboard: React.FC<Props> = ({ report, onReset }) => {
  const allRecs = [
    ...(report.pillars.optimization || []).map(r => ({ ...r, category: 'Optimización', fill: '#4f46e5' })),
    ...(report.pillars.innovation || []).map(r => ({ ...r, category: 'Innovación', fill: '#10b981' })),
    ...(report.pillars.decisions || []).map(r => ({ ...r, category: 'Decisiones', fill: '#f59e0b' }))
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-24 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-indigo-900 p-10 rounded-3xl text-white shadow-2xl">
        <div className="max-w-3xl">
          <span className="bg-indigo-500/30 text-indigo-100 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
            Hoja de Ruta Estratégica 2025
          </span>
          <h2 className="serif text-4xl mb-4">Plan de Transformación de IA</h2>
          <p className="text-indigo-100/80 leading-relaxed text-lg italic border-l-2 border-indigo-400 pl-4">
            "{report.executiveSummary}"
          </p>
        </div>
        <button
          onClick={onReset}
          className="px-6 py-3 bg-white text-indigo-900 font-bold rounded-xl hover:bg-indigo-50 transition-colors whitespace-nowrap shadow-xl"
        >
          Nueva Evaluación
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-800">Matriz Estratégica Impacto/Complejidad</h3>
            <p className="text-slate-500 text-sm">Priorización visual de iniciativas</p>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
                <XAxis type="number" dataKey="complexityScore" name="Complejidad" unit="%" domain={[0, 100]} />
                <YAxis type="number" dataKey="impactScore" name="Impacto" unit="%" domain={[0, 100]} />
                <ZAxis type="number" dataKey="impactScore" range={[100, 500]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Iniciativas" data={allRecs}>
                  {allRecs.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                  <LabelList dataKey="title" position="top" style={{ fontSize: '11px', fill: '#475569', fontWeight: 'bold' }} />
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            Cronograma de Ejecución
          </h3>
          <div className="space-y-6">
            {report.roadmap.map((step, idx) => (
              <div key={idx} className="relative pl-6 border-l-2 border-indigo-500/30">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500 border-4 border-slate-900"></div>
                <div className="font-bold text-indigo-300 uppercase text-xs mb-1">{step.phase} ({step.duration})</div>
                <ul className="text-slate-300 text-sm space-y-2">
                  {step.actions.map((action, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-indigo-500 mt-1">•</span> {action}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800 border-b-2 border-indigo-200 pb-2">Optimización</h3>
          {report.pillars.optimization?.map((r, i) => <RecommendationCard key={i} rec={r} color="#4f46e5" />)}
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800 border-b-2 border-emerald-200 pb-2">Innovación</h3>
          {report.pillars.innovation?.map((r, i) => <RecommendationCard key={i} rec={r} color="#10b981" />)}
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800 border-b-2 border-amber-200 pb-2">Decisiones</h3>
          {report.pillars.decisions?.map((r, i) => <RecommendationCard key={i} rec={r} color="#f59e0b" />)}
        </div>
      </div>

      <div className="bg-red-50 p-8 rounded-3xl border border-red-100">
        <h3 className="text-xl font-bold text-red-900 mb-6 flex items-center gap-2">
          Gobernanza y Gestión de Riesgos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {report.risksAndMitigation.map((item, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-red-200">
              <div className="font-bold text-red-800 text-sm mb-2">RIESGO: {item.risk}</div>
              <div className="text-slate-700 text-sm leading-relaxed"><span className="font-bold text-red-600">MITIGACIÓN:</span> {item.mitigation}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StrategyDashboard;
