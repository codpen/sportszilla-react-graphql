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
  location?: number;
  indoor?: boolean;
  availableSpots?: number;
  creationDate?: Date;
  updatedOn?: Date;
  deletionDate?: Date;
  creator?: number;
  participants?: Participant[];
  minParticipants?: number;
  maxParticipants?: number;
  description?: string;
  sport?: Sport;
}