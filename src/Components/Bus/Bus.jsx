import React, { useCallback, useEffect, useState } from "react";
import Style from "./Bus.module.scss"
const interval = 1; // Minutes

const endpoints = [
  "http://xmlopen.rejseplanen.dk/bin/rest.exe/departureBoard?id=851400602&rttime&format=json&useBus=1",
  "http://xmlopen.rejseplanen.dk/bin/rest.exe/departureBoard?id=851973402&rttime&format=json&useBus=1"
];

export const Bus = () => {
  const [reset, setReset] = useState(false); // Rerender
  const [busTimes, setBusTimes] = useState([]);
  const [bus, setBus] = useState(null);

  const handleExtractEndpoints = () => {
    // Loop over each enpoint, and merge
    endpoints.forEach(async (endpoint) => {
      try {
        const res = await fetch(endpoint);
        const extractedTimes = await res.json();

        setBusTimes((prevState) =>
          prevState.concat(extractedTimes?.DepartureBoard.Departure)
        ); // Merge with prevState
      } catch (err) {
        return console.log(err.message);
      }
    });

    // Recursion
    setTimeout(() => {
      setBusTimes([]);
      handleExtractEndpoints();
    }, interval * 1000 * 60); // Interval in minutes

    setReset(true);
  };

  // Sorting system
  const sortExtractedTimes = useCallback(() => {
    // To compare local time, add :00
    const sortedTimes = busTimes.sort((a, b) => {
      let firstPeriod = a.time + ":00";
      let seconrdPeriod = b.time + ":00";

      return firstPeriod.localeCompare(seconrdPeriod);
    });

    // Set amount of displaying bus times
    let date = new Date().getHours() + "" + new Date().getMinutes();
    let time = date.length < 4 ? "0" + date : date;
    let busIntervals = sortedTimes
      .filter((bus) => bus.time.replace(":", "") >= time)
      .splice(0, 5);

    // Add take off
    for (let i = 0; i < busIntervals.length; i++) {
      let num = busIntervals[i].time.replace(":", "");
      let timeDifference = String(Number(num) - Number(time));
      busIntervals[i] = {
        ...busIntervals[i],
        takeOff: timeDifference < 10 ? "0" + timeDifference : timeDifference,
      };
    }

    setBus(busIntervals);
    setBusTimes(sortedTimes);
    setReset(true);
  }, [busTimes]);

  useEffect(() => {
    sortExtractedTimes();

    return () => setReset(false);
  }, [busTimes, sortExtractedTimes, reset]);

  useEffect(() => {
    handleExtractEndpoints();
  }, []);

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
