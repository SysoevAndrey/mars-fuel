import React, { useEffect } from 'react';
import Header from '../Header';
import './MainPage.scss';
import { useFuelContext } from '../../context';
import data from '../../response.json';
import Station from '../Station';

const path = 'fcae65543686.ngrok.io';

const MainPage = () => {
  const {
    state: {
      actualData: {
        totalProfit,
        currentMonth,
        fuelSchedule,
        fuelRemained,
        gasStationsCount,
        gasStations,
      },
    },
    dispatch,
  } = useFuelContext();

  useEffect(() => {
    const socket = new WebSocket(`ws://${process.env.REACT_APP_NGROK_URL}`);

    socket.onopen = async (evt) => {
      // await fetch(`http://${path}/api/state/socket`);
      console.log(`[open]`);
    };

    socket.onmessage = (evt) => {
      console.log(`[message]: ${evt.data}`);
    };

    socket.onclose = (evt) => {
      if (evt.wasClean) {
        console.log(`[close]: CODE:${evt.code} MESSAGE:${evt.reason}`);
      } else {
        console.log('[close] Соединение прервано');
      }
    };

    socket.onerror = (evt) => {
      console.log(`[error] ${JSON.stringify(evt)}`);
    };

    dispatch({ type: 'SET_ACTUAL_DATA', payload: data });
  }, []);

  return (
    <div className="main-page">
      <Header showTime />
      <main className="main-page__content">
        <h1 className="main-page__title">Автоматические заправочные станции</h1>
        <div className="main-page__list">
          {gasStations.map((station) => (
            <Station
              key={station.id}
              id={station.id}
              fuelRemained={station.fuelRemained}
              staffCount={station.workplaces}
              stuff={station.workers}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default MainPage;
