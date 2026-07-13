import {
  Users,
  CheckCircle,
  Calendar,
  Wallet,
} from "lucide-react";

const stats = [
  {
    title: "Attendance",
    value: "96%",
    subtitle: "This Month",
    icon: <CheckCircle size={22} />,
    color: "bg-emerald-500",
  },
  {
    title: "Tasks",
    value: "12",
    subtitle: "Completed",
    icon: <Users size={22} />,
    color: "bg-blue-500",
  },
  {
    title: "Leave Balance",
    value: "08",
    subtitle: "Remaining",
    icon: <Calendar size={22} />,
    color: "bg-orange-500",
  },
  {
    title: "Salary",
    value: "₹52K",
    subtitle: "This Month",
    icon: <Wallet size={22} />,
    color: "bg-purple-500",
  },
];

function StatsCards() {
  return (
    <div className="grid grid-cols-4 gap-6">

      {stats.map((item, index) => (

        <div
          key={index}
          className="
            rounded-2xl
            bg-[#111d2e]
            border
            border-white/5
            p-5
            hover:border-blue-500/30
            transition
          "
        >

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-400 text-sm">
                {item.title}
              </p>

              <h2 className="text-3xl font-bold text-white mt-2">
                {item.value}
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                {item.subtitle}
              </p>

            </div>

            <div
              className={`${item.color} w-12 h-12 rounded-xl flex items-center justify-center text-white`}
            >
              {item.icon}
            </div>

          </div>

        </div>

      ))}

    </div>
  );
}

export default StatsCards;