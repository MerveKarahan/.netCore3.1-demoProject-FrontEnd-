import { Pipe, PipeTransform } from '@angular/core';
import { CarDTO } from '../models/carDTO';

@Pipe({
  name: 'carFilterPipe'
})
export class CarFilterPipePipe implements PipeTransform {

  transform(value: CarDTO[], filterText: string): CarDTO[] {
    filterText = filterText?filterText.toLocaleLowerCase():""
    return filterText?value
    .filter((c:CarDTO)=>c.carName.toLocaleLowerCase().indexOf(filterText)!==-1)
    :value;
  }
}
