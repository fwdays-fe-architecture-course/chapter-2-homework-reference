import {AuthButton} from '@/components/auth-button/auth-button';
import {Link} from 'react-router-dom';
import {NavigationMenu, NavigationMenuLink} from "@/components/ui/navigation-menu"
import {navigationMenuTriggerStyle} from "@/components/ui/navigation-menu"


export default function HomePage() {
    return (
        <main>
            <NavigationMenu className="items-start gap-1.5 text-center">
                <AuthButton/>
                <Link to="editor">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Create Task</NavigationMenuLink>
                </Link>
                <Link to="tasks">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Task List</NavigationMenuLink>
                </Link>
            </NavigationMenu>
        </main>
    );
}
