/**
 * Returns the model image path based on gender selection.
 * Male → /assets/model-nam.jpg
 * Female → /assets/model-nu.jpg
 * Fallback → dataset image
 */
export const getModelImage = (gender: string | null): string => {
  if (gender === 'nam') return '/assets/model-nam.jpg';
  if (gender === 'nữ') return '/assets/model-nu.jpg';
  return '/assets/model-nam.jpg';
};
