import Button from "../components/Button";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="flex min-h-[calc(100vh-73px)] flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-3xl text-center">
          <h1 className="text-4xl font-bold text-text sm:text-5xl lg:text-6xl">
            AnonMind
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base text-text-muted sm:text-lg">
            Private, professional mental health support.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button className="w-full sm:w-auto">
              Get Started
            </Button>

            <Button variant="secondary" className="w-full sm:w-auto">
              Learn More
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;