import {
  Clock3,
  Circle,
  CheckCircle2,
} from "lucide-react";

const tasks = [
  {
    title: "Review Q3 architecture proposal",
    status: "in-progress",
    date: "Jul 5",
  },
  {
    title: "Update API documentation",
    status: "todo",
    date: "Jul 8",
  },
  {
    title: "Fix authentication bug #1247",
    status: "in-progress",
    date: "Jul 3",
  },
  {
    title: "Code review for feature/auth-refresh",
    status: "done",
    date: "Jul 1",
  },
];

function getStatus(status) {
  switch (status) {
    case "done":
      return {
        icon: <CheckCircle2 size={15} />,
        color: "bg-green-500/20 text-green-400",
      };

    case "todo":
      return {
        icon: <Circle size={15} />,
        color: "bg-orange-500/20 text-orange-400",
      };

    default:
      return {
        icon: <Clock3 size={15} />,
        color: "bg-blue-500/20 text-blue-400",
      };
  }
}

function RecentTasks() {
  return (
    <div className="rounded-2xl border border-slate-700 bg-[#111827] p-6">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-xl font-semibold text-white">
          Recent Tasks
        </h2>

        <button className="text-sm text-blue-400 hover:text-blue-300">
          View all
        </button>

      </div>

      {/* Tasks */}

      <div className="space-y-4">

        {tasks.map((task, index) => {
          const badge = getStatus(task.status);

          return (
            <div
              key={index}
              className="flex items-center justify-between rounded-xl bg-slate-800 p-4 transition hover:bg-slate-700"
            >

              <div>

                <h3 className="text-sm font-medium text-white">
                  {task.title}
                </h3>

              </div>

              <div className="flex items-center gap-4">

                <span
                  className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${badge.color}`}
                >
                  {badge.icon}
                  {task.status}
                </span>

                <span className="w-12 text-right text-sm text-slate-400">
                  {task.date}
                </span>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default RecentTasks;