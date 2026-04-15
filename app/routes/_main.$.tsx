function NotFoundContent() {
  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>404</h1>
      <p>The requested page could not be found.</p>
    </main>
  );
}

export default function NotFound() {
  return <NotFoundContent />;
}

export function ErrorBoundary() {
  return <NotFoundContent />;
}
