import { GoogleGenerativeAI, Part } from '@google/generative-ai';

// Lấy API key từ biến môi trường
const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export class AIService {
  static async getAdvice(prompt: string, imageMimeType?: string, imageBase64?: string) {
    if (!apiKey) {
      throw new Error('Chưa cấu hình GEMINI_API_KEY. Vui lòng cập nhật file .env');
    }

    // Khởi tạo model, hỗ trợ tốt vision
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const systemInstruction = `Bạn là một chuyên gia tư vấn sơn nhà chuyên nghiệp với hơn 10 năm kinh nghiệm tại Việt Nam.
    Nhiệm vụ của bạn:
    1. Nếu khách hàng hỏi về cách pha màu, đưa ảnh màu sơn: Bạn hãy phân tích màu đó là màu gì, và tư vấn tỷ lệ pha cơ bản (ví dụ: cần % trắng, % vàng, % xanh...) dựa trên kinh nghiệm thực tế.
    2. Nếu khách hàng mô tả công trình (ví dụ: nhà hướng Tây, phòng ngủ bé gái, nhà thiếu sáng...): Hãy tư vấn cho họ nên dùng tông màu nào (nóng, lạnh, pastel...) và gợi ý một số dòng sơn phổ biến (như Dulux, Jotun, Nippon, Maxilite).
    
    Lưu ý: Luôn trả lời lịch sự, thân thiện, dùng ngôn ngữ tự nhiên. Định dạng câu trả lời bằng Markdown (dùng in đậm, in nghiêng, gạch đầu dòng) để dễ đọc.`;

    const fullPrompt = systemInstruction + '\n\nYêu cầu của khách hàng:\n' + prompt;

    let result;
    if (imageBase64 && imageMimeType) {
      const imagePart: Part = {
        inlineData: {
          data: imageBase64,
          mimeType: imageMimeType
        }
      };
      result = await model.generateContent([fullPrompt, imagePart]);
    } else {
      result = await model.generateContent(fullPrompt);
    }

    const response = await result.response;
    return response.text();
  }
}
