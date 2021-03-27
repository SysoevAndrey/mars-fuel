import React from 'react';
import Tooltip from '../Tooltip';
import './Station.scss';

const Station = ({
  id,
  fuelRemained,
  stuff,
  coordinates: { x, y },
}: {
  id: string;
  fuelRemained: number;
  coordinates: { x: number; y: number };
  stuff: {
    contractName: string;
    contractType: number;
    daysWorked: number;
    monthCount: number;
    worker: {
      position: number;
      positionName: string;
      salary: number;
    };
  }[];
}) => (
  <div className="station">
    <div className="station__location">
      <i
        className="station__dot-coordinates"
        style={{ top: 43 + x, left: 43 + y }}
      ></i>
      <img
        className="station__planet"
        src="https://pngimg.com/uploads/mars_planet/mars_planet_PNG23.png"
        alt="Планета марс"
      />
    </div>
    <h2 className="station__id">
      Станция: <i>{id}</i>
    </h2>
    <h3 className="station__fuel-count">
      Оставшееся топливо: <i>{fuelRemained} л</i>
    </h3>
    <div className="station__staff">
      <h4 className="station__staff-count">
        Сотрудников на станции: <i>{stuff.length}</i>
      </h4>
      <div className="station__staff-categories">
        <i className="station__staff-category station__staff-category_director">
          <Tooltip
            position="Директор"
            list={stuff.filter(
              (worker) => worker.worker.positionName === 'director'
            )}
          />
          {
            stuff.filter((worker) => worker.worker.positionName === 'director')
              .length
          }
        </i>
        <i className="station__staff-category station__staff-category_cashier">
          <Tooltip
            position="Кассир"
            list={stuff.filter(
              (worker) => worker.worker.positionName === 'cashier'
            )}
          />
          {
            stuff.filter((worker) => worker.worker.positionName === 'cashier')
              .length
          }
        </i>
        <i className="station__staff-category station__staff-category_refueler">
          <Tooltip
            position="Заправщик"
            list={stuff.filter(
              (worker) => worker.worker.positionName === 'refueler'
            )}
          />
          {
            stuff.filter((worker) => worker.worker.positionName === 'refueler')
              .length
          }
        </i>
        <i className="station__staff-category station__staff-category_guard">
          <Tooltip
            position="Охранник"
            list={stuff.filter(
              (worker) => worker.worker.positionName === 'guard'
            )}
          />
          {
            stuff.filter((worker) => worker.worker.positionName === 'guard')
              .length
          }
        </i>
      </div>
    </div>
  </div>
);

export default Station;
