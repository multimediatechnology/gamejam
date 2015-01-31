// Map
/*global google:false */
$( function() {
  var map;
  var $map = $( '#map' )

  var setScroll = function( option ) {
    if (!map) {
      return
    }
    map.setOptions( {scrollwheel: option} )
  };

  var initialize = function() {
    map = new google.maps.Map( $map[0], {
      zoom:        9,
      scrollwheel: false,
      center:      new google.maps.LatLng( 47.761026, 13.069313 )
    } );

    var sbg = new google.maps.LatLng( 47.723379, 13.087777 );

    var uni = 'Fachhochschule Salzburg GmbH'
    var marker = new google.maps.Marker( {
      position: sbg,
      map:      map,
      title:    uni
    } );

    var infowindow = new google.maps.InfoWindow( {
      content: '<h2 class="section-heading">Veranstaltungsort</h2>' +
               '<h3 class="section-subheading text-muted">' +
               uni +
               ' <a href="https://www.google.com/maps/place/Fachhochschule+Salzburg/" title="Open in Google Maps">' +
               '<i class="fa fa-external-link"></i>' +
               '</a>' +
      '</h3>'
    } );

    infowindow.open( map, marker )

    google.maps.event.addListener( marker, 'click', function() {
      infowindow.open( map, marker )
    } );

    google.maps.event.addListener( map, 'mousedown', function() {
      setScroll( true )
    } )

  };

  $( 'body' ).on( 'mousedown', function( event ) {
    var insideMap = $( event.target ).parents( '#map' ).length > 0;

    if (!insideMap) {
      setScroll( false )
    }
  } );

  $( window ).scroll( function() {
    setScroll( false )
  } );

  initialize();
} );
