"use client";
import React from "react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

import { useSession } from "next-auth/react";

export function TestLogin() {
  const { data: session } = useSession();
  console.log("TestLogin session: ", session);
  //const numbers = useQuery(api.myFunctions.myListNumbers, { count: 5 });
  //console.log("TestLogin numbers: ", numbers);
  return <div>TestLogin</div>;
}

export default TestLogin;
