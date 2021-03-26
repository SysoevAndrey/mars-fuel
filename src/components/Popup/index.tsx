import React, { useEffect } from 'react';
import { useFuelContext } from '../../context';
import closeIcon from '../../images/close.svg';
import './Popup.scss';

const Popup = () => {
  const {
    state: {
      testUrl,
      actualData: { currentMonthString },
    },
    dispatch,
  } = useFuelContext();

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

    const response = await fetch(`http://${testUrl}/api/state/init`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([{ month: currentMonthString, value: 1000 }]),
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
            type="number"
            className="popup__input"
            placeholder="Новый объем"
          />
          <button className="popup__button">Отправить</button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
