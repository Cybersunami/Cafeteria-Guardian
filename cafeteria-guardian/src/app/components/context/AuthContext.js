"use client";
import { createContext, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export const AuthContext = createContext({
  user: null,
  initializing: true,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setInitializing(false);

      if (!user) {
        router.push("/login");
      }
    });
    return unsubscribe;
  }, []);
  if (initializing) {
    return <div>Loading...</div>;
  }
  return (
    <AuthContext.Provider value={{ user, initializing }}>
      {children}
    </AuthContext.Provider>
  );
}
