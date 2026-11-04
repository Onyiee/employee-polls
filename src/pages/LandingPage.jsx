import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <main className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
            <nav className="border-b border-gray-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                    <h1 className="text-xl font-bold tracking-tight">
                        Employee <span className="text-blue-600">Polls</span>
                    </h1>

                    <Link
                        to="/login"
                        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                        Log In
                    </Link>
                </div>
            </nav>

            <section className="flex flex-1 items-center justify-center px-6 py-20">
                <div className="mx-auto max-w-3xl text-center">
                    <span className="mb-6 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                        A place for everyone's opinion
                    </span>

                    <h2 className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl">
                        Your opinion
                        <span className="block text-blue-600">
                            matters.
                        </span>
                    </h2>

                    <h3 className="mt-6 text-xl font-semibold text-gray-700">
                        Would You Rather?
                    </h3>

                    <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-gray-500 sm:text-lg">
                        Explore interesting questions, share your choices
                        and discover what your colleagues think.
                    </p>

                    <div className="mt-9">
                        <Link
                            to="/login"
                            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
                        >
                            Get Started
                            <span aria-hidden="true"></span>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="border-t border-gray-200 bg-white px-6 py-12">
                <div className="mx-auto grid max-w-5xl gap-8 text-center sm:grid-cols-3">
                    <div>
                        <h3 className="font-semibold">Vote on Polls</h3>
                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            Share your choices and see how others voted.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold">Create Polls</h3>
                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            Ask interesting questions and get colleagues involved.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold">Leaderboard</h3>
                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            See who's leading the polls and answering questions.
                        </p>
                    </div>
                </div>
            </section>

            <footer className="bg-gray-50 px-6 py-5 text-center text-sm text-gray-400">
                © {new Date().getFullYear()} Employee Polls. All rights reserved.
            </footer>
        </main>
    );
}

export default LandingPage;
