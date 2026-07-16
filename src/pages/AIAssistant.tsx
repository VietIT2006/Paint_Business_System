import React, { useState, useRef } from 'react';
import { Bot, Send, Image as ImageIcon, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import './AIAssistant.css'; // Will create this

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: 'user' | 'ai'; text: string; image?: string }[]>([
    { sender: 'ai', text: 'Xin chào! Tôi là Chuyên gia Tư vấn Sơn AI. Bạn cần tư vấn pha màu sơn hay chọn màu sơn cho công trình?' }
  ]);
  const [input, setInput] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      const reader = new FileReader();
      reader.onload = (x) => setImagePreview(x.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSend = async () => {
    if (!input.trim() && !image) return;

    const userMessage = input.trim();
    const messageObj = { sender: 'user' as const, text: userMessage, image: imagePreview || undefined };
    setMessages(prev => [...prev, messageObj]);
    setInput('');
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setLoading(true);

    try {
      const formData = new FormData();
      if (userMessage) formData.append('message', userMessage);
      if (image) formData.append('image', image);

      const res = await fetch('http://localhost:3000/api/ai/advice', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (data.success) {
        setMessages(prev => [...prev, { sender: 'ai', text: data.data }]);
      } else {
        setMessages(prev => [...prev, { sender: 'ai', text: 'Xin lỗi, đã có lỗi xảy ra: ' + data.message }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'ai', text: 'Không thể kết nối đến máy chủ AI.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-assistant-wrapper">
      {!isOpen && (
        <button className="ai-assistant-toggle" onClick={() => setIsOpen(true)}>
          <Bot size={30} />
        </button>
      )}

      {isOpen && (
        <div className="ai-assistant-window" style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', overflow: 'hidden' }}>
          {/* Header */}
          <div style={{ background: 'var(--primary)', padding: '15px 20px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ background: 'rgba(255,255,255,0.2)', padding: '8px', borderRadius: '50%' }}>
                <Bot size={24} />
              </div>
              <div>
                <h1 style={{ fontSize: '1.2rem', margin: 0 }}>Chuyên Gia Tư Vấn AI</h1>
                <p style={{ margin: 0, opacity: 0.8, fontSize: '0.8rem' }}>Đang trực tuyến</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
              <X size={24} />
            </button>
          </div>

          {/* Chat Area */}
          <div style={{ padding: '20px', height: '400px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px', background: '#f8fafc' }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '15px', flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row' }}>
              <div style={{ 
                background: msg.sender === 'user' ? 'var(--primary)' : 'white', 
                color: msg.sender === 'user' ? 'white' : 'var(--text-main)',
                padding: '15px 20px', 
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-sm)',
                maxWidth: '90%',
                border: msg.sender === 'ai' ? '1px solid var(--border)' : 'none'
              }}>
                {msg.image && (
                  <img src={msg.image} alt="User Upload" style={{ maxWidth: '100%', borderRadius: '8px', marginBottom: '10px' }} />
                )}
                {msg.sender === 'ai' ? (
                  <div className="ai-content markdown-body" style={{ lineHeight: '1.6' }}>
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                ) : (
                  <div>{msg.text}</div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={{ background: 'white', padding: '15px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                <em className="fa fa-spinner fa-spin"></em> AI đang suy nghĩ...
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div style={{ padding: '20px', borderTop: '1px solid var(--border)', background: 'white' }}>
          {imagePreview && (
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: '15px' }}>
              <img src={imagePreview} alt="Preview" style={{ height: '80px', borderRadius: '8px', border: '1px solid var(--border)' }} />
              <button onClick={removeImage} style={{ position: 'absolute', top: '-10px', right: '-10px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <X size={14} />
              </button>
            </div>
          )}
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => fileInputRef.current?.click()} style={{ padding: '10px 15px', background: '#f1f5f9', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', color: 'var(--text-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Tải ảnh lên">
              <ImageIcon size={20} />
            </button>
            <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" style={{ display: 'none' }} />
            
            <input 
              type="text" 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              onKeyPress={e => e.key === 'Enter' ? handleSend() : null}
              placeholder="Hỏi về cách pha màu, hoặc mô tả công trình của bạn..." 
              style={{ flex: 1, padding: '15px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }} 
            />
            
            <button onClick={handleSend} disabled={loading} className="btn" style={{ padding: '0 25px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Gửi <Send size={18} />
            </button>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
