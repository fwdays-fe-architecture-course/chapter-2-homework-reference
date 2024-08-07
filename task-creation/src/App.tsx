import TaskForm from '@/pages/taskForm';
import { NavigationProvider } from '@/context/navigationContext';

interface AppProps {
    onNavigate?(path: string): void;
}

function App({ onNavigate }: AppProps) {
    return (
        <NavigationProvider onNavigate={onNavigate}>
            <TaskForm />
        </NavigationProvider>
    );
}

export default App;
