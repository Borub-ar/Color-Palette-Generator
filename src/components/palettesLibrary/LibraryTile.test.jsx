import { fireEvent, render, screen } from '@testing-library/react';
import { describe, test, vi } from 'vitest';

import PaletteContext from '../../store/palette-context';
import LibraryTile from './LibraryTile';

describe('LibraryTile', () => {
  const paletteDataMock = {
    paletteId: crypto.randomUUID(),
    paletteName: 'Test Name',
    colors: ['#fff', '#fff', '#fff', '#fff'],
  };

  const deleteSavedPaletteMock = vi.fn();
  const loadSavedPaletteMock = vi.fn();
  const contextMock = {
    deleteSavedPalette: deleteSavedPaletteMock,
    loadSavedPalette: loadSavedPaletteMock,
  };

  beforeEach(() => {
    render(
      <PaletteContext.Provider value={contextMock}>
        <LibraryTile paletteData={paletteDataMock} />
      </PaletteContext.Provider>
    );
  });

  test('renders action buttons', () => {
    const deleteButtonElement = screen.getByLabelText(/Delete palette/i);
    const modifyButtonElement = screen.getByLabelText(/Modify palette/i);
    expect(deleteButtonElement).toBeInTheDocument();
    expect(modifyButtonElement).toBeInTheDocument();
  });
});
