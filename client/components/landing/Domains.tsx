import { INTERVIEW_DOMAINS } from "@/constants";
import * as Icons from "lucide-react";

export function Domains() {
  return (
    <section id="domains" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            Interview Domains
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Practice across all major tech and business interview types
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {INTERVIEW_DOMAINS.map((domain) => {
            const IconComponent = Icons[domain.icon as keyof typeof Icons] as React.ComponentType<any>;
            return (
              <div
                key={domain.id}
                className="p-6 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all duration-300 text-center cursor-pointer group"
              >
                <div className="w-12 h-12 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-3 group-hover:from-blue-200 group-hover:to-purple-200 transition">
                  {IconComponent ? (
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  ) : (
                    <div className="w-6 h-6 bg-blue-600 rounded" />
                  )}
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">
                  {domain.name}
                </h3>
                <p className="text-xs text-slate-500">
                  Practice questions
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
