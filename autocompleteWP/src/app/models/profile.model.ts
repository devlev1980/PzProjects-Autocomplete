/**
 * profile's model
 */
export interface IProfile {
  EmployeeID: string;
  FirstName: string;
  LastName: string;
  WorkEmail: string;
  PictureUrl: string;
  MobilePhone: string;
  WorkPhone: string
  FullName: string;
  Rank?:number;
}
