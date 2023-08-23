import React from 'react';
import { AxiosError } from 'axios';

import {
  IUseFeedbackStates,
  IsQueryingAPIState,
  IsLoadingTableState,

  DialogMessageState,
} from 'src/hooks/feedbacks/types';

import { IAxiosExceptionData } from 'src/@types/exception';

export default function useFeedbackStates(): IUseFeedbackStates {
  const [isQueryingAPI, setIsQueryingAPI] = React.useState<IsQueryingAPIState>(false);
  const [isLoadingTable, setIsLoadingTable] = React.useState<IsLoadingTableState>(false);

  const [dialogMessage, setDialogMessage] = React.useState<DialogMessageState>(null);

  const setErrorMessageFromAxiosError = (error: AxiosError<IAxiosExceptionData>) => {
    if (error.response) {
      if (error.response.data)
        setDialogMessage({ title: "Erro", message: error.response.data.message });
    } else {
      setDialogMessage({ title: "Erro", message: error.message });
    };
  };

  return {
    isQueryingAPI,
    setIsQueryingAPI,

    isLoadingTable,
    setIsLoadingTable,

    dialogMessage,
    setDialogMessage,

    setErrorMessageFromAxiosError,
  };
};