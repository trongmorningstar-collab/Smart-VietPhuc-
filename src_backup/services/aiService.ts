export interface AiStylistResponse {
  message: string;
  changes: {
    color: string | null;
    accessories: string[];
    style: string | null;
  };
  culturalScore: number;
  reason: string;
}

const fallbackResponse = (event: string, gender: string): AiStylistResponse => {
  const isMale = gender === 'nam';
  
  if (event === 'Đi lễ chùa') {
    return {
      message: "AI đang bận một chút, mình đã chuẩn bị một gợi ý phù hợp cho bạn ✨",
      changes: {
        color: "xanh-luc",
        accessories: isMale ? ["Vòng gỗ"] : ["Vòng ngọc"],
        style: "Trang nghiêm"
      },
      culturalScore: 9.5,
      reason: "Với không gian tâm linh, trang phục màu trầm và phụ kiện gỗ/ngọc thể hiện sự thành kính, khiêm nhường."
    };
  }
  
  // Default fallback
  return {
    message: "AI đang bận một chút, mình đã chuẩn bị một gợi ý phù hợp cho bạn ✨",
    changes: {
      color: "kem",
      accessories: isMale ? ["Quạt xếp"] : ["Túi nhỏ"],
      style: "Hiện đại"
    },
    culturalScore: 8.5,
    reason: "Sự kết hợp nhẹ nhàng mang tính ứng dụng cao, giữ được nét thanh lịch mà vẫn thoải mái."
  };
};

export const getAiSuggestion = async (context: any): Promise<AiStylistResponse> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    return new Promise(resolve => setTimeout(() => resolve(fallbackResponse(context.event, context.gender)), 800));
  }

  const prompt = `
Bạn là AI Stylist chuyên về Việt phục.
Context hiện tại:
- Giới tính: ${context.gender}
- Dịp: ${context.event}
- Đang chọn: ${context.clothingName}
- Màu đang chọn: ${context.color || 'Chưa chọn'}
- Phụ kiện: ${context.accessories.length > 0 ? context.accessories.join(', ') : 'Không dùng'}
- Phong cách: ${context.style || 'Chưa chọn'}

Yêu cầu trả về JSON chính xác theo format (không Markdown, không bọc \`\`\`json):
{
  "message": "lời nhận xét ngắn gọn 1-2 câu",
  "changes": {
    "color": "id_màu_phù_hợp",
    "accessories": ["phụ kiện 1", "phụ kiện 2"],
    "style": "tên_phong_cách"
  },
  "culturalScore": 8.0,
  "reason": "Giải thích vì sao lại gợi ý như vậy"
}

Các lựa chọn hợp lệ:
Màu: xanh-luc, kem, xanh-than, nau-dat, do-do
Phụ kiện Nam: Quạt xếp, Khăn đóng, Vòng gỗ, Không dùng
Phụ kiện Nữ: Túi nhỏ, Nón lá, Vòng ngọc, Không dùng
Phong cách: Trang nghiêm, Tối giản, Hiện đại, Gen Z
`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7 }
      })
    });

    if (!response.ok) throw new Error("API Error");

    const data = await response.json();
    let text = data.candidates[0].content.parts[0].text;
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return JSON.parse(text) as AiStylistResponse;
  } catch (error) {
    console.error("AI Stylist Error:", error);
    return fallbackResponse(context.event, context.gender);
  }
};

export interface GenerateImageContext {
  outfitName: string;
  selectedColor: string;
  selectedAccessory: string;
  selectedStyle: string;
  baseImageSrc: string;
}

export const generateVisualTryOn = async (context: GenerateImageContext): Promise<string> => {
  // BÁO CÁO: Chưa có backend endpoint /api/gemini-image.
  // Frontend không nên gọi API Edit Image chứa API Key trực tiếp.
  // Hàm này giả lập việc gọi API backend:
  try {
    const response = await fetch('/api/gemini-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(context)
    });
    
    if (!response.ok) {
      throw new Error(`Backend missing or error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.generatedImageBase64 || data.generatedImageUrl;
  } catch (error) {
    console.error("Visual Try-on Error:", error);
    throw error;
  }
};
