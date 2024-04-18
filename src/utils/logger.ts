export const info = (module: string, data: any, username?: string) => {
  console.log(`[${username}] ${module}: `, JSON.stringify(data));
};
