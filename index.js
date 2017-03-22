/**
 * Created by Mikael Lindahl on 2017-03-20.
 */

'use strict';
global.$ = global.jQuery = require( 'jquery' );
global.Tether = require( 'tether' );
var $ = global.$;

require('bootstrap')

var debug = require('debug')()
var handlebars=require('handlebars');
var Rx = require( 'rxjs' );

/**
 * Authentication view controller
 *
 * - `options` {object} Object with the following keys
 *   - `loginError(xhr, status, error)` {callback} Callback
 *   used when on login error
 *     - `xhr` {object }The jqXHR object
 *     - `status` {string} Type of error
 *     - `error` object{} Optional exception object
 *   - `selector` {object} Object containing selectors
 *     - `user` {string} Selector for user name input
 *     - `password` {string} Selector for password
 *   - `url` {object} Object containing urls
 *     - `login` {string} login url
 *     - `default_redirect` {string} if no redirect present in url
 *     this is where you are redirected after login
 *
 *
 * @constructor
 */
function Auth( options ) {

    var self=this;

    this.selector=options.selector;
    this.url=options.url;

    this.event={};
    this.event.login=Rx.Observable.fromEvent( $( '#auth-login' ), 'click' )
        .map(function(x){
            x.self=self;
            return x
        })
    this.event.enter=Rx.Observable.fromEvent( $( 'form' ), 'keydown' );

    this.events.subscribe(this.login);
    this.events.subscribe(this.pressButtonOnEnterKeyPress);

}

Auth.prototype.pressButtonOnEnterKeyPress=function(x){

    console.log(x)

    if ( x.originalEvent.keyCode == 13 ) {
        $( 'form input' ).click();
        return false;
    }

};

Auth.prototype.login = function ( x ) {

    x.self.loginModalShow('pre');

    $.ajax( {
        type: 'POST',
        url: x.self.url.login,
        data: {
            user: $( x.self.selector.user ).val(),
            password: $( x.self.selector.user ).val(),
        },
        success: function ( response ) {

            x.self.loginModalShow('success');

            var redirect = document.URL.split( '=' );
            var url = redirect.length > 1
                ? redirect[1]
                : location.origin + x.self.url.default_redirect;

            window.open( url, '_self' );

        },
        error: function ( xhr, status, error ) {

            var err = eval( "(" + xhr.responseText + ")" );

            console.error( err );

            alert( "Failed!\n\n" + error );

        }
    } );
};

/**
 * Show specifict message during pre and post login
 *
 *  - `type` {string} Can take the values `"pre"` | `"success"` | `"fail"`
 */
Auth.prototype.loginModalShow = function(type){

    $('.auth-login').each(function(i,v){

        $(v).addClass('hidden-xs-up')

    })

    $('.auth-login-'+type).removeClass('hidden-xs-up')

};

module.exports = function ( opt ) {
    return new Auth( opt )
};
