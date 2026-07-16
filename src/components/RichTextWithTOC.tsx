import React, { useEffect, useState, useRef } from 'react';

interface RichTextWithTOCProps {
  htmlContent: string;
}

interface TOCItem {
  id: string;
  text: string;
}

const RichTextWithTOC: React.FC<RichTextWithTOCProps> = ({ htmlContent }) => {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      // Tìm tất cả các thẻ h2 trong nội dung
      const h2Elements = contentRef.current.querySelectorAll('h2');
      const tocItems: TOCItem[] = [];

      h2Elements.forEach((h2, index) => {
        // Tạo ID cho thẻ h2 nếu chưa có
        const id = h2.id || `heading-${index}`;
        h2.id = id;
        
        tocItems.push({
          id,
          text: h2.innerText
        });
      });

      setToc(tocItems);
    }
  }, [htmlContent]);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Cuộn đến vị trí h2, trừ đi khoảng cách ở trên (100px)
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (!htmlContent) return <p>Sản phẩm sơn cao cấp.</p>;

  // Nếu không có thẻ H2 nào, render như bình thường
  if (toc.length === 0) {
    return (
      <div 
        ref={contentRef} 
        dangerouslySetInnerHTML={{ __html: htmlContent }} 
        className="product-rich-text"
        style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#334155' }}
      />
    );
  }

  return (
    <div style={{ marginTop: '40px', borderTop: '1px solid var(--border)', paddingTop: '40px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        {/* TOC Box */}
        <div style={{ 
          background: '#f8fafc', 
          border: '1px solid #e2e8f0', 
          borderRadius: '8px', 
          padding: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.5rem' }}>📑</span> MỤC LỤC
          </h3>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {toc.map((item, index) => (
              <li key={item.id}>
                <a 
                  href={`#${item.id}`} 
                  onClick={(e) => handleScrollTo(e, item.id)}
                  style={{ 
                    color: 'var(--primary)', 
                    textDecoration: 'none', 
                    fontSize: '1.05rem',
                    fontWeight: 500,
                    transition: 'color 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary-hover)'}
                  onMouseOut={(e) => e.currentTarget.style.color = 'var(--primary)'}
                >
                  {index + 1}. {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* HTML Content */}
        <div 
          ref={contentRef} 
          dangerouslySetInnerHTML={{ __html: htmlContent }} 
          className="product-rich-text"
          style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#334155' }}
        />
      </div>
    </div>
  );
};

export default RichTextWithTOC;
