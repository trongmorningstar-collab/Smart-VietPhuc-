export const getOutfitImage = (outfit: any, color: string) => {
  if (!outfit) return '/assets/images/default.jpg';

  const selected = outfit.colors?.find((c: any) => c.key === color);
  if (selected?.image) return selected.image;

  const representative = outfit.colors?.find(
    (c: any) => c.key === outfit.representativeColor
  );
  if (representative?.image) return representative.image;

  if (outfit.colors?.[0]?.image) return outfit.colors[0].image;

  return outfit.image ?? '/assets/images/default.jpg';
};