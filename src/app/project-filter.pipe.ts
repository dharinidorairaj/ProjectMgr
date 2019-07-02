import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'projectfilter',
    pure: false
})
export class ProjectFilterPipe implements PipeTransform {
    transform(items: any[], term): any {
      
        return term 
            ? items.filter(item => item.projectName.toLowerCase().indexOf(term.toLowerCase()) !== -1)
            : items;
    }
}
 


