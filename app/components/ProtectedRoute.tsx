"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const auth = sessionStorage.getItem("authenticated");
    if (auth === "true") {
      setIsAuthenticated(true);
    } else {
      router.push("/login");
    }
  }, [router]);

  if (!isAuthenticated) return null; // or a loading spinner

  return <>{children}</>;
}