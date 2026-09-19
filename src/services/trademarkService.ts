import { addMonths, format } from 'date-fns';

export interface Milestone {
  label: string;
  monthOffset: number;
}

export interface TrademarkScenario {
  id: string;
  title: string;
  description: string;
  estimatedMonths: number;
  color: string;
  milestones: Milestone[];
}

export const SCENARIOS: TrademarkScenario[] = [
  {
    id: 'smooth',
    title: 'No Issues (Smooth Sailing)',
    description: 'The application proceeds through review, publication, and registration without any office actions or oppositions.',
    estimatedMonths: 14,
    color: 'stone',
    milestones: [
      { label: 'Assigned to Examiner', monthOffset: 9 },
      { label: 'Publication', monthOffset: 11 },
    ],
  },
  {
    id: 'minor',
    title: 'Minor Office Action',
    description: 'A minor issue is raised (e.g., clarification of goods/services or disclaimer) that is easily resolvable.',
    estimatedMonths: 18,
    color: 'amber',
    milestones: [
      { label: 'Assigned to Examiner', monthOffset: 9 },
      { label: 'Office Action Response', monthOffset: 12 },
      { label: 'Publication', monthOffset: 15 },
    ],
  },
  {
    id: 'substantive',
    title: 'Substantive Office Action',
    description: 'A major issue is raised (e.g., likelihood of confusion or descriptiveness) requiring legal arguments or significant changes.',
    estimatedMonths: 24,
    color: 'rose',
    milestones: [
      { label: 'Assigned to Examiner', monthOffset: 9 },
      { label: 'Office Action Response', monthOffset: 15 },
      { label: 'Publication', monthOffset: 21 },
    ],
  },
];

export interface CalculationResult {
  scenarioId: string;
  estimatedDate: Date;
  formattedDate: string;
  milestones: { label: string; formattedDate: string }[];
}

export const calculateTrademarkDates = (
  filingDate: Date,
  scenarios: TrademarkScenario[] = SCENARIOS,
): CalculationResult[] => {
  return scenarios.map((scenario) => {
    const estimatedDate = addMonths(filingDate, scenario.estimatedMonths);
    const milestones = scenario.milestones.map((m) => ({
      label: m.label,
      formattedDate: format(addMonths(filingDate, m.monthOffset), 'MMM yyyy'),
    }));

    return {
      scenarioId: scenario.id,
      estimatedDate,
      formattedDate: format(estimatedDate, 'MMMM d, yyyy'),
      milestones,
    };
  });
};
