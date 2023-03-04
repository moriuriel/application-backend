export function loadEnvironmentConfig() {
  return {
    port: parseInt(process.env.APP_PORT, 10) || 3001,
  };
}
