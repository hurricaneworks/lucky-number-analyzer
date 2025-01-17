import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Meta Tags', () => {
  const indexHtml = fs.readFileSync(path.resolve(__dirname, '../../index.html'), 'utf-8');

  it('should have correct production URLs in meta tags', () => {
    expect(indexHtml).toContain('content="https://6numbers.net"');
    expect(indexHtml).toContain('href="https://6numbers.net"');
    expect(indexHtml).not.toContain('lovable.dev');
  });

  it('should have correct og:image and twitter:image URLs', () => {
    expect(indexHtml).toContain('content="https://6numbers.net/og-image.png"');
  });

  it('should have canonical URL', () => {
    expect(indexHtml).toContain('<link rel="canonical" href="https://6numbers.net"');
  });
});