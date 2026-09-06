import Button from "../components/Button";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="px-6 py-16 sm:py-20 lg:py-24">
  <section className="mx-auto flex w-full max-w-7xl flex-col items-center text-center">
    <p className="text-sm font-medium uppercase tracking-wider text-primary">
      Your mental health, your privacy
    </p>

    <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-text sm:text-5xl lg:text-6xl">
      A safe space to talk, understand, and feel better.
    </h1>

    <p className="mt-6 max-w-2xl text-base leading-7 text-text-muted sm:text-lg">
      AnonMind connects you with private mental health support and
      verified professionals in a calm, secure environment.
    </p>

    <div className="mt-8 flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
      <Button className="w-full sm:w-auto">
        Get Started
      </Button>

      <Button variant="secondary" className="w-full sm:w-auto">
        Learn More
      </Button>
    </div>
  </section>

  <section className="mx-auto mt-20 grid w-full max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
  <div className="rounded-2xl border border-border bg-surface p-6">
    <h2 className="text-lg font-semibold text-text">
      Privacy First
    </h2>

    <p className="mt-2 text-sm leading-6 text-text-muted">
      Your conversations and personal information are handled
      with privacy at the core.
    </p>
  </div>

  <div className="rounded-2xl border border-border bg-surface p-6">
    <h2 className="text-lg font-semibold text-text">
      Verified Professionals
    </h2>

    <p className="mt-2 text-sm leading-6 text-text-muted">
      Connect with professionals who have completed our
      verification process.
    </p>
  </div>

  <div className="rounded-2xl border border-border bg-surface p-6">
    <h2 className="text-lg font-semibold text-text">
      Support When You Need It
    </h2>

    <p className="mt-2 text-sm leading-6 text-text-muted">
      Find a path forward, whether you need someone to talk
      to or professional support.
    </p>
  </div>
</section>
</main>
    </div>
  );
}

export default Home;