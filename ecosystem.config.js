module.exports = {
  apps: [
    {
      name: "nonton-backend",
      cwd: "./backend",
      script: "index.js",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
        BASE_URL: "https://bridgestoabrighterfuture.org",
      },
    },
    {
      name: "nonton-frontend",
      cwd: "./frontend",
      script: "node_modules/.bin/next",
      args: "start -p 3000",
      env: {
        NODE_ENV: "production",
        NEXT_PUBLIC_API_URL: "https://api-movie.balee.web.id",
      },
    },
  ],
};
