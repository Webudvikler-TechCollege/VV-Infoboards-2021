import React, { useEffect, useState } from 'react'
import { doFetch } from '../../helpers/fetch'
import Style from './Menu.module.scss'
export default function Menu() {

  const [days, setDays] = useState(null);

  const url = 'https://infoskaerm.techcollege.dk/umbraco/api/content/getcanteenmenu/?type=json'

  const getMenu = async () => {
    let res = await doFetch(url)
    setDays(res)
  }

  useEffect(() => {
    getMenu()
  }, [])

  const arrDayLocal = [
    "søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"
    ]
    
    const date = new Date().getDay();

  return (
    <>
      {
        days && days.Days.map((item, index) => (
          <React.Fragment key={index}>
            {
              arrDayLocal[date] === item.DayName && <div className={Style.dagensret}><h2>Dagens ret</h2><p>{item.Dish}</p></div>
            }  
          </React.Fragment>
        ))  
      }
    </>
  )
}