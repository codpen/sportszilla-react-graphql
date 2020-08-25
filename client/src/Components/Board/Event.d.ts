import { UserData } from '../User/UserData';

interface Sport {
  sportName;
}
export interface EventData {
  ID?: number;
  eventName?: string;
  sportID?: number;
  timeStart?: Date;
  timeEnd?: Date;
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
}
