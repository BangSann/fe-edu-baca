const DefaultPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-2xl font-semibold mb-2">Oops! Page not found.</p>
      <p className="text-gray-600 mb-4">
        The page you are looking for does not exist.
      </p>
    </div>
  );
};

export default DefaultPage;
