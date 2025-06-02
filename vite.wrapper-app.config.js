import { defineConfig, loadEnv } from "vite";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, "wrapperApp.html"),
        },
        output: {
          dir: resolve(__dirname, "distWrapper"),
        },
      },
    },
    server: {
      port: 3334,
      allowedHosts: [".local.co"],
    },
  });
};
