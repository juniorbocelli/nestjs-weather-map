export type IsQueryingAPIState = boolean;
export type IsLoadingTableState = boolean;

export type DialogMessage = {
  title?: string;
  message: string;
};
export type DialogMessageState = undefined | DialogMessage;

export interface IUseFeedbackStates {
  isQueryingAPI: IsQueryingAPIState;
  setIsQueryingAPI: React.Dispatch<React.SetStateAction<IsQueryingAPIState>>;

  isLoadingTable: IsLoadingTableState,
  setIsLoadingTable: React.Dispatch<React.SetStateAction<IsLoadingTableState>>;

  dialogMessage: DialogMessageState;
  setDialogMessage: React.Dispatch<React.SetStateAction<DialogMessageState>>;
};

export interface IFeedbackContext {
  states: IUseFeedbackStates;
};