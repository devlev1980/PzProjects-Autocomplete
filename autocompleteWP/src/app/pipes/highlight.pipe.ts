import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
  color: string = ''
  transform(employee: string, searchTerm?: any): any {
    if (!employee || !searchTerm) {
      return employee;
    }


    // if (!searchTerm) { return employee; }
    // const re = new RegExp(searchTerm, 'gi');
    // const newSpan = `<span class='highlight' style="color: #fff">${searchTerm}</span>`;
    // return  employee.replace(re, newSpan);


    const pattern = searchTerm
      .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
      .split(' ')
      .filter(t => t.length > 0)
      .join('|');
    const regex = new RegExp(pattern, 'gi');


    return (searchTerm) ? employee.replace(regex, match => `<b class="highlight" >${match}</b>`) : employee;
  }

}
