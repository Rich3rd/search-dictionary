import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})

export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: String): any {
    searchText = searchText ? searchText.toLowerCase() : null;
      if (!items || !searchText) {
          return items;
      }
      return items.filter(item => item.name.toLowerCase().indexOf(searchText) !== -1);
  }
}
