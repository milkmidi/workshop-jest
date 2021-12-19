import { render, fireEvent, cleanup } from '@testing-library/react';

import TodoItem from '..';

describe('<TodoItem />', () => {
  afterEach(cleanup);
  test('測試已完成, 是否有正確將 done css class 加上', async () => {
    const { getByTestId } = render(<TodoItem done id="id" />);

    // getByTestId('li').classList 會得到 Object
    const classListArr = Object.values(getByTestId('li').classList).join(' ');
    await expect(classListArr.indexOf('done') !== -1).toBeTruthy();
  });

  test('測試 click 後，有沒有接到事件', async () => {
    const toggleItem = jest.fn();

    const { getByTestId } = render(<TodoItem id="fakeId" onToggleItem={toggleItem} />);

    await fireEvent.click(getByTestId('li'));
    await expect(toggleItem).toHaveBeenCalledWith('fakeId');
  });
  test('測試 Todo 文字是否有正確', async () => {
    const { getByTestId } = render(<TodoItem>謝謝你9527</TodoItem>);

    expect(getByTestId('li').textContent).toBe('謝謝你9527');
  });
});
