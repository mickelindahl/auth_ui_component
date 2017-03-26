/**
 * Created by Mikael Lindahl (mikael) on 3/22/17.
 */

'use strict';

var handlebars = require('handlebars');

var name='index';
var Browserify = require('browserify');
var debug = require( 'debug' )( 'auth_ui_component:lib:test:manual:'+name+',js' );

var fs = require('fs');
var Sass = require('node-sass');

var save_at = './html/'+name+'.html';
var save_css_at = './css/'+name+'.css';
var save_bundle_at = './js/'+name+'.js';

var opt= {
    form: fs.readFileSync( '../../templates/form_login.html' ).toString( 'binary' ),
    modal: fs.readFileSync( '../../templates/modal_login.html' ).toString( 'binary' )
}

var body = fs.readFileSync('./templates/'+name+'.html').toString('binary');
var body = handlebars.compile(body)(opt)


var css='<link href="../css/'+name+'.css" rel="stylesheet">\n';
var scripts='\n<script src="../js/'+name+'.js" type="application/javascript"></script>';
var view =css+body+scripts;

//debug(view);

fs.writeFileSync(save_at, view, {encoding:'binary'});

Sass.render( {
    file: './scss/all.scss',
}, ( err, result )=> {

    if ( err ) {
        return console.error(err);
    }

    fs.writeFileSync(save_css_at, result.css.toString())

});


var bundle_file = './bundle/'+name+'.js';
var b = Browserify();

b.add(  bundle_file );
b.bundle( function( err, js ) {

    if ( err ) {
        return console.error(err);
    }

    fs.writeFileSync(save_bundle_at, js.toString(),  {encoding:'binary'})


} )
