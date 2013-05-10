// ==UserScript==
//
// @name           Stackstrap
// @description    Applies Bootstrap to StackExchange pages
// @homepage       http://github.com/oliversalzburg/stackstrap/
// @namespace      http://oliversalzburg.github.com/
// @author         Oliver Salzburg, oliversalzburg (http://github.com/oliversalzburg/)
// @license        MIT License (http://opensource.org/licenses/mit-license.php)
//
// @include        http://superuser.com/*
// @include        http://stackoverflow.com/*
// @include        http://serverfault.com/*
//
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
//
// @version        0.1
//
// ==/UserScript==

// jQuery loading from http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script
function addJQuery( callback, jqVersion ) {
  jqVersion       = jqVersion || "1.8.3";
  var D           = document;
  var target      = D.getElementsByTagName( "head" )[ 0 ] || D.body || D.documentElement;
  var scriptNode  = D.createElement( "script" );
  scriptNode.src  = "//ajax.googleapis.com/ajax/libs/jquery/" + jqVersion + "/jquery.min.js";
  scriptNode.addEventListener( "load", function () {
    var scriptNode          = D.createElement("script");
    scriptNode.textContent  = "var gm_jQuery  = jQuery.noConflict(true);\n" +
                              "(" + callback.toString () + ")(gm_jQuery);";
    target.appendChild( scriptNode );
  }, false );
  target.appendChild( scriptNode );
}

/**
 * Main entry point
 * @param $ A reference to jQuery
 */
function main( $ ) {
  $( function() {
    // Remove all stylesheets from the document
    $( "link[rel='stylesheet']" ).remove();

    // Remove all classes from all nodes
    // and use the proper active marker
    $( "*" ).each( function() {
      var isActive = false;
      if( $( this ).hasClass( "youarehere" ) ) isActive = true;
      $( this ).removeClass();
      if( isActive ) $( this ).addClass( "active" );
    });

    // Set up the responsive container
    $( "#header" ).parent().addClass( "container-fluid" );

    $( "#header #topbar" ).addClass( "navbar navbar-inverse navbar-fixed-top" );
    $( "#header #topbar #hlinks" ).addClass( "navbar-inner" );
    $( "#header #topbar #hsearch" ).addClass( "navbar-inner" );

    $( "#header #topbar #hlinks > span" ).each( function(){ $(this).replaceWith( "<li>"+ $(this ).html() + "</li>") } );
    $( "#header #topbar #hlinks > li" ).wrapAll( "<ul class='nav'>" );
    $( "#header #topbar #hlinks > ul" ).wrap( "<div class='container'>" );

    $( "#header #hmenus" ).addClass( "navbar" );
    $( "#header #hmenus" ).children().addClass( "navbar-inner" );
    $( "#header #hmenus ul" ).addClass( "nav" );

    // The header should be a responsive row
    $( "#header" ).addClass( "row-fluid" );

    // The content should be a responsive row
    $( "#content" ).addClass( "row-fluid" );
    $( "#content #mainbar" ).addClass( "span9" );
    $( "#content #sidebar" ).addClass( "span3" );
    // Kill the link for now
    // TODO: Bring back feed link
    $( "#content #feed-link" ).remove();

    $( "#content #tabs" ).addClass( "nav nav-tabs" );
    $( "#content #tabs a" ).wrap( "<li>" );
    // Move the active marker to the parent...
    $( "#content #tabs a.active" ).parent().addClass( "active" );
    // ...and then remove it from the anchor
    $( "#content #tabs a.active" ).removeClass( "active" );
    // Style the number on the "featured" tab
    $( "#content #tabs li:nth-child(2) a span" ).addClass( "badge badge-info" );

    //$( "#content #mainbar #question-mini-list" ).addClass( "well" );

    // Pull vote/answer/view box left
    $( "#content #mainbar #question-mini-list [id^=question-summary-] > div:even" ).addClass( "pull-left media-object btn-group" );
    $( "#content #mainbar #question-mini-list [id^=question-summary-] > div:even > div" ).addClass( "btn btn-small disabled" );

    $( "#content #mainbar #question-mini-list [id^=question-summary-]" ).addClass( "well media" );
    $( "#content #mainbar #question-mini-list [id^=question-summary-] h3" ).parent().addClass( "media-body" );
    $( "#content #mainbar #question-mini-list [id^=question-summary-] h3" ).addClass( "media-heading" );
    // Style tags
    $( "#content #mainbar #question-mini-list [id^=question-summary-] a[rel='tag']" ).addClass( "label" );

    // Pull user and rep to the right
    $( "#content #mainbar #question-mini-list [id^=question-summary-] h3 ~ div:odd" ).addClass( "pull-right" );


  });
}

// load jQuery and execute the main function
addJQuery( main );