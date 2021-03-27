import React from 'react';
import './Tooltip.scss';

const Tooltip = ({
  position,
  list,
}: {
  position: string;
  list: {
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
  <div className="tooltip">
    <h5 className="tooltip__title">{position}</h5>
    <div className="tooltip__list">
      {list.map(
        (
          { contractType, daysWorked, contractName, worker: { salary } },
          index: number
        ) => (
          <div className="tooltip__row" key={contractType + index}>
            <p className="tooltip__parameter">
              Трудоустройство: <i>{daysWorked} дней назад</i>
            </p>
            <p className="tooltip__parameter">
              ЗП: <i>{salary}</i>
            </p>
            <p className="tooltip__parameter">{contractName}</p>
          </div>
        )
      )}
    </div>
  </div>
);

export default Tooltip;
