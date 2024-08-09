/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const TasksLazyImport = createFileRoute('/tasks')()
const LoginLazyImport = createFileRoute('/login')()
const ErrorLazyImport = createFileRoute('/error')()
const EditorLazyImport = createFileRoute('/editor')()
const AuthConfirmLazyImport = createFileRoute('/auth-confirm')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const TasksLazyRoute = TasksLazyImport.update({
  path: '/tasks',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/tasks.lazy').then((d) => d.Route))

const LoginLazyRoute = LoginLazyImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/login.lazy').then((d) => d.Route))

const ErrorLazyRoute = ErrorLazyImport.update({
  path: '/error',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/error.lazy').then((d) => d.Route))

const EditorLazyRoute = EditorLazyImport.update({
  path: '/editor',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/editor.lazy').then((d) => d.Route))

const AuthConfirmLazyRoute = AuthConfirmLazyImport.update({
  path: '/auth-confirm',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/auth-confirm.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/auth-confirm': {
      id: '/auth-confirm'
      path: '/auth-confirm'
      fullPath: '/auth-confirm'
      preLoaderRoute: typeof AuthConfirmLazyImport
      parentRoute: typeof rootRoute
    }
    '/editor': {
      id: '/editor'
      path: '/editor'
      fullPath: '/editor'
      preLoaderRoute: typeof EditorLazyImport
      parentRoute: typeof rootRoute
    }
    '/error': {
      id: '/error'
      path: '/error'
      fullPath: '/error'
      preLoaderRoute: typeof ErrorLazyImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginLazyImport
      parentRoute: typeof rootRoute
    }
    '/tasks': {
      id: '/tasks'
      path: '/tasks'
      fullPath: '/tasks'
      preLoaderRoute: typeof TasksLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  AuthConfirmLazyRoute,
  EditorLazyRoute,
  ErrorLazyRoute,
  LoginLazyRoute,
  TasksLazyRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/auth-confirm",
        "/editor",
        "/error",
        "/login",
        "/tasks"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/auth-confirm": {
      "filePath": "auth-confirm.lazy.tsx"
    },
    "/editor": {
      "filePath": "editor.lazy.tsx"
    },
    "/error": {
      "filePath": "error.lazy.tsx"
    },
    "/login": {
      "filePath": "login.lazy.tsx"
    },
    "/tasks": {
      "filePath": "tasks.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
