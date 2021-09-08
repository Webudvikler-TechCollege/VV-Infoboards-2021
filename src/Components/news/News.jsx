import {memo} from 'react';
import { fetch2api } from '../../helpers/helper'
import { useEffect, useState } from 'react';
import './News.module.scss';

export const News = memo(() => {
    const[newsList, setNewsList] = useState(null);

    const getNewsList = async () => {
        const url = "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.dr.dk%2Fnyheder%2Fservice%2Ffeeds%2Fallenyheder%23";
        const result = await fetch2api(url);
        setNewsList(result?.items);
    }

    useEffect(() => {
        getNewsList();
    }, [])

    return(
        <marquee scrollamount="10" behavior="" direction=""><p>
            {newsList && newsList.map((item, index) => {
                return(
                    <span key={index}>{item.title} * </span>
                )
            })}
        </p></marquee>
    )
}, []);