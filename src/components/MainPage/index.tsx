import React, { useEffect } from 'react';
import Header from '../Header';
import './MainPage.scss';
import { useFuelContext } from '../../context';
import data from '../../response.json';
import Station from '../Station';

const MainPage = () => {
  const {
    state: {
      testUrl,
      actualData: {
        totalProfit,
        currentMonthString,
        fuelRemained,
        gasStationsCount,
        gasStations,
      },
    },
    dispatch,
  } = useFuelContext();

  useEffect(() => {
    // const socket = new WebSocket(`ws://${process.env.REACT_APP_NGROK_URL}`);
    const socket = new WebSocket(`ws://${testUrl}`);

    socket.onopen = async (evt) => {
      await fetch(`http://${testUrl}/api/state/init`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([{ month: '2021-03-26', value: 1000 }]),
      });
      console.log(`[open]`);
    };

    socket.onmessage = (evt) => {
      console.log('update');
      dispatch({
        type: 'SET_ACTUAL_DATA',
        payload: JSON.parse(evt.data).Storage,
      });
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
              id={station.name}
              fuelRemained={station.fuelRemained}
              staffCount={station.workplaces}
              stuff={station.workers}
              coordinates={{ x: station.xCoordinate, y: station.yCoordinate }}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default MainPage;
