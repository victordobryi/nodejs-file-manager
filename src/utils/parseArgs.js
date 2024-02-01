export const parseArgs = () => {
  const args = process.argv.slice(2);
  const res = args.filter((arg) => arg.startsWith('--')).map((name) => name.slice(2));
  return res;
};
