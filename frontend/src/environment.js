let IS_PROD = true;

const server = IS_PROD
    ? "https://video-conference-app-1-nj96.onrender.com"
    : "http://localhost:8000";

export default server;
