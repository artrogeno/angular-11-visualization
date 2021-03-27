import { Pipe, PipeTransform } from '@angular/core';

import * as MASK from "../utils/mask";

@Pipe({
  name: 'ngxMask'
})
export class PipeMaskPipe implements PipeTransform {

  transform(value: any, ...args: any[]): unknown {
    const mask = args[0]
    return mask ? MASK.mask(value, mask) : value
  }
}
