
import Link from 'next/link';

export default function NotFound() {
  return (
	<html lang="en"><body>
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-teal-500">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-extrabold text-white mb-4">404</h1>
        <p className="text-xl text-white mb-8">
          La página que estás buscando no existe.
        </p>
        <Link
          href="/"
          className="bg-teal-400 text-blue-900 font-semibold px-6 py-3 rounded-lg hover:bg-teal-500 hover:text-white transition-colors duration-300"
        >
          Regresar al inicio
        </Link>
      </div>
    </div>
	</body></html>
  );
}