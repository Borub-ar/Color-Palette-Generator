import { fireEvent, render, screen } from '@testing-library/react';
import { describe, test, vi } from 'vitest';

import UpdateModal from './UpdateModal';
import PaletteContext from '../../store/palette-context';

describe('UpdateModal', () => {
  const updatePaletteMock = vi.fn();
  const showSuccessModalMock = vi.fn();
  const handleSaveAsNewMock = vi.fn();
  const contextMock = { updatePalette: updatePaletteMock };

  beforeEach(() => {
    render(
      <PaletteContext.Provider value={contextMock}>
        <UpdateModal showSuccessModal={showSuccessModalMock} handleSaveAsNew={handleSaveAsNewMock} />
      </PaletteContext.Provider>
    );
  });

  test('renders update and save buttons', () => {
    const saveButtonElement = screen.getByText(/Save as new/i);
    const updateButtonElement = screen.getByText(/Update/i);
    expect(saveButtonElement).toBeInTheDocument();
    expect(updateButtonElement).toBeInTheDocument();
  });

  test('calls updatePalette and showSuccessModal after "Update button" click', () => {
    const updateButtonElement = screen.getByText(/Update/i);
    fireEvent.click(updateButtonElement);
    expect(updatePaletteMock).toHaveBeenCalledTimes(1);
    expect(showSuccessModalMock).toHaveBeenCalledTimes(1);
  });

  test('calls handleSaveAsNew after "Save as new button" click', () => {
    const saveButtonElement = screen.getByText(/Save as new/i);
    fireEvent.click(saveButtonElement);
    expect(handleSaveAsNewMock).toHaveBeenCalledTimes(1);
  });
});
