/* eslint-disable no-unused-vars */
type ChangeLoadingState = (state: boolean) => void;

export interface LoadingContextModel {
  isLoading: boolean;
  changeLoadingState: ChangeLoadingState;
}
