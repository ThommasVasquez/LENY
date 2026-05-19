"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Mail, Instagram, Facebook, Globe } from "lucide-react";

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mouse parallax effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 50, damping: 20 });

  function handleMouseMove(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) {
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;
    const xPct = clientX / innerWidth - 0.5;
    const yPct = clientY / innerHeight - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  const bgX = useTransform(mouseX, [-0.5, 0.5], ["-5%", "5%"]);
  const bgY = useTransform(mouseY, [-0.5, 0.5], ["-5%", "5%"]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // Here you would typically send the email to your backend
      console.log("Email submitted:", email);
    }
  };

  const calculateTimeLeft = () => {
    // Set launch date to 14 days from now for demo purposes
    // In a real scenario, this would be a fixed date string like "2024-12-31"
    const difference = +new Date("2026-02-09") - +new Date();

    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (
      !timeLeft[interval as keyof typeof timeLeft] &&
      interval === "days" &&
      timeLeft.days === 0
    ) {
      return null;
    }

    return (
      <div key={interval} className="flex flex-col items-center mx-2 md:mx-4">
        <div className="text-2xl md:text-4xl font-playfair font-bold text-wood-primary">
          {timeLeft[interval as keyof typeof timeLeft]}
        </div>
        <div className="text-xs md:text-sm text-wood-text/60 uppercase tracking-widest font-geist-mono mt-1">
          {interval === "days"
            ? "Días"
            : interval === "hours"
              ? "Horas"
              : interval === "minutes"
                ? "Min"
                : "Seg"}
        </div>
      </div>
    );
  });

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-wood-bg flex items-center justify-center"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Background */}
      <motion.div
        className="absolute inset-[-20px] z-0"
        style={{ x: bgX, y: bgY }}
      >
        <Image
          src="/hero-wood.png"
          alt="Wood Texture Background"
          fill
          className="object-cover opacity-20 blur-sm"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-wood-bg via-transparent to-wood-bg/50" />
      </motion.div>

      {/* Main Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl px-6"
      >
        <div className="glass-panel p-8 md:p-12 text-center border-wood-secondary/30 shadow-2xl backdrop-blur-xl">
          {/* Logo / Brand */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-8 flex justify-center"
          >
            <div className="relative w-64 h-24 md:w-80 md:h-32">
              <Image
                src="/artesanias-leny.svg"
                alt="Artesanías Leny"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-4xl md:text-6xl font-playfair font-bold text-wood-primary mb-4"
          >
            Próximamente
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-lg md:text-xl text-wood-text/80 mb-8 font-geist-sans max-w-md mx-auto leading-relaxed"
          >
            Estamos tallando una nueva experiencia digital para ti. Artesanías
            que cuentan historias, pronto en tu hogar.
          </motion.p>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center mb-10 p-4 rounded-xl bg-wood-secondary/10 border border-wood-secondary/20 backdrop-blur-sm"
          >
            {timerComponents.length ? (
              timerComponents
            ) : (
              <span className="text-xl font-playfair text-wood-primary">
                ¡Ya llegamos!
              </span>
            )}
          </motion.div>

          {/* Email Capture */}
          {!isSubmitted ? (
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-10"
            >
              <div className="relative grow group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-wood-text/40 group-focus-within:text-wood-highlight transition-colors" />
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/50 border border-wood-secondary/50 focus:border-wood-highlight focus:ring-2 focus:ring-wood-highlight/20 outline-none transition-all placeholder:text-wood-text/40 text-wood-text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-wood-highlight text-white font-medium hover:bg-wood-details transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-wood-highlight/20 flex items-center justify-center gap-2"
              >
                Notificarme <ArrowRight className="w-4 h-4" />
              </button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-green-100/50 text-green-800 rounded-xl mb-10 border border-green-200"
            >
              ¡Gracias! Te avisaremos cuando estemos listos.
            </motion.div>
          )}

          {/* Socials / Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex items-center justify-center gap-6 text-wood-text/60"
          >
            <a
              href="#"
              className="hover:text-wood-highlight transition-colors transform hover:-translate-y-1"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="hover:text-wood-highlight transition-colors transform hover:-translate-y-1"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="hover:text-wood-highlight transition-colors transform hover:-translate-y-1"
            >
              <Globe className="w-6 h-6" />
            </a>
          </motion.div>

          <div className="mt-8 text-sm text-wood-text/40 font-geist-mono">
            &copy; {new Date().getFullYear()} Artesanías Leny
          </div>
        </div>
      </motion.div>
    </div>
  );
}
