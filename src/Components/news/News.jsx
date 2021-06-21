import { fetch2api } from '../../helpers/fetch'
import { useEffect, useState } from 'react';
import Style from './News.module.scss';

export const Hytte = () => {
    const[hytteListe, setHytteListe] = useState(null);

    const getHytteListe = async () => {
        const url = "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.dr.dk%2Fnyheder%2Fservice%2Ffeeds%2Fallenyheder%23";
        const result = await fetch2api(url);
        setHytteListe(result?.items);
    }

    useEffect(() => {
        getHytteListe();
    }, [])

    return(
        <marquee behavior="" direction=""><p>
            {hytteListe && hytteListe.map((item, i) => {
                return(
                    item.title + `*`
                )
            })}
        </p></marquee>
    )
}