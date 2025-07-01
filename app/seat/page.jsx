"use client";
import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import deskAnimation from "../models/desk.json";
import Image from "next/image";

const RoundTableSeat = () => {
  const [isBottomSeatOccupied, setIsBottomSeatOccupied] = useState(false);
  const [today, setToday] = useState("");
  const [tomorrow, setTomorrow] = useState("");

  useEffect(() => {
    const now = new Date();
    const tomorrowDate = new Date();
    tomorrowDate.setDate(now.getDate() + 1);

    const formattedToday = now.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const formattedTomorrow = tomorrowDate.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    setToday(formattedToday);
    setTomorrow(formattedTomorrow);
  }, []);

  const getAnimationSegment = (seatIndex) => {
    if (seatIndex === 3) {
      return isBottomSeatOccupied ? [57, 120] : [48, 49]; // dynamic
    }
    return [57, 120]; // always occupied
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const seatPositions = [
    { top: "0%", left: "50%", transform: "rotate(0deg)" },
    { top: "40%", left: "0%", transform: "rotate(0deg)" },
    { top: "40%", left: "95%", transform: "rotate(0deg)" },
    { top: "90%", left: "50%", transform: "rotate(0deg)" },
  ];

  return (
    <div className="flex h-screen w-full">
      {/* Left Side - Info Section */}
      <div className="w-1/3  text-white flex flex-col justify-center items-center px-10">
        <Image
          src="/goml.png"
          width={300}
          height={300}
          className="bg-white p-2 rounded-2xl"
          alt="Picture of the author"
        />

        <h1 className="text-4xl font-bold mt-6 mb-4 text-orange-500">
          Seat Allocation
        </h1>

        <div className="bg-orange-400 px-6 py-4 rounded-lg shadow-lg border border-orange-500 mb-4 w-full max-w-md text-center">
          <p className="text-sm font-semibold text-black">
            Today: <span className="text-black font-medium">{today}</span>
          </p>
          <p className="text-lg font-semibold text-black mt-1">
            Allocating seats for: {tomorrow}
          </p>
        </div>

        <p className="text-sm text-black font-semibold">
          Seat is{" "}
          {isBottomSeatOccupied ? (
            <span className="text-red-600">not available</span>
          ) : (
            <span className="text-green-600">available</span>
          )}
        </p>
      </div>

      <div className="w-2/3 bg-gradient-to-t from-orange-300 via-orange-500 to-orange-700 text-white flex flex-col justify-center items-center px-10">
        <div className="relative w-[450px] h-[450px] bg-gradient-to-br from-[#6b4423] to-[#4a2c18] rounded-full border-4 border-[#8B4513] shadow-2xl">
          {seatPositions.map((position, seatIndex) => (
            <div
              key={`seat-${seatIndex}`}
              className="absolute w-60 h-40"
              style={{
                top: position.top,
                left: position.left,
                transform: `${position.transform} translate(-50%, -50%)`,
              }}
            >
              <Lottie
                animationData={deskAnimation}
                loop
                autoplay
                initialSegment={getAnimationSegment(seatIndex)}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          ))}
        </div>

        <div className="flex gap-6 mt-16 flex-wrap items-center justify-center">
          <button
            onClick={() => setIsBottomSeatOccupied(true)}
            className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg 
         hover:bg-emerald-500 active:bg-emerald-700 
         disabled:bg-gray-600 disabled:cursor-not-allowed
         transition-colors duration-200 ease-in-out"
            disabled={isBottomSeatOccupied}
          >
            Book Seat
          </button>

          <button
            onClick={() => setIsBottomSeatOccupied(false)}
            className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg 
         hover:bg-red-500 active:bg-red-700 
         disabled:bg-gray-600 disabled:cursor-not-allowed
         transition-colors duration-200 ease-in-out"
            disabled={!isBottomSeatOccupied}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoundTableSeat;
