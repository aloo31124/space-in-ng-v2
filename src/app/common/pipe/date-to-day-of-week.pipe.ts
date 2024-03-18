import { Pipe, PipeTransform } from '@angular/core';
// 日期換算星期
@Pipe({
  name: 'dateToDayOfWeek'
})
export class DateToDayOfWeekPipe implements PipeTransform {

  transform(date: string, len: string): string {
    const dayOfWeek = (new Date(date)).getDay();
      //判斷星期
      switch(dayOfWeek) {        
        case 0:
          // 星期日
          return "(日)";
        case 1:
          // 星期一
          return "(一)";
        case 2:
          // 星期二
          return "(二)";
        case 3:
          // 星期三
          return "(三)";
        case 4:
          // 星期四
          return "(四)";
        case 5:
          // 星期五
          return "(五)";
        case 6:
          // 星期六
          return "(六)";
      }
    return "";
  }

}
