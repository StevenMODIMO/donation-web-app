"use client";
import { useState, useEffect } from "react";
import DonationForm from "./donation-form";
import AnonymousDonation from "./anonymous-donation";
import { ArrowRight, Command } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export default function Donate() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const modKey = isMac ? e.metaKey : e.ctrlKey;

      // Use Ctrl/Cmd + M => AnonymousDonation
      if (modKey && e.key.toLowerCase() === "z") {
        setShow(true);
        e.preventDefault();
      }
      // Use Ctrl/Cmd + O => DonationForm
      else if (modKey && e.key.toLowerCase() === "o") {
        setShow(false);
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  return (
    <div className="md:w-[50%] md:mx-auto lg:mx-0 py-16 lg:px-24 lg:py-0">
      <div
        onClick={() => setShow(!show)}
        className="py-3 flex gap-2 p-2 border-2 my-2 cursor-pointer lg:flex lg:justify-between"
      >
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: show ? 180 : 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <ArrowRight />
          </motion.div>
          <p>{!show ? "Donate Anonymously" : "Be recognized for you gift"}</p>
        </div>
        <div className="flex items-center gap-2 justify-between">
          {!show ? (
            <span className="hidden lg:flex lg:items-center lg:gap-2">
              <Command size={16} /> + Z
            </span>
          ) : (
            <span className="hidden lg:flex lg:items-center lg:gap-2">
              <Command size={16} /> <p>+ O</p>
            </span>
          )}
        </div>
      </div>
      <AnimatePresence mode="wait">
        {!show ? <DonationForm key="form" /> : <AnonymousDonation key="anon" />}
      </AnimatePresence>
    </div>
  );
}
