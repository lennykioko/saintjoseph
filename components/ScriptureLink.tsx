import Link from "next/link";

export function ScriptureLink() {
  return (
    <Link href="/litany" className="italic text-[var(--color-accent)] underline underline-offset-2">
      Pray the Litany of St. Joseph.
    </Link>
  );
}
