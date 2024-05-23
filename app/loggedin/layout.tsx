/* eslint-disable @typescript-eslint/no-misused-promises */

//import ConvexClientProvider from "@/app/ConvexClientProvider";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function LoggedInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await auth();
  return (
    <>
      <main className="container max-w-2xl flex flex-col gap-8">
        {children}
        {/* <ConvexClientProvider session={session}>
          {children}
        </ConvexClientProvider> */}
      </main>
    </>
  );
}

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <Button type="submit">Sign out</Button>
    </form>
  );
}
