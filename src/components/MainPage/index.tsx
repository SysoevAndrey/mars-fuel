import React, { useEffect, useState } from 'react';
import { useFuelContext } from '../../context';
import Header from '../Header';
import Popup from '../Popup';
import Station from '../Station';
import './MainPage.scss';
import dollars from '../../images/dollars.png';

const MainPage = () => {
  const {
    state: {
      testUrl,
      initialDate,
      popupIsOpened,
      actualData: { gasStations },
    },
    dispatch,
  } = useFuelContext();

  const [sum, setSum] = useState(0);

  useEffect(() => {
    const socket = new WebSocket(`ws://${testUrl}`);
    socket.onopen = async (evt) => {
      await fetch(`http://${testUrl}/api/state/init`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([{ month: '2021-03-01', value: 20000 }]),
      });
      console.log(`[open]`);
    };

    socket.onmessage = (evt) => {
      const data = JSON.parse(evt.data);

      if (data.Storage.currentMonthId === 13) {
        setSum(data.Storage.totalProfit);
        socket.close();
      }

      dispatch({
        type: 'SET_ACTUAL_DATA',
        payload: data.Storage,
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
      {popupIsOpened && <Popup />}
      <Header showTime />
      {sum > 10000 && (
        <>
          <img
            src={dollars}
            alt="Доллоры"
            className="main-page__money"
            style={{
              zIndex: 10,
              position: 'absolute',
              left: 0,
              animation: 'money 3s linear infinite',
            }}
          />
          <img
            src={dollars}
            alt="Доллоры"
            className="main-page__money"
            style={{
              zIndex: 10,
              position: 'absolute',
              left: '32%',
              animation: 'money 3s linear infinite',
            }}
          />
          <img
            src={dollars}
            alt="Доллоры"
            className="main-page__money"
            style={{
              zIndex: 10,
              position: 'absolute',
              right: 0,
              animation: 'money 3s linear infinite',
            }}
          />
        </>
      )}
      <button
        className="button main-page__button"
        onClick={() => dispatch({ type: 'SET_POPUP_STATE', payload: true })}
      >
        Изменить объём топлива
      </button>
      {Boolean(sum) && <p>Всего за год: {sum} $$$</p>}
      <main className="main-page__content">
        <h1 className="main-page__title">Автомобильные заправочные станции</h1>
        <div className="main-page__list">
          {gasStations.map((station) => (
            <Station
              key={station.id}
              id={station.name}
              fuelRemained={station.fuelRemained}
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
