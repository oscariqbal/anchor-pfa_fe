"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function ProfileClient() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const response = await fetch(
        "http://localhost:5555/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUser(data);
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
    </div>
  );
}