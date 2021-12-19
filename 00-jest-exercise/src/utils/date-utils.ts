export const isDateBetweenStartEnd = (startDate?: string, endDate?: string, dateNow = Date.now()): boolean => {
  // TODO
  return false;
};

type StartDateAndEndDate = {
  startDate: string;
  endDate?: string;
};
export const filterInvalidDate = <T extends StartDateAndEndDate = StartDateAndEndDate>(
  data: T[],
  dateNow = Date.now(),
): T[] => {
  return data.filter((obj) => {
    const { startDate, endDate = '3000-06-22T00:00:00.000-07:00' } = obj;
    return isDateBetweenStartEnd(startDate, endDate, dateNow);
  });
};
