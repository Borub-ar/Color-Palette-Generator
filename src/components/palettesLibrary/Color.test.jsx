import { fireEvent, render, screen } from '@testing-library/react';
import { describe, test } from 'vitest';

import Color from './Color';

describe('Color', () => {
  beforeEach(() => {
    render(<Color color='#fff' />);
  });

  test('renders color tile button', () => {
    const buttonElement = screen.getByLabelText(/Copy color to clipboard/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('does not render copy icon and popup message when mounted', () => {
    const iconElement = screen.queryByTestId('icon');
    const messageElement = screen.queryByTestId('msg');
    expect(iconElement).toBeNull();
    expect(messageElement).toBeNull();
  });

  test('shows copy icon on mouse hover', () => {
    const buttonElement = screen.getByLabelText(/Copy color to clipboard/i);
    fireEvent.mouseOver(buttonElement);
    const iconElement = screen.queryByTestId('icon');
    expect(iconElement).toBeInTheDocument();
  });

  test('hides copy icon on mouse leave', () => {
    const buttonElement = screen.getByLabelText(/Copy color to clipboard/i);
    fireEvent.mouseOver(buttonElement);
    const iconElement = screen.queryByTestId('icon');
    expect(iconElement).toBeInTheDocument();
    fireEvent.mouseLeave(buttonElement);
    expect(iconElement).not.toBeInTheDocument();
  });

  test('shows popup message with color information on mouse hover', () => {
    const buttonElement = screen.getByLabelText(/Copy color to clipboard/i);
    fireEvent.mouseOver(buttonElement);
    const messageElement = screen.getByText('#fff');
    expect(messageElement).toBeInTheDocument();
  });

  test('hides popup message with color information on mouse leave', () => {
    const buttonElement = screen.getByLabelText(/Copy color to clipboard/i);
    fireEvent.mouseOver(buttonElement);
    const messageElement = screen.getByText('#fff');
    expect(messageElement).toBeInTheDocument();
    fireEvent.mouseLeave(buttonElement);
    expect(messageElement).not.toBeInTheDocument();
  });

  // To Do: Czy wartośc została skopiowana do cliboardu?
  // Czy wyświetla sie popup color copied
  test('shows "Color copied!" popup after hover and click', () => {
    const buttonElement = screen.getByLabelText(/Copy color to clipboard/i);
    fireEvent.click(buttonElement);
    fireEvent.mouseOver(buttonElement);
    const colorCopiedMessageElement = screen.findByText(/Color copied!/i);
    expect(colorCopiedMessageElement).toBeInTheDocument();
  });
});
