import Image from "next/image";
import Link from "next/link";
import { ContinueCTA } from "@/components/ContinueCTA";
import { VideoCard } from "@/components/VideoCard";

export default function HomePage() {
  return (
    <article>
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-7 items-start mb-8">
        <div className="shrink-0 w-32 sm:w-36 mx-auto sm:mx-0">
          <div className="relative aspect-[3/5] rounded-md overflow-hidden ring-1 ring-[var(--color-border)] shadow-sm bg-[var(--color-accent-soft)]">
            <Image
              src="/saintjoseph.jpeg"
              alt="St. Joseph, Terror of Demons — painting by Bernadette Carstensen (2020), commissioned by Fr. Donald Calloway, MIC"
              fill
              priority
              sizes="(min-width: 640px) 144px, 128px"
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-bold uppercase tracking-[0.12em] text-[var(--color-text-muted)] mb-3">
            A 33-Day Consecration
          </div>
          <h1 className="text-[clamp(2.25rem,3vw+1rem,3rem)] font-extrabold leading-[1.1] text-[var(--color-accent)] tracking-tight mb-4">
            33 Days with St. Joseph
          </h1>
          <p className="prose text-[var(--color-text-muted)]">
            A thirty-three day journey of prayer, reflection, scripture, and
            daily challenges — walking with St. Joseph toward consecration.
          </p>
        </div>
      </div>

      <ContinueCTA />

      <section
        aria-labelledby="inspiration-heading"
        className="mt-12 pt-8 border-t border-[var(--color-border)]"
      >
        <h2
          id="inspiration-heading"
          className="text-[13px] font-bold uppercase tracking-[0.12em] text-[var(--color-text-muted)] mb-4"
        >
          Inspiration to begin
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-4 items-stretch">
          <VideoCard
            videoId="h40c3-x_rds"
            title="95% of Men Confess This Weekly Sin (Priest Reveals Solution)"
            author="Fr. Dan Reehil"
            thumbnail="https://i.ytimg.com/vi/h40c3-x_rds/hq2.jpg"
            orientation="portrait"
          />
          <VideoCard
            videoId="2xQ1p9C1Wmc"
            title="Consecration to St. Joseph — Fr. Donald Calloway"
            author="Holy League"
            thumbnail="https://i.ytimg.com/vi/2xQ1p9C1Wmc/hqdefault.jpg"
            orientation="landscape"
          />
        </div>
        <p className="text-[12px] text-[var(--color-text-muted)] mt-3">
          Optional viewing — plays in a dialog on this page.
        </p>
      </section>

      <section className="mt-12 pt-10 border-t border-[var(--color-border)]">
        <h2 className="text-[22px] font-bold mb-3">How it works</h2>
        <p className="prose mb-4">
          Each day has a theme, a short reflection, scripture, a closing prayer,
          and a small challenge for the day. You can pray each day&rsquo;s
          prayers at your own pace — the site remembers which days you have
          completed so you can pick up where you left off.
        </p>
        <p className="prose text-[var(--color-text-muted)]">
          From the Introduction: &ldquo;If you should skip a day in this
          consecration, fear not. We are all running as fast as we can. Simply
          pray the missed prayer on the following day and continue on with your
          consecration.&rdquo;
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-[22px] font-bold mb-3">Begin</h2>
        <ul className="space-y-2">
          <li>
            <Link href="/introduction" className="text-[var(--color-accent)] underline underline-offset-2">
              Read Bishop Battersby&rsquo;s introduction
            </Link>
          </li>
          <li>
            <Link href="/day/1" className="text-[var(--color-accent)] underline underline-offset-2">
              Start with Day 1 — Noble Offspring of David
            </Link>
          </li>
          <li>
            <Link href="/litany" className="text-[var(--color-accent)] underline underline-offset-2">
              Pray the Litany of St. Joseph
            </Link>
          </li>
        </ul>
      </section>
    </article>
  );
}
