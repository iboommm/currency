export interface CurrencyModel {
  name: string;
  key: string;
  value: string;
  image?: string;
  rate?: number;
  favorite: boolean;
  editable: boolean;
}
