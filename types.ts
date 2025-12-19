
export enum AIStrategicGoal {
  OPTIMIZATION = 'OPTIMIZATION',
  INNOVATION = 'INNOVATION',
  DECISION_MAKING = 'DECISION_MAKING'
}

export interface CompanyProfile {
  name: string;
  industry: string;
  size: string;
  primaryGoals: AIStrategicGoal[];
  currentTechStack: string;
  challenges: string;
}

export interface StrategyRecommendation {
  title: string;
  description: string;
  impactScore: number; // 1-100
  complexityScore: number; // 1-100
  roiEstimate: string;
}

export interface StrategyRoadmapStep {
  phase: string;
  duration: string;
  actions: string[];
}

export interface AIStrategyReport {
  executiveSummary: string;
  pillars: {
    optimization: StrategyRecommendation[];
    innovation: StrategyRecommendation[];
    decisions: StrategyRecommendation[];
  };
  roadmap: StrategyRoadmapStep[];
  risksAndMitigation: { risk: string; mitigation: string }[];
}
