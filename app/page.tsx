export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col px-6 py-10 sm:px-8">
      <header className="flex items-center justify-between">
        <p className="text-lg font-semibold tracking-tight text-emerald-800">VunaLink</p>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
          Offline first
        </span>
      </header>

      <section className="flex flex-1 flex-col justify-center py-16">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-emerald-700">
          Kubaza, kumenya, kurinda
        </p>
        <h1 className="max-w-lg text-4xl font-semibold tracking-tight sm:text-5xl">
          Healthy crops start with an early look.
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-8 text-stone-600">
          VunaLink will help Rwandan farmers identify crop diseases and find
          practical next steps, even without an internet connection.
        </p>
      </section>

      <footer className="border-t border-stone-200 pt-5 text-sm text-stone-500">
        Built for Rwandan smallholder farmers.
      </footer>
    </main>
  );
}
