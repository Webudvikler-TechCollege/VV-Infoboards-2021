import React, { useEffect, useState } from "react";
import Style from './Date.module.scss'

export const GetCurrentDate = () => {
  const [date, setDate] = useState(new window.Date());

  useEffect(() => {
    setInterval(() => {
      setDate(new window.Date());
    }, 1000);
  }, []);



  return (
    <>
      <div className={Style.date}>
        {date && date.toLocaleDateString([], {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
      </div>
      <div className={Style.time}>
        {date && date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }).replace(".", ":")}
      </div>
    </>
  );
};
