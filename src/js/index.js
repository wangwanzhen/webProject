require('../css/index.css')
import {
  GETELE,
  ID,
  URL,
  TRANSFORM,
  CREATE,
  hideEle,
  setDocumentTitle,
  addClass,
  setBrandList,
  isObjEmpty,
  SHOWELE,
  injectSwiperScript,
  showShareSuc,
  removeTag,
  getHash,
  showMessage,
  removeClass
} from './toolUtil'

window.onload = function(){
	GETELE('root').innerHTML = 'wwwz'
	let img = CREATE('img')
	// img.src = require('../resource/bg-wechat.png')
	// GETELE('root').appendChild(img)
}