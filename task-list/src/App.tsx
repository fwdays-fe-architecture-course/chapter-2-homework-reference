import { MemoryRouter, Routes, Route, Link } from "react-router-dom";
import { NavigationProvider } from "@/context/navigationContext";
import TaskTable from "@/pages/dataTable";

interface AppProps {
  onNavigate?(path: string): void;
}

function AboutUs() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">About Us</h1>
      <p className="mt-4">
        Welcome to our task management application! We aim to help you organize
        and prioritize your tasks efficiently.
      </p>
    </div>
  );
}

function App({ onNavigate }: AppProps) {
  return (
    <MemoryRouter>
      <NavigationProvider onNavigate={onNavigate}>
        <div className="p-8">
          <nav className="mb-4">
            <Link to="/" className="mr-4 text-blue-500 hover:underline">
              Home
            </Link>
            <Link to="/about-us" className="text-blue-500 hover:underline">
              About Us
            </Link>
          </nav>
          <Routes>
            <Route path="/" element={<TaskTable />} />
            <Route path="/about-us" element={<AboutUs />} />
          </Routes>
        </div>
      </NavigationProvider>
    </MemoryRouter>
  );
}

export default App;
