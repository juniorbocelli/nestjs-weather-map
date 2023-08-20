import React from 'react';

import {
  IUseFeedbackStates,
  IsQueryingAPIState,
  IsLoadingTableState,

  DialogMessageState,
} from './types';

export default function useFeedbackStates(): IUseFeedbackStates {
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