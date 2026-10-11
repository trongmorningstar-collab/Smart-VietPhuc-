export interface OutfitColor {
  key: string;
  label: string;
  image: string;
}

export interface MaleOutfit {
  id: string;
  name: string;
  category: string;
  tags: string[];
  representativeColor: string;
  colors: OutfitColor[];
}

export const maleOutfits: MaleOutfit[] = [
  {
    id: "nam-bo-01",
    name: "Áo Tỳ Bà / Áo Ngũ Thân Dân Gian",
    category: "Áo ngũ thân dân gian",
    tags: ["Nam", "Truyền thống", "Lễ hội"],
    representativeColor: "green",
    colors: [
      { key: "green", label: "Xanh lục trầm", image: "/assets/images/nam-bo-01/green.png" },
      { key: "cream", label: "Kem", image: "/assets/images/nam-bo-01/cream.png" },
      { key: "navy", label: "Xanh than", image: "/assets/images/nam-bo-01/navy.png" },
      { key: "brown", label: "Nâu đất", image: "/assets/images/nam-bo-01/brown.png" },
      { key: "red", label: "Đỏ đô", image: "/assets/images/nam-bo-01/red.png" }
    ]
  },
  {
    id: "nam-bo-02",
    name: "Áo Tấc / Áo Dài Dân Gian",
    category: "Áo ngũ thân",
    tags: ["Nam", "Cổ điển", "Lễ hội"],
    representativeColor: "navy",
    colors: [
      { key: "brown", label: "Nâu đất", image: "/assets/images/nam-bo-02/brown.png" },
      { key: "navy", label: "Xanh than", image: "/assets/images/nam-bo-02/navy.png" },
      { key: "cream", label: "Kem", image: "/assets/images/nam-bo-02/cream.png" },
      { key: "green", label: "Xanh lục trầm", image: "/assets/images/nam-bo-02/green.png" },
      { key: "red", label: "Đỏ đô", image: "/assets/images/nam-bo-02/red.png" }
    ]
  },
  {
    id: "nam-bo-03",
    name: "Áo Tỳ Bà / Áo Ngũ Thân Dân Gian",
    category: "Áo ngũ thân dân gian",
    tags: ["Nam", "Truyền thống", "Lễ hội"],
    representativeColor: "green",
    colors: [
      { key: "red", label: "Đỏ đô", image: "/assets/images/nam-bo-03/red.jpg" },
      { key: "brown", label: "Nâu đất", image: "/assets/images/nam-bo-03/brown.jpg" },
      { key: "cream", label: "Kem", image: "/assets/images/nam-bo-03/cream.jpg" },
      { key: "green", label: "Xanh lục trầm", image: "/assets/images/nam-bo-03/green.jpg" },
      { key: "navy", label: "Xanh than", image: "/assets/images/nam-bo-03/navy.jpg" }
    ]
  }
];
