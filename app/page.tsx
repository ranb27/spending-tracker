import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Loading from "@/components/ui/loading";
import { ArrowRight, PiggyBank, TrendingUp, CreditCard } from "lucide-react";
import Link from "next/link";
import Icon from "@/public/icon.png";
import Image from "next/image";

export default async function Index() {
  return (
    <>
      <main className="flex-1 flex flex-col h-full bg-gradient-to-br">
        <div className="flex-1 flex flex-col items-center justify-center px-4 my-8 sm:px-6 lg:px-8">
          <div className="w-full max-w-4xl space-y-4">
            {/* Hero Section */}
            <div className="text-center">
              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-32 bg-info rounded-full filter blur-3xl opacity-20"></div>
                </div>

                <Image
                  src={Icon}
                  alt="logo"
                  width={128}
                  height={128}
                  className="mx-auto my-4 animate-fade-in"
                />
                <h1 className="relative text-3xl sm:text-5xl font-bold text-base-content tracking-tight animate-fade-in">
                  Money Tracking
                  <span className="block text-primary">Made Simple</span>
                </h1>
              </div>
              <p className="text-base text-base-content/75 animate-fade-in">
                Take control of your finances with our intuitive spending
                tracker
              </p>
            </div>

            <div className="carousel w-full">{carousel()}</div>
            <div className="flex w-full justify-center gap-2">
              <a href="#item1" className="btn btn-xs btn-circle btn-neutral">
                1
              </a>
              <a href="#item2" className="btn btn-xs btn-circle btn-neutral">
                2
              </a>
              <a href="#item3" className="btn btn-xs btn-circle btn-neutral">
                3
              </a>
            </div>
          </div>
          <Link
            href="/protected/home"
            target="_self"
            className="w-full flex justify-center mt-auto pt-4"
          >
            <button className="btn btn-accent w-full md:w-fit">
              Get Started <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </main>
    </>
  );
}

function carousel() {
  const carouselItems = [
    {
      id: "item1",
      icon: (
        <PiggyBank className="w-16 h-16 text-info bg-info/15 rounded-full p-2" />
      ),
      title: "Save Money Effortlessly",
      description: "Set savings goals and track progress with ease.",
    },
    {
      id: "item2",
      icon: (
        <TrendingUp className="w-16 h-16 text-info bg-info/15 rounded-full p-2" />
      ),
      title: "Monitor Spending Trends",
      description: "View spending patterns to manage your budget.",
    },
    {
      id: "item3",
      icon: (
        <CreditCard className="w-16 h-16 text-info bg-info/15 rounded-full p-2" />
      ),
      title: "Manage Your Balance",
      description: "Keep track of your income and expenses.",
    },
  ];

  return (
    <div className="carousel w-full h-full bg-base-300/50 rounded-xl py-8">
      {carouselItems.map((item) => (
        <div key={item.id} id={item.id} className="carousel-item w-full">
          <div className="w-full flex flex-col justify-center items-center">
            {item.icon}

            <h2 className="font-semibold">{item.title}</h2>
            <p className="text-xs text-base-content/50">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
