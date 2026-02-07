"use client";
import { useState } from "react";
import DonationForm from "./donation-form";
import AnonymousDonation from "./anonymous-donation";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export default function Donate() {
  const [show, setShow] = useState(false);
  return (
    <div className="md:w-[50%] md:mx-auto lg:mx-0 py-16 lg:px-24 lg:py-0">
      <div
        onClick={() => setShow(!show)}
        className="py-3 flex gap-2 p-2 border-2 my-2 cursor-pointer"
      >
        <motion.div
          animate={{ rotate: show ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          <ArrowRight />
        </motion.div>
        <p>{!show ? "Donate Anonymously" : "Be recognized for you gift"}</p>
      </div>
      <AnimatePresence mode="wait">
        {!show ? <DonationForm key="form" /> : <AnonymousDonation key="anon" />}
      </AnimatePresence>
    </div>
  );
}
