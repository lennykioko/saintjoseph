import Link from "next/link";

export default function DayNotFound() {
  return (
    <article>
      <h1 className="text-3xl font-bold text-[var(--color-accent)] mb-4">Day not found</h1>
      <p className="prose">
        That day does not exist. Days run from 1 to 33.
      </p>
      <p className="mt-6">
        <Link href="/" className="text-[var(--color-accent)] underline">
          Return to the home page
        </Link>
      </p>
    </article>
  );
}
