import { fireEvent, render, screen } from '@testing-library/react';
import { describe, test, vi } from 'vitest';

import Color from './Color';

describe('Color', () => {
  beforeAll(() => {
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
});
