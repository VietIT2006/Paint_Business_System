import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '30px' }}>
      <button 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
        style={{ padding: '8px 15px', borderRadius: '5px', border: '1px solid var(--border)', background: currentPage === 1 ? '#f3f4f6' : 'var(--surface)', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
      >
        Trước
      </button>

      {pages.map(page => (
        <button 
          key={page}
          onClick={() => onPageChange(page)}
          style={{ 
            width: '36px', height: '36px', 
            borderRadius: '5px', 
            border: page === currentPage ? '1px solid var(--primary)' : '1px solid var(--border)', 
            background: page === currentPage ? 'var(--primary)' : 'var(--surface)', 
            color: page === currentPage ? 'white' : 'var(--text-main)',
            cursor: 'pointer',
            fontWeight: page === currentPage ? 'bold' : 'normal'
          }}
        >
          {page}
        </button>
      ))}

      <button 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
        style={{ padding: '8px 15px', borderRadius: '5px', border: '1px solid var(--border)', background: currentPage === totalPages ? '#f3f4f6' : 'var(--surface)', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
      >
        Tiếp
      </button>
    </div>
  );
};

export default Pagination;
