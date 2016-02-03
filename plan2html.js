#!/usr/bin/env node
// Converts a markdown formatted Lean Canvas to HTML
// http://github.com/shermanhuman/planvas
// sherman.boyd@gmail.com
// This work is licensed under the Creative Commons Attribution 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by/4.0/.

var marked = require('marked');
var fs = require('fs');
var Handlebars = require('handlebars');

marked.setOptions({
    gfm: true
});

var leantemplate = fs.readFileSync('presentation.html', 'utf8');

if (process.argv.length <= 2) {
    console.log(`  No arguments supplied.  Give me some MD files to munch.
  Maybe try using the filenames of what you want converted as arguments.
  As many as you want, seperated by spaces.`)
} else {

    for (i = 2; i < process.argv.length; i++) {
        val = process.argv[i];
        console.log('Converting ' + val + ' to HTML.');
        var htmlfilename = val + '.html';
        var infile = fs.readFile(val, 'utf8', function (err, data) {
            if (err) throw err;

            var parsed = parse(data);
            var planvas = htmlify(parsed);
            //console.log('leantemplate = ' + leantemplate);
            var template = Handlebars.compile(leantemplate);
            //console.log('planvas = ' + planvas);
            var converted = template(planvas);
            //console.log('converted = ' + converted);
            fs.writeFile(htmlfilename, converted, function (err) {
                if (err) {
                    throw err;
                }
                else {
                    console.log('Saved as ' + htmlfilename);
                }
            })
        })
    }
};

var parse = function (data) {
    textarray = data.split('##');

    var planvas = {
        problem: '##' + textarray[1],
        existingalternatives: '##' + textarray[2],
        solution: '##' + textarray[3],
        keymetrics: '##' + textarray[4],
        uniquevalueproposition: '##' + textarray[5],
        highlevelconcept: '##' + textarray[6],
        unfairadvantage: '##' + textarray[7],
        channels: '##' + textarray[8],
        customersegments: '##' + textarray[9],
        earlyadopters: '##' + textarray[10],
        coststructure: '##' + textarray[11],
        revenuestreams: '##' + textarray[12]
    };
    //console.log(planvas);
    return planvas;
}

var htmlify = function (object) {
    for (var prop in object) {
        object[prop] = marked(object[prop]);
    }
    //console.log(object);
    return object;
}