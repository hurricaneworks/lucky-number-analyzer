import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Header from '../Header';

const mockToast = vi.fn();

// Mock the toast hook
vi.mock('@/components/ui/use-toast', () => ({
  useToast: () => ({
    toast: mockToast
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
    
    // Reset navigator APIs
    delete global.navigator.share;
    delete global.navigator.clipboard;
  });

  it('renders logo and share button', () => {
    render(<Header />);
    
    expect(screen.getByTestId('mock-logo')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /share/i })).toBeInTheDocument();
  });

  it('uses Web Share API when available', async () => {
    const mockShare = vi.fn().mockResolvedValue(undefined);
    global.navigator.share = mockShare;

    render(<Header />);
    
    const shareButton = screen.getByRole('button', { name: /share/i });
    await fireEvent.click(shareButton);

    expect(mockShare).toHaveBeenCalledWith({
      title: document.title,
      url: window.location.href,
      text: "Check out this UK Lottery Number Analyzer!"
    });
    expect(mockToast).not.toHaveBeenCalled();
  });

  it('falls back to clipboard when Web Share API is not available', async () => {
    const mockClipboard = {
      writeText: vi.fn().mockResolvedValue(undefined)
    };
    global.navigator.clipboard = mockClipboard;

    render(<Header />);
    
    const shareButton = screen.getByRole('button', { name: /share/i });
    await fireEvent.click(shareButton);

    expect(mockClipboard.writeText).toHaveBeenCalledWith(window.location.href);
    expect(mockToast).toHaveBeenCalledWith({
      title: "Link copied!",
      description: "The URL has been copied to your clipboard.",
    });
  });

  it('handles user cancellation of Web Share API gracefully', async () => {
    const mockShare = vi.fn().mockRejectedValue(new Error('AbortError'));
    mockShare.mockRejectedValueOnce({ name: 'AbortError' });
    global.navigator.share = mockShare;

    render(<Header />);
    
    const shareButton = screen.getByRole('button', { name: /share/i });
    await fireEvent.click(shareButton);

    expect(mockShare).toHaveBeenCalled();
    expect(mockToast).not.toHaveBeenCalled();
  });

  it('shows error when neither Web Share nor Clipboard API is available', async () => {
    render(<Header />);
    
    const shareButton = screen.getByRole('button', { name: /share/i });
    await fireEvent.click(shareButton);

    expect(mockToast).toHaveBeenCalledWith({
      title: "Sharing not available",
      description: "Your browser doesn't support sharing or clipboard access.",
      variant: "destructive",
    });
  });

  it('handles clipboard API errors gracefully', async () => {
    const mockClipboard = {
      writeText: vi.fn().mockRejectedValue(new Error('Clipboard error'))
    };
    global.navigator.clipboard = mockClipboard;

    render(<Header />);
    
    const shareButton = screen.getByRole('button', { name: /share/i });
    await fireEvent.click(shareButton);

    expect(mockToast).toHaveBeenCalledWith({
      title: "Sharing failed",
      description: "There was an error sharing the link. Please try copying the URL manually.",
      variant: "destructive",
    });
  });
});
