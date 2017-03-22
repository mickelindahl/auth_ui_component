/**
 * Created by Mikael Lindahl on 2017-02-28.
 */

'use strict';


var Modraggable = require( '../../../../lib/controllers/modraggable' );

window.onload = function () {

   var options={
      breakpoint:600,
      selector:'#example',
      scope:'body'
   };


   var M = new Modraggable(options)

};