import { Link, NavLink } from "react-router-dom";
import { Vote, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/", label: "Home", id: "nav-home" },
  { to: "/timeline", label: "Timeline", id: "nav-timeline" },
  { to: "/guide", label: "Voting Guide", id: "nav-guide" },
  { to: "/quiz", label: "Quiz", id: "nav-quiz" },
  { to: "/faq", label: "FAQ", id: "nav-faq" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-40 glass-nav border-b border-slate-200/60"
      data-testid="navbar"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 group"
          data-testid="navbar-logo"
        >
          <span className="w-9 h-9 rounded-xl bg-blue-900 text-white grid place-items-center shadow-sm group-hover:scale-105 transition-transform">
            <Vote className="w-5 h-5" />
          </span>
          <span className="font-display font-bold text-lg tracking-tight text-slate-900">
            CivicAI
          </span>
          <span className="hidden sm:inline text-xs font-semibold uppercase tracking-[0.18em] text-orange-600 ml-1">
            India
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              data-testid={l.id}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-900 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <button
          className="md:hidden p-2 rounded-md text-slate-700 hover:bg-slate-100"
          onClick={() => setOpen((v) => !v)}
          data-testid="navbar-mobile-toggle"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="px-4 py-2 flex flex-col">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                data-testid={`${l.id}-mobile`}
                className={({ isActive }) =>
                  `px-3 py-3 rounded-lg text-sm font-medium ${
                    isActive
                      ? "bg-blue-50 text-blue-900"
                      : "text-slate-700 hover:bg-slate-50"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;