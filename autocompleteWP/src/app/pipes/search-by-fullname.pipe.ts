import { Pipe, PipeTransform } from '@angular/core';
import {IProfile} from '../models/profile.model';

@Pipe({
  name: 'searchByFullname'
})
export class SearchByFullnamePipe implements PipeTransform {

  transform(employees: IProfile[], searchTerm: string): IProfile[] {
    if (!employees || !searchTerm) {
      return employees;
    }
    return employees.filter((user) => {
      // return user.FirstName.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
      // user.LastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     return  user.FullName.toLowerCase().includes(searchTerm.toLowerCase());
    }).sort((profile1, profile2) => profile1.FirstName.localeCompare(profile2.FirstName))

    // return employees.filter((user) => {
    //   return user.FirstName.toLowerCase().startsWith(searchTerm.toLowerCase())
    // }).sort((profile1, profile2) => profile1.FirstName.localeCompare(profile2.FirstName));
  }

}
