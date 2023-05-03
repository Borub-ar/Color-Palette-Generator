import { renderHook } from '@testing-library/react';
import { describe, test } from 'vitest';

import useGenerateColor from './useGenerateColor';

describe('useGenerateColor', () => {
  test('returns a string with a length of 7', () => {
    const { result } = renderHook(() => useGenerateColor());
    expect(result.current.length).toBe(7);
  });

  test('returns a string that starts with "#"', () => {
    const { result } = renderHook(() => useGenerateColor());
    expect(result.current[0]).toBe('#');
  });

  test('returns a string that only contains valid hex characters', () => {
    const { result } = renderHook(() => useGenerateColor());
    const validChars = '0123456789ABCDEF';
    for (let i = 1; i < result.current.length; i++) {
      expect(validChars).toContain(result.current[i]);
    }
  });

  test('returns a different value on each invocation', () => {
    const { result, rerender } = renderHook(() => useGenerateColor());
    const values = new Set();
    for (let i = 0; i < 10; i++) {
      const value = result.current;
      expect(values.has(value)).toBe(false);
      values.add(value);
      rerender();
    }
  });
});
