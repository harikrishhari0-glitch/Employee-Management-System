import {
  CalendarPlus,
  FileDown,
  ClipboardList,
  UserCog,
  MessageSquare,
} from "lucide-react";

const actions = [
  {
    title: "Apply for Leave",
    icon: <CalendarPlus size={18} />,
    color: "text-blue-400",
  },
  {
    title: "Download Payslip",
    icon: <FileDown size={18} />,
    color: "text-green-400",
  },
  {
    title: "View Tasks",
    icon: <ClipboardList size={18} />,
    color: "text-orange-400",
  },
  {
    title: "Update Profile",
    icon: <UserCog size={18} />,
    color: "text-purple-400",
  },
  {
    title: "Open Chat",
    icon: <MessageSquare size={18} />,
    color: "text-pink-400",
  },
];

function QuickActions() {
  return (
    <div className="bg-[#111827] rounded-2xl border border-slate-700 p-6">

      <h2 className="text-xl font-semibold text-white mb-6">
        Quick Actions
      </h2>

      <div className="space-y-3">

        {actions.map((action, index) => (
          <button
            key={index}
            className="
              w-full
              flex
              items-center
              justify-between
              px-4
              py-3
              rounded-xl
              bg-slate-800
              hover:bg-slate-700
              transition-all
              duration-200
              group
            "
          >
            <div className="flex items-center gap-3">
              <div className={action.color}>
                {action.icon}
              </div>

              <span className="text-white text-sm font-medium">
                {action.title}
              </span>
            </div>

            <span className="text-slate-500 group-hover:text-white text-lg">
              →
            </span>
          </button>
        ))}

      </div>

    </div>
  );
}

export default QuickActions;