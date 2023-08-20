export type IsQueryingAPIState = boolean;
export type IsLoadingTableState = boolean;

export type DialogMessage = {
  title?: string;
  message: string;
};
export type DialogMessageState = undefined | DialogMessage;