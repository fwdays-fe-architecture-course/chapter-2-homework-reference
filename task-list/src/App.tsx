import { NavigationProvider } from '@/context/navigationContext';
import TaskTable from "@/pages/dataTable";

interface AppProps {
    onNavigate?(path: string): void;
}

function App({ onNavigate }: AppProps) {
    return (
        <NavigationProvider onNavigate={onNavigate}>
            <TaskTable />
        </NavigationProvider>
    );
}

export default App;
