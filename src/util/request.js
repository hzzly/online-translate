/**
 * AJAX函数封装
 * @param {string} url     请求地址（必须）
 * @param {object} options 发送请求的选项参数
 *  @config {string} [options.type] 请求发送的类型。默认为GET。
 *  @config {Object} [options.data] 需要发送的数据。
 */
export default function AJAX(url, options) {
  return new Promise((resolve, reject) => {
    //1.创建ajax对象
    let xhr = null;
    /**
     * 此处必须需要使用window.的方式,表示为window对象的一个属性.不存在时值为undefined,进入else
     * 若直接使用XMLHttpRequest,在不支持的情况下会报错
     **/
    if (window.XMLHttpRequest) {
      //IE6以上
      xhr = new XMLHttpRequest();
    } else {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    //2.连接服务器
    //open(方法,url,是否异步)
    let param = ""; //请求参数。
    //只有data存在，且为对象使才执行
    const data = options.data ? options.data : -1; //缓存data
    if (typeof (data) === "object") {
      for (let key in data) { //请求参数拼接
        if (data.hasOwnProperty(key)) {
          param += `${key}=${data[key]}&`;
        }
      }
      param.replace(/&$/, "");
    } else {
      param = "timestamp=" + new Date().getTime();
    }
    //3.发送请求
    let type = options.type ? options.type.toUpperCase() : "GET";
    if (type === "GET") {
      xhr.open("GET", `${url}?${param}`, true);
      xhr.send();
    } else {
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
      xhr.send(param);
    }
    //4.接收返回
    //OnRedayStateChange事件
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText))
        } else {
          reject('请求出错啦！')
        }
      }
    };
  })
}

/**
 * jsonp封装
 * @param {*} data 
 * @param {*} url 
 * @param {*} jsonpCallback 
 * @param {*} success 
 */
export function jsonp(url, options, jsonpCallback, success) {
  let script = document.createElement('script')
  let params = ''
  if (typeof (options.data) === "object") {
    for (let key in options.data) { //请求参数拼接
      if (options.data.hasOwnProperty(key)) {
        params += `${key}=${options.data[key]}&`;
      }
    }
    params.replace(/&$/, "");
  } else {
    params = "timestamp=" + new Date().getTime();
  }
  script.src = url + '?' + params
  script.async = true
  script.type = 'text/javascript'
  window[jsonpCallback] = data => {
    console.log(data);
    success && success(data)
  }
  document.body.appendChild(script)
}