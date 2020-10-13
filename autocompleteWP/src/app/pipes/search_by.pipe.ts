import {Pipe, PipeTransform} from '@angular/core';
import {IProfile} from '../models/profile.model';

@Pipe({
  name: 'search_by'
})
export class Search_byPipe implements PipeTransform {
  /**
   * search profiles by First name,Last name,Full name
   * order profiles by First name
   * @param employees
   * @param searchTerm
   */
  transform(employees: IProfile[], searchTerm: string): IProfile[] {
    if (!employees || !searchTerm) {
      return employees;
    }
    return employees.filter((user) => {
      return user.FirstName.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
        user.LastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.FullName.toLowerCase().includes(searchTerm.toLowerCase());
    }).sort((profile1, profile2) => profile1.FirstName.localeCompare(profile2.FirstName)).reverse();
  }
}

