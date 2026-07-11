"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LogoutButton from "./logout";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function ProfileClient() {
  const route = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:5555/api/profile", {
            credentials: "include",
          });
        const data = await response.json();

        if (response.ok) {
          setUser(data);
        }
        if (response.status === 401) {
          route.replace("/login");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full mx-auto border border-red-500 mt-4">
      <h1>Name: {user.name}</h1>
      <p>Email: {user.email}</p>
      <LogoutButton />
    </div>
  );
}