import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

import federation from "@originjs/vite-plugin-federation";
import {dependencies} from './package.json';

const generateSharedConfig = (dependencies) => {
    const sharedConfig = {};

    Object.keys(dependencies).forEach((dependencyName) => {
        if (['@radix-ui/react-slot'].includes(dependencyName)) return;
        sharedConfig[dependencyName] = {
            requiredVersion: dependencies[dependencyName],
            import: dependencyName === 'react' || dependencyName === 'react-dom' ? true : false,
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
                auth: `http://localhost:3001/assets/authRemoteEntry.js`,
                taskCreation: `http://localhost:3002/assets/taskCreationRemoteEntry.js`,
                taskList: `http://localhost:3003/assets/taskListRemoteEntry.js`,
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
