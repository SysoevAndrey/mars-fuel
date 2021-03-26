import React, { useContext, useReducer } from 'react';

interface IInitialState {
  testUrl: string;
  popupIsOpened: boolean;
  fuelSchedule: { month: string; fuelVolume: number }[];
  actualData: {
    totalProfit: number;
    currentMonthString: string;
    fuelRemained: number;
    gasStationsCount: number;
    gasStations: {
      id: number;
      name: string;
      fuelRemained: number;
      xCoordinate: number;
      yCoordinate: number;
      workplaces: number;
      workPlacesCountForNewWorker: number;
      workTerminationP: number;
      workers: {
        position: string;
        salary: number;
        contractType: string;
        hiringDate: string;
      }[];
    }[];
  };
}

const initialState: IInitialState = {
  testUrl: '2346b74f9872.ngrok.io',
  popupIsOpened: false,
  fuelSchedule: [],
  actualData: {
    totalProfit: 0,
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
