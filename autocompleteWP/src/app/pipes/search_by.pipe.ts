import {Pipe, PipeTransform} from '@angular/core';
import {IProfile} from '../models/profile.model';
import * as _ from 'lodash';
import {groupBy} from 'rxjs/operators';

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


    return employees.filter((profile) => {
      if (profile.FirstName.toLowerCase().startsWith(searchTerm.toLowerCase()) || profile.FullName.toLowerCase().startsWith(searchTerm.toLowerCase())) {
        profile.Rank = 1
        return profile

      } else if (profile.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) || profile.FullName.toLowerCase().includes(searchTerm.toLowerCase()) ){
        profile.Rank = 3;
        return profile
      } else if (profile.LastName.toLowerCase().startsWith(searchTerm.toLowerCase()) || profile.FullName.toLowerCase().includes(searchTerm.toLowerCase())) {
        profile.Rank = 2;
        return profile

      } else if (profile.LastName.toLowerCase().includes(searchTerm.toLowerCase()) || profile.FullName.toLowerCase().includes(searchTerm.toLowerCase())) {
        profile.Rank = 4;
        return profile

      }
    }).sort((a, b) => {
      if (a.Rank >= b.Rank) {
        return 1
      } else {
        return -1
      }

    });

  }

}
