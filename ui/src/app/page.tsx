import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Welcome to IT Community Platform
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          A place for IT professionals to share knowledge and connect.
        </p>
        <Link
          href="/posts"
          className="inline-block bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          View Community Posts
        </Link>
      </div>
    </main>
  );
}
