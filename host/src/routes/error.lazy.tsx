import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/error")({
  component: ErrorPage,
});

export default function ErrorPage() {
  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an auth error has occurred.</p>
    </div>
  );
}
