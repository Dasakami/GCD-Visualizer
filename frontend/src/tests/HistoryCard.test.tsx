import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HistoryCard } from '../components/HistoryCard';
import { HistoryItem } from '../types';

const mockHistoryItem: HistoryItem = {
  id: '1',
  a: 48,
  b: 18,
  result: 6,
  steps: [],
  created_at: '2025-01-01T12:00:00Z',
};

describe('HistoryCard', () => {
  it('renders history item information correctly', () => {
    const onDelete = vi.fn();
    const onClick = vi.fn();

    render(<HistoryCard item={mockHistoryItem} onDelete={onDelete} onClick={onClick} />);

    expect(screen.getByText('48')).toBeInTheDocument();
    expect(screen.getByText('18')).toBeInTheDocument();
    expect(screen.getByText('GCD: 6')).toBeInTheDocument();
  });

  it('calls onClick when card is clicked', () => {
    const onDelete = vi.fn();
    const onClick = vi.fn();

    render(<HistoryCard item={mockHistoryItem} onDelete={onDelete} onClick={onClick} />);

    const card = screen.getByText('48').closest('div')?.parentElement?.parentElement;
    if (card) {
      fireEvent.click(card);
    }

    expect(onClick).toHaveBeenCalledWith('1');
  });

  it('calls onDelete when delete button is clicked', () => {
    const onDelete = vi.fn();
    const onClick = vi.fn();

    render(<HistoryCard item={mockHistoryItem} onDelete={onDelete} onClick={onClick} />);

    const deleteButton = screen.getAllByRole('button')[0];
    fireEvent.click(deleteButton);

    expect(onDelete).toHaveBeenCalledWith('1');
    expect(onClick).not.toHaveBeenCalled();
  });
});
