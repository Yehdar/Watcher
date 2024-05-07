import React from "react";

interface Card {
  id: number;
  name: string;
  clockin: string;
}

const CardComponent: React.FC<{ card: Card }> = ({ card }) => {
  return (
    <div className="bg-white shadow-lg round-lg p-2 mb-2 hover:big-gray-100">
      <div className="text=sm text-gray-600">{card.id}</div>
      <div className="text=lg font-semibold text-gray-800">{card.name}</div>
      <div className="text-md text-gray-700">{card.clockin}</div>
    </div>
  );
};

export default CardComponent;
