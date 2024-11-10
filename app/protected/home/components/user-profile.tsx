import React from "react";

import { useUser } from "@/app/user";

interface Props {
  data: any;
}

export default function userProfile({ data }: Props) {
  const { user } = useUser();
  return (
    <div className="flex gap-4 mb-2">
      <div className="avatar placeholder">
        <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2">
          <span className="text-xl">
            {user?.email?.split("@")[0].charAt(0).toUpperCase()}
          </span>
        </div>
      </div>
      <p className="my-auto text-base font-semibold">Hi, {user?.email}</p>
    </div>
  );
}
