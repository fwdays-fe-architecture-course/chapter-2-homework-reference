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
    const excludedDeps = ['firebase', '@tanstack/react-table', '@radix-ui/react-dialog'];
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
            name: 'taskCreation',
            filename: 'taskCreationRemoteEntry.js',
            exposes: {
                './TaskCreation': './src/App.tsx',
            },
            shared: generateSharedConfig(dependencies),
        }),
    ],
    build: {
        target: 'esnext',
        minify: false,
        cssCodeSplit: false,
        commonjsOptions: {
            transformMixedEsModules: true,
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            'firebase/app': path.resolve(__dirname, './node_modules/firebase/app'),
            'firebase/firestore': path.resolve(__dirname, './node_modules/firebase/firestore'),
        },
    },
    optimizeDeps: {
        include: ['firebase/app', 'firebase/firestore'],
    },
});