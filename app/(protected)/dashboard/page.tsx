// others
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Dashboard() {
  return (
    <div className="w-full flex flex-col gap-4">
      <section className="h-[80vh] w-full p-2 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-heading">Welcome</h1>
        </div>
      </section>
    </div>
  );
};
