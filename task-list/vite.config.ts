import path from "path";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import { defineConfig } from "vite";
import { dependencies } from './package.json';

const sharedDependencies = {
    react: dependencies.react,
    'react-dom': dependencies['react-dom'],
    'lucide-react': dependencies['lucide-react'],
};

const generateSharedConfig = (dependencies: Record<string, string>) => {
    const excludedDeps = ['firebase', '@tanstack/react-table', 'react-router-dom', '@radix-ui/react-dialog'];
    const sharedConfig = { ...sharedDependencies };

    Object.keys(dependencies).forEach((dependencyName) => {
        if (!sharedConfig[dependencyName] && !excludedDeps.includes(dependencyName)) {
            sharedConfig[dependencyName] = {
                requiredVersion: dependencies[dependencyName],
                import: true,
            };
        }
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
            "@": path.resolve(__dirname, "./src"),
        },
    },
});