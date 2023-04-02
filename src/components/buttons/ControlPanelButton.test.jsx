import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, test, vi } from 'vitest';

import { faBook, faArrowRotateRight, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import ControlPanelButton from './ControlPanelButton';
import PaletteContext from '../../store/palette-context';

describe('ControlPanelButton', () => {
  const openProperModalMock = vi.fn();
  const setUpdateModeMock = vi.fn();
  const generateRandomHexColorsMock = vi.fn();
  const handleLibraryVisibilityMock = vi.fn();

  test('renders button with label and icon', () => {
    const labelMock = 'Save';
    render(<ControlPanelButton label={labelMock} icon={faFloppyDisk} />);
    const buttonElement = screen.getByLabelText(labelMock);
    const labelElement = screen.getByText(labelMock);
    expect(buttonElement).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();
  });

  test('handle click event in saveMode', () => {
    const labelMock = 'Save';
    const checkIfPaletteAlreadySavedMock = vi.fn();
    const contextMock = {
      checkIfPaletteAlreadySaved: checkIfPaletteAlreadySavedMock,
      setUpdateMode: setUpdateModeMock,
    };

    render(
      <PaletteContext.Provider value={contextMock}>
        <ControlPanelButton label={labelMock} icon={faFloppyDisk} saveMode openProperModal={openProperModalMock} />
      </PaletteContext.Provider>
    );

    const buttonElement = screen.getByLabelText(labelMock);
    fireEvent.click(buttonElement);
    expect(checkIfPaletteAlreadySavedMock).toHaveBeenCalledTimes(1);
    expect(openProperModalMock).toHaveBeenCalledTimes(1);
    expect(setUpdateModeMock).toHaveBeenCalledTimes(1);
  });

  test('display alreadySavedMsg when palette is already saved', () => {
    const labelMock = 'Save';
    const checkIfPaletteAlreadySavedMock = vi.fn().mockReturnValue(true);
    const contextMock = {
      checkIfPaletteAlreadySaved: checkIfPaletteAlreadySavedMock,
      setUpdateMode: setUpdateModeMock,
    };

    render(
      <PaletteContext.Provider value={contextMock}>
        <ControlPanelButton label={labelMock} icon={faFloppyDisk} saveMode openProperModal={openProperModalMock} />
      </PaletteContext.Provider>
    );

    const buttonElement = screen.getByLabelText(labelMock);
    fireEvent.click(buttonElement);
    const messageElement = screen.getByText(/Palette already saved/i);
    expect(messageElement).toBeInTheDocument();
  });

  test('does not display alreadySavedMsg when palette is not already saved', () => {
    const labelMock = 'Save';
    const checkIfPaletteAlreadySavedMock = vi.fn().mockReturnValue(false);
    const contextMock = {
      checkIfPaletteAlreadySaved: checkIfPaletteAlreadySavedMock,
      setUpdateMode: setUpdateModeMock,
    };

    render(
      <PaletteContext.Provider value={contextMock}>
        <ControlPanelButton label={labelMock} icon={faFloppyDisk} saveMode openProperModal={openProperModalMock} />
      </PaletteContext.Provider>
    );

    const buttonElement = screen.getByLabelText(labelMock);
    fireEvent.click(buttonElement);
    const messageElement = screen.queryByText(/Palette already saved/i);
    expect(messageElement).toBe(null);
  });

  test('hides alreadySavedMsg after 2 seconds', () => {
    const labelMock = 'Save';
    const checkIfPaletteAlreadySavedMock = vi.fn().mockReturnValue(true);
    const contextMock = {
      checkIfPaletteAlreadySaved: checkIfPaletteAlreadySavedMock,
      setUpdateMode: setUpdateModeMock,
    };
    vi.useFakeTimers();

    render(
      <PaletteContext.Provider value={contextMock}>
        <ControlPanelButton label={labelMock} icon={faFloppyDisk} saveMode openProperModal={openProperModalMock} />
      </PaletteContext.Provider>
    );

    const buttonElement = screen.getByLabelText(labelMock);
    fireEvent.click(buttonElement);
    const messageElement = screen.getByText(/Palette already saved/i);

    expect(messageElement).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    const messageElementAfterUpdate = screen.queryByText('Palette already saved');
    expect(messageElementAfterUpdate).toBeNull();
  });

  test('calls generateRandomHexColors after button click when in generateMode', () => {
    const labelMock = 'Generate';
    const contextMock = {
      generateRandomHexColors: generateRandomHexColorsMock,
    };

    render(
      <PaletteContext.Provider value={contextMock}>
        <ControlPanelButton label={labelMock} icon={faArrowRotateRight} generateMode />
      </PaletteContext.Provider>
    );

    const buttonElement = screen.getByLabelText(labelMock);
    fireEvent.click(buttonElement);

    expect(generateRandomHexColorsMock).toHaveBeenCalledTimes(1);
  });

  test('calls handleLibraryVisibility after button click when in libraryMode', () => {
    const labelMock = 'Library';
    const contextMock = {
      handleLibraryVisibility: handleLibraryVisibilityMock,
    };

    render(
      <PaletteContext.Provider value={contextMock}>
        <ControlPanelButton label={labelMock} icon={faBook} libraryMode />
      </PaletteContext.Provider>
    );

    const buttonElement = screen.getByLabelText(labelMock);
    fireEvent.click(buttonElement);

    expect(handleLibraryVisibilityMock).toHaveBeenCalledTimes(1);
  });
});
