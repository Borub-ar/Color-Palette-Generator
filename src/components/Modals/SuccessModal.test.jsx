import { render, screen } from '@testing-library/react';
import { describe, test } from 'vitest';
import SuccessModal from './SuccessModal';

describe('SuccessModal', () => {
  test('renders the label passed as a prop', () => {
    const label = 'Success message';
    render(<SuccessModal label={label} />);
    const messageElement = screen.getByText(label);
    expect(messageElement).toBeInTheDocument();
  });
});
