import Link from "next/link";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl flex flex-col gap-12 items-start my-auto">
      <button className="btn btn-xs btn-link rounded absolute top-4">
        <Link href={"/"} className="flex gap-1">
          <svg
            viewBox="0 0 512 512"
            fill="currentColor"
            height="1em"
            width="1em"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="square"
              strokeMiterlimit={10}
              strokeWidth={48}
              d="M328 112L184 256l144 144"
            />
          </svg>
          Home
        </Link>
      </button>
      {children}
    </div>
  );
}
