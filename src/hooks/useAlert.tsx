import { AlertHook, AlertModel } from '@models/alert';
import { useState } from 'react';

const defaultOptions = {
  active: false,
  message: '',
  type: '',
  autoClose: true
};

export const useAlert = (options?: AlertModel): AlertHook => {
  const [alert, setAlert] = useState<AlertModel>({
    ...defaultOptions,
    ...options
  });

  const toggleAlert = () => {
    setAlert({
      ...alert,
      active: !alert.active
    });
  };

  return {
    alert,
    setAlert,
    toggleAlert
  };
};
