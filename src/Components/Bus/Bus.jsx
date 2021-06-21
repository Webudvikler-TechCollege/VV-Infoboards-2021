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
      const res = await fetch('https://xmlopen.rejseplanen.dk/bin/rest.exe/multiDepartureBoard?id1=851400602&id2=851973402&rttime&format=json&useBus=1');
      const data = await res.json();

      let departure = data.MultiDepartureBoard.Departure.splice(0, 5);

      // Date 
      let date = new Date()
      let hours = date.getHours();
      let minutes = date.getMinutes();

      // Current time
      let currentTime = (hours < 10 ? "0" + hours : hours) + ':' + (minutes < 10 ? "0" + minutes : minutes);
      let time = currentTime.length < 4 ? "0" + currentTime : currentTime;

      // Today
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let today = `${year}/${month}/${day}`;

      for (let i = 0; i < departure.length; i++) {
        let diff = Math.abs(Math.round(new Date(today + ' ' + (departure[i].time + ":00")) - new Date(today + ' ' + (time + ":00")))) / 1000;

        // Calculate hours
        const hours = Math.floor(diff / 3600) % 24;
        diff -= hours * 3600;

        // Calculate minutes
        const minutes = Math.floor(diff / 60) % 60;
        diff -= minutes * 60;

        // Dispaly time difference
        let difference = `${minutes}min`;

        departure[i].time = difference
      }

      setBus(departure)
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
              <p>{bus.time}</p>
            </li>
          ))}
      </ul>
    </section>
  );
};
