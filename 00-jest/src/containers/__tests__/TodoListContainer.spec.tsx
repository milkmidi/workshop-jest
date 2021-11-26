import React from 'react';
import { mocked } from 'ts-jest/utils';
import { render, waitFor, cleanup } from '@testing-library/react';

import axios, { AxiosResponse } from 'axios';
import TodoListContainer from '../TodoListContainer';

jest.mock('axios');

// TS 用 mocked 比較好
const mockedAxios = mocked(axios, true);

// https://ooanishoo.medium.com/mock-axios-with-jest-and-react-testing-library-in-typescript-react-1c084d9ea880
// jest.mock(...) is used to automatically mock the axios module.jest.mock('axios');
// Create an object of type of mocked Axios.
// const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('<TodoListContainer />', () => {
  afterEach(cleanup);

  test('should return todo list', async () => {
    const mockTodos = [
      { id: 'id1', text: '學會 React', done: true },
      { id: 'id2', text: '學會 Webpack', done: false },
      { id: 'id3', text: '學會 Javascript', done: false },
    ];

    const mockedResponse: AxiosResponse = {
      data: mockTodos,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };

    mockedAxios.get.mockResolvedValueOnce(mockedResponse);
    const { container } = render(<TodoListContainer />);
    await waitFor(() => container.querySelector('.todo-items'));
    expect(axios.get).toHaveBeenCalled();
    expect(container.querySelector('.todo-items')!.children.length).toEqual(mockTodos.length);
  });
});
