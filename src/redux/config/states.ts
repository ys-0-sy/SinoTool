export type IConfigState = {
  notificationState: boolean;
  guerrillaTime: string[];
};

export const ConfigInitialState: IConfigState = {
  notificationState: false,
  guerrillaTime: ["01:30", "02:30", "08:30", "12:00", "17:30", "20:30", "23:30"]
};
