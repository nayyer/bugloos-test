import {PipeTransform, Pipe} from "@angular/core";
import { Courses } from '@core/interfaces/Courses';


@Pipe(
  {
    name: 'search'
  }
)
export class SearchPipe implements PipeTransform
{

  constructor()
  {

  }

  transform(value: Courses[], args: string): any
  {
    let result:any[]=value;
    if (args )
    {
      result = value.filter(item => item.label.includes(args));

    }
    return result;
  }

}
