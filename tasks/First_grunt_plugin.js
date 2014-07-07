/*
 * First-grunt-plugin
 * https://github.com/iris/first-grunt-plugin
 *
 * Copyright (c) 2014 lijmLar
 * Licensed under the MIT license.
 */

'use strict';

exports.whiteSpace = function (length){
  var space = ' ';
  return (function(length){
    var whiteSpace='';
    for (var i=0; i<length; i++){
      whiteSpace+=space;
    }
    return whiteSpace;
  }(length));
}


module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('First_grunt_plugin', 'For sure - the best grunt plugin', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: '\n '
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
     // Concat specified files.
     console.log('f: ', f);
     console.log('filter: ', f.src);
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        console.log('source: ', filepath);
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('input filepath: ',filepath);
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } 
        else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
            var outFile = [];
            var read = grunt.file.read(filepath);
            var lines = read.split(/\r/);
            var index=1;


            for (var each in lines){
              index++;
              try {
                var spaceCount = /^\s+/.exec(lines[each])[0].length;

                outFile.push(lines[each]);

                if ( /\/\/|,$|return|^\s*$/.test(lines[each]) )   continue;
                else if ( /function|if|else|while/.test(lines[each]) ){
                  outFile.push( exports.whiteSpace(spaceCount+2) + 'console.log(' + 'line: ' + index + ')');
                }
                else {
                 outFile.push( exports.whiteSpace(spaceCount) + 'console.log(' + 'line: ' + index + ')');
                }

                index++;
              }
              catch (e){
                index--;
                console.log(e)
              }
            }

            grunt.file.write('output.js', outFile.join('\r') );

            return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.separator));

      // console.log('src: ', src);    


      // Handle options.
      // src += options.punctuation;

      // // Write the destination file.
      // grunt.file.write(f.dest, src);

      // // Print a success message.
      // grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
