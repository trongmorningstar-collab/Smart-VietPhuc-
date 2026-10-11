import { create } from 'zustand';

interface StylingSession {
  gender: string | null;
  event: string | null;
  clothingId: string | null;
  color: string | null;
  accessories: string[];
  style: string | null;
  aiSuggestion: string | null;
  aestheticScore: number | null;
  culturalScore: number | null;
  culturalWarnings: string[];
  saved: boolean;
  generatedPreview: string | null;
  isGeneratingImage: boolean;
  imageGenerationError: string | null;
  setField: (field: keyof StylingSession, value: any) => void;
  reset: () => void;
}

export const useStylingStore = create<StylingSession>((set) => ({
  gender: null,
  event: null,
  clothingId: null,
  color: null,
  accessories: [],
  style: null,
  aiSuggestion: null,
  aestheticScore: null,
  culturalScore: null,
  culturalWarnings: [],
  saved: false,
  generatedPreview: null,
  isGeneratingImage: false,
  imageGenerationError: null,
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  reset: () => set({
    gender: null,
    event: null,
    clothingId: null,
    color: null,
    accessories: [],
    style: null,
    aiSuggestion: null,
    aestheticScore: null,
    culturalScore: null,
    culturalWarnings: [],
    saved: false,
    generatedPreview: null,
    isGeneratingImage: false,
    imageGenerationError: null,
  })
}));
