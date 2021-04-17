/**
 * Create a promise that resolves after some time
 * @param n number of milliseconds before promise resolves
 */
function timeout(n: number) {
  return new Promise(res => setTimeout(res, n));
}

/**
 * Add three numbers
 * @param a first number
 * @param b second
 */
export async function addNumbers(a: number, b: number, c: number) {
  await timeout(500);
  return a + b + c;
}

//== Run the program ==//
(async () => {
  console.log(await addNumbers(3, 4, 30));
})();
