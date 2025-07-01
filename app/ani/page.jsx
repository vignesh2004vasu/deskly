"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const PersonSittingAnimation = () => {
  const [isPersonVisible, setIsPersonVisible] = useState(false);
  const [isPersonSitting, setIsPersonSitting] = useState(false);

  const startAnimation = () => {
    setIsPersonVisible(true);
    // After person enters, make them sit
    setTimeout(() => {
      setIsPersonSitting(true);
    }, 1500);
  };

  const resetAnimation = () => {
    setIsPersonSitting(false);
    setIsPersonVisible(false);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-blue-100 to-green-100 relative overflow-hidden">
      {/* Room background */}
      <div className="absolute inset-0">
        {/* Floor */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-amber-800 to-amber-600" />

        {/* Wall */}
        <div className="absolute top-0 w-full h-3/4 bg-gradient-to-b from-blue-50 to-blue-100" />

        {/* Window */}
        <motion.div
          className="absolute top-16 right-16 w-32 h-24 bg-sky-200 border-4 border-amber-800 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="w-full h-full bg-gradient-to-b from-yellow-200 to-sky-300" />
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-amber-800" />
          <div className="absolute top-0 left-1/2 w-0.5 h-full bg-amber-800" />
        </motion.div>
      </div>

      {/* Table */}
      <motion.div
        className="absolute bottom-48 left-1/2 transform -translate-x-1/2"
        initial={{ scale: 0, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "backOut" }}
      >
        {/* Table top */}
        <div className="w-48 h-4 bg-amber-700 rounded-lg shadow-lg" />

        {/* Table legs */}
        <div className="absolute top-4 left-4 w-2 h-20 bg-amber-800" />
        <div className="absolute top-4 right-4 w-2 h-20 bg-amber-800" />
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-2 h-20 bg-amber-800" />

        {/* Table items */}
        <motion.div
          className="absolute -top-2 left-8 w-6 h-6 bg-white rounded-full border-2 border-gray-300"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.3 }}
        />
        <motion.div
          className="absolute -top-1 right-8 w-4 h-8 bg-blue-600 rounded-sm"
          initial={{ scale: 0, rotate: 45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 1.2, duration: 0.3 }}
        />
      </motion.div>

      {/* Chair */}
      <motion.div
        className="absolute bottom-32 left-1/2 transform -translate-x-1/2 translate-x-20"
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        {/* Chair seat */}
        <div className="w-12 h-3 bg-amber-600 rounded" />

        {/* Chair back */}
        <div className="absolute -top-12 left-0 w-12 h-12 bg-amber-600 rounded-t" />

        {/* Chair legs */}
        <div className="absolute top-3 left-1 w-1 h-16 bg-amber-800" />
        <div className="absolute top-3 right-1 w-1 h-16 bg-amber-800" />
        <div className="absolute -top-12 left-1 w-1 h-12 bg-amber-800" />
        <div className="absolute -top-12 right-1 w-1 h-12 bg-amber-800" />
      </motion.div>

      {/* Person */}
      <AnimatePresence>
        {isPersonVisible && (
          <motion.div
            className="absolute bottom-48"
            initial={{ x: -100, opacity: 0 }}
            animate={{
              x: isPersonSitting
                ? window.innerWidth / 2 + 60
                : window.innerWidth / 2 - 80,
              opacity: 1,
            }}
            exit={{ x: -100, opacity: 0 }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              x: { duration: isPersonSitting ? 1 : 1.5 },
            }}
          >
            {/* Person body */}
            <div className="relative">
              {/* Head */}
              <motion.div
                className="w-8 h-8 bg-pink-300 rounded-full border-2 border-pink-400 relative"
                animate={{
                  y: isPersonSitting ? -28 : 0,
                }}
                transition={{ duration: 0.8, delay: isPersonSitting ? 0 : 0 }}
              >
                {/* Eyes */}
                <div className="absolute top-2 left-1.5 w-1 h-1 bg-black rounded-full" />
                <div className="absolute top-2 right-1.5 w-1 h-1 bg-black rounded-full" />
                {/* Smile */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-3 h-1 border-b-2 border-black rounded-b" />
              </motion.div>

              {/* Body */}
              <motion.div
                className="w-6 h-12 bg-blue-500 rounded-b mx-1"
                animate={{
                  height: isPersonSitting ? 10 : 12,
                  y: isPersonSitting ? -20 : 0,
                }}
                transition={{ duration: 0.8 }}
              />

              {/* Arms */}
              <motion.div
                className="absolute top-8 -left-1 w-3 h-1 bg-pink-300 rounded"
                animate={{
                  rotate: isPersonSitting ? -20 : 0,
                  y: isPersonSitting ? -18 : 0,
                }}
                transition={{ duration: 0.8 }}
              />
              <motion.div
                className="absolute top-8 -right-1 w-3 h-1 bg-pink-300 rounded"
                animate={{
                  rotate: isPersonSitting ? 20 : 0,
                  y: isPersonSitting ? -18 : 0,
                }}
                transition={{ duration: 0.8 }}
              />

              {/* Upper legs (thighs) */}
              <motion.div
                className="absolute bottom-0 left-0.5 w-2 h-6 bg-black rounded origin-top"
                animate={{
                  rotate: isPersonSitting ? 90 : 0,
                  y: isPersonSitting ? -8 : 0,
                  x: isPersonSitting ? 1 : 0,
                }}
                transition={{ duration: 0.8 }}
              />
              <motion.div
                className="absolute bottom-0 right-0.5 w-2 h-6 bg-black rounded origin-top"
                animate={{
                  rotate: isPersonSitting ? 90 : 0,
                  y: isPersonSitting ? -8 : 0,
                  x: isPersonSitting ? -1 : 0,
                }}
                transition={{ duration: 0.8 }}
              />

              {/* Lower legs (shins) */}
              <motion.div
                className="absolute bottom-0 left-0.5 w-1.5 h-4 bg-gray-800 rounded origin-top"
                animate={{
                  rotate: isPersonSitting ? 0 : 0,
                  y: isPersonSitting ? 0 : 6,
                  x: isPersonSitting ? 7 : 0,
                }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <motion.div
                className="absolute bottom-0 right-0.5 w-1.5 h-4 bg-gray-800 rounded origin-top"
                animate={{
                  rotate: isPersonSitting ? 0 : 0,
                  y: isPersonSitting ? 0 : 6,
                  x: isPersonSitting ? -7 : 0,
                }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />

              {/* Feet */}
              <motion.div
                className="absolute bottom-0 left-0.5 w-3 h-1.5 bg-brown-600 rounded"
                animate={{
                  y: isPersonSitting ? 4 : 10,
                  x: isPersonSitting ? 6 : 0,
                }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
              <motion.div
                className="absolute bottom-0 right-0.5 w-3 h-1.5 bg-brown-600 rounded"
                animate={{
                  y: isPersonSitting ? 4 : 10,
                  x: isPersonSitting ? -6 : 0,
                }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute top-4 left-4 space-x-4">
        <motion.button
          onClick={startAnimation}
          className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold shadow-lg"
          whileHover={{ scale: 1.05, backgroundColor: "rgb(34, 197, 94)" }}
          whileTap={{ scale: 0.95 }}
          disabled={isPersonVisible}
        >
          Start Animation
        </motion.button>

        <motion.button
          onClick={resetAnimation}
          className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold shadow-lg"
          whileHover={{ scale: 1.05, backgroundColor: "rgb(239, 68, 68)" }}
          whileTap={{ scale: 0.95 }}
        >
          Reset
        </motion.button>
      </div>

      {/* Animation status */}
      <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg">
        <p className="font-semibold">Animation Status:</p>
        <p
          className={`${isPersonVisible ? "text-green-600" : "text-gray-400"}`}
        >
          Person visible: {isPersonVisible ? "✓" : "✗"}
        </p>
        <p
          className={`${isPersonSitting ? "text-green-600" : "text-gray-400"}`}
        >
          Person sitting: {isPersonSitting ? "✓" : "✗"}
        </p>
      </div>
    </div>
  );
};

export default PersonSittingAnimation;
