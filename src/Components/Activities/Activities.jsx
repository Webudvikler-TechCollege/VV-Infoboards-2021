import React, { useEffect, useState } from 'react';
import Style from './Activities.module.scss';

const Activities = () => {
    const [fetchedData, setFetchedData] = useState([]);
    const [nextDayData, setNextDayData] = useState([]);
    const nextDay_Timestamp = new Date().setHours(0, 0, 0, 0) / 1000 + 86400;

    const [nextDay, setNextDay] = useState('');

    const fetchHelper = async () => {
        const url = 'https://api.mediehuset.net/infoboard/activities';
        const options = {
            method: 'GET',
        }
        const response = await fetch(url, options);
        const data = await response.json();

        const fetched_data = data.result.filter(elements => elements.timestamp < nextDay_Timestamp);
        setFetchedData(fetched_data)

        const next_day_data = data.result.filter(elements => elements.timestamp >= nextDay_Timestamp);
        const next_day_data_sliced = next_day_data.slice(0, 14 - 1 - fetchedData.length);
        setNextDayData(next_day_data_sliced);
    };

    const setNextDayFunction = () => {
        const nextDay_Day = new Date(nextDay_Timestamp * 1000).getDay();
        const nextDay_Month = new Date(nextDay_Timestamp * 1000).getMonth();
        const nextDay_Date = new Date(nextDay_Timestamp * 1000).getDate();

        let day, date = nextDay_Date, month;

        switch (nextDay_Day) {
            default:
                break;
            case 0:
                day = 'Søndag';
                break;
            case 1:
                day = 'Mandag';
                break;
            case 2:
                day = 'Tirsdag';
                break;
            case 3:
                day = 'Onsdag';
                break;
            case 4:
                day = 'Torsdag';
                break;
            case 5:
                day = 'Fredag';
                break;
            case 6:
                day = 'Lørdag';
                break;
        }

        switch (nextDay_Month) {
            default:
                break;
            case 0:
                month = 'Januar';
                break;
            case 1:
                month = 'Febuar';
                break;
            case 2:
                month = 'Marts';
                break;
            case 3:
                month = 'April';
                break;
            case 4:
                month = 'Maj';
                break;
            case 5:
                month = 'Juni';
                break;
            case 6:
                month = 'Juli';
                break;
            case 7:
                month = 'August';
                break;
            case 8:
                month = 'September';
                break;
            case 9:
                month = 'Oktober';
                break;
            case 10:
                month = 'November';
                break;
            case 11:
                month = 'December';
                break;
        }


        setNextDay(`${day}`+ ` ${date}` + ` ${month}`)
    }
    
    useEffect(() => {
        fetchHelper();
        setNextDayFunction();
        setInterval(() => {
            fetchHelper();
            setNextDayFunction();
        }, 600000)
    }, [])

    const handleTime = (input) => {
        const inputMiliseconds = input * 1000;
        const inputHours = JSON.stringify(new Date(inputMiliseconds).getHours());
        const inputMinutes = JSON.stringify(new Date(inputMiliseconds).getMinutes());

        const hours = inputHours.padStart(2, '0');
        const minutes = inputMinutes.padEnd(2, '0');


        return `${hours}:${minutes}`;
    }

    const handleEducation = (input) => {
        const educationName = input.replace(/[0-9]/g, '');
        let title;
        switch (educationName) {
            default: 
                title = '';
                break;
            case 'agr':
                title = 'AMU Grafik';
                break;
            case 'abi':
                title = 'AMU Billedbehandling';
                break;
            case 'biw':
                title = 'It, Web og Medie';
                break;
            case 'ggr':
                title = 'Grafik Tekniker';
                break;
            case 'hgr':
                title = 'Grafik Tekniker';
                break;
            case 'gmg':
                title = 'Mediegrafiker';
                break;
            case 'hmg':
                title = 'Mediegrafiker';
                break;
            case 'gwe':
                title = 'Webudvikler';
                break;
            case 'hwe':
                title = 'Webudvikler';
                break;
            case 'gmp':
                title = 'Medie College';
                break;
        }

        return title;
    }

    return (
        <table className={Style.tableWidget} cellPadding="0" cellSpacing="0">
            <thead>
                <tr className={Style.tableHeader}>
                    <th>Kl.</th>
                    <th>Fag</th>
                    <th>Uddannelse</th>
                    <th>Hold</th>
                    <th>Lokale</th>
                </tr>
            </thead>

            <tbody id="tableBody">
                {fetchedData && fetchedData.slice(0, 14).map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{handleTime(item.timestamp)}</td>
                            <td>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</td>
                            <td>{handleEducation(item.class)}</td>
                            <td>{item.class}</td>
                            <td>{item.classroom}</td>
                        </tr>
                    )
                })}

                { fetchedData && fetchedData.length < 14 ? 
                    <tr>
                        <td>{nextDay}</td>
                    </tr> 
                    : null
                }

                { fetchedData && fetchedData.length < 13 ? 
                    nextDayData.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{handleTime(item.timestamp)}</td>
                                <td>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</td>
                                <td>{handleEducation(item.class)}</td>
                                <td>{item.class}</td>
                                <td>{item.classroom}</td>
                            </tr>
                        ) 
                    })
                    : null
                }
            </tbody>
        </table>
    )
}

export default Activities;