import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';

import Counter from '.';

// 每次測試後將 render 的 DOM 清空
afterEach(cleanup);

describe('<Counter />', () => {
  test('should render correct', async () => {
    // render Component
    const { getByTestId, getByText, container } = render(<Counter />);

    // 下方三個方法都可以找到顯示計數的 <span />
    expect(getByTestId('display_count').textContent).toBe('0'); // Very Good
    expect(getByText('0').textContent).toBe('0'); // bad
    expect(container.querySelector('span')!.innerHTML).toBe('0'); // bad

    await fireEvent.click(getByText('Increase'));
    expect(getByTestId('display_count').textContent).toBe('1');

    await fireEvent.click(getByText('Decrease'));
    expect(getByTestId('display_count').textContent).toBe('0');
  });

  test('render with props', async () => {
    const { getByTestId, getByText } = render(<Counter defaultCount={10} />);

    expect(getByTestId('display_count').textContent).toBe('10');

    await fireEvent.click(getByText('Increase'));
    expect(getByTestId('display_count').textContent).toBe('11');

    await fireEvent.click(getByText('Decrease'));
    expect(getByTestId('display_count').textContent).toBe('10');
  });
});
