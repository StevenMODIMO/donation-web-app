"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";

interface RegisterTypes {
  full_name: string;
  email: string;
  phone_number: string;
  message: string;
}

export const useRegisterDonor = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1] || "en";

  const register = async ({
    full_name,
    email,
    phone_number,
    message,
  }: RegisterTypes) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${currentLocale}/api/donors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ full_name, email, phone_number, message }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        console.log(data);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { register, error, loading, setError, setLoading };
};
