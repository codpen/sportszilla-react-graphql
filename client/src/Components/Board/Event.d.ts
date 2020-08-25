interface Participant {
  ID: number;
  firstName: string;
}

interface Sport {
  sportName;
}

export interface EventData {
  ID?: number;
  eventName?: string;
  sportID?: number;
  sportName?: string;
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
  participants?: Participant[];
  minParticipants?: number;
  maxParticipants?: number;
  description?: string;
  sport?: Sport;
}
