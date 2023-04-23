import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import SaveModal from './SaveModal';
import PaletteContext from '../../store/palette-context';

describe('SaveModal', () => {
  const handleCloseMock = vi.fn();
  const saveColorPaletteMock = vi.fn();
  const updateModeMock = false;
  const contextMock = { updateMode: updateModeMock, saveColorPalette: saveColorPaletteMock };

  beforeEach(() => {
    render(
      <PaletteContext.Provider value={contextMock}>
        <SaveModal handleClose={handleCloseMock} />
      </PaletteContext.Provider>
    );
  });

  test('renders input element', () => {
    const inputElement = screen.getByLabelText(/Choose palette name/i);
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
    const input = screen.getByLabelText(/Choose palette name/i);
    expect(document.activeElement).toEqual(input);
  });

  test('shows error message when submit empty input', () => {
    const saveButtonElement = screen.getByLabelText(/Save palette/i);
    fireEvent.click(saveButtonElement);
    const errorMsgElement = screen.getByText(/Pick any name/i);
    expect(errorMsgElement).toBeInTheDocument();
  });

  test('does not call saveColorPalette or handleClose when palette name input is empty', () => {
    const saveButtonElement = screen.getByLabelText(/Save palette/i);
    fireEvent.click(saveButtonElement);
    expect(saveColorPaletteMock).not.toHaveBeenCalled();
    expect(handleCloseMock).not.toHaveBeenCalled();
  });

  test('does not call saveColorPalette or handleClose when spaces are typed in palette name input', () => {
    const inputElement = screen.getByLabelText(/Choose palette name/i);
    fireEvent.change(inputElement, { target: { value: '    ' } });
    fireEvent.blur(inputElement);
    const saveButtonElement = screen.getByLabelText(/Save palette/i);
    fireEvent.click(saveButtonElement);
    expect(saveColorPaletteMock).not.toHaveBeenCalled();
    expect(handleCloseMock).not.toHaveBeenCalled();
  });

  test('calls saveColorPalette and handleClose when palette name is not empty', () => {
    const inputElement = screen.getByLabelText(/Choose palette name/i);
    const testPaletteName = 'Test';
    fireEvent.change(inputElement, { target: { value: testPaletteName } });
    fireEvent.blur(inputElement);
    const saveButtonElement = screen.getByLabelText(/Save palette/i);
    fireEvent.click(saveButtonElement);
    expect(handleCloseMock).toHaveBeenCalledTimes(1);
    expect(saveColorPaletteMock).toHaveBeenCalledWith(testPaletteName, updateModeMock);
  });
});
