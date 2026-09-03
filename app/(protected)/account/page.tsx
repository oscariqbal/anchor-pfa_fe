// custom components
import ViewAccount from "@/features/auth/view-account-card"

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