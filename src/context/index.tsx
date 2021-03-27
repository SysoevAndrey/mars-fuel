import React, { useContext, useReducer } from 'react';

interface IInitialState {
  testUrl: string;
  initialDate: string;
  popupIsOpened: boolean;
  fuelSchedule: { month: string; fuelVolume: number }[];
  actualData: {
    totalProfit: number;
    currentMonthId: number;
    currentMonthString: string;
    fuelRemained: number;
    gasStationsCount: number;
    gasStations: {
      id: number;
      name: string;
      fuelRemained: number;
      xCoordinate: number;
      yCoordinate: number;
      workPlacesCountForNewWorker: number;
      workTerminationP: number;
      workers: {
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
    }[];
  };
}

const initialState: IInitialState = {
  testUrl: '9701e1bcc3f9.ngrok.io',
  initialDate: '2021-03-27',
  popupIsOpened: false,
  fuelSchedule: [],
  actualData: {
    totalProfit: 0,
    currentMonthId: 0,
    currentMonthString: '27-03-2021',
    fuelRemained: 0,
    gasStationsCount: 0,
    gasStations: [],
  },
};

const reducer = (
  state: IInitialState,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case 'SET_ACTUAL_DATA':
      return { ...state, actualData: payload };
    case 'SET_POPUP_STATE':
      return { ...state, popupIsOpened: payload };
    default:
      return state;
  }
};

const FuelContext = React.createContext<{
  state: IInitialState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

const FuelProvider = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FuelContext.Provider value={{ state, dispatch }}>
      {props.children}
    </FuelContext.Provider>
  );
};

export const useFuelContext = () => useContext(FuelContext);

export { FuelContext, FuelProvider, initialState };
