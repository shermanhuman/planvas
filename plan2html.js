#!/usr/bin/env node
// Converts a markdown formatted Lean Canvas to HTML
// http://github.com/shermanhuman/planvas
// sherman.boyd@gmail.com
// This work is licensed under the Creative Commons Attribution 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by/4.0/.

var marked = require('marked');
var fs = require('fs');

if (process.argv.length <= 2){
  console.log("No arguments supplied.  Give me some MD files to munch.")
};

process.argv.forEach(function (val, index, array) {
  console.log('Converting ' + val + ' to HTML.');
  var htmlfilename = val + '.html';
  var infile = fs.readFile(val, 'utf8', function(err,data){
    if(err) throw err;
    return data;
  });

var convertedfile = marked(infile);

fs.writeFile(htmlfilename, convertedfile, function(err){
  if(err) {
    throw err;
  }
  else{
    console.log('Saved as ' +  htmlfilename);
  }
  
})  
  
  
  
  
});

