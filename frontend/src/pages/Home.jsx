import Button from "../components/Button";
import Navbar from "../components/Navbar";
import heroImage from "../assets/hero.png";
import ctaBackground from "../assets/cta-background.png.png";

import {
  ShieldCheck,
  UserRound,
  CalendarDays,
  LifeBuoy,
  Heart,
  Stethoscope,
  Shield,
} from "lucide-react";

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="px-6 py-16 sm:py-20 lg:py-24">
  <section className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10 lg:flex-row lg:items-center lg:text-left">
    <div>
    <p className="text-sm font-medium uppercase tracking-wider text-primary">
      Your Mental Health Matters
    </p>

    <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-text sm:text-5xl lg:text-6xl">
      Private. Professional. 
      <br />
      A Healthier You.
    </h1>

    <p className="mt-6 max-w-2xl text-base leading-7 text-text-muted sm:text-lg">
      Your mental health deserves care, understanding, and support.
Connect with trusted professionals in a safe and confidential
environment designed around you.
    </p>

    <div className="mt-8 flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:justify-start">
      <Button >
        Get Started
      </Button>

      <Button variant="secondary">
        Learn More
      </Button>
    </div>
    </div>
    <div className="flex w-full justify-center lg:w-1/2">
  <img
    src={heroImage}
    alt="Mental health support illustration"
    className="w-full max-w-md object-contain"
  />
</div>
  </section>

    <section className="mx-auto mt-16 grid w-full max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
  <div className="flex items-center gap-3">
  <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />

  <div>
    <h2 className="text-sm font-semibold text-text">
      100% Confidential
    </h2>

    
  </div>
</div>

  <div className="flex items-center gap-3">
  <UserRound className="h-5 w-5 shrink-0 text-primary" />

  <span className="text-sm font-semibold text-text">
    Licensed Professionals
  </span>
  
</div>

  <div className="flex items-center gap-3">
  <CalendarDays className="h-5 w-5 shrink-0 text-primary" />

  <span className="text-sm font-semibold text-text">
    Easy Online Booking
  </span>
  
</div>

  <div className="flex items-center gap-3">
  <LifeBuoy className="h-5 w-5 shrink-0 text-primary" />

  <span className="text-sm font-semibold text-text">
    Support When You Need It
  </span>
    
</div>

</section>

  <section className="mx-auto mt-20 grid w-full max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">

    <h2 className="col-span-full text-center text-2xl font-semibold text-text">
  A Safer Space for a Brighter Tomorrow
</h2>

  <div className="rounded-xl border border-border bg-surface p-5">
    <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-2 text-primary">
  <Heart className="h-5 w-5" />
</div>
    <h2 className="text-lg font-semibold text-text">
      For Patients
    </h2>

    <p className="mt-2 text-sm leading-6 text-text-muted">
      Find the right support, book appointments, and take control of your mental well-being.
      <p className="mt-4 text-sm font-medium text-primary">
  Learn More →
</p>
    </p>
  </div>

  <div className="rounded-xl border border-border bg-surface p-5">
    <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-2 text-primary">
  <Stethoscope className="h-5 w-5" />
</div>
    <h2 className="text-lg font-semibold text-text">
      For Doctors
    </h2>

    <p className="mt-2 text-sm leading-6 text-text-muted">
      Reach more people, manage your practice, and make a real difference.
      <p className="mt-4 text-sm font-medium text-primary">
  Learn More →
</p>
    </p>
  </div>

  <div className="rounded-xl border border-border bg-surface p-5">
    <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-2 text-primary">
  <Shield className="h-5 w-5" />
</div>
    <h2 className="text-lg font-semibold text-text">
      For Admins
    </h2>

    <p className="mt-2 text-sm leading-6 text-text-muted">
      Ensure a safe, trusted, and well-managed platform for everyone.
      <p className="mt-4 text-sm font-medium text-primary">
  Learn More →
</p>
    </p>
  </div>
</section>
<section className="relative mx-auto mt-8 h-39 w-full max-w-7xl overflow-hidden rounded-6x4">
  <img
    src={ctaBackground}
    alt=""
    className="absolute inset-0 h-full w-full object-cover object-center"
  />

  <div className="relative flex h-full items-center justify-between px-42">
    <div>
      <h2 className="text-base font-bold text-slate-900 sm:text-lg">
        Mental health support is just a click away
      </h2>

      <p className="mt-1 text-xs font-medium text-slate-600 sm:text-sm">
        Join AnonMind today and take the first step towards a healthier, happier you.
      </p>
    </div>

    <Button className="shrink-0 px-5 py-2 text-sm">
      Get Started
    </Button>
  </div>
</section>
</main>
    </div>
  );
}

export default Home;