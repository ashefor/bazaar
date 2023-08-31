import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@env/environment.development';

@Pipe({
  name: 'imageUrl',
  standalone: true
})
export class ImageUrlPipe implements PipeTransform {

  transform(value: string): string {
    return value?  `${environment.baseUrl}/${value}` : '';
  }

}
