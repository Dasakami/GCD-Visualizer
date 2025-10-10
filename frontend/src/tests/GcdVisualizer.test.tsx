import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GcdVisualizer } from '../components/GcdVisualizer';
import { GcdStep } from '../types';

const mockSteps: GcdStep[] = [
  {
    step: 1,
    a: 48,
    b: 18,
    quotient: 2,
    remainder: 12,
    operation: '48 mod 18',
    explanation: 'Divide 48 by 18. The quotient is 2 and the remainder is 12.',
  },
  {
    step: 2,
    a: 18,
    b: 12,
    quotient: 1,
    remainder: 6,
    operation: '18 mod 12',
    explanation: 'Divide 18 by 12. The quotient is 1 and the remainder is 6.',
  },
  {
    step: 3,
    a: 12,
    b: 6,
    quotient: 2,
    remainder: 0,
    operation: '12 mod 6',
    explanation: 'Divide 12 by 6. The quotient is 2 and the remainder is 0.',
  },
];

describe('GcdVisualizer', () => {
  it('renders the visualizer with correct step information', () => {
    render(<GcdVisualizer steps={mockSteps} result={6} />);

    expect(screen.getByText(/Step 1 of 3/)).toBeInTheDocument();
    expect(screen.getByText('48')).toBeInTheDocument();
    expect(screen.getByText('18')).toBeInTheDocument();
  });

  it('displays the current step explanation', () => {
    render(<GcdVisualizer steps={mockSteps} result={6} />);

    expect(screen.getByText(/Divide 48 by 18/)).toBeInTheDocument();
  });

  it('navigates to next step when next button is clicked', () => {
    render(<GcdVisualizer steps={mockSteps} result={6} />);

    const nextButton = screen.getAllByRole('button')[2];
    fireEvent.click(nextButton);

    expect(screen.getByText(/Step 2 of 3/)).toBeInTheDocument();
  });

  it('disables previous button on first step', () => {
    render(<GcdVisualizer steps={mockSteps} result={6} />);

    const prevButton = screen.getAllByRole('button')[0];
    expect(prevButton).toBeDisabled();
  });

  it('shows final result message on last step', () => {
    render(<GcdVisualizer steps={mockSteps} result={6} />);

    const nextButton = screen.getAllByRole('button')[2];
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    expect(screen.getByText(/GCD: 6/)).toBeInTheDocument();
    expect(screen.getByText(/Algorithm complete/)).toBeInTheDocument();
  });
});
