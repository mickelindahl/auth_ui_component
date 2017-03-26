/**
 * Created by Mikael Lindahl on 2017-03-20.
 */

'use strict';
global.$ = global.jQuery = require( 'jquery' );
global.Tether = require( 'tether' );
var $ = global.$;

require( 'bootstrap' );

var debug = require( 'debug' )( 'auth_ui_component:lib:index' );
var Rx = require( 'rxjs' );

/**
 * Authentication view controller
 *
 * - `options` {object} Object with the following keys
 *   - `selector` {object} Object with selectors
 *     - `form` {string} Selector for login form. Used to enable submit on
 *     key down.
 *     - `login` {string} Selector for link/button triggering login on click
 *     - `logout` {string} Selector for link/button triggering logout on click
 *     - `user` {string} Selector for user name input
 *     - `password` {string} Selector for password
 *   - `url` {object} Object containing urls
 *     - `login` {string} login url
 *     - `logout` {string} logout url
 *     - `redirect` {object} Login and logout redirects
 *       - `login` {string} if no redirect present in url
 *     this is where you are redirected after login
 *       - `logout` {string} redirected after logout
 *
 * @constructor
 */
function Auth( options ) {

    var self = this;

    this.selector = options.selector;
    this.url = options.url;

    this.event = {};
    this.event.enter = Rx.Observable.fromEvent( $( this.selector.form ), 'keydown' )
                         .map( function ( x ) {
                             x.self = self;
                             return x
                         } );
    this.event.login = Rx.Observable.fromEvent( $( this.selector.login ), 'click' )
                         .map( function ( x ) {
                             x.self = self;
                             return x
                         } );
    this.event.logout = Rx.Observable.fromEvent( $( this.selector.logout ), 'click' )
                         .map( function ( x ) {
                             x.self = self;
                             return x
                         } );

    this.event.login.subscribe( this.login );
    this.event.logout.subscribe( this.logout );
    this.event.enter.subscribe( this.loginOnEnterKeyPress );

}

/**
 * Enable submit click on enter press
 *
 * - `x` {object} [Rxjs](http://reactivex.io/rxjs/) object decorated with
 *   - `self` {object} Reference to `this`
 *
 */
Auth.prototype.loginOnEnterKeyPress = function ( x ) {

    debug('loginOnEnterKeyPress', x )

    if ( x.keyCode == 13 ) {
        $( x.self.selector.form ).find( x.self.selector.login ).click();
    }

};

/**
 * Login call to backend
 *
 * - `x` {object} [Rxjs](http://reactivex.io/rxjs/) object decorated with
 *   - `self` {object} Reference to `this`
 *
 */
Auth.prototype.login = function ( x ) {

    debug('login', x )

    x.self.loginModalShow( 'pre' );

    $.ajax( {
        type: 'POST',
        url: x.self.url.login,
        data: {
            user: $( x.self.selector.user ).val(),
            password: $( x.self.selector.user ).val(),
        }
    } ).done( function ( response ) {

        x.self.loginModalShow( 'done' );

        var redirect = document.URL.split( '=' );
        var url = redirect.length > 1
            ? redirect[1]
            : location.origin + x.self.url.redirect.login;

        window.open( url, '_self' );

    } ).fail( function ( xhr, status, error ) {

        var err = eval( "(" + xhr.responseText + ")" );

        debug( 'login  xhr.responseText', err, 'error', error );

        x.self.loginModalShow( 'fail' );

    } );
};


/**
 * Logout call to backend
 *
 * - `x` {object} [Rxjs](http://reactivex.io/rxjs/) object decorated with
 *   - `self` {object} Reference to `this`
 *
 */
Auth.prototype.logout = function logout( x ) {

    debug('logout', x )

    $.ajax( {
        type: 'POST',
        url: x.self.url.logout
    } ).done( function ( response ) {

        var url = location.origin + x.self.url.redirect.logout;
        window.open( url, '_self' );

    } ).fail( function ( xhr, status, error ) {

        var err = eval( "(" + xhr.responseText + ")" );

        debug( 'logout  xhr.responseText', err, 'error', error );

    } )

}

/**
 * Show pre, done or fail message during login
 *
 *  - `type` {string} Can take the values `"pre"` | `"done"` | `"fail"`
 */
Auth.prototype.loginModalShow = function ( type ) {

    debug('loginModalShow', type);

    $( '.auth-login' ).each( function ( i, v ) {

        $( v ).addClass( 'hidden-xs-up' )

    } )

    $( '.auth-login-' + type ).removeClass( 'hidden-xs-up' )

};

module.exports = function ( opt ) {
    return new Auth( opt )
};
