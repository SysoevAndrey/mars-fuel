import React from 'react';
import './Tooltip.scss';

const Tooltip = ({
  position,
  list,
}: {
  position: string;
  list: {
    position: string;
    salary: number;
    contractType: string;
    hiringDate: string;
  }[];
}) => (
  <div className="tooltip">
    <h5 className="tooltip__title">{position}</h5>
    <div className="tooltip__list">
      {list.map(({ salary, contractType, hiringDate }, index: number) => (
        <div className="tooltip__row" key={contractType + index}>
          <p className="tooltip__parameter">
            Начало работы: <i>{hiringDate}</i>
          </p>
          <p className="tooltip__parameter">
            ЗП: <i>{salary}</i>
          </p>
          <p className="tooltip__parameter">{contractType}</p>
        </div>
      ))}
    </div>
  </div>
);

export default Tooltip;
