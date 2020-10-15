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


    return  employees.filter((profile)=>{
      if(profile.FirstName.toLowerCase().startsWith(searchTerm.toLowerCase())){
        profile.Rank = 1
        return profile

      }else if(profile.FirstName.toLowerCase().includes(searchTerm.toLowerCase())){
        profile.Rank = 2;
      }else if(profile.LastName.toLowerCase().includes(searchTerm.toLowerCase())){
        profile.Rank = 3;
        return profile

      }
    }).sort((a,b)=>  {
      if(a.Rank >= b.Rank){
        console.log('***',a,b)
        return 1
      }else{
        console.log('---',a,b)
        return -1
      }

   });


    // const sortedByFirstName = employees.filter((user) => {
    //   user.FirstName.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
    //   // user.LastName.toLowerCase().includes(searchTerm.toLowerCase())
    //   user.FullName.toLowerCase().endsWith(searchTerm.toLowerCase())
    // });


    // .sort((a, b) => a.FirstName.localeCompare(b.FirstName, 'es', {sensitivity: 'base'}))
    // .reduce((acc,el)=>{
    //   console.log('acc',acc);
    //   console.log('el',el);
    //   acc[el.FirstName] = [...acc[el.FirstName] || [],el];
    //   return acc
    // },[])


    // return _.get(a, 'lastName', '').localeCompare(_.get(b, 'lastName', ''))
    //   || _.get(a, 'firstName', '').localeCompare(_.get(b, 'firstName', ''))
    //   || (_.get(a, 'lastName', '') > _.get(b, 'lastName', '') ? 1 : -1);

    // .sort((a,b)=>{
    //   return a.FirstName.localeCompare(b.FirstName) ||
    //     b.LastName.localeCompare(a.LastName) ||
    //     a.LastName < b.LastName? 1: -1
    // });


    // return employees.filter((user) => {
    //   return user.FullName.toLowerCase().startsWith(searchTerm.toLowerCase())
    // }).sort((profile1, profile2) => profile1.FullName.localeCompare(profile2.FullName)).reverse();
  }

}
