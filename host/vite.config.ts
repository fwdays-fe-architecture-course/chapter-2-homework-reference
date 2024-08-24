import path from "path";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import { defineConfig } from "vite";
import { dependencies } from './package.json';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

const sharedDependencies = {
    react: dependencies.react,
    'react-dom': dependencies['react-dom'],
    'lucide-react': dependencies['lucide-react'],
};

const generateSharedConfig = (dependencies: Record<string, string>) => {
    const excludedDeps = [
        '@supabase/supabase-js',
        'dotenv',
        '@radix-ui/react-avatar',
        '@radix-ui/react-navigation-menu',
        '@radix-ui/react-slot',
        'class-variance-authority',
        'clsx',
        'tailwind-merge'
    ];
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
        TanStackRouterVite(),
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