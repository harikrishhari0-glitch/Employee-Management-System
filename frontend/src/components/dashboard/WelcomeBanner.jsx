import { Clock, CheckSquare } from "lucide-react";

function WelcomeBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-600/20 via-blue-500/10 to-cyan-500/10 p-6">

      {/* Glow */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(at 80% 50%, rgba(79,142,247,.4) 0%, transparent 60%)",
        }}
      />

      {/* Content */}
      <div className="relative">

        <p className="mb-1 text-sm font-medium text-blue-400">
          Wednesday, July 2, 2024
        </p>

        <h1 className="mb-1 text-2xl font-bold text-slate-200">
          Good morning, Alex 👋
        </h1>

        <p className="text-sm text-slate-400">
          You have 3 tasks due this week and 2 pending reviews.
        </p>

      </div>

      {/* Buttons */}

      <div className="relative mt-4 flex gap-3">

        <button
          className="
            flex
            items-center
            gap-2
            rounded-lg
            bg-blue-500
            px-4
            py-2
            text-sm
            font-medium
            text-white
            transition
            hover:bg-blue-600
          "
        >
          <Clock size={16} />
          Check In
        </button>

        <button
          className="
            flex
            items-center
            gap-2
            rounded-lg
            border
            border-slate-700
            bg-slate-800
            px-4
            py-2
            text-sm
            text-slate-200
            transition
            hover:bg-slate-700
          "
        >
          <CheckSquare size={16} />
          My Tasks
        </button>

      </div>

    </div>
  );
}

export default WelcomeBanner;