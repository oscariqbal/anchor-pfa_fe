// features components
import ViewAccount from "@/features/auth/view-account"

// others
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
};

export default function Account() {
  return (
    <section>
      <ViewAccount />
    </section>
  );
};