import path from 'path';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import {defineConfig} from 'vite';
import {dependencies} from './package.json';

const generateSharedConfig = (dependencies) => {
    const sharedConfig = {};

    Object.keys(dependencies).forEach((dependencyName) => {
        if (['@radix-ui/react-slot', 'firebase'].includes(dependencyName)) return;
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
            name: 'taskCreation',
            filename: 'taskCreationRemoteEntry.js',
            exposes: {
                './TaskCreation': './src/App.tsx',
            },
            shared: ["react", "react-dom"],
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
