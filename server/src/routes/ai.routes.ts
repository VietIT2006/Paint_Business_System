import express from 'express';
import multer from 'multer';
import { AIService } from '../services/ai.service';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/advice', upload.single('image'), async (req, res) => {
  try {
    const { message } = req.body;
    let imageBase64;
    let mimeType;

    if (req.file) {
      imageBase64 = req.file.buffer.toString('base64');
      mimeType = req.file.mimetype;
    }

    if (!message && !imageBase64) {
      return res.status(400).json({ success: false, message: 'Vui lòng cung cấp tin nhắn hoặc hình ảnh' });
    }

    const advice = await AIService.getAdvice(message || 'Vui lòng tư vấn dựa vào hình ảnh này', mimeType, imageBase64);

    res.json({ success: true, data: advice });
  } catch (error: any) {
    console.error('Lỗi AI Router:', error);
    res.status(500).json({ success: false, message: error.message || 'Lỗi server' });
  }
});

export default router;
