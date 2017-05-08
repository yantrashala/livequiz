import { Pipe, PipeTransform } from '@angular/core';
import {User} from '../common/user'

@Pipe({  name: 'sort' , pure:false})

export class SortPipe implements PipeTransform {
    transform(array: Array<User>, args: string): Array<User> {
    if(array){
            array.sort((a: any, b: any) => {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    });
   }    

    return array;
  }
}