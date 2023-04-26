import { fireEvent, render, screen } from '@testing-library/react';
import { describe, test, vi } from 'vitest';

import BarsQuantityController from './BarsQuantityController';
import PaletteContext from '../../store/palette-context';

describe('BarsQuantityController', () => {
  const updateColorBarsQuantityMock = vi.fn();

  const contextMock = {
    updateColorBarsQuantity: updateColorBarsQuantityMock,
  };

  beforeEach(() => {
    render(
      <PaletteContext.Provider value={contextMock}>
        <BarsQuantityController />
      </PaletteContext.Provider>
    );
  });

  test('renders input with proper label and values', () => {
    const inputElement = screen.getByLabelText(/Color Bars/i);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'range');
    expect(inputElement).toHaveAttribute('step', '1');
    expect(inputElement).toHaveAttribute('min', '2');
    expect(inputElement).toHaveAttribute('max', '8');
  });

  test('renders paragraph with proper value', () => {
    const paragraphElement = screen.getByText('5');
    expect(paragraphElement).toBeInTheDocument();
  });

  test('calls updateColorBarsQuantity with proper value', () => {
    const inputElement = screen.getByLabelText(/Color Bars/i);
    fireEvent.change(inputElement, { target: { value: '2' } });
    expect(updateColorBarsQuantityMock).toHaveBeenCalledTimes(1);
    expect(updateColorBarsQuantityMock).toHaveBeenCalledWith('2');
  });

  test('updates paragraph with proper value', () => {
    const inputElement = screen.getByLabelText(/Color Bars/i);
    fireEvent.change(inputElement, { target: { value: 2 } });
    const paragraphElement = screen.getByText('2');
    expect(paragraphElement).toBeInTheDocument();
  });

  test('updates input with proper value', () => {
    const inputElement = screen.getByLabelText(/Color Bars/i);
    fireEvent.change(inputElement, { target: { value: 2 } });
    expect(inputElement).toHaveAttribute('value', '2');
  });
});
