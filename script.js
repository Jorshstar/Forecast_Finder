function getDateTime() {
  var now = new Date(),
    hour = now.getHours(),
    minute = now.getMinutes();

  var days = [
    'sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  hour = hour % 12;
  if (hour < 10) {
    hour = '0' + hour;
  }
  if (minute < 10) {
    minute = '0' + minute;
  }
  let dayString = days[now.getDay()];
  return `${dayString}, ${hour}, ${minute}`;
}
