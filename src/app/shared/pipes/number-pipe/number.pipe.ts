import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberWithComma'
})
export class NumberPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    const individualNumbers =  String(value).split(',').join('').split('');
    const length = individualNumbers.length;
    individualNumbers.splice(length - 2, 0, ',');
    return individualNumbers.join('');
  }

}
