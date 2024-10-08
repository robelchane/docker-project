
import Link from "next/link";

export default function Page() {
  return (
    <main className="bg-white">
      {/* All Listings Button at the bottom */}
      <div className="flex justify-center mt-8">
        <Link href="/all-listings">
          <p className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            All Listings Property
          </p>
        </Link>
      </div>
      <div className="flex justify-center mt-8">
        <Link href="/seller">
          <p className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            List a Property
          </p>
        </Link>
      </div>      
    </main>
  );
}