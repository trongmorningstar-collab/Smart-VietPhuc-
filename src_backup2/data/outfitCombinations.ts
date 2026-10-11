export interface OutfitCombination {
  outfitId: string;
  colorKey: string;
  accessoryId: string;
  imagePath: string;
}

export const outfitCombinations: OutfitCombination[] = [
  // Thêm dữ liệu demo (có thể mở rộng sau)
  {
    outfitId: "nam-bo-01",
    colorKey: "green",
    accessoryId: "quat-xep",
    imagePath: "/assets/combinations/nam-bo-01/green-fan.webp"
  }
];
