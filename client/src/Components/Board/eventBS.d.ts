export interface EventBS {
  ID: number;
  sportName: string;
  location: {
    latitude: number;
    longitude: number;
    accuracy: number;
  };
  date: string;
  sportEventName: string;
  organizer: number;
  filter: {
    target_gender: string;
    target_level: string;
  };
  timeStart: string;
  timeEnd: string;
  registered_participants: number[];
  max_participants: number;
  min_participants: number;
}
