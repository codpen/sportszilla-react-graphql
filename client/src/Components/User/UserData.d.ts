export interface UserData {
  [index: string]: number | string | Date | undefined | number[] | UserData[];
  ID?: number;
  firstName?: string;
  lastName?: string;
  userName?: string;
  email?: string;
  passW?: string;
  birthday?: Date | undefined;
  creationDate?: Date;
  updatedOn?: Date;
  deletionDate?: Date | undefined;
  location?: number | string;
  friends?: number[];
  favouriteSports?: number[];
  createdEvents?: number[];
  joinedEvents?: number[];
  __typeName?: string;
}
