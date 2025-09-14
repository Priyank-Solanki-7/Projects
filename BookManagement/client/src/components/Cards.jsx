import React from "react";

const Card = ({ title, value, color, children }) => {
  // If title/value are passed, render stats style
  if (title && value) {
    return (
      <div
        className={`p-6 rounded-xl shadow-md text-white ${color} flex flex-col justify-between`}
      >
        <h4 className="text-lg font-medium">{title}</h4>
        <p className="text-2xl font-bold mt-2">{value}</p>
      </div>
    );
  }

  // Otherwise render as a generic wrapper card
  return (
    <div className="bg-white shadow rounded-xl p-4 hover:shadow-lg transition">
      {children}
    </div>
  );
};

export default Card;
