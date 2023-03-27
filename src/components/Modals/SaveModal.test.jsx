import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import SaveModal from './SaveModal';
import PaletteContext from '../../store/palette-context';

describe('SaveModal', () => {
  const handleClose = vi.fn();
  const saveColorPalette = vi.fn();
  const updateMode = false;

  beforeEach(() => {
    render(
      <PaletteContext.Provider value={{ updateMode, saveColorPalette }}>
        <SaveModal handleClose={handleClose} />
      </PaletteContext.Provider>
    );
  });

  test('renders SaveModal component', () => {
    render(<SaveModal />);
  });

  test('renders input element', () => {
    const inputElement = screen.getByTestId('input');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'text');
    expect(inputElement).toHaveAttribute('autoComplete', 'off');
    expect(inputElement).toHaveAttribute('id', 'name-input');
  });

  test('renders label and button elements', () => {
    expect(screen.getByText(/Choose palette name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Save palette/i)).toBeInTheDocument();
  });

  test('focuses on the input field on mount', () => {
    const input = screen.getByTestId('input');
    expect(document.activeElement).toEqual(input);
  });

  test('shows error message when submit empty input', () => {
    const saveButtonElement = screen.getByLabelText(/Save palette/i);
    fireEvent.click(saveButtonElement);
    const errorMsgElement = screen.getByText(/Pick any name/i);
    expect(errorMsgElement).toBeInTheDocument();
  });

  test('does not call saveColorPalette or handleClose when palette name is empty', () => {
    const saveButtonElement = screen.getByLabelText(/Save palette/i);
    fireEvent.click(saveButtonElement);
    expect(saveColorPalette).not.toHaveBeenCalled();
    expect(handleClose).not.toHaveBeenCalled();
  });

  // test('calls saveColorPalette and handleClose when palette name is not empty', () => {
  //   const inputElement = screen.getByTestId('input');
  //   fireEvent.change(inputElement, { target: { value: 'Test' } });
  //   const saveButtonElement = screen.getByLabelText(/Save palette/i);
  //   fireEvent.click(saveButtonElement);
  //   expect(saveColorPalette).toHaveBeenCalledWith('Test', false);
  //   expect(handleClose).toHaveBeenCalled();
  // });
});
