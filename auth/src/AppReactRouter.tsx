import { createMemoryRouter, RouterProvider, useSearchParams } from 'react-router-dom';
import { LogIn } from '@/components/log-in/log-in';
import { NavigationProvider } from './services/navigation/context';
import { FunctionComponent } from 'react';

function LogInPage() {
    const [searchParams] = useSearchParams();

    return <LogIn message={searchParams.get('message') ?? undefined} />;
}

interface AppProps {
    onNavigate?(path: string): void;
}

const withNavigationProvider = (Component: FunctionComponent, onNavigate: AppProps['onNavigate']) => {
    return (
        <NavigationProvider onNavigate={onNavigate}>
            <Component />
        </NavigationProvider>
    );
};

const createRoutes = (onNavigate: AppProps['onNavigate']) => [
    {
        path: '/log-in',
        element: withNavigationProvider(LogInPage, onNavigate),
    },
];

const createRouter = (onNavigate: AppProps['onNavigate']) =>
    createMemoryRouter(createRoutes(onNavigate), { initialEntries: ['/log-in'], initialIndex: 0 });

function App({ onNavigate }: AppProps) {
    const router = createRouter(onNavigate);

    return <RouterProvider router={router} />;
}

export default App;
