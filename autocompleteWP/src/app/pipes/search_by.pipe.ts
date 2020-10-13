import {Pipe, PipeTransform} from '@angular/core';
import {IProfile} from '../models/profile.model';

@Pipe({
  name: 'search_by'
})
export class Search_byPipe implements PipeTransform {

  transform(employees: IProfile[], searchTerm: any): any {
    if (!employees || !searchTerm) {
      return employees;
    }
    return employees.filter((user) => {
      return user.FirstName.toLowerCase().startsWith(searchTerm.toLowerCase()) || user.LastName.toLowerCase().includes(searchTerm.toLowerCase()) || user.FullName.toLowerCase().includes(searchTerm.toLowerCase());
    }).sort((user1,user2)=> user1.FirstName.localeCompare(user2.FirstName)).reverse();
  }
}

