import {Pipe, PipeTransform} from '@angular/core';
import {IProfile} from '../models/profile.model';

@Pipe({
  name: 'searchByLastname'
})
export class SearchByLastnamePipe implements PipeTransform {

  transform(employees: IProfile[], searchTerm: string): IProfile[] {
    if (!employees || !searchTerm) {
      return employees;
    }
    return employees.filter((user) => {
      return user.LastName.toLowerCase().includes(searchTerm.toLowerCase())
      // user.LastName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      // user.FullName.toLowerCase().includes(searchTerm.toLowerCase());
    }).sort((profile1, profile2) => profile1.LastName.localeCompare(profile2.LastName));

    // return employees.filter((user) => {
    //   return user.FirstName.toLowerCase().startsWith(searchTerm.toLowerCase())
    // }).sort((profile1, profile2) => profile1.FirstName.localeCompare(profile2.FirstName));
  }

}
