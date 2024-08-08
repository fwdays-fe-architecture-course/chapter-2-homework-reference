import { useNavigate } from 'react-router-dom';
import TaskAuth from 'auth/Auth';

export default function LoginPage() {
    const navigate = useNavigate();

    return <TaskAuth onNavigate={navigate} />;
}
