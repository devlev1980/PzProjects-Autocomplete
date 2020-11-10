import { Pipe, PipeTransform } from '@angular/core';
import {IProfile} from '../models/profile.model';

@Pipe({
  name: 'sortCards'
})
export class SortCardsPipe implements PipeTransform {

  transform(profiles: IProfile[], property: string): any[] {
    if(!profiles || !property){
      return
    }
    return profiles.sort((a,b)=>{
      if(a[property] < b[property]){
        return -1
      }else if(a[property] < b[property]){
        return 1
      }else{
        return 0
      }
    })
  }

}
