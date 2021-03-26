import React, { useEffect } from 'react';
import Header from '../Header';
import './MainPage.scss';
import { useFuelContext } from '../../context';
import data from '../../response.json';

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
    const socket = new WebSocket('ws://b1ad2a4e6c49.ngrok.io');
    socket.onopen = async function (e) {
      await fetch('http://b1ad2a4e6c49.ngrok.io/api/state/socket');
    };
    socket.onmessage = function (event) {
      console.log(`[message]: ${event.data}`);
    };
    socket.onclose = function (event) {
      if (event.wasClean) {
        console.log(`[close]: CODE:${event.code} MESSAGE:${event.reason}`);
      } else {
        console.log('[close] Соединение прервано');
      }
    };
    socket.onerror = function (error) {
      console.log(`[error] ${error}`);
    };

    dispatch({ type: 'SET_ACTUAL_DATA', payload: data });
  }, []);

  return (
    <div className="main-page">
      <Header showTime />
      <main className="main-page__content">
        <h1 className="main-page__title">АЗС</h1>
        <div className="main-page__list"></div>
      </main>
    </div>
  );
};

export default MainPage;
