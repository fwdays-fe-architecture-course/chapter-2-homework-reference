interface AppProps {
    onNavigate?(path: string): void;
}

import AppReactRouter from './AppReactRouter.tsx';

function App({ onNavigate }: AppProps) {
    return <AppReactRouter onNavigate={onNavigate} />;
}

export default App;
