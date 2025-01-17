import React from 'react';
import { render, screen } from '@testing-library/react';
import Index from '../Index';

// Mock the components used in Index
jest.mock('@/components/NumberPicker', () => {
  return function MockNumberPicker() {
    return <div data-testid="number-picker">Number Picker</div>;
  };
});

jest.mock('@/components/Statistics', () => {
  return function MockStatistics() {
    return <div data-testid="statistics">Statistics</div>;
  };
});

jest.mock('@/components/Logo', () => {
  return function MockLogo() {
    return <div data-testid="logo">Logo</div>;
  };
});

describe('Index Page', () => {
  it('renders with correct semantic structure', () => {
    render(<Index />);
    
    // Check main tag exists
    const mainElement = document.querySelector('main');
    expect(mainElement).toBeInTheDocument();
    
    // Check header tag exists
    const headerElement = document.querySelector('header');
    expect(headerElement).toBeInTheDocument();
    
    // Check h1 exists and has correct text
    const h1Element = screen.getByRole('heading', { level: 1 });
    expect(h1Element).toHaveTextContent('UK Lottery Number Analyzer');
  });

  it('renders all required components', () => {
    render(<Index />);
    
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('number-picker')).toBeInTheDocument();
    // Statistics component is not rendered initially as it requires selected numbers
  });

  it('has proper HTML structure nesting', () => {
    render(<Index />);
    
    const mainElement = document.querySelector('main');
    const headerElement = document.querySelector('header');
    
    // Check proper nesting
    expect(headerElement?.parentElement?.parentElement).toBe(mainElement);
  });
});