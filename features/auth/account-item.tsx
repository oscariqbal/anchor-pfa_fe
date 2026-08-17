"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
        const response = await fetch("http://localhost:5555/api/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        
        const data = await response.json();

        if (response.ok) {
          setUser(data.user);
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
    <div className="w-full flex flex-col items-center mt-4">
      <h1 className="text-2xl md:text-5xl font-heading">{user.name}</h1>
      <p className="text-base opacity-50">{user.email}</p>
    </div>
  );
}