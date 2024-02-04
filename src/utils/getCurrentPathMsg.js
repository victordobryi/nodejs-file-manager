export const getCurrentPathMsg = () => {
  const currentPath = process.cwd();
  const coloredPath = `\x1b[33m${currentPath}\x1b[0m`;

  return `You are currently in ${coloredPath}\n`;
};
