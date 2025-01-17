import { describe, it, expect, vi, beforeEach } from 'vitest';
import config from './vite.config';

vi.mock('lovable-tagger', () => ({
  componentTagger: vi.fn(() => ({ name: 'lovable-tagger' }))
}));

describe('Vite config', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.NODE_ENV = 'development';
  });

  it('should load tagger plugin in development mode', async () => {
    const conf = await config({ mode: 'development' });
    expect(conf.plugins).toHaveLength(2);
    expect(conf.plugins[1]).toEqual({ name: 'lovable-tagger' });
  });

  it('should not load tagger plugin in production mode', async () => {
    const conf = await config({ mode: 'production' });
    expect(conf.plugins).toHaveLength(1);
    // Only react plugin should be present
    expect(conf.plugins[0]).toBeTruthy();
  });

  it('should exclude lovable-tagger from optimization', async () => {
    const conf = await config({ mode: 'development' });
    expect(conf.optimizeDeps?.exclude).toContain('lovable-tagger');
  });
});
