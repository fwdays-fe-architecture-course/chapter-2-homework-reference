import {Link} from 'react-router-dom';
import {AuthButton} from '../auth-button/auth-button';
import {NavigationMenu, NavigationMenuLink, navigationMenuTriggerStyle} from "@/components/ui/navigation-menu";

export const Header = () => {
    return (
        <>
            <NavigationMenu className="items-start gap-1.5 text-center mb-1.5">
                <AuthButton/>
                <Link to="/">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
                </Link>
            </NavigationMenu>
        </>
    );
};
