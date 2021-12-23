/**
 * mock api
 */
export function fetchData(): Promise<string[]> {
  console.log('fetchData');
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = ['React', 'Vue', 'Webpack'];
      resolve(result);
    }, 1000);
  });
}
