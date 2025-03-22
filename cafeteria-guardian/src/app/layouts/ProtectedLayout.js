"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../config/firebaseconfig";
import { useRouter } from "next/navigation";

export default function ProtectedLayout({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setInitializing(false);
      if (!user) {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (initializing || !user) {
    return <div>Loading...</div>;
  }

  return <div className="protected-layout">{children}</div>;
}
