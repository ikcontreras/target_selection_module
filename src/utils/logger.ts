const info = (message: string) => {
  const timestamp = new Date().toISOString();
  console.log(`[SYSTEM][INFO] [${timestamp}] ${message}`);
};

const error = (message: string) => {
  const timestamp = new Date().toISOString();
  console.log(`[SYSTEM][ERROR] [${timestamp}] ${message}`);
};

const warn = (message: string) => {
  const timestamp = new Date().toISOString();
  console.log(`[SYSTEM][WARN] [${timestamp}] ${message}`);
};

export const log = {
  info,
  error,
  warn,
};
