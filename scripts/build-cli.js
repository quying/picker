'use strict';

var babel = require('babel-core');
var path = require('path');
var fs = require('fs');
var exec = require('child_process').exec;

process.env.BABEL_ENV = 'development';

var LIB_PATH = './lib';
var taskLibDir = './src';


var emptyDir = function(fileUrl){
  var files = fs.readdirSync(fileUrl);//读取该文件夹
  files.forEach(function(file){
    var stats = fs.statSync(fileUrl+'/'+file);
    if(stats.isDirectory()){
      emptyDir(fileUrl+'/'+file);
    }else{
      fs.unlinkSync(fileUrl+'/'+file);
    }
  });
}

//mkdir lib
function fsExistsSync(path) {
  try{
    fs.accessSync(path,fs.F_OK);
  }catch(e){
    return false;
  }
  return true;
}
if(!fsExistsSync(LIB_PATH)){
  fs.mkdirSync(LIB_PATH);
} else {
  emptyDir(LIB_PATH);
}

//copy scss
var scssFile = fs.readFileSync('./src/index.scss', 'utf-8');
fs.writeFileSync(LIB_PATH + '/index.scss', scssFile, { encoding: 'utf-8' });


//babel
var taskFiles = [];
fs.readdirSync(taskLibDir).forEach(function (taskConfigFile) {
  if (/\.js$/.test(taskConfigFile)) {
    var taskFile = path.join(taskLibDir, taskConfigFile);
    taskFiles.push(taskFile);
  }
});

taskFiles.forEach(function(taskFile){
  babel.transformFile(taskFile, {code: true, "presets": ['babel-preset-es2015', 'babel-preset-react-app'], 'plugins': ["add-module-exports"]}, function(err, result){
    if(err){
      console.log(err)
      return ;
    }

    if (/\.js$/.test(taskFile)) {

      taskFile = taskFile.match(/\/(.*.js)$/)[1]
      console.log(taskFile)

    }

    fs.writeFileSync(LIB_PATH + '/' + taskFile, result.code, { encoding: 'utf-8' });
  });
})