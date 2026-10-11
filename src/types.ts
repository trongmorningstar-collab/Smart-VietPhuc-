export interface ClothingItem {
  id: string;
  gender: string;
  name: string;
  category: string;
  period_region: string;
  source: string;
  images: string[];
  origin: string;
  features: string;
  meaning_context: string;
  web_tags: string[];
  colors?: any[];
  representativeColor?: string;
}
