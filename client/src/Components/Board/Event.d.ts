import { UserData } from '../User/UserData';

interface Sport {
  sportName?: string;
  ID?: number;
}
export interface EventData {
  ID?: number;
  eventName?: string;
  sportID?: number;
  timeStart?: Date | string;
  timeEnd?: Date | string;
  location?: string;
  longitude?: number;
  latitude?: number;
  accuracy?: number;
  indoor?: boolean;
  availableSpots?: number;
  creationDate?: Date;
  updatedOn?: Date;
  deletionDate?: Date;
  participants?: userData[];
  minParticipants?: number;
  maxParticipants?: number;
  description?: string;
  sport?: Sport;
  sportID?: Number;
}
