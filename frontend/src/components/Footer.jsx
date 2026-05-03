import { Vote } from "lucide-react";

export const Footer = () => {
  return (
    <footer
      className="border-t border-slate-200 bg-white"
      data-testid="footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-xl bg-blue-900 text-white grid place-items-center">
            <Vote className="w-5 h-5" />
          </span>
          <div>
            <p className="font-display font-bold text-slate-900">CivicAI</p>
            <p className="text-xs text-slate-500">
              Non-partisan election guide for India
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-500 max-w-md">
          For official information always refer to the{" "}
          <a
            href="https://eci.gov.in"
            target="_blank"
            rel="noreferrer"
            className="text-blue-900 underline-offset-2 hover:underline"
            data-testid="footer-eci-link"
          >
            Election Commission of India
          </a>
          . CivicAI provides educational explanations and is not affiliated with any
          party.
        </p>
      </div>
    </footer>
  );
};

export default Footer;