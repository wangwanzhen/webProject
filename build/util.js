var fs = require('fs')
var config = require('../config/base.js')

exports.entryFiles = function() {
	var jsSrc = config.source + '/js/'
	var jsFiles = fs.readdirSync(jsSrc)
	var map = {
		common: []
	}
	jsFiles.forEach(function(file) {
		if (/^(?!tool).*js$/.test(file)) {
			var name = file.substr(0, file.length - 3)
			map[name] = jsSrc + file
		}
		if (/^tool.*js$/.test(file)) {
			map.common.push(jsSrc + file)
		}
	})
	return map
}
exports.HTMLPLUGINS = function(plugins, apply) {
	var htmlSrc = config.source + '/pages/'
	var htmlFiles = fs.readdirSync(htmlSrc)
	htmlFiles.forEach(function(file) {
		if (/(.*html$)/.test(file)) {
			var name = file.substr(0, file.length - 5)
			var conf = {
				template: htmlSrc + file,
				hash: false,
				filename: 'pages/' + file,
				chunks: ['common','vendor','name'],
				inject: 'body',
				minify: {
					collapseWhitespace: true
				}
			}
			plugins.push(new apply(conf))
		}
	})
	return plugins
}
