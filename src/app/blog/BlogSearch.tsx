'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { WPCategory } from '@/services/wordpress';

interface BlogSearchProps {
  categories: WPCategory[];
  activeCategoryId?: number;
  initialSearch?: string;
}

export default function BlogSearch({ categories, activeCategoryId, initialSearch = '' }: BlogSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(initialSearch);

  // Sync state with URL change
  useEffect(() => {
    setSearchValue(searchParams.get('search') || '');
  }, [searchParams]);

  const handleCategoryChange = (categoryId?: number) => {
    const params = new URLSearchParams(window.location.search);
    
    if (categoryId) {
      params.set('category', String(categoryId));
    } else {
      params.delete('category');
    }
    
    // Reset page on filter change
    params.delete('page');
    
    router.push(`/blog?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    
    if (searchValue.trim()) {
      params.set('search', searchValue.trim());
    } else {
      params.delete('search');
    }
    
    // Reset page on search change
    params.delete('page');
    
    router.push(`/blog?${params.toString()}`);
  };

  const handleClear = () => {
    setSearchValue('');
    router.push('/blog');
  };

  return (
    <div style={{ marginBottom: '3.5rem' }}>
      {/* Search Input Bar */}
      <form 
        onSubmit={handleSearchSubmit} 
        style={{
          maxWidth: '600px',
          margin: '0 auto 2.5rem auto',
          position: 'relative',
          display: 'flex',
          gap: '0.75rem',
        }}
      >
        <div style={{ position: 'relative', flex: 1 }}>
          <input
            type="text"
            placeholder="Search architectural insights, neon designs..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{
              width: '100%',
              padding: '1.1rem 3rem 1.1rem 1.5rem',
              borderRadius: '50px',
              border: '1px solid var(--border-medium)',
              fontSize: '1rem',
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(10px)',
              outline: 'none',
              transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              color: 'var(--text-primary)',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--primary-orange)';
              e.target.style.boxShadow = '0 0 15px rgba(212, 92, 42, 0.15)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--border-medium)';
              e.target.style.boxShadow = 'none';
            }}
          />
          {searchValue && (
            <button
              type="button"
              onClick={handleClear}
              style={{
                position: 'absolute',
                right: '1.25rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '1.2rem',
              }}
            >
              ×
            </button>
          )}
        </div>
        <button
          type="submit"
          className="btn-primary"
          style={{
            padding: '0 2rem',
            whiteSpace: 'nowrap',
          }}
        >
          Search
        </button>
      </form>

      {/* Categories Horizontal Pills Bar */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        <button
          onClick={() => handleCategoryChange(undefined)}
          style={{
            padding: '0.6rem 1.5rem',
            borderRadius: '50px',
            border: '1px solid',
            borderColor: !activeCategoryId ? 'var(--primary-orange)' : 'var(--border-medium)',
            background: !activeCategoryId ? 'var(--primary-light)' : 'transparent',
            color: !activeCategoryId ? 'var(--primary-orange)' : 'var(--text-secondary)',
            fontWeight: !activeCategoryId ? '600' : '500',
            fontSize: '0.9rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) => {
            if (activeCategoryId) {
              e.currentTarget.style.borderColor = 'var(--primary-orange)';
              e.currentTarget.style.color = 'var(--primary-orange)';
            }
          }}
          onMouseOut={(e) => {
            if (activeCategoryId) {
              e.currentTarget.style.borderColor = 'var(--border-medium)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }
          }}
        >
          All Articles
        </button>
        {categories.map((cat) => {
          const isActive = activeCategoryId === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              style={{
                padding: '0.6rem 1.5rem',
                borderRadius: '50px',
                border: '1px solid',
                borderColor: isActive ? 'var(--primary-orange)' : 'var(--border-medium)',
                background: isActive ? 'var(--primary-light)' : 'transparent',
                color: isActive ? 'var(--primary-orange)' : 'var(--text-secondary)',
                fontWeight: isActive ? '600' : '500',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'var(--primary-orange)';
                  e.currentTarget.style.color = 'var(--primary-orange)';
                }
              }}
              onMouseOut={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'var(--border-medium)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
            >
              {cat.name} ({cat.count})
            </button>
          );
        })}
      </div>
    </div>
  );
}
