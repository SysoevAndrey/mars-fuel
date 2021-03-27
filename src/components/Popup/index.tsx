import React, { useEffect, useState } from 'react';
import { useFuelContext } from '../../context';
import closeIcon from '../../images/close.svg';
import './Popup.scss';

const Popup = () => {
  const {
    state: {
      testUrl,
      actualData: { currentMonthId },
    },
    dispatch,
  } = useFuelContext();

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const escHandler = (e: any) => {
      if (e.key === 'Escape') {
        dispatch({ type: 'SET_POPUP_STATE', payload: false });
      }
    };

    document.addEventListener('keydown', escHandler);

    return () => {
      return document.removeEventListener('keydown', escHandler);
    };
  });

  const outsideClickHandler = (e: any) => {
    if (e.target.className === 'popup') {
      dispatch({ type: 'SET_POPUP_STATE', payload: false });
    }
  };

  const changeVolume = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const response = await fetch(`http://${testUrl}/api/state/change-month`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        month: currentMonthId,
        value: Number(inputValue),
      }),
    });

    if (response.ok) {
      dispatch({ type: 'SET_POPUP_STATE', payload: false });
    }
  };

  return (
    <div className="popup" onClick={(e) => outsideClickHandler(e)}>
      <div className="popup__content">
        <img
          src={closeIcon}
          alt="Крестик закрытия формы входа"
          className="popup__close"
          onClick={() => dispatch({ type: 'SET_POPUP_STATE', payload: false })}
        />
        <form className="popup__form" onSubmit={(evt) => changeVolume(evt)}>
          <input
            value={inputValue}
            type="number"
            className="popup__input"
            placeholder="Новый объем"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="popup__button">Отправить</button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
