'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Simple class merger utility for our premium component
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

export interface SelectOption {
  label: string;
  value: string;
  icon?: string;
}

export interface SelectProps {
  label?: string;
  required?: boolean;
  options: SelectOption[];
  error?: string;
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  searchable?: boolean;
  disabled?: boolean;
  name?: string;
  position?: 'top' | 'bottom' | 'up' | 'down';
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      required = false,
      options = [],
      error,
      placeholder = 'Select option...',
      value,
      onChange,
      searchable = false,
      disabled = false,
      name,
      position = 'bottom',
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const hiddenSelectRef = useRef<HTMLSelectElement>(null);

    // Merge refs for the hidden select
    useEffect(() => {
      if (!ref) return;
      if (typeof ref === 'function') {
        ref(hiddenSelectRef.current);
      } else {
        (ref as React.MutableRefObject<HTMLSelectElement | null>).current = hiddenSelectRef.current;
      }
    }, [ref]);

    const selectedOption = useMemo(() => 
      options.find(opt => opt.value === value), 
      [options, value]
    );

    const filteredOptions = useMemo(() => {
      if (!searchQuery) return options;
      return options.filter(opt => 
        opt.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }, [options, searchQuery]);

    const handleSelect = (optionValue: string) => {
      if (disabled) return;
      
      // Trigger native-like change event
      if (hiddenSelectRef.current) {
        hiddenSelectRef.current.value = optionValue;
        
        // Dispatch React-compatible change event
        const event = new Event('change', { bubbles: true }) as unknown as React.ChangeEvent<HTMLSelectElement>;
        Object.defineProperty(event, 'target', { 
          writable: true, 
          value: hiddenSelectRef.current 
        });
        
        // Call parent onChange handler
        onChange?.(event);
      }
      
      setIsOpen(false);
      setSearchQuery('');
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Custom design tokens matching ISHA 3D premium theme
    const triggerStyles: React.CSSProperties = {
      display: 'flex',
      width: '100%',
      padding: '0.9rem 1.1rem',
      alignItems: 'center',
      justifyContent: 'between',
      borderRadius: '12px',
      border: isOpen || isFocused
        ? '1px solid var(--primary-orange)' 
        : error 
          ? '1px solid #FF3B30' 
          : '1px solid var(--border-medium)',
      background: disabled ? 'rgba(240, 240, 240, 0.5)' : '#FFFFFF',
      boxShadow: (isOpen || isFocused) && !disabled
        ? '0 0 10px rgba(212, 92, 42, 0.12)' 
        : 'none',
      color: disabled ? 'var(--text-muted)' : 'var(--text-primary)',
      fontSize: '0.95rem',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
      outline: 'none',
      textAlign: 'left',
    };

    const dropdownStyles: React.CSSProperties = {
      position: 'absolute',
      left: 0,
      right: 0,
      zIndex: 50,
      marginTop: '0.5rem',
      marginBottom: '0.5rem',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid var(--glass-border)',
      borderRadius: '16px',
      boxShadow: 'var(--shadow-lg)',
      overflow: 'hidden',
    };

    return (
      <div 
        className={cn("flex flex-col relative w-full", className)} 
        ref={containerRef}
        style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
      >
        {/* Hidden native select for form accessibility/compatibility */}
        <select
          ref={hiddenSelectRef}
          value={value}
          onChange={onChange}
          className="hidden"
          name={name}
          disabled={disabled}
          style={{ display: 'none' }}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {label && (
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center' }}>
            {label}
            {required && <span style={{ color: 'var(--primary-orange)', marginLeft: '0.25rem' }}>*</span>}
          </label>
        )}

        <div className="relative" style={{ position: 'relative' }}>
          {/* Custom Trigger */}
          <button
            type="button"
            disabled={disabled}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            onFocus={() => !disabled && setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={triggerStyles}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', overflow: 'hidden' }}>
              {selectedOption?.icon && (
                <div style={{ display: 'flex', height: '24px', width: '24px', flexShrink: 0, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderRadius: '4px', background: '#F8F9FA' }}>
                  <img src={selectedOption.icon} alt="" style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
                </div>
              )}
              <span style={{ 
                flex: 1, 
                whiteSpace: 'nowrap', 
                overflow: 'hidden', 
                textOverflow: 'ellipsis',
                color: selectedOption ? 'var(--text-primary)' : 'var(--text-muted)' 
              }}>
                {selectedOption ? selectedOption.label : placeholder}
              </span>
            </div>
            <ChevronDown
              size={18}
              style={{
                color: 'var(--text-secondary)',
                transition: 'transform 0.2s ease',
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                marginLeft: '0.5rem',
                flexShrink: 0
              }}
            />
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: (position === 'top' || position === 'up') ? 10 : -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: (position === 'top' || position === 'up') ? 10 : -10 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                style={{
                  ...dropdownStyles,
                  ...(position === 'top' || position === 'up' ? { bottom: '100%' } : { top: '100%' })
                }}
              >
                {searchable && (
                  <div style={{ position: 'sticky', top: 0, borderBottom: '1px solid var(--border-medium)', background: '#FFFFFF', padding: '0.5rem' }}>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <Search size={14} style={{ position: 'absolute', left: '0.75rem', color: 'var(--text-muted)' }} />
                      <input
                        autoFocus
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                          height: '36px',
                          width: '100%',
                          borderRadius: '8px',
                          background: 'rgba(0,0,0,0.03)',
                          border: 'none',
                          paddingLeft: '2.2rem',
                          paddingRight: '2rem',
                          fontSize: '0.875rem',
                          color: 'var(--text-primary)',
                          outline: 'none',
                          transition: 'background 0.2s',
                        }}
                        onFocus={(e) => e.target.style.background = 'rgba(0,0,0,0.05)'}
                        onBlur={(e) => e.target.style.background = 'rgba(0,0,0,0.03)'}
                        onKeyDown={(e) => {
                          if (e.key === 'Escape') setIsOpen(false);
                          e.stopPropagation();
                        }}
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          type="button"
                          style={{
                            position: 'absolute',
                            right: '0.5rem',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '4px',
                            borderRadius: '4px',
                          }}
                        >
                          <X size={12} style={{ color: 'var(--text-secondary)' }} />
                        </button>
                      )}
                    </div>
                  </div>
                )}

