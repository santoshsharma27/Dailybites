function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <>
      <main className="flex h-screen items-center justify-center bg-gray-50 p-12">
        <div className="max-w-3xl rounded-md border border-gray-200 bg-white p-12 text-center">
          <h1 className="mb-4">Something went wrong 🧐</h1>
          <p className="mb-8 font-mono text-gray-500">{error?.message}</p>
          <button
            onClick={resetErrorBoundary}
            className="cursor-pointer rounded-md bg-blue-500 px-8 py-2 text-white transition duration-200 hover:bg-blue-600"
          >
            Try again
          </button>
        </div>
      </main>
    </>
  );
}

export default ErrorFallback;
