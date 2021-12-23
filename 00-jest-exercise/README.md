# unit test
## 抽出來寫成 pure function 才能寫 test
> src/utils/index.ts
1. add
2. isEmail

> src/utils/date-utils.ts
1. isDateBetweenStartEnd
2. filterInvalidDate

# component test(testing-library)
## 測點擊和 props
> src/components/Counter

> src/component/TodoForm
1. jest.fn();  // mock function

> src/component/TodoItem 

## mock api
> src/components/DisplayData
```js
import { fetchData as fetchDataDep } from '@/services/api';
const fetchData = mocked(fetchDataDep, true);
fetchData.mockResolvedValueOnce(['1', '2', '3']);
```

## mock axios
> src/containers/TodoListContainer

## mock component
> src/component/MockComponent

# testing-library hooks
> src/hooks/useCounter

> src/hooks/useCountdown
```js
jest.useFakeTimers();
jest.advanceTimersByTime(1000);
```