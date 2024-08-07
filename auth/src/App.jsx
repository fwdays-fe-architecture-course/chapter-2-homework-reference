// У одному з дочірніх мікрофронтендів
import { Router, Route, RootRoute } from '@tanstack/react-router'

const rootRoute = new RootRoute()

const indexRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/',
    component: IndexComponent,
})

const router = new Router({ rootRoute })

export function App() {
    return <RouterProvider router={router} />
}