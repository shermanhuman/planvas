#!/usr/bin/env node
// Converts a markdown formatted Lean Canvas to HTML
// http://github.com/shermanhuman/planvas
// sherman.boyd@gmail.com
// This work is licensed under the Creative Commons Attribution 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by/4.0/.

var marked = require('marked');
var fs = require('fs');

marked.setOptions({
  gfm: true
});

if (process.argv.length <= 2){
  console.log(`  No arguments supplied.  Give me some MD files to munch.  
  Maybe try using the filenames of what you want converted as arguments.  
  As many as you want, seperated by spaces.`)
}else{

for(i=2; i < process.argv.length; i++){
  val =process.argv[i];
  console.log('Converting ' + val + ' to HTML.');
  var htmlfilename = val + '.html';
  var infile = fs.readFile(val, 'utf8', function(err,data){
    if(err) throw err;
    var converted = marked(data);
    fs.writeFile(htmlfilename, converted, function(err){
      if(err) {
        throw err;
      }
      else{
        console.log('Saved as ' +  htmlfilename);
      }
    })
  })
}
};