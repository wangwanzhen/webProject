/*****
 * 工具函数
 */
/***
 * 显示一个div做成的对话框, 解决某些浏览器不能显示Alert的问题
 * 本功能仅用于调试使用,调试完毕请删除相关的调用
 */
// import {
//   AJAX
// } from './api'
export function injectSwiperScript(callback) {
  let swiper = CREATE('script')
  swiper.type = 'text/javascript'
  if (swiper.readyState) {
    swiper.onreadystatechange = function() {
      if (swiper.readyState == "loaded" || swiper.readyState == "complete") {
        swiper.onreadystatechange = null
        callback()
      }
    }
  } else {
    swiper.onload = function() {
      callback()
    }
  }
  swiper.src = 'https://cdnfile.yaomaitong.cn/cdn/js/swiper.min.js'
  document.head.appendChild(swiper)
}
export function isObjEmpty(obj) {
  if (obj instanceof Array) {
    return obj.length === 0
  }

  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false
    }
  }

  return true
}
export function TRANSFORM(obj) {
  let arr = [];
  for (let item in obj) {
    arr.push(obj[item]);
  }
  return arr
}
// module.exports.trim = function(source) {
//   return source.replace(/(^\s*)|(\s*$)/g, "");
// }
export function getUrlSearch(name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  let r = window.location.search && window.location.search.split('?')[1].match(reg) || '' //防止参数拼接错误
  let str = r ? unescape(r[2]) : ''
  return str
}
export function getHash(name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  let r = window.location.hash && window.location.hash.split('#')[1].match(reg) || ''
  let str = r ? unescape(r[2]) : ''
  return str
}
export function setLocalStorage(key, value, expire) {
  let curtime = new Date().getTime() + expire * 1000
  let obj = {
    val: value,
    time: curtime
  }
  if (window.localStorage) {
    window.localStorage.setItem(key, JSON.stringify(obj))
  }
}

export function getCookieString(name) {
  let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  let r = document.cookie.match(reg)
  let str = r == null ? null : unescape(r[2])
  return str
}

export function getLocalStorage(key) {
  let val = window.localStorage.getItem(key);
  let dataobj = JSON.parse(val)
  if (val) {
    if (dataobj.time - new Date().getTime() < 0) {
      window.localStorage.removeItem(key)
      key = null
      return false
    } else {
      return dataobj.val
    }
  } else {
    return false
  }
}
// export function trimUrlProtocal(url) {

//   if (typeof url === 'string') {
//     url = document.location.protocol + url.replace('http://', '//').replace('https://', '//')
//   }
//   return url
//     // return (typeof url === 'string' ? url.replace('http://', '//').replace('https://', '//') : url)
// }
//医院是否为上量筛选

//省份医院过滤

export let setDocumentTitle = function(title) {
  document.title = title;
  if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
    var i = document.createElement('iframe');
    i.src = 'resource/favicon.ico';
    i.style.display = 'none';
    i.onload = function() {
      setTimeout(function() {
        i.remove();
      }, 9)
    }
    document.body.appendChild(i);
  }
}

export function hasClass(elem, cls) {
  cls = cls || '';
  if (cls.replace(/\s/g, '').length == 0) return false;
  return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');

}

export function addClass(elem, cls) {
  if (!hasClass(elem, cls)) {
    elem.className += ' ' + cls;
    elem.class += ' ' + cls;
  }
}
export function toggleClass(obj, cls) {
  if (hasClass(obj, cls)) {
    removeClass(obj, cls)
  } else {
    addClass(obj, cls)
  }
}

export function removeClass(obj, cls) {
  if (hasClass(obj, cls)) {
    let reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    obj.className = obj.className.replace(reg, ' ');
  }
}
export let GETELE = id => document.getElementById(id)
export let add = (a, b) => a + b
export let CREATE = tag => document.createElement(tag)
export const isIosBrowser = /(iphone|ipad|ipod|safari)/.test(window.navigator.userAgent.toLowerCase())
export const ID = window.location.pathname.split('?')[0].split('/').pop()
export const isWxBrowser = navigator.userAgent.toLowerCase().indexOf('micromessenger') >= 0
export const IosAppVersion = window.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/) ? window.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1] : null
export const URL = encodeURIComponent(window.location.href.split('#')[0])
export const isFunc = (func) => typeof(func) === 'function'
export let hideEle = id => GETELE(id).style.display = 'none'
export let SHOWELE = (id, show = true) => {
  if (show) {
    GETELE(id).style.display = 'block'
  } else {
    GETELE(id).style.display = 'none'
  }
}
//~~~~~~分享成功后下载提示显示
export function showShareSuc(tag) {
  SHOWELE('mask')
  GETELE('mask').style.opacity = '1'
  addClass(tag, 'show-share-suc')
}

