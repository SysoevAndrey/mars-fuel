import React, { useEffect } from 'react';
import { useFuelContext } from '../../context';
import data from '../../response.json';
import Header from '../Header';
import Popup from '../Popup';
import Station from '../Station';
import './MainPage.scss';

const MainPage = () => {
  const {
    state: {
      testUrl,
      popupIsOpened,
      actualData: { gasStations, currentMonthString },
    },
    dispatch,
  } = useFuelContext();

  useEffect(() => {
    // const socket = new WebSocket(`ws://${process.env.REACT_APP_NGROK_URL}`);

    // const socket = new WebSocket(`ws://${testUrl}`);
    // socket.onopen = async (evt) => {
    //   await fetch(`http://${testUrl}/api/state/init`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify([{ month: '2021-03-01', value: 1000 }]),
    //   });
    //   console.log(`[open]`);
    // };
    // socket.onmessage = (evt) => {
    //   console.log(JSON.parse(evt.data));
    //   dispatch({
    //     type: 'SET_ACTUAL_DATA',
    //     payload: JSON.parse(evt.data).Storage,
    //   });
    // };
    // socket.onclose = (evt) => {
    //   if (evt.wasClean) {
    //     console.log(`[close]: CODE:${evt.code} MESSAGE:${evt.reason}`);
    //   } else {
    //     console.log('[close] Соединение прервано');
    //   }
    // };
    // socket.onerror = (evt) => {
    //   console.log(`[error] ${JSON.stringify(evt)}`);
    // };

    dispatch({ type: 'SET_ACTUAL_DATA', payload: data });
  }, []);

  const changeVolume = async () => {
    // const response = await fetch(`http://${testUrl}/api/state/init`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify([{ month: currentMonthString, value: 1000 }]),
    // });
  };

  return (
    <div className="main-page">
      {popupIsOpened && <Popup />}
      <Header showTime />
      <button
        className="button main-page__button"
        onClick={() => dispatch({ type: 'SET_POPUP_STATE', payload: true })}
      >
        Изменить объём топлива
      </button>
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
