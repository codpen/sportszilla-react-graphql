export interface UserData {
  [index: string]: number | string | Date | undefined;
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
  __typeName?: string;
}
