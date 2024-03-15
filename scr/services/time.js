
  export const getCurrentDate=()=>{

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year

  if(month.toString().length == 1) {
      month = '0'+month;
  }
  if(date.toString().length == 1) {
       date = '0'+date;
  }
    return date + '.' + month + '.' + year
}

export const getCurrentTime=()=>{

     var hours = new Date().getHours(); //Current Hours
     var min = new Date().getMinutes(); //Current Minutes
     var sec = new Date().getSeconds(); //Current Seconds


   if(hours.toString().length == 1) {
        hours = '0'+hours;
   }
   if(min.toString().length == 1) {
        min = '0'+min;
   }
   if(sec.toString().length == 1) {
        sec = '0'+sec;
   }

     return hours + ':' + min + ':' + sec

 }