                <div style={{ maxHeight: '240px', overflowY: 'auto', padding: '4px' }}>
                  {filteredOptions.length > 0 ? (
                    filteredOptions.map((option) => {
                      const isSelected = value === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => handleSelect(option.value)}
                          style={{
                            display: 'flex',
                            width: '100%',
                            alignItems: 'center',
                            gap: '0.75rem',
                            borderRadius: '8px',
                            padding: '0.7rem 0.9rem',
                            textAlign: 'left',
                            fontSize: '0.9rem',
                            border: 'none',
                            background: isSelected 
                              ? 'rgba(212, 92, 42, 0.08)' 
                              : 'transparent',
                            color: isSelected 
                              ? 'var(--primary-orange)' 
                              : 'var(--text-primary)',
                            fontWeight: isSelected ? 600 : 500,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                          onMouseOver={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.background = 'rgba(0,0,0,0.03)';
                            }
                          }}
                          onMouseOut={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.background = 'transparent';
                            }
                          }}
                        >
                          {option.icon && (
                            <div style={{ display: 'flex', height: '24px', width: '24px', flexShrink: 0, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderRadius: '4px', background: '#F8F9FA' }}>
                              <img src={option.icon} alt="" style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
                            </div>
                          )}
                          <span style={{ 
                            whiteSpace: 'nowrap', 
                            overflow: 'hidden', 
                            textOverflow: 'ellipsis' 
                          }}>
                            {option.label}
                          </span>
                        </button>
                      );
                    })
                  ) : (
                    <div style={{ padding: '1rem 0', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      No results found
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {error && <p style={{ color: '#FF3B30', fontSize: '0.8rem', marginTop: '0.25rem' }}>{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select };
