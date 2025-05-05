import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { isWeekend as isSatSun} from "./15.js";

let date=dayjs();

const fiveDays=date.add(5,'days');
console.log(fiveDays.format('<MMMM> <dddd>'));

const nextMonth=fiveDays.add(26,'days');
console.log(nextMonth.format('MMMM , dddd D'))

const prevMonth=fiveDays.subtract(35,'days');
console.log(prevMonth.format('MMMM , dddd D'))

for(let i=0;i<=6;i++){
const weekDays=date.add(i,'days').format('MMMM , D dddd');
  console.log(weekDays);
}

date=date.subtract(1,'day');
document.querySelector('.week')
.innerHTML=`<p>day of week:${isSatSun(date)}</p>`

console.log(isSatSun(date));

