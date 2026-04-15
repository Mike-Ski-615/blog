import type { ReactNode } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
} from "react-router";
import type { Route } from "./+types/root";
import { AppProviders } from "@/provider/app-providers";
import "./app.css";

// app/root.tsx
export const links: Route.LinksFunction = () => [
  {
    rel: "icon",
    href: "/icons/favicon.ico",
  },
  {
    rel: "preconnect",
    href: "https://rsms.me/",
  },
  {
    rel: "stylesheet",
    href: "https://rsms.me/inter/inter.css",
  },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="no-scrollbar">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Home page" />
        <title>Home</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return (
    <AppProviders>
      <Outlet />
    </AppProviders>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack ? (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      ) : null}
    </main>
  );
}
