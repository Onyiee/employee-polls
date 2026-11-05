import {Link} from 'react-router-dom';

function NotFoundPage() {
    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
            <h1 className="mb-3 text-5xl font-bold text-gray-900">404</h1>

            <h2 className="mb-3 text-2xl font-semibold text-gray-800">Page Not Found</h2>

            <p className="mb-6 pb-6 text-gray-500">Sorry, the poll you're looking for doesn't exist</p>

            <Link to="/home"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
                Back to Dashboard
            </Link>
        </div>
    );
}

export default NotFoundPage;