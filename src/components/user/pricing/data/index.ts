import { Database, Retailer, Brand, Product, Column } from '../types';

export const databases: Database[] = [
  { id: 'db1', name: 'Primary Database' },
  { id: 'db2', name: 'Analytics Warehouse' },
  { id: 'db3', name: 'Legacy System DB' },
];

export const retailers: Retailer[] = [
  { id: 'ret1', name: 'SuperMart' },
  { id: 'ret2', name: 'HyperStore' },
  { id: 'ret3', name: 'ValuePlus' },
  { id: 'ret4', name: 'Corner Shop' },
];

export const brands: Brand[] = [
  { id: 'brand1', name: 'Brand A' },
  { id: 'brand2', name: 'Brand B' },
  { id: 'brand3', name: 'Brand C' },
];

export const products: Product[] = [
  { id: 'prod1', name: 'Product X' },
  { id: 'prod2', name: 'Product Y' },
  { id: 'prod3', name: 'Product Z' },
  { id: 'prod4', name: 'Product W' },
  { id: 'prod5', name: 'Product V' },
];

export const availableColumns: Column[] = [
  { id: 'col1', name: 'Sales_Units' },
  { id: 'col2', name: 'Sales_Value' },
  { id: 'col3', name: 'Promotion_Flag' },
  { id: 'col4', name: 'Price' },
  { id: 'col5', name: 'Distribution' },
  { id: 'col6', name: 'Marketing_Spend' },
];
