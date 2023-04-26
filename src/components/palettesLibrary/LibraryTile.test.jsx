import { fireEvent, render, screen } from '@testing-library/react';
import { describe, test, vi } from 'vitest';

import PaletteContext from '../../store/palette-context';
import LibraryTile from './LibraryTile';

describe('LibraryTile', () => {
  const paletteDataMock = {
    paletteId: crypto.randomUUID(),
    paletteName: 'Test Name',
    colors: [
      { color: '#fff', id: crypto.randomUUID() },
      { color: '#fff', id: crypto.randomUUID() },
      { color: '#fff', id: crypto.randomUUID() },
      { color: '#fff', id: crypto.randomUUID() },
    ],
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

  test('renders action buttons and palette', () => {
    const deleteButtonElement = screen.getByLabelText(/Delete palette/i);
    const modifyButtonElement = screen.getByLabelText(/Modify palette/i);
    const nameParagraphElement = screen.getByText(paletteDataMock.paletteName);
    expect(deleteButtonElement).toBeInTheDocument();
    expect(modifyButtonElement).toBeInTheDocument();
    expect(nameParagraphElement).toBeInTheDocument();
  });

  test('renders the correct amount of Color components', () => {
    const colorsComponents = screen.getAllByTestId('color');
    expect(colorsComponents).toHaveLength(paletteDataMock.colors.length);
  });
});
