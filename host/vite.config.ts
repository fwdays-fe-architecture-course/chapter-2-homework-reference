import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

import federation from "@originjs/vite-plugin-federation";
import {dependencies} from './package.json';

const excludedDeps = [
    '@radix-ui/react-avatar',
    '@radix-ui/react-navigation-menu',
    '@radix-ui/react-slot',
    'class-variance-authority',
    'clsx',
    'tailwind-merge'
];

const generateSharedConfig = (dependencies: Record<string, string>) => {
    const sharedConfig: Record<string, { requiredVersion: string; import: boolean }> = {};

    Object.keys(dependencies).forEach((dependencyName) => {
        if (excludedDeps.includes(dependencyName)) return;
        sharedConfig[dependencyName] = {
            requiredVersion: dependencies[dependencyName],
            import: true,
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
            shared: generateSharedConfig(dependencies),
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
