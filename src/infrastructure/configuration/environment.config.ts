export function loadEnvironmentConfig() {
  return {
    port: parseInt(process.env.APP_PORT, 10) || 3001,
    jwt: {
      secret: String(process.env.APP_SECRET),
    },
  };
}
