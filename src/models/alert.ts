import { Dispatch, SetStateAction } from 'react';

export interface AlertModel {
  active: boolean;
  autoClose: boolean;
  message: string;
  type: string;
}

export interface AlertHook {
  alert: AlertModel;
  setAlert: Dispatch<SetStateAction<AlertModel>>;
  toggleAlert: () => void;
}
