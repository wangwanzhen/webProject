var fs = require('fs');
stat = fs.stat;
var config = require('../config/base')
function ResourceCopyPlugin () {}

ResourceCopyPlugin.prototype.apply = function (complier) {
  complier.plugin('done', function (stats) {
    ResourceCopy();
  })
}

function ResourceCopy () {
  copyfolder('/resource/');
  // copyfile('/favicon.ico');
}

function copyfile(name) {
  fs.writeFileSync(config.build + name, fs.readFileSync(config.source + name));
}

function copyfolder(name){
  exists( config.source + name, config.build + name, copy );
}

var copy = function( src, dst ){
    // 读取目录中的所有文件/目录
    fs.readdir( src, function( err, paths ){
        if( err ){
            throw err;
        }

        paths.forEach(function( path ){
            var _src = src + '/' + path,
                _dst = dst + '/' + path,
                readable, writable;

            stat( _src, function( err, st ){
                if( err ){
                    throw err;
                }

                // 判断是否为文件
                if( st.isFile() ){
                    // 创建读取流
                    readable = fs.createReadStream( _src );
                    // 创建写入流
                    writable = fs.createWriteStream( _dst );
                    // 通过管道来传输流
                    readable.pipe( writable );
                }
                // 如果是目录则递归调用自身
                else if( st.isDirectory() ){
                    exists( _src, _dst, copy );
                }
            });
        });
    });
};

// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
var exists = function( src, dst, callback ){
    fs.exists( dst, function( exists ){
        // 已存在
        if( exists ){
            callback( src, dst );
        }
        // 不存在
        else{
            fs.mkdir( dst, function(){
                callback( src, dst );
            });
        }
    });
};

module.exports = ResourceCopyPlugin;