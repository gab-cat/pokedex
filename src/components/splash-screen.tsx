"use client";

import type React from "react";

import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const SplashScreen = memo(({ children }: { children: React.ReactNode }) => {
  const [showSplash, setShowSplash] = useState(true);
  const [startExit, setStartExit] = useState(false);

  useEffect(() => {
    // Start exit animation after a shorter duration
    const timer = setTimeout(() => {
      setStartExit(true);
    }, 3000); // Reduced total animation time before exit

    // Hide splash screen after animation completes
    const exitTimer = setTimeout(() => {
      setShowSplash(false);
    }, 3500); // Total time including exit animation

    return () => {
      clearTimeout(timer);
      clearTimeout(exitTimer);
    };

  
  }, []);


  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <div className="fixed inset-0 z-[100] overflow-hidden">
            {/* Top half */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-red-600 to-red-500 flex items-end justify-center overflow-hidden"
              initial={{ y: 0 }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {/* Top half content */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Pokédex top half */}
                <div className="absolute bottom-0 w-72 h-48 flex items-end justify-center">
                  {/* Pokédex outer case top */}
                  <div className="relative w-72 h-48 bg-red-600 rounded-t-lg border-4 border-b-0 border-gray-800 shadow-xl overflow-hidden">
                    {/* Pokédex top lights */}
                    <div className="absolute top-4 left-4 flex space-x-2">
                      <motion.div
                        className="w-6 h-6 bg-blue-400 rounded-full border-2 border-white"
                        animate={{
                          boxShadow: [
                            "0 0 0px rgba(96, 165, 250, 0)",
                            "0 0 20px rgba(96, 165, 250, 0.8)",
                            "0 0 0px rgba(96, 165, 250, 0)",
                          ],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                        }}
                      />
                      <motion.div
                        className="w-3 h-3 bg-red-400 rounded-full border border-white"
                        animate={{
                          boxShadow: [
                            "0 0 0px rgba(248, 113, 113, 0)",
                            "0 0 10px rgba(248, 113, 113, 0.8)",
                            "0 0 0px rgba(248, 113, 113, 0)",
                          ],
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                          delay: 0.2,
                        }}
                      />
                      <motion.div
                        className="w-3 h-3 bg-yellow-400 rounded-full border border-white"
                        animate={{
                          boxShadow: [
                            "0 0 0px rgba(250, 204, 21, 0)",
                            "0 0 10px rgba(250, 204, 21, 0.8)",
                            "0 0 0px rgba(250, 204, 21, 0)",
                          ],
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                          delay: 0.4,
                        }}
                      />
                    </div>

                    {/* Pokédex screen */}
                    <motion.div
                      className="absolute top-16 left-6 right-6 h-24 bg-green-100 rounded-md border-2 border-gray-800 overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                    >
                      {/* Screen content - animated Pokéball */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.8 }}
                      >
                        <motion.div
                          className="relative w-16 h-16"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                          {/* Pokéball top */}
                          <div className="absolute top-0 left-0 right-0 h-1/2 bg-red-500 rounded-t-full border-2 border-black"></div>
                          {/* Pokéball bottom */}
                          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-white rounded-b-full border-2 border-black"></div>
                          {/* Pokéball center */}
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full border-2 border-black z-10"></div>
                          {/* Pokéball divider */}
                          <div className="absolute top-1/2 left-0 right-0 h-2 bg-black transform -translate-y-1/2"></div>
                        </motion.div>
                      </motion.div>

                      {/* Screen scan effect */}
                      <motion.div
                        className="absolute top-0 left-0 right-0 h-2 bg-green-400 opacity-50"
                        animate={{ top: ["0%", "100%", "0%"] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: 0.8 }}
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Pokédex title */}
                <motion.h1
                  className="absolute top-8 text-4xl font-bold text-center text-white drop-shadow-lg"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Pokédex
                </motion.h1>
              </div>
            </motion.div>

            {/* Bottom half */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-red-600 to-red-500 flex items-start justify-center overflow-hidden"
              initial={{ y: 0 }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {/* Bottom half content */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Pokédex bottom half */}
                <div className="absolute top-0 w-72 h-48 flex items-start justify-center">
                  {/* Pokédex outer case bottom */}
                  <div className="relative w-72 h-48 bg-red-600 rounded-b-lg border-4 border-t-0 border-gray-800 shadow-xl overflow-hidden">
                    {/* Pokédex controls */}
                    <div className="absolute top-4 left-6 right-6 h-24 flex flex-col space-y-4">
                      {/* D-pad */}
                      <div className="flex justify-between">
                        <div className="relative w-16 h-16">
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-5 h-5 bg-gray-800 rounded-sm"></div>
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-5 h-5 bg-gray-800 rounded-sm"></div>
                          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-gray-800 rounded-sm"></div>
                          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-gray-800 rounded-sm"></div>
                          <div className="absolute inset-0 m-auto w-5 h-5 bg-gray-800 rounded-sm"></div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex space-x-2">
                          <motion.div
                            className="w-8 h-8 bg-blue-500 rounded-full border-2 border-gray-800"
                            animate={{ scale: startExit ? 0.9 : 1 }}
                            transition={{ duration: 0.2 }}
                          />
                          <motion.div
                            className="w-8 h-8 bg-green-500 rounded-full border-2 border-gray-800"
                            animate={{ scale: startExit ? 0.9 : 1 }}
                            transition={{ duration: 0.2, delay: 0.1 }}
                          />
                        </div>
                      </div>

                      {/* Menu buttons */}
                      <div className="flex justify-center space-x-4">
                        <div className="w-16 h-3 bg-gray-800 rounded-sm" />
                        <div className="w-16 h-3 bg-gray-800 rounded-sm" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tagline */}
                <motion.p
                  className="absolute bottom-12 text-sm text-white/80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  Your complete Pokémon companion
                </motion.p>

                {/* Loading indicator */}
                <motion.div
                  className="absolute bottom-6 flex space-x-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  <motion.div
                    className="w-2 h-2 bg-white rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.4, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.1 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-white rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.4, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.1, delay: 0.1 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-white rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.4, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.1, delay: 0.2 }}
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Center divider line that appears to be "cut" */}
            <motion.div
              className="absolute top-1/2 left-0 right-0 h-1 bg-white transform -translate-y-1/2 z-10"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: startExit ? 1 : 0, opacity: startExit ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Flash effect */}
            <motion.div
              className="absolute inset-0 bg-white z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: startExit ? [0, 0.6, 0] : 0 }}
              transition={{ duration: 0.3, times: [0, 0.5, 1] }}
            />
          </div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <motion.div initial={{ opacity: showSplash ? 0 : 1 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        {children}
      </motion.div>
    </>
  );
});

SplashScreen.displayName = 'SplashScreen';
