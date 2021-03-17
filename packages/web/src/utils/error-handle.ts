function errorLogger(err: any): void {
  console.error(`error: ${err.message}`);
  console.error(`error stack: ${err}`);
}

export default errorLogger;
export { errorLogger };
