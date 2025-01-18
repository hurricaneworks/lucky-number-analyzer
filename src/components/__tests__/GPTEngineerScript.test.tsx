import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/react';
import { GPTEngineerScript } from '../GPTEngineerScript';

describe('GPTEngineerScript', () => {
  const originalEnv = import.meta.env.DEV;

  beforeEach(() => {
    // Clean up any scripts that might have been added
    document.body.innerHTML = '';
  });

  afterEach(() => {
    vi.stubGlobal('import.meta', { env: { DEV: originalEnv } });
  });

  it('should add script in development mode', () => {
    vi.stubGlobal('import.meta', { env: { DEV: true } });
    render(<GPTEngineerScript />);
    
    const script = document.querySelector('script[src="https://cdn.gpteng.co/gptengineer.js"]');
    expect(script).toBeTruthy();
    expect(script?.getAttribute('type')).toBe('module');
  });

  it('should not add script in production mode', () => {
    vi.stubGlobal('import.meta', { env: { DEV: false } });
    render(<GPTEngineerScript />);
    
    const script = document.querySelector('script[src="https://cdn.gpteng.co/gptengineer.js"]');
    expect(script).toBeFalsy();
  });

  it('should cleanup script on unmount in development mode', () => {
    vi.stubGlobal('import.meta', { env: { DEV: true } });
    const { unmount } = render(<GPTEngineerScript />);
    unmount();
    
    const script = document.querySelector('script[src="https://cdn.gpteng.co/gptengineer.js"]');
    expect(script).toBeFalsy();
  });
});
