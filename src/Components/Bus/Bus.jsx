import React, { useCallback, useEffect, useState } from "react";
import Style from "./Bus.module.scss"
const interval = 1; // Minutes

export const Bus = () => {
  const [bus, setBus] = useState(null);

  useEffect(() => {
    handleFetch();
  }, [])

  const handleFetch = async () => {
    try {
      const res = await fetch('http://xmlopen.rejseplanen.dk/bin/rest.exe/multiDepartureBoard?id1=851400602&id2=851973402&rttime&format=json&useBus=1');
      const data = await res.json();

      setBus(data.MultiDepartureBoard.Departure.splice(0, 5));
    } catch (err) { return }

    setTimeout(() => handleFetch(), interval * 1000 * 60);
  }

  return (
    <section>
      <h2>Bustider</h2>
      <ul>
        {bus &&
          bus.map((bus, id) => (
            <li key={id}>
              <p>{bus.line}</p>
              <p>{bus.direction}</p>
              <p>{bus.takeOff} min</p>
            </li>
          ))}
      </ul>
    </section>
  );
};
