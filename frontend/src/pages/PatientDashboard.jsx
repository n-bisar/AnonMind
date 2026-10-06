import React from "react";

function PatientDashboard() {
  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-800">

      {/* Sidebar */}
      <aside className="w-60 min-h-screen bg-white border-r border-slate-200 flex flex-col">

        {/* Logo */}
        <div className="h-20 flex items-center px-6 border-b border-slate-100">
          <img
            src="/assets/logo.png"
            alt="AnonMind"
            className="w-8 h-8 object-contain"
          />

          <span className="ml-2 text-lg font-semibold text-slate-800">
            AnonMind
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">

          <button
            className="
              w-full flex items-center gap-3
              px-4 py-3
              rounded-lg
              bg-teal-50 text-teal-700
              text-sm font-medium
              text-left
            "
          >
            <span>⌂</span>
            <span>Dashboard</span>
          </button>

          <button
            className="
              w-full flex items-center gap-3
              px-4 py-3
              rounded-lg
              text-slate-600
              hover:bg-slate-50
              text-sm
              text-left
            "
          >
            <span>▣</span>
            <span>Appointments</span>
          </button>

          <button
            className="
              w-full flex items-center gap-3
              px-4 py-3
              rounded-lg
              text-slate-600
              hover:bg-slate-50
              text-sm
              text-left
            "
          >
            <span>⌕</span>
            <span>Find a Doctor</span>
          </button>

          <button
            className="
              w-full flex items-center gap-3
              px-4 py-3
              rounded-lg
              text-slate-600
              hover:bg-slate-50
              text-sm
              text-left
            "
          >
            <span>▢</span>
            <span>Messages</span>
          </button>

          <button
            className="
              w-full flex items-center gap-3
              px-4 py-3
              rounded-lg
              text-slate-600
              hover:bg-slate-50
              text-sm
              text-left
            "
          >
            <span>♙</span>
            <span>My Profile</span>
          </button>

          <button
            className="
              w-full flex items-center gap-3
              px-4 py-3
              rounded-lg
              text-slate-600
              hover:bg-slate-50
              text-sm
              text-left
            "
          >
            <span>⚙</span>
            <span>Settings</span>
          </button>

        </nav>

        {/* Logout */}
        <div className="px-4 py-5 border-t border-slate-100">

          <button
            className="
              w-full flex items-center gap-3
              px-4 py-3
              rounded-lg
              text-slate-600
              hover:bg-slate-50
              text-sm
              text-left
            "
          >
            <span>↪</span>
            <span>Logout</span>
          </button>

        </div>

      </aside>


      {/* Main Dashboard */}
      <main className="flex-1 p-8">

        {/* Welcome Header */}
        <div className="flex items-center justify-between mb-8">

          <div>
            <h1 className="text-2xl font-semibold text-slate-800">
              Good morning, Alex 🌿
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Your mental health journey matters. We're here to support you.
            </p>
          </div>

          {/* Temporary profile */}
          <div className="flex items-center gap-3">

            <div className="
              w-10 h-10
              rounded-full
              bg-teal-100
              flex items-center justify-center
              text-teal-700
              font-semibold
            ">
              A
            </div>

            <div>
              <p className="text-sm font-medium text-slate-800">
                Alex
              </p>

              <p className="text-xs text-slate-500">
                Patient
              </p>
            </div>

          </div>

        </div>


        {/* Dashboard content will be added next */}

        <div className="min-h-[300px]">
          {/* Next Appointment → next step */}
        </div>

      </main>

    </div>
  );
}

export default PatientDashboard;