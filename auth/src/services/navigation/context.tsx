import { PropsWithChildren, createContext, useContext } from "react";

interface NavigateParams<T> {
  to: T;
  isHost?: boolean;
}

interface NavigationContextDefaultValue {
  navigate(params: NavigateParams<unknown>): void;
}

export const NavigationContext = createContext<NavigationContextDefaultValue>({
  navigate: () => undefined,
});

interface NavigationProviderProps extends PropsWithChildren {
  onNavigate?(path: string): void;
}

export const NavigationProvider = ({
  onNavigate,
  children,
}: NavigationProviderProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleNavigate = onNavigate as any;

  const navigationValue = { navigate: handleNavigate };

  return (
    <NavigationContext.Provider value={navigationValue}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);
