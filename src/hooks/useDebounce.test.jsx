import { renderHook } from '@testing-library/react';
import { describe, test } from 'vitest';

import useDebounce from './useDebounce';

describe('useDebounce', () => {
  test('should return the initial value', () => {
    const { result } = renderHook(() => useDebounce('test', 500));
    expect(result.current).toEqual('test');
  });
});
