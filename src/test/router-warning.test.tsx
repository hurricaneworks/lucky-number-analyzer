import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render } from '@testing-library/react';
import App from '../App';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('Router Configuration', () => {
  beforeEach(() => {
    // Clear console warnings before each test
    console.warn = vi.fn();
  });

  it('should not show relative route resolution warning', () => {
    render(<App />);
    
    // Check if console.warn was called with the specific warning
    expect(console.warn).not.toHaveBeenCalledWith(
      expect.stringContaining('React Router Future Flag Warning: Relative route resolution within Splat routes')
    );
  });
});
