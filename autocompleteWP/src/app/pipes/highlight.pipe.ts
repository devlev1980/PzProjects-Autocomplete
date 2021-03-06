import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
  color: string = '';
  /**
   * Highlight typed character in autocomplete
   * @param employee
   * @param searchTerm
   */
  transform(employee: string, searchTerm?: string): any {
    if (!employee || !searchTerm) {
      return employee;
    }
    const pattern = searchTerm
      .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
      .split(' ')
      .filter(t => t.length > 0)
      .join('|');
    const regex = new RegExp(pattern, 'gi');
    return (searchTerm) ? employee.replace(regex, match => `<b class="highlight" >${match}</b>`) : employee;
  }

}
