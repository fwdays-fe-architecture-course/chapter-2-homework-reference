import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

import federation from "@originjs/vite-plugin-federation";
import {dependencies} from './package.json';

const generateSharedConfig = (dependencies: Record<string, string>) => {
    const sharedConfig: Record<string, { requiredVersion: string; import: boolean }> = {};

    Object.keys(dependencies).forEach((dependencyName) => {
        if (['@radix-ui/react-slot', 'class-variance-authority'].includes(dependencyName)) return;
        sharedConfig[dependencyName] = {
            requiredVersion: dependencies[dependencyName],
            import: false,
        };
    });

    return sharedConfig;
};

export default defineConfig({
    plugins: [
        react(),
        federation({
            name: "host",
            remotes: {
                taskAuth: `http://localhost:3001/assets/remoteEntry.js`,
                taskEditor: `http://localhost:3002/assets/remoteEntry.js`,
                taskList: `http://localhost:3003/assets/remoteEntry.js`,
            },
            shared: ['react', 'react-dom'],
        }),
    ],
    build: {
        modulePreload: false,
        target: "esnext",
        minify: false,
        cssCodeSplit: false,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
