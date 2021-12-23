import React from 'react';
import { mocked } from 'ts-jest/utils';
import { render, waitFor } from '@testing-library/react';

import { fetchData as fetchDataDep } from '@/services/api';
import DisplayData from '..';

const fetchData = mocked(fetchDataDep, true);

jest.mock('@/services/api');

describe('<DisplayData />', () => {
  test('children length', async () => {
    fetchData.mockResolvedValueOnce(['1', '2', '3']);

    const { getByTestId, debug } = render(<DisplayData />);
    expect(fetchData).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      debug();
      expect(getByTestId('ul').children.length).toBe(3);
    });
  });
});
