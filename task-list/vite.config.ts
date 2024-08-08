import path from "path";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import {defineConfig} from "vite";
import {dependencies} from './package.json';

const generateSharedConfig = (dependencies: Record<string, string>) => {
    const sharedConfig: Record<string, { requiredVersion: string; import: boolean }> = {};

    Object.keys(dependencies).forEach((dependencyName) => {
        if (['@radix-ui/react-slot'].includes(dependencyName)) return;
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
            name: "taskList",
            filename: "taskListRemoteEntry.js",
            exposes: {
                "./TaskList": "./src/App.tsx",
            },
            shared: ["react", "react-dom"],
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
            "@": path.resolve(__dirname, "./src"),
        },
    },
})
