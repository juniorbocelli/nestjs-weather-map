import React from 'react';

import {
  IsQueryingAPIState,
  IsLoadingTableState,

  DialogMessageState,
} from './types';

export interface IUseFeedback {
  isQueryingAPI: IsQueryingAPIState;
  setIsQueryingAPI: React.Dispatch<React.SetStateAction<IsQueryingAPIState>>;

  isLoadingTable: IsLoadingTableState,
  setIsLoadingTable: React.Dispatch<React.SetStateAction<IsLoadingTableState>>;

  dialogMessage: DialogMessageState;
  setDialogMessage: React.Dispatch<React.SetStateAction<DialogMessageState>>;
};

export default function useFeedback(): IUseFeedback {
  const [isQueryingAPI, setIsQueryingAPI] = React.useState<IsQueryingAPIState>(false);
  const [isLoadingTable, setIsLoadingTable] = React.useState<IsLoadingTableState>(false);

  const [dialogMessage, setDialogMessage] = React.useState<DialogMessageState>(undefined);

  return {
    isQueryingAPI,
    setIsQueryingAPI,

    isLoadingTable,
    setIsLoadingTable,

    dialogMessage,
    setDialogMessage,
  };
};