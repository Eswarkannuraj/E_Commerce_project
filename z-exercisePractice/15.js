export function isWeekend(date) {
  const day = date.format('dddd');
  if(day === 'Saturday' || day==='Sunday'){
    return day;
  }else{
    return 'not a weekend';
  }
};

