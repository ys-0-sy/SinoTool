export type Guerrilla = {
  AreaID: string[];
  BannerResource: string[];
  EnemyID: string;
  ID: string;
  KindID: string;
  Name: string;
  NightmareID: string;
  image: string[];
  imgUrl?: string;
};

export type Event = {
  id: string;
  endDate: Date;
  image: string;
  isGuerrilla: boolean;
  name: string;
  guerrilla?: Guerrilla;
  startDate: Date;
  imgUrl?: string;
};

export type ConstantEvent = {
  id: string;
  endDate: Date;
  image: string;
  isGuerrilla: boolean;
  name: string;
  startDate: Date;
  imgUrl?: string;
};
export type GuerrillaEvent = {
  id: string;
  endDate: Date;
  image: string;
  isGuerrilla: boolean;
  name: string;
  guerrilla: Guerrilla;
  startDate: Date;
  imgUrl?: string;
};
export type IEventsState = {
  eventsAll: Event[];
  guerrillaEvents: GuerrillaEvent[];
  constantEvents: ConstantEvent[];
};

export const EventsInitialState: IEventsState = {
  eventsAll: new Array(),
  guerrillaEvents: new Array(),
  constantEvents: new Array()
};
