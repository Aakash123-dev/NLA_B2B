import { SimulationData } from '../types';

export const INITIAL_SIMULATION_DATA: SimulationData = {
  testDate: '09/04/2025',
  retailer: 'ALBSCO Jewel Div TA',
  brand: 'JACK DANIELS',
  products: [
    {
      id: 1,
      name: 'Completely Fresh Foods Jack Daniels Old No 7 Brand Bbq Pulled Chicken Entree 16OZ',
      upc: '089533400108-JACK DANIELS',
      currentPrice: 9.45,
      totalUnits: 19919,
      totalDollars: 188258,
      newPrice: '',
      newUnits: 0,
      changeInUnits: 0,
      percentChangeUnits: 0,
      newDollars: 0,
      changeInDollars: 0,
      percentChangeDollars: 0
    },
    {
      id: 2,
      name: 'Completely Fresh Foods Jack Daniels Honey Liqueur Bbq Pulled Pork Entree 16OZ',
      upc: '081166302903-JACK DANIELS',
      currentPrice: 9.47,
      totalUnits: 18031,
      totalDollars: 170742,
      newPrice: '',
      newUnits: 0,
      changeInUnits: 0,
      percentChangeUnits: 0,
      newDollars: 0,
      changeInDollars: 0,
      percentChangeDollars: 0
    },
    {
      id: 3,
      name: 'Completely Fresh Foods Jack Daniels Old No 7 Brand Bbq Pulled Pork Entree 16OZ',
      upc: '089533400106-JACK DANIELS',
      currentPrice: 9.48,
      totalUnits: 37374,
      totalDollars: 354371,
      newPrice: '',
      newUnits: 0,
      changeInUnits: 0,
      percentChangeUnits: 0,
      newDollars: 0,
      changeInDollars: 0,
      percentChangeDollars: 0
    }
  ],
  competitors: [
    {
      brand: 'JACK DANIELS',
      totalUnits: 75324,
      totalDollars: 713371
    }
  ]
};

export const PRICE_ELASTICITY = -1.2; // Price elasticity of demand
