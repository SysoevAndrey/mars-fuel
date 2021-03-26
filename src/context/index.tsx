import React, { useContext, useReducer } from 'react';

interface IInitialState {
  defaultParams: {
    azsRest: number;
    storeRest: number;
    azsCount: number;
    tankersCount: number;
    tankerPrice: number;
    deliverTime: number;
    serviceTime: number;
    profitPerOne: number;
    averageCheck: number;
    checkIncreaseCoef: number;
    mainMaintainceCost: number;
    otherMaintainceCost: number;
    azsBuildTime: number;
    placeBuildTime: number;
    cashierSalary: number;
    refuelerSalary: number;
    directorSalary: number;
    guardSalary: number;
    newPlaceCondition: number;
    dismissalProbability: number;
    timeLength: number;
  };
}

const initialState: IInitialState = {
  defaultParams: {
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
  },
};

const reducer = (
  state: IInitialState,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case 'SET_DEFAULT_PARAMS':
      return { ...state, defaultParams: payload };
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
