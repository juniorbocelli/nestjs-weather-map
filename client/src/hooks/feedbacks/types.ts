import { AxiosError } from 'axios';

import { IAxiosExceptionData } from 'src/@types/exception';

// ----------------------------------------------------------------------

export type IsQueryingAPIState = boolean;
export type IsLoadingTableState = boolean;

export type DialogMessage = {
  title?: string;
  message: string;
};
export type DialogMessageState = null | DialogMessage;

export interface IUseFeedbackStates {
  isQueryingAPI: IsQueryingAPIState;
  setIsQueryingAPI: React.Dispatch<React.SetStateAction<IsQueryingAPIState>>;

  isLoadingTable: IsLoadingTableState,
  setIsLoadingTable: React.Dispatch<React.SetStateAction<IsLoadingTableState>>;

  dialogMessage: DialogMessageState;
  setDialogMessage: React.Dispatch<React.SetStateAction<DialogMessageState>>;

  setErrorMessageFromAxiosError: (error: AxiosError<IAxiosExceptionData>) => void;
};

export interface IFeedbackContext {
  states: IUseFeedbackStates;
};