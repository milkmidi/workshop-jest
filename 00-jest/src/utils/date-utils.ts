export const isDateBetweenStartEnd = (
  startDate?: number | string,
  endDate?: number | string,
  dateNow = Date.now(),
): boolean => {
  let isStartDateValidate = false;
  if (startDate) {
    isStartDateValidate = new Date(startDate).getTime() < dateNow;
  }

  let isEndDateValidate = false;
  if (endDate) {
    isEndDateValidate = new Date(endDate).getTime() > dateNow;
  }
  return isStartDateValidate && isEndDateValidate;
};

type StartDate = {
  startDate: string;
};
type StartDateAndEndDate = StartDate & {
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
