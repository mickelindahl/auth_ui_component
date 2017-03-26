/**
 * Created by Mikael Lindahl on 2017-02-28.
 */

'use strict';

localStorage.debug = '*';

var Auth = require( '../../../index' );
var debug = require('debug')('auth_ui_component:lib:test:manual:bundles:index.js')

window.onload = function () {

    var options = {
        selector: {
            form:'#auth-login form',
            login:'.auth-login',
            logout: '.auth-logout',
            user: '#auth-password',
            password: '#auth-user',
        },
        ulr: {
            login: '/auth/login',
            logout: '/auth/logout',
            redirect:{
                login: '/',
                logout: '/'
            },
        }
    };

    var auth = Auth( options );

    $('.test-button').on('click', function(x){

        debug( x.target.id );
        $('.modal').modal('show')
        auth.loginModalShow(x.target.id)


    })
};