import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface StatisticsProps {
  selectedNumbers: number[];
  appearances: { [key: number]: number };
}

const Statistics = ({ selectedNumbers, appearances }: StatisticsProps) => {
  const data = selectedNumbers.map((number) => ({
    number: number.toString(),
    appearances: appearances[number] || 0,
  }));

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold text-lottery-secondary mb-4">Number Appearances</h2>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="number" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="appearances" fill="#FF336D" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Statistics;