"use client";
import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import deskAnimation from "../models/desk.json";
import Image from "next/image";

const RoundTableSeat = () => {
  const [occupiedSeats, setOccupiedSeats] = useState([true, true, true, false]);
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

  const handleJoinTable = () => {
    const availableSeatIndex = occupiedSeats.findIndex((seat) => !seat);
    if (availableSeatIndex !== -1) {
      setOccupiedSeats((prevSeats) =>
        prevSeats.map((seat, index) =>
          index === availableSeatIndex ? true : seat
        )
      );
    }
  };

  const handleLeaveTable = () => {
    const lastOccupiedIndex = occupiedSeats.lastIndexOf(true);
    if (lastOccupiedIndex !== -1) {
      setOccupiedSeats((prevSeats) =>
        prevSeats.map((seat, index) =>
          index === lastOccupiedIndex ? false : seat
        )
      );
    }
  };

  const getAnimationSegment = (isOccupied, seatIndex) => {
    if (seatIndex === 3) {
      return isOccupied ? [57, 120] : [48, 49];
    }
    return [57, 120];
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

  const hasAvailableSeats = occupiedSeats.includes(false);
  const hasOccupiedSeats = occupiedSeats.includes(true);

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

        <h1 className="text-4xl font-bold mt-6 mb-4">Seat Allocation</h1>

        <div className="bg-slate-800 px-6 py-4 rounded-lg shadow-lg border border-slate-700 mb-4 w-full max-w-md text-center">
          <p className="text-sm text-gray-400">
            Today: <span className="text-white font-medium">{today}</span>
          </p>
          <p className="text-lg font-semibold text-emerald-400 mt-1">
            Allocating seats for: {tomorrow}
          </p>
        </div>

        <p className="text-sm text-gray-400">
          {occupiedSeats.filter(Boolean).length} of 12 seats occupied
        </p>
      </div>

      <div className="w-2/3 bg-gradient-to-r from-amber-200 via-amber-500 to-amber-900 text-white flex flex-col justify-center items-center px-10">
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
                initialSegment={getAnimationSegment(
                  occupiedSeats[seatIndex],
                  seatIndex
                )}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          ))}
        </div>

        <div className="flex gap-6 mt-10 flex-wrap justify-center">
          {hasAvailableSeats && (
            <p className="text-green-400 font-semibold text-lg animate-blink mt-4">
              ✅ Seat Available
            </p>
          )}

          <button
            onClick={handleJoinTable}
            className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg 
                 hover:bg-emerald-500 active:bg-emerald-700 
                 disabled:bg-gray-600 disabled:cursor-not-allowed
                 transition-colors duration-200 ease-in-out"
            disabled={!hasAvailableSeats}
          >
            Book Seat
          </button>

          <button
            onClick={handleLeaveTable}
            className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg 
                 hover:bg-red-500 active:bg-red-700 
                 disabled:bg-gray-600 disabled:cursor-not-allowed
                 transition-colors duration-200 ease-in-out"
            disabled={!hasOccupiedSeats}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoundTableSeat;
