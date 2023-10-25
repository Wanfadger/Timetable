import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valueSplitter'
})
export class ValueSplitterPipe implements PipeTransform {

  transform(value: string, separator: string): string[] {
    // const values = value.split(separator)
    return value.split(separator)
  }

}
