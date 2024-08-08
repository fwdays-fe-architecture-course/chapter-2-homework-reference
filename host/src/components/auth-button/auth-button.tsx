import { Link } from 'react-router-dom';
import { useHandleSignOut, useHandleUser } from './auth-button-controller';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const AuthButton = () => {
    const user = useHandleUser();
    const handleSignOut = useHandleSignOut();

    if (!user) {
        return (
            <Link to="/login" className="py-2 px-3 flex rounded-md no-underline bg-secondary">
                Log in
            </Link>
        );
    }

    return (
        <div className="flex items-center gap-4">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{user?.email}!</AvatarFallback>
            </Avatar>
            <Button onClick={handleSignOut} className="py-2 px-4 rounded-md no-underline bg-secondary">
                Log out
            </Button>
        </div>
    );
};
