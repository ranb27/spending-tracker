import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Loading from "@/components/ui/loading";
import { ArrowRight, PiggyBank, TrendingUp, CreditCard } from "lucide-react";
import Link from "next/link";

export default async function Index() {
  return (
    <>
      <main className="flex-1 flex flex-col h-full bg-gradient-to-br my-16">
        <div className="flex-1 flex flex-col items-center justify-center px-4 my-8 sm:px-6 lg:px-8">
          <div className="w-full max-w-4xl space-y-12">
            {/* Hero Section */}
            <div className="text-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-32 bg-info rounded-full filter blur-3xl opacity-20"></div>
                </div>
                <h1 className="relative text-4xl sm:text-6xl font-bold text-base-content tracking-tight animate-fade-in">
                  Money Tracking
                  <span className="block text-primary">Made Simple</span>
                </h1>
              </div>
              <p className="text-xl text-base-content/75 animate-fade-in">
                Take control of your finances with our intuitive spending
                tracker
              </p>
              <div className="flex justify-center gap-4 mt-8">
                <Link href="/protected/spend" target="_self" className="flex">
                  <button className="py-2 px-4 text-sm active:scale-95 text-neutral-content bg-neutral rounded-full font-semibold hover:bg-info transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                    Get Started <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FeatureCard
                icon={<PiggyBank className="w-10 h-10 text-info" />}
                title="Save Money"
                description="Set budgets and track your savings goals with ease"
              />
              <FeatureCard
                icon={<TrendingUp className="w-10 h-10 text-info" />}
                title="Visualize Trends"
                description="See your spending patterns with beautiful charts"
              />
              <FeatureCard
                icon={<CreditCard className="w-10 h-10 text-info" />}
                title="All Accounts"
                description="Connect and monitor all your accounts in one place"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: JSX.Element;
  title: string;
  description: string;
}) {
  return (
    <div className="w-full card bg-base-100 shadow-lg p-9 space-y-3 relative overflow-hidden group hover:scale-105 transition-all duration-300">
      <div className="flex gap-2">
        <div className="fill-info dark:fill-info/50 w-12 transform transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
        <h1 className="font-bold text-xl text-base-content my-auto">{title}</h1>
      </div>
      <p className="text-sm text-base-content/75 leading-6">{description}</p>
    </div>
  );
}
