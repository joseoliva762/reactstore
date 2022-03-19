import Loading from '@common/Loading';
import { LoadingContextModel } from '@models/loading';
import { createContext, ReactNode, useContext, useState } from 'react';

const LoadingContext = createContext({} as LoadingContextModel);

interface LoadingProviderParams {
  children: ReactNode;
}

export const LoadingProvider = ({ children }: LoadingProviderParams) => {
  const loading = useLoadingProvider();
  return (
    <>
      <LoadingContext.Provider value={loading}>
        {children}
        {loading.isLoading && <Loading />}
      </LoadingContext.Provider>
    </>
  );
};

export const useLoading = () => useContext(LoadingContext);

const useLoadingProvider = () => {
  const [isLoading, setIsloading] = useState<boolean>(false);

  const changeLoadingState = (state: boolean) => {
    setIsloading(state);
  };

  return {
    isLoading,
    changeLoadingState
  };
};
