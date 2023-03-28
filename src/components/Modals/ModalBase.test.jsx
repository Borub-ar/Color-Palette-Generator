import { fireEvent, queryByTestId, render, screen } from '@testing-library/react';
import { describe, test, vi } from 'vitest';
import ModalBase from './ModalBase';

describe('ModalBase', () => {
  test('renders children elements', () => {
    render(
      <ModalBase>
        <p>Test</p>
      </ModalBase>
    );
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  test('does not render close icon when in temporary mode', () => {
    render(<ModalBase temporaryMode />);
    const closeButtonElement = screen.queryByLabelText(/Close modal/i);
    expect(closeButtonElement).toBeNull();
  });

  test('renders close icon when not in temporary mode', () => {
    render(<ModalBase />);
    const closeButtonElement = screen.getByLabelText(/Close modal/i);
    expect(closeButtonElement).toBeInTheDocument();
  });

  test('calls handleClose when close icon is clicked', () => {
    const handleCloseMock = vi.fn();
    render(<ModalBase handleClose={handleCloseMock} />);
    const closeButtonElement = screen.getByLabelText(/Close modal/i);
    fireEvent.click(closeButtonElement);
    expect(handleCloseMock).toHaveBeenCalledTimes(1);
  });
});
