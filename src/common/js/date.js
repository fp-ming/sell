export function formatDate (date,fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1,(date.getFullYear() + '').substr(4-RegExp.$1.length));
  }
  let o = {
    'M+' : padLeftZero(date.getMonth() + 1),
    'd+' : padLeftZero(date.getDate()),
    'h+' : padLeftZero(date.getHours()),
    'm+' : padLeftZero(date.getMinutes()),
    's+' : padLeftZero(date.getSeconds()),
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1,o[k]);
    }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substr((str + '').length);
}
