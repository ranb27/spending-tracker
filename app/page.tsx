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
            </div>

            <div className="carousel w-full">{carousel()}</div>
            <div className="flex w-full justify-center gap-2 py-2">
              <a href="#item1" className="btn btn-xs">
                1
              </a>
              <a href="#item2" className="btn btn-xs">
                2
              </a>
              <a href="#item3" className="btn btn-xs">
                3
              </a>
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <Link href="/protected/spend" target="_self" className="flex">
              <button className="py-2 px-4 text-sm active:scale-95 text-neutral-content bg-neutral rounded-full font-semibold hover:bg-info transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                Get Started <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

function carousel() {
  const carouselItems = [
    {
      id: "item1",
      icon: <PiggyBank className="w-24 h-24 text-primary" />,
      title: "Save Money Effortlessly",
      description: "Set savings goals and track progress with ease.",
    },
    {
      id: "item2",
      icon: <TrendingUp className="w-24 h-24 text-primary" />,
      title: "Monitor Spending Trends",
      description: "View spending patterns to manage your budget better.",
    },
    {
      id: "item3",
      icon: <CreditCard className="w-24 h-24 text-primary" />,
      title: "Manage Your Balance",
      description: "Keep track of your income and expenses with ease.",
    },
  ];

  return (
    <div className="carousel mx-auto gap-4 h-auto rounded-lg shadow-lg">
      {carouselItems.map((item) => (
        <div
          key={item.id}
          id={item.id}
          className="carousel-item w-full card bg-base-200"
        >
          <div className="card-body flex items-center space-x-4">
            {item.icon}
            <div>
              <h2 className="font-bold text-xl">{item.title}</h2>
              <p className="text-sm text-base-content/50">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
