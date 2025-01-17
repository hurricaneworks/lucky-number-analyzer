import { render } from '@testing-library/react';
import { Helmet } from 'react-helmet';
import SEO from '../SEO';

jest.mock('react-helmet', () => ({
  Helmet: jest.fn().mockImplementation(({ children }) => children)
}));

describe('SEO Component', () => {
  it('renders with default props', () => {
    render(<SEO />);
    
    // Check default meta tags
    const title = document.title;
    const description = document.querySelector('meta[name="description"]')?.getAttribute('content');
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
    
    expect(title).toBe('UK Lottery Number Analyzer - Check Your Lottery Numbers Statistics');
    expect(description).toBe('Free UK lottery number analyzer tool. Check historical statistics, winning patterns, and odds for Lotto and EuroMillions numbers. Make informed choices for your lottery picks.');
    expect(canonical).toBe('https://lovable.dev/projects/b0a53b35-bebb-4d0c-957e-07762397eb24');
  });

  it('renders with custom props', () => {
    const customTitle = 'Custom Title';
    const customDesc = 'Custom description';
    const customPath = '/custom';

    render(<SEO title={customTitle} description={customDesc} path={customPath} />);
    
    const title = document.title;
    const description = document.querySelector('meta[name="description"]')?.getAttribute('content');
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
    
    expect(title).toBe(customTitle);
    expect(description).toBe(customDesc);
    expect(canonical).toBe('https://lovable.dev/projects/b0a53b35-bebb-4d0c-957e-07762397eb24/custom');
  });
});
