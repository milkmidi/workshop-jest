import React from 'react';
import { render } from '@testing-library/react';

import MockComponent from '..';

// https://ericdcobb.medium.com/advanced-react-component-mocks-with-jest-and-react-testing-library-f1ae8838400b
// Mock Component 方法1
jest.mock('../NeedMockComponent', () => {
  const NeedMockComponent = () => {
    return <div>NeedMockComponent</div>;
  };
  return NeedMockComponent;
});

// Mock Component 方法2, 會自載 和該 Component 同路徑下的 ./__mocks__/同檔名
jest.mock('../NeedMockComponent2');

describe('<MockComponent />', () => {
  test('should render correct', async () => {
    const { container, debug } = render(<MockComponent />);
    debug();
    expect(container.querySelector('.mock-component__h1')?.textContent).toBe('MockComponent');
  });
});
