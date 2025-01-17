import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Header from '../Header';

// Mock the toast hook
vi.mock('@/components/ui/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn()
  })
}));

// Mock Logo component
vi.mock('../Logo', () => ({
  default: () => <div data-testid="mock-logo">Logo</div>
}));

describe('Header', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
  });

  it('renders logo and share button', () => {
    render(<Header />);
    
    expect(screen.getByTestId('mock-logo')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /share/i })).toBeInTheDocument();
  });

  it('uses Web Share API when available', async () => {
    const mockShare = vi.fn();
    global.navigator.share = mockShare;

    render(<Header />);
    
    const shareButton = screen.getByRole('button', { name: /share/i });
    await fireEvent.click(shareButton);

    expect(mockShare).toHaveBeenCalledWith({
      title: document.title,
      url: window.location.href,
      text: "Check out this UK Lottery Number Analyzer!"
    });
  });

  it('falls back to clipboard when Web Share API is not available', async () => {
    // Remove share API
    delete global.navigator.share;
    
    const mockClipboard = {
      writeText: vi.fn().mockResolvedValue(undefined)
    };
    global.navigator.clipboard = mockClipboard;

    render(<Header />);
    
    const shareButton = screen.getByRole('button', { name: /share/i });
    await fireEvent.click(shareButton);

    expect(mockClipboard.writeText).toHaveBeenCalledWith(window.location.href);
  });
});