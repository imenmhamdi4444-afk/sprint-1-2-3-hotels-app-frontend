import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
  standalone: true
})
export class SearchFilterPipe implements PipeTransform {
  transform(list: any[], filterText: string): any[] {
    return filterText ? list.filter(item => 
      item.nomHotel?.toLowerCase().includes(filterText.toLowerCase())) : list;
  }
}
