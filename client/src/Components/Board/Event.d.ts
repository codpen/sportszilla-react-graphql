export interface EventData {
  ID?: number;
  eventName?: string;
  sportID?: number;
  sportName?: string;
  timeStart?: string;
  timeEnd?: string;
  date?: string;
  location?: number;
  indoor?: boolean;
  availableSpots?: number;
  creationDate?: Date;
  updatedOn?: Date;
  deletionDate?: Date;
  creator?: number;
  participants?: number[];
  minParticipants?: number;
  maxParticipants?: number;
  description?: string;
}
