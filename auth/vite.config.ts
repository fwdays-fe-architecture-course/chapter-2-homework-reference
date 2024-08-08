import path from "path";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import {defineConfig} from "vite";
import {dependencies} from './package.json';

const generateSharedConfig = (dependencies) => {
    const sharedConfig = {};

    Object.keys(dependencies).forEach((dependencyName) => {
        if (['@radix-ui/react-slot', 'clsx', 'tailwind-merge', 'class-variance-authority'].includes(dependencyName)) return;
        sharedConfig[dependencyName] = {
            requiredVersion: dependencies[dependencyName],
            import: dependencyName === 'react' || dependencyName === 'react-dom' ? true : false,
        };
    });

    return sharedConfig;
};

console.log('SharedConfig: ', generateSharedConfig(dependencies));


export default defineConfig({
    plugins: [
        react(),
        federation({
            name: "auth",
            filename: "authRemoteEntry.js",
            exposes: {
                "./Auth": "./src/App.tsx",
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
            "@": path.resolve(__dirname, "./src"),
        },
    },
})
