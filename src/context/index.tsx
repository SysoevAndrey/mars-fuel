import React, { useContext, useReducer } from 'react';

interface IInitialState {
  actualData: {
    totalProfit: number;
    currentMonth: string;
    fuelSchedule: { month: string; fuelVolume: number }[];
    fuelRemained: number;
    gasStationsCount: number;
    gasStations: {
      id: number;
      fuelRemained: number;
      workplaces: number;
      workers: {
        position: string;
        salary: string;
        contractType: string;
        hiringDate: string;
      }[];
    }[];
  };
}

const initialState: IInitialState = {
  actualData: {
    totalProfit: 0,
    currentMonth: '',
    fuelSchedule: [],
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
