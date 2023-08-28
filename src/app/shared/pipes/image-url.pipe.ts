import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageUrl',
  standalone: true
})
export class ImageUrlPipe implements PipeTransform {

  transform(value: string): string {
    return value?  'http://localhost:8000/'+ value : '';
  }

}
