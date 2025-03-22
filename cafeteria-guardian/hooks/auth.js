import { auth } from "../config/firebaseconfig.js";
import { AuthContext } from "../src/app/components/context/AuthContext.js";
import { useContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const useAuth = () => {
  const [isLoading, setLoading] = useState(false);

  const register = async (data) => {
    setLoading(true);
    try {
      const { email, password } = data;
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return user;
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (data) => {
    setLoading(true);
    try {
      const { email, password } = data;
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      return user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      console.log("User logged out");
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return { register, login, isLoading, logout };
};

export function useAuthContext() {
  return useContext(AuthContext);
}
