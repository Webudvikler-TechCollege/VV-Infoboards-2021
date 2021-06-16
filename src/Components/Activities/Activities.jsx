import React, { useEffect, useState } from 'react';
import Style from './Activities.module.scss';

const Activities = () => {
    const [fetchedData, setFetchedData] = useState([]);
    const nextDay_Timestamp = new Date().setHours(0, 0, 0, 0) / 1000 + 86400;

    const fetchHelper = async () => {
        const url = 'https://api.mediehuset.net/infoboard/activities';
        const options = {
            method: 'GET',
        }
        const response = await fetch(url, options);
        const data = await response.json();

        const fetched_data = data.result.filter(elements => elements.timestamp < nextDay_Timestamp);
        setFetchedData(fetched_data)
    };
    
    useEffect(() => {
        fetchHelper();
        setInterval(() => {
            fetchHelper();
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

            <tbody>
                {fetchedData && fetchedData.slice(0, 15).map((item, index) => {
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
            </tbody>
        </table>
    )
}

export default Activities;