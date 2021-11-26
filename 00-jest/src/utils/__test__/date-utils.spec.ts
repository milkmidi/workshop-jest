import { isDateBetweenStartEnd, filterInvalidDate } from '../date-utils';

describe('#date-utils ', () => {
  test('isDateBetweenStartEnd', () => {
    const dateNow = new Date('2021/08/01').getTime();
    expect(isDateBetweenStartEnd('2021/01/01', '2021/12/01', dateNow)).toBeTruthy();
    expect(isDateBetweenStartEnd('2021/12/01', '2021/12/31', dateNow)).toBeFalsy();
    expect(isDateBetweenStartEnd('2021/01/01', '2021/01/31', dateNow)).toBeFalsy();
    expect(isDateBetweenStartEnd(undefined, '2021/01/31', dateNow)).toBeFalsy();
    expect(isDateBetweenStartEnd('2021/01/01', undefined, dateNow)).toBeFalsy();
  });

  test('filterInvalidDate', () => {
    const data = [
      { name: '1', startDate: '2021-01-22T00:00:00.000-07:00' },
      { name: '2', startDate: '2022-08-22T00:00:00.000-07:00' },
      { name: '3', startDate: '2020-08-22T00:00:00.000-07:00', endDate: '2021-08-22T00:00:00.000-07:00' },
      { name: '4', startDate: '2020-08-22T00:00:00.000-07:00', endDate: '3021-08-22T00:00:00.000-07:00' },
    ];
    const dateNow = +new Date('2021/11/06');
    expect(filterInvalidDate(data, dateNow)[0].name).toBe('1');
    expect(filterInvalidDate(data, dateNow).length).toBe(2);
  });
});
