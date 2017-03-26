/**
 * Created by Mikael Lindahl (mikael) on 3/22/17.
 */

'use strict';

var MockBrowser = require( 'mock-browser' ).mocks.MockBrowser;
var mock = new MockBrowser();

global.window = mock.getWindow();
global.document = mock.getDocument();
global.location = 'test'
global.$ = global.jQuery = require( 'jquery' );
global.Tether = require( 'tether' );
require( 'rxjs' );

//let cheerio = require('cheerio')
//global.$ = global.jQuery = cheerio.load('<h2 class="title">Hello world</h2>')

var $ = global.$;

var mockjax = require( 'jquery-mockjax' )( $, window );

// Note that we expect `window` to be defined once this file is browserified and
// used in a browser. If it isn't Mockjax will have a problem!

mockjax( [
    {
        url: /^\/auth\/login*/i,
        responseText: 'ok',
        type: 'POST'

    },
    {
        url: '/auth/logout',
        responseText: 'ok',
        type: 'POST'

    }] );

const debug = require( 'debug' )( 'auth_ui_componeny:lib:test:index' );

const Lab = require( "lab" );
const lab = exports.lab = Lab.script();

const code = require( "code" );

var options = {
    selector: {
        form: '#auth-login form',
        login: '.auth-login',
        logout: '.auth-logout',
        user: '#auth-password',
        password: '#auth-user',
    },
    url: {
        login: '/auth/login',
        logout: '/auth/logout',
        redirect: {
            login: '/',
            logout: '/'
        },
    }
};

var body=document.createElement( 'body' );
$().append( body );
$('body').append( '<button class="auth-login"></button>' );
$('body').append( '<button class="auth-logout"></button>' );
$('body').append( '<div id="auth-login"></div>' );
$('#auth-login').append(
    '<form>' +
    '   <input>' +
    '</form>' );

debug( $( "#auth-login form input"));

const Auth = require( '../index' );
var auth = Auth( options );

lab.experiment( "Server", function () {

    lab.test( 'Testing enter from input field', done => {
        //
        //var e = jQuery.Event("keydown");
        //e.which = 13; // # Some key code value
        var e = jQuery.Event( 'keydown', { keyCode:13})
        $("input").trigger(e);

        setTimeout(done, 1000)

    } )

    lab.test( 'Testing not enter from input field', done => {
        //
        //var e = jQuery.Event("keydown");
        //e.which = 13; // # Some key code value
        var e = jQuery.Event( 'keydown', {  keyCode:14})
        $("input").trigger(e);

        setTimeout(done, 1000)

    } )


    lab.test( 'Testing login event', done => {

        $(auth.selector.login ).click();

        setTimeout(done, 1000)

    } )

    lab.test( 'Testing login event with redirect', done => {

        var tmp=global.document

        global.document={
            URL:'http://hey?redirect=123'
        }

        $(auth.selector.login ).click();

        setTimeout(function(){
            global.document=tmp;
            done()
            }, 1000)

    } )

    lab.test( 'Testing login event fail', done => {

        auth.url.login='wrong';

        $(auth.selector.login ).click();

        setTimeout(done, 1000)

    } );


    lab.test( 'Testing logout event', done => {

        $(auth.selector.logout ).click();

        setTimeout(done, 1000)

    } )



    lab.test( 'Testing logout event fail', done => {

        auth.url.logout='wrong';

        $(auth.selector.logout ).click();

        setTimeout(done, 1000)

    } )
} )