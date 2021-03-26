import React, { useState } from 'react';
import Header from '../Header';
import './StartPage.scss';
import { useFuelContext } from '../../context';

const StartPage = () => {
  const {
    state: { testUrl },
  } = useFuelContext();

  const [formData, setFormData] = useState({
    azsRest: 0,
    storeRest: 0,
    azsCount: 0,
    tankersCount: 0,
    tankerPrice: 0,
    deliverTime: 0,
    serviceTime: 0,
    profitPerOne: 0,
    averageCheck: 0,
    checkIncreaseCoef: 0,
    mainMaintainceCost: 0,
    otherMaintainceCost: 0,
    azsBuildTime: 0,
    placeBuildTime: 0,
    cashierSalary: 0,
    refuelerSalary: 0,
    directorSalary: 0,
    guardSalary: 0,
    newPlaceCondition: 0,
    dismissalProbability: 0,
    timeLength: 0,
  });

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const pushParams = async () => {
      try {
        const response = await fetch(
          `http://${testUrl}/api/state/config`,
          // `http://${process.env.REACT_APP_NGROK_URL}/api/state/config`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          window.location.replace('/model');
        }
      } catch (err) {
        console.log(err);
      }
    };

    pushParams();
  };

  return (
    <div className="start-page">
      <Header />
      <main className="start-page__content">
        <div className="start-page__container">
          <h1 className="start-page__title">Начальные установки.</h1>
          <form
            className="form start-page__form"
            onSubmit={(e) => onFormSubmit(e)}
          >
            <div className="form__content">
              <label
                className={
                  formData.azsRest
                    ? 'form__label form__label_success'
                    : 'form__label'
                }
              >
                <input
                  className="input start-page__input"
                  id="azsRest"
                  value={formData.azsRest}
                  type="number"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.id]: Number(e.target.value),
                    })
                  }
                />
                <p className="form__label-text">Остаток топлива на АЗС</p>
              </label>

              <label
                className={
                  formData.storeRest
                    ? 'form__label form__label_success'
                    : 'form__label'
                }
              >
                <input
                  className="input start-page__input"
                  value={formData.storeRest}
                  id="storeRest"
                  type="number"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.id]: Number(e.target.value),
                    })
                  }
                />
                <p className="form__label-text">Остаток топлива в хранилище</p>
              </label>

              <label
                className={
                  formData.azsCount
                    ? 'form__label form__label_success'
                    : 'form__label'
                }
              >
                <input
                  className="input start-page__input"
                  value={formData.azsCount}
                  id="azsCount"
                  type="number"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.id]: Number(e.target.value),
                    })
                  }
                />
                <p className="form__label-text">Количество АЗС</p>
              </label>

              <label
                className={
                  formData.tankersCount
                    ? 'form__label form__label_success'
                    : 'form__label'
                }
              >
                <input
                  className="input start-page__input"
                  value={formData.tankersCount}
                  id="tankersCount"
                  type="number"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.id]: Number(e.target.value),
                    })
                  }
                />
                <p className="form__label-text">Количество танкеров</p>
              </label>

              <label
                className={
                  formData.tankerPrice
                    ? 'form__label form__label_success'
                    : 'form__label'
                }
              >
                <input
                  className="input start-page__input"
                  value={formData.tankerPrice}
                  id="tankerPrice"
                  type="number"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.id]: Number(e.target.value),
                    })
                  }
                />
                <p className="form__label-text">Стоимость танкера</p>
              </label>

              <label
                className={
                  formData.deliverTime
                    ? 'form__label form__label_success'
                    : 'form__label'
                }
              >
                <input
                  className="input start-page__input"
                  value={formData.deliverTime}
                  id="deliverTime"
                  type="number"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.id]: Number(e.target.value),
                    })
                  }
                />
                <p className="form__label-text">Время доставки</p>
              </label>

              <label
                className={
                  formData.serviceTime
                    ? 'form__label form__label_success'
                    : 'form__label'
                }
              >
                <input
                  className="input start-page__input"
                  value={formData.serviceTime}
                  id="serviceTime"
                  type="number"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.id]: Number(e.target.value),
                    })
                  }
                />
                <p className="form__label-text">Время обслуживания клиента</p>
              </label>

              <label
                className={
                  formData.profitPerOne
                    ? 'form__label form__label_success'
                    : 'form__label'
                }
              >
                <input
                  className="input start-page__input"
                  value={formData.profitPerOne}
                  id="profitPerOne"
                  type="number"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.id]: Number(e.target.value),
                    })
                  }
                />
                <p className="form__label-text">Прибыль с клиента</p>
              </label>

              <label
                className={
                  formData.averageCheck
                    ? 'form__label form__label_success'
                    : 'form__label'
                }
              >
                <input
                  className="input start-page__input"
                  value={formData.averageCheck}
                  id="averageCheck"
                  type="number"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.id]: Number(e.target.value),
                    })
                  }
                />
                <p className="form__label-text">Средний чек</p>
              </label>

              <label
                className={
                  formData.checkIncreaseCoef
                    ? 'form__label form__label_success'
                    : 'form__label'
                }
              >
                <input
                  className="input start-page__input"
                  value={formData.checkIncreaseCoef}
                  id="checkIncreaseCoef"
                  type="number"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.id]: Number(e.target.value),
                    })
                  }
                />
                <p className="form__label-text">
                  Коэф увеличения среднего чека
                </p>
              </label>

              <label
                className={
                  formData.mainMaintainceCost
                    ? 'form__label form__label_success'
                    : 'form__label'
                }
              >
                <input
                  className="input start-page__input"
                  value={formData.mainMaintainceCost}
                  id="mainMaintainceCost"
                  type="number"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.id]: Number(e.target.value),
                    })
                  }
                />
                <p className="form__label-text">
                  Базовая стоимость содержания АЗС
                </p>
              </label>

              <label
                className={
                  formData.otherMaintainceCost
                    ? 'form__label form__label_success'
                    : 'form__label'
                }
              >
                <input
                  className="input start-page__input"
                  value={formData.otherMaintainceCost}
                  id="otherMaintainceCost"
                  type="number"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.id]: Number(e.target.value),
                    })
                  }
                />
                <p className="form__label-text">
                  Доп. стоимость содержания АЗС
                </p>
              </label>

              <label
                className={
                  formData.azsBuildTime
                    ? 'form__label form__label_success'
                    : 'form__label'
                }
              >
                <input
                  className="input start-page__input"
                  value={formData.azsBuildTime}
                  id="azsBuildTime"
                  type="number"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.id]: Number(e.target.value),
                    })
                  }
                />
                <p className="form__label-text">
                  Время постройки базовой части АЗС
                </p>
              </label>

              <label
                className={
                  formData.placeBuildTime
                    ? 'form__label form__label_success'
                    : 'form__label'
                }
              >
                <input
                  className="input start-page__input"
                  value={formData.placeBuildTime}
                  id="placeBuildTime"
                  type="number"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.id]: Number(e.target.value),
                    })
                  }
                />
                <p className="form__label-text">Время постройки одного места</p>
              </label>

              <label
                className={
                  formData.cashierSalary
                    ? 'form__label form__label_success'
                    : 'form__label'
                }
              >
                <input
                  className="input start-page__input"
                  value={formData.cashierSalary}
                  id="cashierSalary"
                  type="number"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.id]: Number(e.target.value),
                    })
                  }
                />
                <p className="form__label-text">Стоимость содержания кассира</p>
              </label>

              <label
                className={
                  formData.refuelerSalary
                    ? 'form__label form__label_success'
                    : 'form__label'
                }
              >
                <input
                  className="input start-page__input"
                  value={formData.refuelerSalary}
                  id="refuelerSalary"
                  type="number"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.id]: Number(e.target.value),
                    })
                  }
                />
                <p className="form__label-text">
                  Стоимость содержания заправщика
                </p>
              </label>

              <label
                className={
                  formData.directorSalary
                    ? 'form__label form__label_success'
                    : 'form__label'
                }
              >
                <input
                  className="input start-page__input"
                  value={formData.directorSalary}
                  id="directorSalary"
                  type="number"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.id]: Number(e.target.value),
                    })
                  }
                />
                <p className="form__label-text">
                  Стоимость содержания директора
                </p>
              </label>

              <label
                className={
                  formData.guardSalary
                    ? 'form__label form__label_success'
                    : 'form__label'
                }
              >
                <input
                  className="input start-page__input"
                  value={formData.guardSalary}
                  id="guardSalary"
                  type="number"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.id]: Number(e.target.value),
                    })
                  }
                />
                <p className="form__label-text">
                  Стоимость содержания охранника
                </p>
              </label>

              <label
                className={
                  formData.newPlaceCondition
                    ? 'form__label form__label_success'
                    : 'form__label'
                }
              >
                <input
                  className="input start-page__input"
                  value={formData.newPlaceCondition}
                  id="newPlaceCondition"
                  type="number"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.id]: Number(e.target.value),
                    })
                  }
                />
                <p className="form__label-text">
                  Количество мест для добавления нового кассира
                </p>
              </label>

              <label
                className={
                  formData.dismissalProbability
                    ? 'form__label form__label_success'
                    : 'form__label'
                }
              >
                <input
                  className="input start-page__input"
                  value={formData.dismissalProbability}
                  id="dismissalProbability"
                  type="number"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.id]: Number(e.target.value),
                    })
                  }
                />
                <p className="form__label-text">
                  Вероятность увольнения сотрудника по ГПХ
                </p>
              </label>

              <label
                className={
                  formData.timeLength
                    ? 'form__label form__label_success'
                    : 'form__label'
                }
              >
                <input
                  className="input start-page__input"
                  value={formData.timeLength}
                  id="timeLength"
                  type="number"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.id]: Number(e.target.value),
                    })
                  }
                />
                <p className="form__label-text">
                  Время длительности месяца (сек)
                </p>
              </label>
            </div>
            <button className="button form__button">Старт</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default StartPage;