export function removeTag(prams, item) {
  removeClass(item, 'show-share-suc')
  GETELE('mask').style.opacity = '0'
  setTimeout(function() {
    prams.parentNode.removeChild(prams)
    hideEle('mask');
  }, 500)
}
export function showMessage(message) {
  if (message) {
    SHOWELE('info-message')
    GETELE('info-message').style.opacity = 1
    GETELE('info-message').innerText = message
  }
  setTimeout(function() {
    message = ''
    GETELE('info-message').style.opacity = 0
    hideEle('info-message')
  }, 2000)
}

export function setBrandList(urlList, productObj = null) {
  let contentList = [{
    logo: '../resource/logo_rec.png',
    title: '药脉通头条资讯',
    desc: '300万医药人自己的新闻榜',
    button: '../resource/update_button.png',
    url: 'https://wechatymt.yaomaitong.cn/article',
    isSmall: true
  }, {
    logo: 'https://cdnfile.yaomaitong.cn/image/share.png',
    title: '邀请你加入',
    desc: '全国(各省)药械群',
    button: '../resource/action_button.png',
    url: `${window.location.origin}/v2/chatgroups/detail/h5_product_chatgroups_branding`
  }]
  if (productObj) {
    contentList = [{
      logo: productObj.logo,
      title: productObj.title,
      button: '../resource/look_button.png',
      url: productObj.url,
      desc: productObj.desc,
      isSmall: true
    }, ...contentList]
  }
  getTopBranding(contentList)
}

function getTopBranding(brandList) {
  let Array = []
  for (let key of brandList) {
    GETELE('app-branding').style.backgroundColor = 'rgba(0,0,0,.7)';
    var appBrandContent = CREATE('div');
    addClass(appBrandContent, 'content')
    var appBrandingLeft = CREATE('a');
    addClass(appBrandingLeft, 'left-part')
    appBrandingLeft.href = key.url
    var appBrandingLogo = CREATE('img');
    appBrandingLogo.src = key.logo;
    addClass(appBrandingLogo, 'logo')
    appBrandingLeft.appendChild(appBrandingLogo);
    appBrandContent.appendChild(appBrandingLeft);
    let appBrandingTextBody = CREATE('div')
    addClass(appBrandingTextBody, 'banner-text-body')
    if (key.title) {
      let appBrandingAdvTitle = CREATE('div');
      addClass(appBrandingAdvTitle, 'banner-title')
      appBrandingAdvTitle.innerText = key.title;
      appBrandingAdvTitle.style.color = '#fff'
      appBrandingTextBody.appendChild(appBrandingAdvTitle);

    }
    if (key.desc) {
      let appBrandingAdvText = CREATE('div');
      addClass(appBrandingAdvText, key.isSmall ? 'banner-text' : 'banner-title')
      appBrandingAdvText.innerText = key.desc;
      appBrandingAdvText.style.color = '#fff'
      appBrandingTextBody.appendChild(appBrandingAdvText);
    }
    appBrandingLeft.appendChild(appBrandingTextBody)
    var appBrandingButton = CREATE('div');
    var appBrandingButtonImg = CREATE('img');
    appBrandingButtonImg.src = key.button;
    addClass(appBrandingButton, 'action-button');
    appBrandingButton.appendChild(appBrandingButtonImg)
    appBrandingLeft.appendChild(appBrandingButton);
    let closeBtn = CREATE('div')
    addClass(closeBtn, 'close')
    closeBtn.style.backgroundImage = 'url(./resource/close.png)'
    closeBtn.onclick = hideBranding
    appBrandContent.appendChild(closeBtn)
    Array.push(appBrandContent)
  }
  return swiper(Array)
}

function hideBranding() {
  let topBranding = GETELE('top-branding-div');
  addClass(topBranding, 'fadeOutUp');
  setTimeout(function() {
    hideEle('top-branding-div')
  }, 1000);
}

function swiper(contentList) {

  function initSwiper1() {
    let swiper1 = new Swiper('#brandSwiper', {
      pagination: '.ymt-app-branding .swiper-pagination',
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      slidesPerView: 1,
      observer: true,
      observeParents: true,
      paginationClickable: true,
      spaceBetween: 30,
      autoplay: 2500,
      speed: 500,
      loop: true,
      autoplayDisableOnInteraction: false,
      onSlideChangeEnd: function(swiper1) {
        swiper1.update();
      }
    });
  }
  for (let attr of contentList) {
    addClass(attr, 'swiper-slide')
    GETELE('brand-swiper-content').appendChild(attr)
  }
  initSwiper1()
}