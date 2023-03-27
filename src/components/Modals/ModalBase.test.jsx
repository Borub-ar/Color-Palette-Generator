import { fireEvent, render, screen } from '@testing-library/react';
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
    expect(screen.queryByLabelText('Close modal')).toBeNull();
  });

  test('renders close icon when not in temporary mode', () => {
    render(<ModalBase />);
    expect(screen.getByLabelText('Close modal')).toBeInTheDocument();
  });

  // test('calls handleClose when close icon is clicked', () => {
  //   const handleClose = vi.fn();
  //   render(<ModalBase handleClose={handleClose} />);
  //   fireEvent.click(screen.getByLabelText('Close modal'));
  //   expect(handleClose).toHaveBeenCalledTimes(1);
  // });
});
