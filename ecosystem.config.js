module.exports = {
  apps: [
    {
      name: "nonton-backend",
      cwd: "./backend",
      script: "index.js",
      env: {
        NODE_ENV: "production",
        PORT: 4000,
        BASE_URL: "https://bridgestoabrighterfuture.org",
        API_PUBLIC_URL: "https://api-movie.balee.web.id",
      },
    },
    {
      name: "nonton-frontend",
      cwd: "./frontend",
      script: "node_modules/.bin/next",
      args: "start -p 4001",
      env: {
        NODE_ENV: "production",
        NEXT_PUBLIC_API_URL: "https://api-movie.balee.web.id",
      },
    },
  ],
};
