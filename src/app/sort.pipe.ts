import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'sortBy',
    pure: false
})
export class SortByPipe implements PipeTransform {
    transform(items: any[], sortedBy: string): any {
        console.log('sortedBy', sortedBy);
        
        return items.sort((a, b )=>(a<b?1:-1) );
    }
}
 