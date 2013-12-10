/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

 var vessel_markers_with_imo = new Array();
 var vessel_markers = new Array();
 var open_info_window;
 var angleDegrees = 0;
 var image;
 var map = null;
var mcOptions = {minimumClusterSize: 3,gridSize: 75, maxZoom:15, minZoom:2};//gridSize: 600, maxZoom:15, minimumClusterSize: 10};

var infowindow;
var marker, i,position;


var app = {
    // Application Constructor
    // result contains any message sent from the plugin call
    successHandler: function(result) {
        // alert('Callback Success! Result = '+result);
      },

      errorHandler:function(error) {
        alert(error);
      },

      tokenHandler: function(token) {
        alert('Appple token: ' + token);
      },

      onNotificationGCM: function(e) {
        switch( e.event )
        {
          case 'registered':
          if ( e.regid.length > 0 )
          {
                    // console.log("Regid " + e.regid);
                    // alert('registration id = '+e.regid);
                    write_reg_id_to_aws(e.regid);
                  }
                  break;

                  case 'message':
              // this is the actual push notification. its format depends on the data model from the push server
              // alert('message = '+e.message+' msgcnt = '+e.msgcnt);
              alert(e.message);
              break;

              case 'error':
              // alert('GCM error = '+e.msg);
              break;

              default:
              // alert('An unknown GCM event has occurred');
              break;
            }
          },

          onNotificationAPN: function(event) {
            alert('got Notif!');
            if ( event.alert )
            {
              navigator.notification.alert(event.alert);
            }

            if ( event.sound )
            {
              var snd = new Media(event.sound);
              snd.play();
            }

            if ( event.badge )
            {
              pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
            }
          },


    initialize: function() {
      // // ON For Alert ERRORS
      // window.onerror = function(message, url, lineNumber) {
      //   alert("Error: "+message+" in "+url+" at line "+lineNumber);
      // };

      this.bindEvents();
      vessel_markers_with_imo = new Array();
      vessel_markers = new Array();
      angleDegrees = 0;

      // if (typeof console  != "undefined") 
      //     if (typeof console.log != 'undefined')
      //         console.olog = console.log;
      //     else
      //         console.olog = function() {};

      // console.log = function(message) {
      //     console.olog(message);
      //     alert(message);
      // };
      // console.error = console.debug = console.info =  console.log;
      // window.onerror = null;

      // google.maps.event.addListener(map, 'idle', function(){
      //   clear_all_markers();
      //   show_vessel_positions();
      //   // alert('updated');
      // });
    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
      document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        // app.receivedEvent('deviceready');
        // var element = document.getElementById('deviceProperties');
        // element.innerHTML = 'Device Name: ' + device.name + '<br />' + 'Device Cordova: '  + device.cordova  + '<br />' + 'Device Platform: ' + device.platform + '<br />' + 'Device UUID: '     + device.uuid  + '<br />' + 'Device Version: '  + device.version  + '<br />';
      },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
      var parentElement = document.getElementById(id);
      var listeningElement = parentElement.querySelector('.listening');
      var receivedElement = parentElement.querySelector('.received');

      listeningElement.setAttribute('style', 'display:none;');
      receivedElement.setAttribute('style', 'display:block;');

      console.log('Received Event: ' + id);
    }
  };

  function write_reg_id_to_aws(push_reg_id) {

    var pal_user_id = $.jStorage.get("pal_user_id");
    var form_data= {
      'pal_user_id': pal_user_id,
      'gcm_registry_id': push_reg_id
    };
    req = $.ajax({
      url: 'https://getVesselTracker.com/register_push_device.php',
      type: "post",
      data: form_data,
      // tryCount : 0,
      // retryLimit : 30,

      success : function(response) {
        $.jStorage.set("push_registered", true);
      }
      
      // error : function(xhr, textStatus, errorThrown ) {
      //   if (textStatus == 'timeout') {
      //       this.tryCount++;
      //       if (this.tryCount <= this.retryLimit) {
      //           //try again
      //           $.ajax(this);
      //           return;
      //       }            
      //       return;
      //   }
      //   if (xhr.status == 500) {
      //       //handle error
      //   } else {
      //       //handle error
      //   }
      // }
    });
  }

  function register_push_service() {
    // alert('trying reg');
    if (window && window.plugins && window.plugins.pushNotification) {
      if ( device.platform == 'android' || device.platform == 'Android' )
      {
        var push_notification = window.plugins.pushNotification;
        push_notification.register(app.successHandler, app.errorHandler,{"senderID":"213694031514","ecb":"app.onNotificationGCM"});
          // pushNotification.register(
          //     app.successHandler,
          //     app.errorHandler, {
          //         "senderID":"213694031514",
          //         "ecb":"app.onNotificationGCM"
          //     });
}
else
  {alert('trying IOS');
var pushNotification = window.plugins.pushNotification;
pushNotification.register(
 app.tokenHandler,
 app.errorHandler, {
  "badge":"true",
  "sound":"true",
  "alert":"true",
  "ecb":"app.onNotificationAPN"
});
}
}
}

function loadingSpinner(method){
    // FROM http://planitize.tumblr.com/post/23541315060/modest-custom-phonegap-loading-spinner
    if (method == "on") {
      //Adjust to screen size
      var pHeight = window.innerHeight;
      var pWidth =window.innerWidth;
      var sH = parseInt($('#loadingSpinner').css('height'), 10);
      var sW = parseInt($('#loadingSpinner').css('width'), 10);
      $('#loadingSpinner').css('top',(pHeight-sH)/2);
      $('#loadingSpinner').css('left',(pWidth-sW)/2);
      var maxZ = getMaxZ($.mobile.activePage) + 1;
      $('#loadingSpinner').css('z-index',maxZ);
      //Show
      $('#loadingSpinner').show();
    } else if (method == 'off'){
      $('#loadingSpinner').hide();
    }
  }

  function show_popup(heading, content, ok_text, cancel_text) {
    // $('#create').on('click', function () { 
    //create a div for the popup
    var $popUp = $("<div/>").popup({
      dismissible: false,
      theme: "b",
      overlyaTheme: "e",
      transition: "pop"
    }).on("popupafterclose", function () {
        //remove the popup when closing
        $(this).remove();
      }).css({
        'width': '270px',
        'height': '200px',
        'padding': '5px'
      });
    //create a title for the popup
    $("<h2/>", {
      text: heading
    }).appendTo($popUp);

    //create a message for the popup
    $("<p/>", {
      text: content
    }).appendTo($popUp);

    // //create a form for the pop up
    // $("<form>").append($("<input/>", {
    //     type: "password",
    //     name: "password",
    //     placeholder: "Enter Password.."
    // })).appendTo($popUp);

    //Create a submit button(fake)
    $("<a>", {
      text: ok_text,
    }).buttonMarkup({
      inline: false,
      mini: true,
      icon: "check"
    }).on("click", function () {
      $popUp.popup("close");
        //that.subscribeToAsset(callback);
      }).appendTo($popUp);

    if (cancel_text) {
      // create a back button
      $("<a>", {
        text: cancel_text,
        "data-rel": "back"
      }).buttonMarkup({
        inline: false,
        mini: true,
          // theme: "a",
          icon: "back"
        }).appendTo($popUp);
    }
    $popUp.popup('open').trigger("create");
// });
}

jQuery.fn.center = function () {
  this.css("position","absolute");
  this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
    $(window).scrollTop()) + "px");
  this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
    $(window).scrollLeft()) + "px");
  return this;
};

function prepareList() {
  $('#bsmuk').find('li:has(ul)')
  .click( function(event) {
    if (this == event.target) {
      $(this).toggleClass('expanded');
      $(this).children('ul').toggle('medium');
    }
    return false;
  })
  .addClass('collapsed')
  .children('ul').hide();
}

function print_array_to_div(input_array, heading) {
  // result += '<div data-role="collapsible" data-content-theme="c">' +
  //  "<h3>Header</h3>" +
  //  '<p>I\'m the collapsible content with a themed content block set to "c".</p>'+"</div>";
  var result = '<div data-role="collapsible" data-theme="c" data-collapsed-icon="arrow-r" data-expanded-icon="arrow-d"><h3>'+heading+'</h3>';
  for( var key in input_array) {
    result += '<div><span class"vessel_title_wiki">'+key+' : </span><span  class="vessel_text_wiki">'+input_array[key]+'<img/></div>';
  }
  result += '</div>';
  return result;
}

function hide_all_content() {
  $('.spinner').hide();
  $('#map').hide();
  $('.results').hide();
  $('.favorites').hide();
  $('.vessel_wiki').hide();
  $('#ajax_error').hide();
}

function check_null(item) {
  if (item != null && item != '-' && item != 'None' && item != 'N/A')
    return item;
  return '';
} 

function fetch_vessel_wiki(imo) {  
  req = $.ajax({
    url: 'https://getVesselTracker.com/get_vessel_wiki.php?imo='+imo,
    beforeSend: function() {
      $(".spinner").css('display','inline');
      $(".spinner").center();
    },

    success : function(response) {
      // alert(response);
      var vessel_details_arr = new Array();
      vessel_details_arr['Vessel Type'] = response['VSLTYPE'];
      if (response['VSLSUBTYPE'])
        vessel_details_arr['Vessel Type'] += ' (' + response['VSLSUBTYPE'] + ')';
      vessel_details_arr['Maiden Name'] = response['MAIDEN_NAME'];
      vessel_details_arr['Flag'] = response['asset-parameter-flag'];
      vessel_details_arr['Registered Owner'] = response['REGOWN'];
      vessel_details_arr['Ultimate Owner'] = response['ULTIMATEOWN'];
      // Need: 
      vessel_details_arr['Management Type'] = response['MGTTYPE'] + ' ('+ response['mgm_type_valid_from'] + ' - ' + response['mgm_type_valid_to'] + ')';
      // vessel_details_arr['Service Status'] = response['STRSTATUS'] + ' ('+ response['mgm_type_valid_from'] + ' - ' + response['mgm_type_valid_to'] + ')';

      vessel_details_arr['Class Type, Number'] = response['CLASSTYPE'] + ', ' + response['CLASS_NO'];
      if (vessel_details_arr['DUAL_CLASS'] == 'Y')
        vessel_details_arr['Class Type2, Number'] = response['CLASSTYPE2ND'] + ', ' + response['CLASS_NO_2ND'];

      vessel_details_arr['Built On'] = response['BUILT_ON'];
      vessel_details_arr['Hull Number'] = response['HULL_NO'];
      vessel_details_arr['Length x Breadth'] = response['LOA']+' x ' +response['BREADTH'];
      vessel_details_arr['MMSI'] = response['asset-parameter-mmsi'];
      vessel_details_arr['IMO'] = response['imo'];
      vessel_details_arr['Draught'] = '7.0m';
      vessel_details_arr['Dead Weight'] = response['DWT'];
      vessel_details_arr['Gross Tonnage'] = response['GRT'];
      vessel_details_arr['Call sign'] = response['CALL_SIGN'];
      if (check_null(response['VESSEL_SPEED']) != '')
        vessel_details_arr['Speed'] = response['VESSEL_SPEED'];

      var vessel_contact_details = new Array();
      var mobile_num ;
      if (response['objVesselContact']){
        if(check_null(response['objVesselContact']['VesselContact']['TELEPHONE_1']) != '')
          vessel_contact_details['Telephone 1'] = response['objVesselContact']['VesselContact']['TELEPHONE_1'];
        if(check_null(response['objVesselContact']['VesselContact']['TELEPHONE_2']) != '')
          vessel_contact_details['Telephone 2'] = response['objVesselContact']['VesselContact']['TELEPHONE_2'];
        if(check_null(response['objVesselContact']['VesselContact']['TELEPHONE_3']) != '')
          vessel_contact_details['Telephone 3'] = response['objVesselContact']['VesselContact']['TELEPHONE_3'];
        vessel_contact_details['Email'] = response['objVesselContact']['VesselContact']['EMAIL'];
      }
      
      if (check_null(response['mobile-number']) != '')
        mobile_num = response['mobile-number'];
      else if (response['objVesselContact'] && response['objVesselContact']['VesselContact']['MOBILE'])
        mobile_num = response['objVesselContact']['VesselContact']['MOBILE'];

      vessel_contact_details['Mobile'] = mobile_num;
      
      if (check_null(response['asset-parameter-CSO1']) != '')
        vessel_contact_details['CSO1'] = check_null(response['asset-parameter-CSO1']);
      if (check_null(response['asset-parameter-CSO2']) != '')
        vessel_contact_details['CSO2'] = check_null(response['asset-parameter-CSO2']);
      if (check_null(response['asset-parameter-CSO3']) != '')
        vessel_contact_details['CSO3'] = check_null(response['asset-parameter-CSO3']);

      var voyage_details_arr = new Array();
      voyage_details_arr['Speed'] = response['speed-value-of-value'] + ' ' + toTitleCase(response['speed-units-of-value']);
      voyage_details_arr['Average Speed'] = response['average-speed-value-of-value'] + ' ' + toTitleCase(response['average-speed-units-of-value']);
      voyage_details_arr['Course'] = response['heading-value-of-value'] + ' ' + toTitleCase(response['heading-units-of-value']);
      voyage_details_arr['Latitude'] = 
        parseFloat(response['latitude-degrees-of-value']).toFixed(2)+'° ' +
        parseFloat(response['latitude-minutes-of-value']).toFixed(2)+'\' ' +
        parseFloat(response['latitude-seconds-of-value']).toFixed(2)+'" ' +
        toTitleCase(response['latitude-hemisphere-of-value']);
      voyage_details_arr['Longitude'] = 
        parseFloat(response['longitude-degrees-of-value']).toFixed(2)+'° ' +
        parseFloat(response['longitude-minutes-of-value']).toFixed(2)+'\' ' +
        parseFloat(response['longitude-seconds-of-value']).toFixed(2)+'" ' +
        toTitleCase(response['longitude-hemisphere-of-value']);
      // voyage_details_arr['Last position'] = 'CX9501';
      voyage_details_arr['Current port'] = '-';
      voyage_details_arr['Proximity'] = response['proximity-name'];
      voyage_details_arr['Proximity Direction'] = response['proximity-direction-value-of-value'] + ' '  + toTitleCase(response['proximity-direction-units-of-value']);
      voyage_details_arr['Traffic Status'] =  toTitleCase(response['traffic-status']);
      voyage_details_arr['Journey State'] = response['journey-state'];
      voyage_details_arr['Destination'] = '-';
      voyage_details_arr['ETA'] = '-';
      voyage_details_arr['Distance Moved'] = parseFloat(response['distance-moved-value-of-value']).toFixed(2) + ' '  + toTitleCase(response['distance-moved-units-of-value']);
      voyage_details_arr['Last Updated'] = response['trail-date-time-date-of-value'] + ' '  + response['trail-date-time-time-of-value'];

      var sea_condition = new Array();
      sea_condition['Wind Speed'] = response['wind-value-of-value'] + ' ' + response['wind-units-of-value'];
      sea_condition['Wind Direction'] = response['wdir-value-of-value'] + ' ' + toTitleCase(response['wdir-units-of-value']);
      sea_condition['Pressure'] = response['prmsl-value-of-value'] + ' ' + response['prmsl-units-of-value'];
      

      var last_port_calls = new Array();
      // last_port_calls['Tokyo'] = '2013-12-08 07:59PM';
      // last_port_calls['Hong Kong'] = '2013-11-22 10:19PM';
      // last_port_calls['Hong Kong'] = '2013-11-22 10:19PM';
      // last_port_calls['Hong Kong'] = '2013-11-22 10:19PM';
      // last_port_calls['Hong Kong'] = '2013-11-22 10:19PM';
      // last_port_calls['Hong Kong'] = '2013-11-22 10:19PM';
      // last_port_calls['Hong Kong'] = '2013-11-22 10:19PM';

      var crew_list = new Array();
      if (response['objCrewList']) {
        for(var i = 0; i < response['objCrewList']['CrewList'].length; ++i) {
          var rank = response['objCrewList']['CrewList'][i]['RANK'];
          var name = response['objCrewList']['CrewList'][i]['FIRST_NAME'] + ' ';
          if (check_null(response['objCrewList']['CrewList'][i]['MIDDLE_NAME'])!= '')
           name += ' ' +response['objCrewList']['CrewList'][i]['MIDDLE_NAME'];
         name += response['objCrewList']['CrewList'][i]['SUR_NAME'];
          crew_list[toTitleCase(rank)] = toTitleCase(name);
        }
      }
      // crew_list['Master'] = 'Sagar, BSMIN';
      // crew_list['Chief Engineer 1'] = 'Sugar, BSMCY';
      // crew_list['Chief Engineer 2'] = 'Sugar, BSMCY';
      // crew_list['Chief Engineer 3'] = 'Sugar, BSMCY';
      // crew_list['Chief Engineer 4'] = 'Sugar, BSMCY';

      var result =
      '<h2 class="vessel_name_wiki">'+toTitleCase(response['asset-name'])+' ('+response['sdc']+')</h2>' +
      '<div class="vessel_container_wiki">' +
      print_array_to_div(vessel_details_arr, 'Vessel Details') +
      print_array_to_div(voyage_details_arr, 'Voyage Details') +
      print_array_to_div(sea_condition, 'Sea Condition') +
      print_array_to_div(last_port_calls, 'Last Port Calls') +
      print_array_to_div(crew_list, 'Crew List') +
      print_array_to_div(vessel_contact_details, 'Contact Details') +
      '</div>';
      
      hide_all_content();
      $('.vessel_wiki').show();
      $('.vessel_wiki').html(result);
      $('.vessel_container_wiki').collapsibleset();
    },

    error : function() {
      $("#ajax_error").css('display','inline');
      $("#ajax_error").center();
      $('.spinner').hide();
    }
  });
}

function toTitleCase(str)
{
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function print_contact(my_array, param, title) {
  var result_div = '';
  if (my_array[param] != null && my_array[param] !='None') {
    result_div += "<div class='sub_text ship_contact'>";
    result_div += " <b class='sub_text_bold'>"+title+" &nbsp;&nbsp;&nbsp;&nbsp;</b>"+my_array[param].toLowerCase()+'. ';
    result_div += "</div>";
  }
  return result_div;
}

function print_favorites_result(my_array) {
  var imo_number = my_array['i-m-o-number'];
  // Parse the lat,lon
  var lat_lon = parse_lat_lon(my_array);
  var lat = lat_lon['lat'];
  var lon = lat_lon['lon'];
  var result_div = "<div class='ship_details'>";
  result_div += "<div class='ship_name'>" + my_array['asset-name'];
  if (my_array['sdc'] != null)
    result_div += " (" +my_array['sdc']+")";
  
  result_div += "</div>";
  result_div += "<div class='star'><a class='star_a' id='"+ imo_number +"' href='javascript:void(0)' onclick='add_bookmark(this.id);'><img src='img/star.png' class='star_i' id='i_"+ imo_number +"' width=25 height=25 /></a></div>";

  result_div += "<div class='ship_map map'><img class='ship_map_img' src='https:\/\/maps.googleapis.com/maps/api/staticmap?center="+lat+","+lon+"&zoom=4&size=" + $(document).width() + "x250&markers=color:blue%7Clabel:S%7C"+lat+","+lon+"&sensor=false&output=embed&key=AIzaSyD-_tWat3wl3kDktH6n0A1oXcjaS2Y-Mxs'/></div>"; // + $(document).width() +
  result_div += "<div class='sub_text ship_imo_mmsi_callsign'> <b class='sub_text_bold'> IMO / MMSI / Callsign &nbsp;&nbsp;&nbsp;&nbsp;</b>" + my_array['i-m-o-number'] + ", " +my_array['asset-parameter-mmsi'] + ", " +my_array['asset-parameter-call-sign'] + "</div>";
  result_div += "<div class='sub_text ship_flag'> <b class='sub_text_bold'> Flag &nbsp;&nbsp;&nbsp;&nbsp;</b>" + my_array['asset-parameter-flag'] + "</div>";
  result_div += "<div class='sub_text ship_speed_course'> <b class='sub_text_bold'>Speed / Course &nbsp;&nbsp;&nbsp;&nbsp;</b>" + parseFloat(my_array['speed-value-of-value']).toFixed(2) + " " + my_array['speed-units-of-value'].toLowerCase() + ", " + my_array['heading-value-of-value'] + " " + my_array['heading-units-of-value'].toLowerCase() + "</div>";
  // result_div += "<div class='sub_text ship_destination'> <b class='sub_text_bold'> Destination / ETA &nbsp;&nbsp;&nbsp;&nbsp;</b>" + my_array['destination'] +", " + my_array['eta'] + "</div>";
  if (my_array['proximity-name'])
    result_div += "<div class='sub_text ship_current_port'> <b class='sub_text_bold'>Proximity &nbsp;&nbsp;&nbsp;&nbsp;</b>" + my_array['proximity-name'] + "</div>"; // +", " + my_array['proximity-direction-value-of-value'] + " " + my_array['proximity-direction-units-of-value']

  result_div += "<div class='sub_text ship_position'> <b class='sub_text_bold'>Position &nbsp;&nbsp;&nbsp;&nbsp;</b>" + lat.toFixed(2) + ", " + lon.toFixed(2) + ", "+ my_array['trail-date-time-date-of-value'] + " " + my_array['trail-date-time-time-of-value'] + "</div>";
  
  if (my_array['traffic-status'] == 'ALERT' || my_array['traffic-status'] == 'WARNING') {
    result_div += "<div class='sub_text ship_traffic_status'> <b class='sub_text_bold'>Traffic Status &nbsp;&nbsp;&nbsp;&nbsp;</b><span class='traffic_alert red'>" + my_array['traffic-status'] + "</span></div>";
  } else {
    result_div += "<div class='sub_text ship_traffic_status'> <b class='sub_text_bold'>Traffic Status &nbsp;&nbsp;&nbsp;&nbsp;</b><span class='traffic_alert green'>" + my_array['traffic-status'].toLowerCase() + "</span></div>";
  }
  
  result_div += "<div class='sub_text ship_distance_moved'> <b class='sub_text_bold'>Distance Moved</b>" + parseFloat(my_array['distance-moved-value-of-value']).toFixed(2) + " " +my_array['distance-moved-units-of-value'].toLowerCase() + "<span style='text-transform:none;'> (since last report)</span></div>";
  result_div += "<div class='sub_text ship_current_port'> <b class='sub_text_bold'>Tracking &nbsp;&nbsp;&nbsp;&nbsp;</b>" + my_array['asset-parameter-tracking'] + "</div>";

  var officers = false;
  result_div += print_contact(my_array, 'asset-parameter-CSO1', 'CSO1');
  result_div += print_contact(my_array, 'asset-parameter-CSO2', 'CSO2');
  result_div += print_contact(my_array, 'asset-parameter-CSO3', 'CSO3');

  result_div += '<div style="padding-top: 7px;">'+
          '<span class="popup_label"><button  onclick="fetch_vessel_wiki('+my_array['i-m-o-number']+')" style="color:#00303f;font:bold 12px verdana; padding:5px;" title="vessel wiki">Additional Details</a></span>' +
          '<span class="popup_label"><button onclick="show_fav_on_map('+imo_number+')" class="show_on_map" id=map_'+imo_number+' style="color:#00303f;font:bold 12px verdana; padding:5px;" title="click to see track">Show On Map</a></span>'+
          '</div>';

  // if(!officers) {
  //   result_div += " - ";
  // }
  result_div += "</div>";
  return result_div;
}

function print_popup_content (my_array) {
  var imo_number = my_array['i-m-o-number'];
  // Parse the lat,lon
  var lat_lon = parse_lat_lon(my_array);
  var lat = lat_lon['lat'];
  var lon = lat_lon['lon'];
  // Marker Pop Up Details including Flag name ,vessel name, Speed.
  var show_sdc = sdc_settings.length > 1;
  var flag;
  if (check_null(my_array['asset-parameter-flag']) != '')
    flag = my_array['asset-parameter-flag'];
  else if (check_null(my_array['flag']) != '')
    flag = my_array['flag'];

  var contentString =
  '<div id="content" style="margin-left:15px;margin-top:3px;">'+
  '<div id="bodyContent">'+
  '<div class="star_popup"><a class="star_a" id='+ imo_number +' href="javascript:void(0)" onclick="add_bookmark(this.id);"><img src="img/star.png" class="star_i" id="i_'+ imo_number +'" width=25 height=25 /></a></div><div class="popup_title"><h3>'+toTitleCase(my_array["asset-name"])+
  ((flag)?' <img src="img/Flag_'+flag+'.png" style="width:70;height:20px;"/> ':'')+
  ((show_sdc)?' ('+my_array["sdc"]+')':'') +
  '</h3></div>'+
  '<div style="clear:both;" />';
  contentString +=
  '<div><span class="popup_label">Lat, Long: &nbsp;&nbsp;</span><span class="popup_text"><b>'+ lat.toFixed(2) + ", " + lon.toFixed(2) +" (" + my_array['trail-date-time-date-of-value'] + " " + my_array['trail-date-time-time-of-value'] + ')</b></span></div>'+
  '<div><span class="popup_label">Speed / Course: &nbsp;&nbsp;</span><span class="popup_text"><b>'+ parseFloat(my_array['speed-value-of-value']).toFixed(2) + " " + my_array['speed-units-of-value'].toLowerCase() +", " + my_array['heading-value-of-value'] + " " + my_array['heading-units-of-value'].toLowerCase() + '</b></span></div>'+
  '<div><span class="popup_label">Destination, ETA: &nbsp;&nbsp;</span><span class="popup_text"><b> - , -</b></span></div>'+
        // '<div><span class="popup_label"><b>Distance Moved: &nbsp;&nbsp;</b></span><span class="popup_text">'+parseFloat(my_array["distance-moved-value-of-value"]).toFixed(2) + " " +my_array["distance-moved-units-of-value"].toLowerCase() +
          // '<span style="text-transform:none;"> (since last report)</span></span></div>'+ 
          '<div style="padding-top: 7px;">'+
          '<span class="popup_label"><button onclick="fetch_vessel_wiki('+my_array['i-m-o-number']+')" style="color:#00303f;font:bold 12px verdana;padding:5px;" title="vessel wiki">Additional Details</button></span>' +
          '<span class="popup_label"><button onclick="show_vessel_path('+my_array['i-m-o-number']+','+my_array['heading-value-of-value']+')" style="color:#00303f;font:bold 12px verdana; padding:5px;" title="click to see track">Show Track</button></span>'+
          '</div>'+
          '</div>'+
          '</div>';
  return contentString;
}

function show_fav_on_map(imo) {
  $(".favorites").hide();
  $(".favorites").html();
  $('#map').show();
  fetch_results(imo,sdc_settings);
}


function fetch_results(query, sdc_settings, favorites) {
  var q2_url;
  if (favorites != null) {
    q2_url = "https://getVesselTracker.com/vessel_tracker.php?source=purplefinder&favorites="+JSON.stringify(favorites);
  } else {
    q2_url = "https://getVesselTracker.com/vessel_tracker.php?source=purplefinder&vessel_name="+query+"&sdc_settings="+JSON.stringify(sdc_settings);
  }

  req = $.ajax({
    url: q2_url,
    beforeSend: function() {
      $(".spinner").css('display','inline');
      $(".spinner").center();
    },

    success : function(response) {
      var result_div = "";
      var num_results = 0;
      if (response == "[[]]") {
        $("#ajax_error").css('display','inline');
        $("#ajax_error").html(' No records found. <br/>Please check your SDC Settings.');
        $("#ajax_error").center();
      }

      else {
        // response: ['sdc' | 'all' | 'fav'] [record_list] [atrributes]
        for( var i in response) {
          for (var j in response[i]) {
            num_results ++;
            var imo_number = response[i][j]['i-m-o-number'];
            // Parse the lat,lon
            var lat_lon = parse_lat_lon(response[i][j]);
            var lat = lat_lon['lat'];
            var lon = lat_lon['lon'];

            if (favorites == null) {
              var contentString = print_popup_content(response[i][j]);
              map.setZoom(5);
              map.setCenter(new google.maps.LatLng(lat,lon));
              clear_all_markers();

              marker = create_marker(response[i][j]["asset-name"], imo_number, lat, lon, response[i][j]['heading-value-of-value'], true);
              vessel_markers.push(marker);
              vessel_markers_with_imo.push(imo_number);
              show_popup_at_marker(marker, contentString);
              
              // show_vessel_positions();

              // show_popup_at_marker(vessel_markers[vessel_markers_with_imo.indexOf(imo_number)], contentString);
            }
            
            else {
              var content = print_favorites_result(response[i][j]);
              $('.results').html('');
              $('.favorites').html(content);
            }
          }
        }
        $('.spinner').hide();
        show_bookmarks_stars();
      }
    },

    error : function() {
      $("#ajax_error").css('display','inline');
      $("#ajax_error").center();
      $('.spinner').hide();
    }
  });
return req;
}

function update_auto_complete(sdc_settings_auto) {
  req = $.ajax({
    url: 'https://getVesselTracker.com/get_vessel_names.php?sdc_settings='+sdc_settings_auto,
    // type: "get",
    beforeSend: function() {
        // $(".spinner").css('display','inline');
        // $(".spinner").center();
      },

      success : function(response) {
        // Add port names along with shap names
        response = response.concat(port_names);

        $.jStorage.set("ships_auto_complete", JSON.stringify(response));
      // vessel_names_auto_complete = response;
      // $("#vessel_name").autocomplete('clear');
      $("#vessel_name").autocomplete({
        target: $('#suggestions'),
        source: response,
        minLength: 1,
        matchFromStart: false,
        // forceFirstChoiceOnEnterKey : true,
        // link: 'target.html?term=',
        link: "javascript:$('li a').click(function(e){var a=e.currentTarget;$('#vessel_name').val(a.text);$('#search_form').submit();$('#vessel_name').autocomplete('clear');});"
      });
    }
  });
}

var sdcs = new Array('BSMBE', 'BSMCN', 'BSMCY', 'BSMDE', 'BSMGR', 'BSMHK', 'BSMIN', 'BSMIM', 'BSMPL', 'BSMJP', 'BSMSG', 'BSMUK', 'ALL');

function show_sdc_settings() {
  if (launch_map) {
    $('#launch_map').attr("checked",true);
  }
  if (auto_update_map) {
   $('#auto_update_map').attr("checked",true); 
 }

 if (sdc_settings.length == 1) {
    // Chosen the specific SDC
    $('#list').val(sdcs[sdc_settings[0]]);
  } else {
    $('#list').val("ALL");
  }
}
// function sdc(){
//   f=document.getElementById('list').options[list.selectedIndex].value;
//   alert(f);
// }
function save_sdc_settings() {
  clear_all_markers();
  var sdc_settings2 = new Array();
  var num_sdcs = 13;


  var optionID = $('option:selected').attr('id');

  
  if(optionID == "999"){

    // alert('your option id is ' +optionID);
    sdc_settings2.push('1');
    sdc_settings2.push('2');
    sdc_settings2.push('3');
    sdc_settings2.push('4');
    sdc_settings2.push('5');
    sdc_settings2.push('6');
    sdc_settings2.push('8');
    sdc_settings2.push('10');
    sdc_settings2.push('11');}

    else
      sdc_settings2.push(optionID);
    // alert('your option id is ' +optionID);
    // sdc();
    // sdc_settings2.push(f);
    
    $.jStorage.set("sdc_settings", JSON.stringify(sdc_settings2));
    launch_map = $('#launch_map').is(':checked');
    auto_update_map = $('#auto_update_map').is(':checked');

    $.jStorage.set("launch_map", launch_map);
    $.jStorage.set("auto_update_map", auto_update_map);

    if (auto_update_map == false) {
      window.clearInterval();
    }

    sdc_settings = sdc_settings2;
    update_auto_complete(JSON.stringify(sdc_settings2));
    update_vessel_positions();
  }

  jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
      $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
      $(window).scrollLeft()) + "px");
    return this;
  };

  app.initialize();
// if (device.platform == 'iPhone' && parseFloat(device.version) == 7.0) {//device.platform == 'iPhone' && 
//   document.body.style.marginTop = "20px";
// }


if(navigator.userAgent.match(/OS 7/)) {
// document.write('<style type="text/css">body{padding-top: 20px;}</style>');
$(".content").css('top', '64px');
$(".bar-title").css('top', '20px');
$("#myPopover").addClass('ios7');
}


// ships_auto_complete = JSON.parse(localStorage.getItem("ships_auto_complete"));
ships_auto_complete = JSON.parse($.jStorage.get("ships_auto_complete"));

var ships = new Array("AANYA","AASHNA","ABAN ABRAHAM","ABRAM SCHULTE","ABU AL ABYAD","ABU DHABI III","ACAPULCO","AL BAZM II","AL DHAFRAH","AL GATTARA","AL GHARRAFA","AL HAMRA","AL KHAZNAH","AL RUWAIS","AL SADR I","AL SAMHA","AL YASAT II","ALASKABORG","ALGOMA HANSA","ALHAMLA","ALINA","ALPINE MADELEINE","ALPINE MATHILDE","ALVSBORG BRIDGE","AMAGISAN","AMELIA","AMOLIANI","ANA NZINGA","ANDESGAS","ANGELICA SCHULTE","ANL WARRAIN","ANNA SCHULTE","ANNABELLA","ANNABELLE SCHULTE","ANTARCTICGAS","ANTONIA SCHULTE","APL AMMAN","APL BANGKOK","APL CANADA","APL COLORADO","APL GERMANY","APL HONG KONG","APL ILLINOIS","APL INDIA","APL KAOHSIUNG","APL OMAN","APL SHARJAH","APL SHENZHEN","APL SOKHNA","APL SYDNEY","APL TENNESSEE","APOLLO BULKER","ARCHIMIDIS","ARCTIC GAS","ARDMORE SEAFARER","ARDMORE SEATRADER","ASPHALT SAILOR","ASPHALT SEMINOLE","ASTRAL EXPRESS","ATHENS STAR","ATHINA","ATLANTIC EXPLORER","ATLANTIC MOON","AUGUSTE SCHULTE","AUTEUIL","AWOBASAN","BACO LINER 1","BACO LINER 2","BACO LINER 3","BAHAMA SPIRIT","BALTHASAR SCHULTE","BALTIC GAS","BANI YAS","BAO WEALTH","BAOSTEEL EDUCATION","BAOSTEEL ELEVATION","BAVENIT","BELAIA","BELLA SCHULTE","BELLINI","BERGE AORAKI","BERGE FUJI","BERGE LHOTSE","BESIKTAS GH","BETIS","BLUE ROSE","BLUE SKY I","BOAVISTA","BOCHEM ANTWERP","BODO SCHULTE","BOMAR ERIS","BOMAR SEDNA","BOXY LADY","BRIGHT FORTUNE","BRITISH CHIVALRY","BRITISH COURTESY","BRITISH CURLEW","BRITISH DIAMOND","BRITISH EMERALD","BRITISH ESTEEM","BRITISH EXPLORER","BRITISH HARMONY","BRITISH INNOVATOR","BRITISH MERCHANT","BRITISH MERLIN","BRITISH OSPREY","BRITISH PRIDE","BRITISH PROGRESS","BRITISH PURPOSE","BRITISH RUBY","BRITISH SAPPHIRE","BRITISH SERENITY","BRITISH SWIFT","BRITISH TENACITY","BRITISH TRADER","BRUNO SCHULTE","BULK PROSPERITY","BUTINAH","C BB B","CAECILIA SCHULTE","CAMELOT","CAP FERRATO","CAP FRIO","CAP INES","CAP ISABEL","CAP MORETON","CAPE CANAVERAL","CAPPADOCIAN","CARIBE","CAROLINE SCHULTE","CATHARINA SCHULTE","CESKA","CHELTENHAM","CHEM BULLDOG","CHEM LYRA","CHEM ORIO N","CHEM RANGER","CHEM VEGA","CHEMTRANS RAY","CHEMTRANS RHINE","CHEMTRANS RIGA","CHEMTRANS ROUEN","CHEMTRANS SKY","CHEMTRANS STAR","CHENGYANG EMINENCE","CHILTERN","CHRISTOPH SCHULTE","CHURUN MERU","CLAMOR SCHULTE","CLASSY VICTORIA","CLIPPER BURGUNDY","CLIPPER IMABARI","CMA CGM AZURE","CMA CGM CARMEN","CMA CGM DON CARLOS","CMA CGM DON GIOVANNI","CMA CGM L ETOILE","CMA CGM LAVENDER","CMA CGM MARGRIT","CMA CGM MIMOSA","CMA CGM ONYX","CMA CGM RAVEL","CMA CGM ROSE","CONISTON","CORAL ACTINIA","CORAL ALICIA","CORAL ANTHELIA","CORAL CARBONIC","CORAL FAVIA","CORAL IVORY","CORAL LACERA","CORAL LEAF","CORAL LOPHELIA","CORAL MEANDRA","CORAL MILLEPORA","CORAL OBELIA","CORAL PALMATA","CORAL PARENSIS","CORAL PAVONA","CORAL RIGIDA","CORAL RUBRUM","COSCO GERMANY","COSCO LONG BEACH","COSCO NAPOLI","COTSWOLD","CRECIENTE","CSAV HOUSTON","CYGNUS OCEAN","DAIMON","DANIELA SCHULTE","DAPENG MOON","DAPENG STAR","DAPENG SUN","DAVID SCHULTE","DESERT ORCHID","DIAMOND EXPRESS","DIYYINAH I","DON PASCUALE","DONATA SCHULTE","DONIZETTI","DORA SCHULTE","DORIAN SCHULTE","DOROTHEA SCHULTE","DOUBLE PROGRESS","DP AZALEA","DP PROTEUS","E R BAVARIA","E R BAYERN","E R BAYONNE","E R BEILUN","E R BERLIN","E R BORNEO","E R BOSTON","E R BOURGOGNE","E R BRANDENBURG","E R BRAZIL","E R BRISBANE","E R BUENOS AIRES","E R CAEN","E R CANBERRA","E R CANNES","E R COPENHAGEN","E R CUXHAVEN","E R DALLAS","E R DARWIN","E R DENMARK","E R DENVER","E R HAMBURG","E R HELGOLAND","E R KINGSTON","E R LUBECK","E R MALMO","E R MARTINIQUE","E R NEW YORK","E R PERTH","E R PUSAN","E R SANTIAGO","E R STRALSUND","E R SWEDEN","E R SYDNEY","E R WILHELMSHAVEN","E R YANTIAN","EDZARD SCHULTE","EILHARD SCHULTE","ELISABETH SCHULTE","ELISALEX SCHULTE","ELISE SCHULTE","EMMA SCHULTE","EMMY SCHULTE","ENSCO 5006","ENSCO 6000","ENSCO 6002","ENSCO 8504","ENSCO DS 3","ENSCO DS 4","ENSCO DS 6","ENSCO DS1","ENSCO DS2","ENSCO DS5","ENSCO7500","EOS","EPSOM","ER BREMERHAVEN","ER CALAIS","ER ELSFLETH","ERIKA SCHULTE","ERIN SCHULTE","ESTHER SCHULTE","EVA SCHULTE","EVELYN SCHULTE","EVERHARD SCHULTE","EZ QM DC3","FAUST","FOLEGANDROS","FPSO CAPIXABA","FPSO ESPADARTE","FPSO MONDO","FPSO SERPENTINA","FPSO XIKOMBA","FRANCISCA SCHULTE","FRANZ SCHULTE","FSO UNITY","FUGRO BRASILIS","FUGRO COMMANDER","FUGRO EQUATOR","FUGRO EQUINOX","FUGRO GALAXY","FUGRO GEMINI","FUGRO MERIDIAN","FUGRO NAVIGATOR","FUGRO SEARCHER","FUGRO SUPPORTER","GALISSAS","GAS ALICE","GAS CORAL","GAS ENCHANTED","GAS FORTUNE","GAS ICON","GAS JASMINE","GAS RENOVATIO","GAS SELLAN","GASCHEM NORDSEE","GASCHEM PACIFIC","GAZ CONCORD","GAZ EXPLORER","GAZ FIDELITY","GAZ PALMYRA","GAZ PIONEER","GAZ SUPPLIER","GAZ UNITED","GAZ UNITY","GAZ VENEZIA","GAZ VENTURE","GEO PROSPECTOR","GEORG SCHULTE","GHASHA","GLOBAL CHANGE","GLOBAL DESTINY","GLOBAL PHENIX","GLOBAL SUCCESS I","GLOBAL TAURUS","GLOBAL UNION","GOLDEN BEIJING","GOLDEN CRUX NO 17","GOLDEN FUTURE","GOLDEN MILLER","GOLDEN WAVE","GOOD NEWS","GRAND BENELUX","GRANDE ANVERSA","GRANDE BUENOS AIRES","GRANDE DETROIT","GRANDE ITALIA","GRANDE NAPOLI","GRANDE PORTOGALLO","GRANDE ROMA","GRANDE SPAGNA","GUANACO","GUENTHER SCHULTE","GUOYU51","GUSTAV SCHULTE","HAMMONIA ADRIATICUM","HAMMONIA AFRICUM","HAMMONIA CASPIUM","HAMMONIA GALLICUM","HAMMONIA INTERNUM","HAMMONIA THRACIUM","HANS SCHOLL","HAPPY BEAR","HAPPY BEE","HAPPY BIRD","HAPPY BRIDE","HAPPY CONDOR","HAPPY EAGLE","HAPPY FALCON","HAPPY FELLOW","HAPPY GIRL","Happy Harrier","HAPPY PELICAN","HAPPY PENGUIN","HARUNA EXPRESS","HELENA SCHULTE","HELGA","HENRIETTE SCHULTE","HERO","HIGH ENTERPRISE","HIGH MARS","HIGH MERCURY","HIGH SATURN","HOBART","HON HENRY JACKMAN","HORIZON ATHENA","HORIZON THEONI","HORIZON THETIS","HUBERTA","HUGO SCHULTE","HYUNDAI BANNER","ICARO","IKARIA","IMMANUEL SCHULTE","INTER SYDNEY","INTERLINK ACUITY","INTERLINK EQUITY","INTERLINK PARITY","INTERLINK VERITY","INTREPID CANADA","INTREPID REPUBLIC","INTREPID SEAHAWK","ISABELLA","ISABELLE SCHULTE","ISH","ISLAND BAUHINIA","ISLAND GREEN","ITAL FESTOSA","IVER ACTION","JANANA","JASMINE EXPRESS","JERVIS BAY","JOHANN SCHULTE","JOOST SCHULTE","JOSE LEONARDO CHIRIN","JOSE PROGRESS","JUERGEN SCHULTE","JUNIPER 5","JUNIPER 8","JUNIPER6","K0KUKA VIGOR0US","KARIN","KASPAR SCHULTE","KATYAVALA","KAYA","KEMPTON","KENO","KILUANJE","KIND SALUTE","KIZOMBA A FPSO","KIZOMBA B","KOKUKA COURAGEOUS","KOKUKA GLORIOUS","KOMATI","KOMET III","KONRAD SCHULTE","KOTA PEKARANG","KUROSHIO EXPRESS","KV TROMSO","KYRIAKOULA","LADY HILDE","LADY KATHLEEN","LADY MARGAUX","LAGUNA SWAN","LAMNALCO COUGER","LAMNALCO LEOPARD","LAMNALCO LION","LAMNALCO PUMA","LAN HAI TONG QING","LEA","LIOBA","LIQUID CRYSTAL","LISA SCHULTE","LISSY SCHULTE","LIWA V","LOCH RANNOCH","LONDON COURAGE","LONGCHAMP","LOUISA SCHULTE","LPG C AINTREE","LPG SUPER LEAGUE","LUDWIG SCHULTE","M SKY","M T CHEM ALYA","M T KEREM D","M T LAUREN","M V PACIFIC RUBY","M V SHATIXA","M Y ANTARCTIC","MADDY","MAERSK DALTON","MAERSK DARLINGTON","MAERSK DARTFORD","MAERSK DAUPHIN","MAERSK DELANO","MAERSK DELMONT","MAERSK EINDHOVEN","MAERSK ESSEN","MAERSK HONOUR","MAERSK ILLINOIS","MAERSK MIAMI","MAERSK NANHAI","MAERSK NEEDHAM","MAERSK NORWICH","MAERSK NOTTINGHAM","MAERSK SAIGON","MAERSK SANA","MAERSK SANTANA","MAERSK SARNIA","MAERSK SEOUL","MAERSK SEVILLE","MAERSK SINGAPORE","MAERSK SOFIA","MAERSK STRALSUND","MAERSK SYDNEY","MALVERN","MANDUME","MANUEL GUAL","MAPLE EXPRESS","MARE ADRIACUM","MARE AEGEUM","MARE ARCTICUM","MARE ATLANTICUM","MARE BALTICUM","MARE CARIBICUM","MARE DORICUM","MARE ITALICUM","MARE LYCIUM","MARE NOSTRUM","MARE ORIENS","MARE PHOENICIUM","MARE PICENUM","MARE SICULUM","MARE TIRRENUM","MARIANNE SCHULTE","MARIE SCHULTE","MARILENA","MARKAB","MARLIN GLORY","MARLIN IRIS","MARLIN TOPAZ","MARY SCHULTE","MAXIMILIAN SCHULTE","MAXINE","MCC MELAKA","MEGACORE HONAMI","MELLOW WIND","MERKUR BAY","MERKUR BEACH","MERKUR BRIDGE","MERKUR CLOUD","MERKUR STAR","MERKUR TIDE","MEZAIRA A","MIHARUMARU","MIN LU","MIN RONG","MINOAN FLAME","MIRO D","MISTRAL","MOL CONTINUITY","MOL DIAMOND","MOL DIGNITY","MOL DIRECTION","MOL DISTINCTION","MOL GLIDE","MOL GLOBE","MOL GRANDEUR","MOL GRATITUDE","MOL GROWTH","MOL HORIZON","MOL INCA","MOL PACE","MOL PROFICIENCY","MOL PROSPERITY","MOL WISDOM","MONSOON","MONTEVIDEO EXPRESS","MORITZ SCHULTE","MOYRA","MOZART","MOZART","MRAWEH","MSC ADRIATIC","MSC AGADIR","MSC ALTAIR","MSC ANNICK","MSC ANTALYA","MSC ANTARES","MSC ANTIGUA","MSC ARICA","MSC BENEDETTA","MSC CRISTINA","MSC GEMMA","MSC GIANNA","MSC MARA","MSC MIRA","MSC RENEE","MSC SEATTLE","MSC SENA","MSC SHENZHEN","MSC VANCOUVER","MSC VEGA","MSC YOKOHAMA","MT BOMAR MARS","MT JUNIPER 7","MT SRIRACHA TRADER","MUBARAZ","MV ABIDA","MV ARRILAH 1","MV ARZ","MV ATLANTIC PRIME","MV FRIDA SCHULTE","MV GEO ENDEAVOUR","NAIDA","NANCHANG","NASHWAN","NATALIE SCHULTE","NAVIGATOR ARIES","NAVIGATOR CAPRICORN","NAVIGATOR GEMINI","NAVIGATOR LIBRA","NAVIGATOR MAGELLAN","NAVIGATOR MARS","NAVIGATOR NEPTUNE","NAVIGATOR PHOENIX","NAVIGATOR PLUTO","NAVIGATOR SATURN","NAVIGATOR SCORPIO","NAVIGATOR VENUS","NEDLLOYD ADRIANA","NEDLLOYD AFRICA","NEDLLOYD AMERICA","NEDLLOYD ASIA","NEDLLOYD EUROPA","NEDLLOYD HONSHU","NEDLLOYD JULIANA","NEDLLOYD MARITA","NEDLLOYD OCEANIA","NEDLLOYD VALENTINA","NEREO","NEW YORK STAR","NEWMARKET 1","NIJINSKY","NILEDUTCH BUFFALO","NILEDUTCH GAZELLE","NILEDUTCH HIPPO","NILEDUTCH RHINO","NJORD HARDRADA","NOBLE ACRUX","NOBLE ANTARES","NOBLE REGOR","NOBLE RIGEL","NORD NANAMI","NORDIC GAS","NORDIC THERESA","NORDSTRAND","NORMAND INSTALLER","NSS BONANZA","NSS FORTUNE","NST NATASJA","NW SHEARWATER","NYK FLORESTA","OANA","OCEAN ALLIANCE","OCEAN CLIPPER","OCEAN CONFIDENCE","OCEAN PRIMERO","OCEAN PROMISE","OCEAN VALOR SS77","OCEAN YATZY","OCEANIC INSTALLER","OCL EAGLE","ODIN","OKHA","OOCL ANTWERP","OOCL SHANGHAI","OPDR LISBOA","OPDR TANGER","OPDR TENERIFE","ORAMALIA","ORE BAYOVAR","ORE TUBARAO","ORE VITORIA","ORIENTAL EXPLORER","ORIENTAL PHOENIX","OSX 2","OTTO","PACIFIC HORIZON II","PARNASO","PARSIFAL","PATAGONIAGAS","PATAGONIAN MYSTIC","PATRICIA SCHULTE","PAUL SCHULTE","PAULA SCHULTE","PAVIAN","PETER SCHULTE","PETROBRAS 57","PHILINE SCHULTE","PINARA","PLANET V","PLEIADES DREAM","POINT","POLARGAS","PRIDE CARLOS WALTER","PRIDE PORTLAND","PRIDE RIO DE JANEIRO","PRINCIMAR COURAGE","PRINCIMAR INTEGRITY","PRINCIMAR PRIDE","PRINS HENDRIK","PRINS JOHAN WILLEM F","PRINS MAURITS","PROTEO","PUCCINI","PUCCINI","PUDU","PUMA","QUEEN PHENIX","QUEEN ZENOBIA","RAINA","RAINBOW ACE","RAINBOW HARMONY","RAINBOW LUCKY","RAS GHUMAYS I","REBECCA SCHULTE","REINHOLD SCHULTE","RENATE SCHULTE","RHODOS","RIG P16","RIO APURE","RIO ARAUCA","RIO CARONI","RIO GENOA","RIO ORINOCO","RIZOPON","ROBERT SCHULTE","ROSEANNE","ROYAL JADE","ROYAL SESA","RUDOLF SCHULTE","RUTH SCHULTE","S 8 E MILANO","SABREWING","SAKURA EXPRESS","SAKURA SYMPHONY","SAN DIEGO BRIDGE","SARAH SCHULTE","SCT CHILE","SCT PERU","SCT SANTIAGO","SCT VIETNAM","SCT ZURICH","SELMA","SENNA JUMBO","SENNA PRINCESS","SEVAN DRILLER","SFL AVON","SFL EUROPA","SFL FALCON","SFL HAWK","SFL HUNTER","SFL TIGER","SHAH","SHAHAMAH","SHANDONG CHONG WEN","SHANDONG HAI TONG","SICHEM RUBY","SIGAS MARGRETHE","SILVER FERN","SIMA SINGAPORE","SIMON SCHULTE","SIVIU","SMILEY LADY","SMIT IERLAND","SMIT MONTSERRAT","SOPHIA","SOPHIE SCHULTE","SP GAS 01","SP GAS 02","SS81 NORBE VI","STADT LUEBECK","STELLAR LIBERTY","STELLAR LILAC","STELLAR MAGIC","STELLAR NEPTUNE","STELLAR RIO","STELLAR SAMBA","STOC REGINA","SUAPE EXPRESS","SUN","SUSANNE SCHULTE","TAIJU","TARUCA","TATIANA SCHULTE","TEMBEK","TESEO","THAI HARVEST","THEKLA SCHULTE","TITAN ARIES","TMN PRIDE","TOPAZ EXPRESS","TRINE THERESA","TROUT","TRUST AGILITY","TRUST INTEGRITY","TZINI","UASC DOHA","UASC JUBAIL","UASC SAMARRA","ULTRA CORBITA","UMM AD DALKH","UMM AL ASHTAN","UMM AL LULU I","VALE CAOFEIDIAN","VALE CHINA","VALE DALIAN","VALE DONGJIAKOU","VALE HEBEI","VALE JIANGSU","VALE SHANDONG","VALENTINE","VALERIE SCHULTE","VERDI","VOS LISMORE","VOS RANGER","VOS SUPPORTER","VOS TIREE","VULCANO 489","WESER STAHL","WHITNEY","WILHELM SCHULTE","WINCANTON","WOOJN CHEMI","WORCESTER","XENA","XIAO YU","XIUMEI SHANGHAI","XIUMEI TIANJIN","YAMILAH III","YANGTZE STAR","YELENA","YM MARCH","YORK","ZEFYROS","ZEUS","ZIM BEIJING","ZIM ISTANBUL","ZIM SAVANNAH");
var port_names = new Array("Abidjan, Ivory Coast", "Accra, Ghana", "A Coruña, Spain", "Port of Albany-Rensselaer, New York, United States", "Bahía Blanca, Argentina", "Banana, Democratic Republic of the Congo", "Barranquilla, Colombia", "Belém, Brazil", "Bergen, Norway", "Bodø, Norway", "Port of Boston, Massachusetts, United States", "Botwood, Newfoundland and Labrador, Canada", "Bridgetown, Barbados", "Brunswick, Georgia, United States", "Buenos Aires, Argentina", "Calabar, Nigeria", "Cabinda, Angola", "Cádiz, Spain", "Port Canaveral, Florida, United States", "Cape May, New Jersey, United States", "Cape Town, South Africa", "Port of Casablanca, Morocco", "Cayenne, French Guiana, France", "Charleston, South Carolina, United States", "Colón, Panama", "Cork, Ireland", "Dakar, Senegal", "Douala, Cameroon", "Elizabeth, New Jersey, United States", "Ferrol, Spain", "Freeport, Bahamas", "Freetown, Sierra Leone", "Fortaleza, Brazil", "Galway, Ireland", "Georgetown, Guyana", "Port of Hafnarfjörður, Iceland", "Port of Halifax, Nova Scotia, Canada", "Hamilton, Bermuda", "Hampton Roads, Virginia, United States", "Harstad, Norway", "Huelva, Spain", "Jacksonville, Florida, United States", "Lagos, Nigeria", "Las Palmas de Gran Canaria, Canary Islands, Spain", "Libreville, Gabon", "Lisbon, Portugal", "Lomé, Togo", "Luanda, Angola", "Malabo, Equatorial Guinea", "Melford, Nova Scotia, Canada (proposed)", "Port of Miami, Florida, United States", "Monrovia, Liberia", "Montevideo, Uruguay", "Nantes, France", "Narvik, Norway", "Nassau, Bahamas", "Necochea, Argentina", "Port Newark, United States", "Port of New York and New Jersey, United States", "Paramaribo, Suriname", "Pecém, Brazil", "Port of Philadelphia, Pennsylvania, United States", "Port Everglades, Florida, United States", "Port Harcourt, Nigeria", "Portland, Maine, United States", "Porto, Portugal", "Porto Alegre, Brazil", "Punta Alta, Argentina", "Recife, Brazil", "Reykjavík, Iceland", "Rio de Janeiro, Brazil", "Salvador, Brazil", "San Juan, Puerto Rico, United States", "Santa Cruz de Tenerife, Canary Islands, Spain", "Port of Santos near São Paulo, Brazil", "Port of Savannah, Georgia, United States", "St. Augustine, Florida, United States", "Saint John, New Brunswick, Canada", "Sept-Îles, Quebec, Canada", "Setúbal, Portugal", "Sines, Portugal", "Stornoway, Scotland, United Kingdom", "Shannon/Foynes, Ireland", "St. John's, Newfoundland and Labrador, Canada", "Tangier, Morocco", "Tromsø, Norway", "Trondheim, Norway", "Port of Vigo, Spain", "Vitória, Brazil", "Walvis Bay, Namibia", "Wilmington, Delaware, United States", "Wilmington, North Carolina, United States", "Ålesund, Norway", "Paranaguá, Brazil", "São Francisco do Sul, Brazil", "Itajaí, Brazil", "Porto Velho, Brazil", "Santos, Brazil", "Itapoá, Brazil", "Ancona, Italy", "Port of Bar, Montenegro", "Bari, Italy", "Budva, Montenegro", "Port of Durrës, Albania", "Port of Koper, Slovenia", "Port of Pescara, Italy", "Port of Ploče, Croatia", "Port of Rijeka, Croatia", "Shën Gjin, Albania", "Port of Split, Croatia", "Port of Trieste, Italy", "Venice, Italy", "Port of Vlorë, Albania", "Ravenna, Italy", "Monfalcone, Italy", "Chioggia, Italy", "Porto Marghera, Italy", "Alexandroupolis, Greece", "Bodrum, Turkey", "Chalcis, Greece", "Chios, Greece", "Eleusina, Greece", "Heraklion, Crete, Greece", "İzmir, Turkey", "Kavala, Greece", "Kuşadası, Turkey", "Laurium, Greece", "Mytilene, Greece", "Piraeus, Greece", "Rhodes, Greece", "Thessaloniki, Greece", "Volos, Greece", "Azov, Russia", "Berdiansk, Ukraine", "Mariupol, Ukraine", "Taganrog, Russia", "Yeysk, Russia", "See: Ports of the Baltic Sea.", "Avilés, Spain", "Bayonne, France", "Burela, Spain", "Port of Bilbao, Spain", "Bordeaux, France", "Brest, France", "El Musel, Gijón, Spain", "Pasaia, Spain", "La Rochelle, France", "Les Sables-d'Olonne, France", "Santander, Spain", "Batumi, Georgia", "Bilhorod, Ukraine", "Burgas, Bulgaria", "Illichivsk, Ukraine", "Mangalia, Romania", "Midia, Năvodari, Romania", "Novorossiysk, Russia", "Odessa, Ukraine", "Poti, Georgia", "Port of Constanţa, Romania", "Giurgiulesti International Free Port, Moldova", "Port of Erdemir, Turkey", "Port of Varna, Bulgaria", "Samsun, Turkey", "Sevastopol, Ukraine", "Sukhumi, Georgia", "Trabzon, Turkey", "Yuzhny, Ukraine", "Barranquilla, Colombia", "Basse-Terre, Guadeloupe, France", "Belize City, Belize", "Bridgetown, Barbados", "Port of Cabo Rojo, Dominican Republic", "Cartagena, Colombia", "Chetumal, Mexico", "Colón, Panama", "Fort-de-France, Martinique, France", "La Guaira, Venezuela", "Guanta, Venezuela", "Guantánamo, Cuba", "Kingston, Jamaica", "Limón, Costa Rica", "Maracaibo, Venezuela", "Oranjestad, Aruba, Netherlands", "Pointe-à-Pitre, Guadeloupe, France", "Ponce, Puerto Rico, United States", "Port-au-Prince, Haiti", "Port Caucedo, Dominican Republic", "Port Rio Haina, Dominican Republic", "Port of Spain, Trinidad and Tobago", "Puerto Barrios, Guatemala", "Puerto Cabello, Venezuela", "Puerto Plata, Dominican Republic", "Puerto Castilla, Honduras", "Puerto Cortés, Honduras", "Roatán, Honduras", "Santiago de Cuba, Cuba", "Port of Santo Domingo, Dominican Republic", "Santo Tomás de Castilla, Guatemala", "Willemstad, Curaçao, Netherlands", "Baltimore, United States", "Norfolk, Virginia, United States", "Salisbury, Maryland, United States", "Caen (Ouistreham), France", "Calais, France", "Cherbourg, France", "Dieppe, France", "Port of Dover, United Kingdom", "Le Havre, France", "Port of London, United Kingdom", "Dunkerque(Duinkerken), France", "Newhaven, United Kingdom", "Ostend, Belgium", "St. Peter Port, Guernsey, United Kingdom", "Portland Harbour, United Kingdom", "Portsmouth, United Kingdom", "Plymouth, United Kingdom", "Ramsgate, United Kingdom", "Saint-Malo, France", "Shoreham-by-Sea, United Kingdom", "Port of Southampton, United Kingdom", "Buffalo, New York, United States", "Burns Harbor / Portage, Indiana, United States", "Port of Chicago, Illinois, United States", "Cleveland, Ohio, United States", "Detroit, Michigan, United States", "Duluth, Minnesota, United States", "Erie, Pennsylvania, United States", "Hamilton, Ontario, Canada", "Kingston, Ontario, Canada", "Milwaukee, Wisconsin, United States", "Port of Montreal, Canada", "Nanticoke, Ontario, Canada", "Oshawa, Ontario, Canada", "Port of Oswego Authority, New York, United States", "Thunder Bay, Ontario, Canada", "Two Harbors, Minnesota, United States", "Toledo, Ohio, United States", "Toronto, Ontario, Canada", "Sault Ste. Marie, Ontario, Canada", "Sault Ste. Marie, Michigan, United States", "Barrow-in-Furness, England", "Belfast, Northern Ireland", "Cairnryan, Scotland", "Cardiff, Wales", "Douglas, Isle of Man", "Drogheda, Ireland", "Dublin, Ireland", "Dún Laoghaire, Ireland", "Dundalk, Ireland", "Ellesmere, England", "Fishguard, Wales", "Fleetwood, England", "Garston, England", "Glasgow, Scotland", "Heysham, England", "Holyhead, Wales", "Larne, Northern Ireland", "Liverpool, England", "Milford Haven, Wales", "Mostyn, Wales", "Pembroke Dock, Wales", "Rosslare Europort, Ireland", "Runcorn, England", "Stranraer, Scotland", "Swansea, Wales", "Istanbul, Turkey", "İzmit, Turkey", "Tekirdağ, Turkey", "Adana, Turkey", "Alexandria, Egypt", "Algeciras, Spain", "Al Hoceima, Morocco", "Algiers, Algeria", "Almería, Spain", "Antalya, Turkey", "Port of Ashdod, Israel", "Barcelona, Spain", "Bardia, Libya", "Beirut, Lebanon", "Benghazi, Libya", "Cagliari, Sardinia, Italy", "Cartagena, Spain", "Ceuta, Spain", "Chalcis, Greece", "Civitavecchia, Italy", "Corinth, Greece", "Datca, Turkey", "Fethiye, Turkey", "Genoa, Italy", "Gibraltar (British Overseas Territory)", "Gioia Tauro, Italy", "Grand Harbour, Malta", "Iskenderun, Turkey", "Port of Haifa, Israel", "Larnaca, Cyprus", "Latakia, Syria", "Leghorn, Italy", "Limassol, Cyprus", "Málaga, Spain", "Marmaris, Turkey", "Marseille, France", "Melilla, Spain", "Mersa Matruh, Egypt", "Mersin, Turkey", "Messina, Sicily, Italy", "Misrata, Libya", "Nador, Morocco", "Naples, Italy", "Oran, Algeria", "Palma de Mallorca, Spain", "Palermo, Sicily, Italy", "Patras, Greece", "Piombino, Italy", "Piraeus, Greece", "Port Said, Egypt", "Sidon, Lebanon", "Tangier, Morocco", "Tarragona, Spain", "Tel Aviv, Israel", "Thessaloniki, Greece", "Tétouan, Morocco", "Tripoli, Lebanon", "Tripoli, Libya", "Tunis, Tunisia", "Valencia, Spain", "Port of Beaumont, Texas, United States", "Campeche, Mexico", "Ciudad del Carmen, Mexico", "Coatzacoalcos, Veracruz, Mexico", "Port Corpus Christi, Texas, United States", "Galveston, Texas, United States", "Gulfport, Mississippi, United States", "Havana, Cuba", "Port of Houston, Texas, United States", "Intracoastal City, Louisiana, United States", "Lake Charles, Louisiana, United States", "Louisiana Offshore Oil Port, Louisiana, United States", "Matamoros, Tamaulipas, Mexico", "Matanzas, Matanzas, Cuba", "Port of Mobile, Alabama, United States", "Port of New Orleans, Louisiana, United States", "Panama City, Florida, United States", "Pensacola, Florida, United States", "Plaquemines Port, Louisiana, United States", "Port Fourchon, Louisiana, United States", "Progreso, Mexico", "Port of Tampa, United States", "Tampico, Tamaulipas, Mexico", "Veracruz, Veracruz, Mexico", "See also: List of North Sea ports", "Aberdeen, Scotland, United Kingdom", "Port of Amsterdam, Netherlands", "Port of Antwerp, Belgium", "Blyth, England, United Kingdom", "Bremerhaven, Germany", "Bremen, Germany", "Port of Bruges-Zeebrugge, Belgium", "Cuxhaven, Germany", "Delfzijl, Netherlands", "Dundee, Scotland, United Kingdom", "Eemshaven, Netherlands", "Emden, Germany", "Esbjerg, Denmark", "Port of Felixstowe, United Kingdom", "Flotta, Scotland, United Kingdom", "Port of Ghent, Belgium", "Gothenburg, Sweden", "Grimsby, United Kingdom", "Port of Hamburg, Germany", "Harwich International Port, England, United Kingdom", "Immingham, England, United Kingdom", "Hull, England, United Kingdom", "Kristiansand, Norway", "Leith, Scotland, United Kingdom", "Port of London, England, United Kingdom", "Middlesbrough, England, United Kingdom", "Newcastle, England, United Kingdom", "Oostende, Belgium", "Oslo, Norway", "Port of Rotterdam, Netherlands & Europoort", "Stavanger, Norway", "Terneuzen, Netherlands", "Sullom Voe, Scotland, United Kingdom", "Sunderland, England, United Kingdom", "Thamesport, Isle of Grain, England, United Kingdom", "Port of Tilbury, England, United Kingdom", "Vlissingen, Netherlands", "Wilhelmshaven, Germany & JadeWeserPort", "Ålesund, Norway", "Copenhagen, Denmark", "Helsingborg, Sweden", "Malmö, Sweden", "Montreal, Quebec, Canada", "Quebec City, Quebec, Canada", "Trois-Rivières, Quebec, Canada", "Bécancour, Quebec, Canada", "Pedernales, Venezuela", "Point Lisas, Trinidad and Tobago", "Port of Spain, Trinidad and Tobago", "Scarborough, Trinidad and Tobago - since 1991", "Civitavecchia, Italy", "Naples, Italy", "Livorno, Italy", "Akureyri, Iceland", "Arkhangelsk, Russia", "Barrow, Alaska, United States", "Belomorsk, Russia", "Churchill, Manitoba, Canada", "Dikson, Russia", "Dudinka, Russia", "Hammerfest, Norway", "Honningsvåg, Norway", "Kandalaksha, Russia", "Igarka, Russia", "Kirkenes, Norway", "Murmansk, Russia", "Naryan-Mar, Russia", "Severomorsk, Russia", "Tiksi, Russia", "Pevek, Russia", "Prudhoe Bay, Alaska, United States", "Vardø, Norway", "Vitino, Russia", "Adelaide, South Australia, Australia", "Jawaharlal Nehru Port Trust, Navi Mumbai, Maharashtra, India", "Cochin, Kerala, India", "Colombo, Sri Lanka", "Port of Madras, Tamil Nadu, India", "Durban, South Africa", "Eyl, Somalia", "Fremantle, Western Australia, Australia", "Haldia, West Bengal, India", "Hobyo, Somalia", "Jakarta, Indonesia", "Kakinada, Andhra Pradesh, India", "Kandla, Gujarat, India", "Kismaayo, Somalia", "Krishnapatnam, Andhra Pradesh, India", "Las Khorey, Somalia", "Mundra, Gujarat, India", "Mareeg, Somalia", "Mangalore, Karnataka, India", "Machilipatnam, Andhra Pradesh, India", "Maputo, Mozambique", "Merca, Somalia", "Mogadishu, Somalia", "Port of Karachi, Sindh, Pakistan", "Port of Mumbai, Maharashtra, India", "Paradeep, Odisha, India", "Portland, Victoria, Australia", "Port Hedland, Western Australia, Australia", "Port Elizabeth, South Africa", "Port Lincoln, South Australia, Australia", "Port Louis, Mauritius", "Port Pirie, South Australia, Australia", "Port Blair, Andaman & Nicobar Islands, India", "Ras Kamboni, Somalia", "Richards Bay, South Africa", "Mombasa, Kenya", "Visakhapatnam, Andhra Pradesh, India", "Port of Kolkata, West Bengal, India", "Tuticorin, Tamil Nadu, India", "Aden, Yemen", "Berbera, Somalia", "Bosaso, Somalia", "Mukalla, Yemen", "Port of Djibouti, Djibouti", "Qandala, Somalia", "Zeila, Somalia", "Gwadar Port, Gwadar, Balochistan, Pakistan", "Karachi Port, Karachi, Sindh, Pakistan", "Keti Bandar, Sindh, Pakistan", "Port Qasim, Sindh, Pakistan", "Port of Ormara, Ormara, Balochistan, Pakistan", "Port of Pasni, Pasni, Balochistan, Pakistan", "Mundra Port, Gujarat, India", "New Mangalore port, Karnataka, India", "INS Kadamba, Karnataka, India", "INS Dweeprakshak, Lakshadweep, India", "INS Dronacharya, Kerala, India", "INS Vajrabahu, Maharashtra, India", "INS Venduruthy, Kerala, India", "Cochin Port, Kerala, India", "Kandla Port, Gujarat, India", "Mormugão, Goa, India", "Jawaharlal Nehru Port Trust, Navi Mumbai, Maharashtra, India", "Al Duqm Port & Drydock, Duqm, Al Wusta Region, Oman", "Port of Salalah, Salalah, Dhofar Governorate, Oman", "Port of Bushehr, Bushehr Province, Iran", "Bandar-Abbas, Hormozgan, Iran", "Chennai, Tamil Nadu, India", "Cuddalore, Tamil Nadu, India", "Chittagong Port, Chittagong Bangladesh", "Ennore, Tamil Nadu, India", "Kakinada, Andhra Pradesh, India", "Karaikal, Puducherry, India", "Krishnapatnam Port, Andhra Pradesh, India", "Machilipatnam, Andhra Pradesh, India", "Mongla Port, Khulna, Bangladesh", "Nagapattinam, Tamil Nadu, India", "Paradeep, Odisha, India", "Tuticorin, Tamil Nadu, India", "Visakhapatnam, Andhra Pradesh, India", "Gangavaram Port, Visakhapatnam, Andhra Pradesh, India", "Dhamra, Odisha, India", "Gopalpur, Odisha, India", "Haldia, West Bengal, India", "Port of Kolkata, West Bengal, India", "Johor Port, Malaysia", "Port Klang, Malaysia", "Northport", "West Port", "Southpoint", "Penang, Malaysia", "Port of Singapore, Singapore", "Tanjung Langsat Port, Johor, Malaysia", "Port of Tanjung Pelepas, Malaysia", "Yangon, Myanmar", "Port of Chabahar, Iran", "Port Sultan Qaboos, Muttrah, Muscat Governorate, Oman", "Port of Sohar, Sohar, Dhofar Governorate, Oman", "Khawr Fakkan, Sharjah, UAE", "Gwadar Port, Balochistan, Pakistan", "Chingari Port, Sindh, Pakistan", "Bandar Abbas, Iran", "Bandar Imam Khomeini, Iran", "Dammam, Saudi Arabia", "Doha, Qatar", "Dubai, UAE", "Hamriyah Port, Sharjah, UAE", "Khafji, Saudi Arabia", "Khobar, Saudi Arabia", "Shuwaikh port, Kuwait", "Jebel Ali, Dubai, UAE", "Jubail, Saudi Arabia", "Khalifa Bin Salman Port, Hidd, Bahrain", "Mina Salman Port, Manama, Bahrain", "Ras Tanura, Saudi Arabia", "Geelong, Victoria, Australia", "Port of Melbourne, Australia", "Aqaba, Jordan", "Ain Sokhna, Egypt", "Asseb, Eritrea", "Djibouti City, Djibouti", "Dubai, United Arab Emirates", "Port of Eilat, Israel", "Farasan (city), Saudi Arabia", "Hurghada, Egypt", "Jeddah, Saudi Arabia", "Jizan, Saudi Arabia", "Massawa, Eritrea", "Port Sudan, Sudan", "Rabigh, Saudi Arabia", "Suez, Egypt", "Yanbu, Saudi Arabia", "Acapulco, Mexico", "Antofagasta, Chile", "Auckland, New Zealand", "Aurora, Philippines", "Buenaventura, Colombia", "Cabo San Lucas, Mexico", "Cagayan Freeport, Philippines", "Caldera, Puntarenas, Costa Rica", "Callao, Peru", "Corinto, Nicaragua", "Coquimbo, Chile", "Port of Davao, Philippines", "Port of Ensenada, Mexico", "Eureka, California, United States on Humboldt Bay", "Fraser Port, British Columbia, Canada", "Guayaquil, Ecuador", "Port of Hong Kong, People's Republic of China", "Honolulu, Hawaii, United States", "Iquique, Chile", "Port of Kobe, Japan", "Legazpi, Philippines", "Port of Long Beach, California, United States", "Port of Los Angeles, California, United States", "Lyttelton, New Zealand", "Napier, New Zealand See also: Port of Napier", "Mazatlán, Mexico", "Panama City, Panama", "Port Chalmers, New Zealand", "Port Hueneme, California, United States", "Puerto Montt, Chile", "Port of Napier, New Zealand", "Port of Prince Rupert, British Columbia, Canada", "Puerto Vallarta, Mexico", "San Antonio, Chile", "San Lorenzo, Honduras", "Port of San Diego, California, United States", "Surigao, Philippines", "Tabaco, Philippines", "Talcahuano, Chile", "Tauranga, New Zealand", "Timaru, New Zealand", "Valparaíso, Chile", "Wellington, New Zealand", "Port of Yokohama, Japan", "Sai Gon New Port, Ho Chi Minh City, Viet Nam", "Port of Longview, Washington, United States", "Port of Portland, Oregon, United States", "Puerto Williams, Chile", "Punta Arenas, Chile", "Ushuaia, Argentina", "Sacramento, California, United States", "Port of Anchorage, Alaska, United States", "Juneau, Alaska, United States", "Darwin, Northern Territory, Australia", "Nome, Alaska, United States", "Tianjin, People's Republic of China", "Dongying, People's Republic of China", "Qinhuangdao, People's Republic of China", "Jinzhou, People's Republic of China", "Yingkou, People's Republic of China", "Hangu, People's Republic of China", "Weipa, Queensland, Australia", "Bundaberg, Queensland, Australia", "Port of Brisbane, Queensland, Australia", "Gladstone, Queensland, Australia", "Hay Point, Queensland, Australia", "Port Moresby, Papua New Guinea", "Townsville, Queensland, Australia", "Ningbo, People's Republic of China", "Kaohsiung, Taiwan", "Keelung, Taiwan", "Bangkok, Thailand", "Laem Chabang, Thailand", "Sihanoukville Autonomous Port, Kingdom of Cambodia", "Dalian, People's Republic of China", "Lushun/Lushunkou, People's Republic of China", "Namp'o, North Korea", "Sinǔiju, North Korea", "Chongqing, People's Republic of China", "Port of Shanghai, People's Republic of China", "Wuhan, People's Republic of China", "Port of Pichilingue/La Paz, Mexico (UNESCO Whale Sanctuary and Bio-Reserve)", "Port of Busan, South Korea", "Rason, North Korea", "Hungnam, North Korea", "Gangneung, South Korea", "Nakhodka, Russia", "Vladivostok, Russia", "Vostochny, Russia", "Wonsan, North Korea", "Port of Bellingham, Washington, United States", "Port of Everett, Washington, United States", "Port of Seattle, Washington, United States", "Surrey, British Columbia, Canada", "Port of Tacoma, Washington, United States", "Port of Vancouver, British Columbia, Canada", "Victoria, British Columbia, Canada", "Port of Oakland, California, United States", "Port of Redwood City, Redwood City, California, United States", "Richmond, California, United States", "San Francisco, California, United States", "Vallejo, California, United States", "Stockton, California, United States", "Pittsburg, California, United States", "Batangas, Philippines", "Quy Nhon Port, Vietnam", "Cam Ranh, Vietnam", "Cebu, Philippines", "Da Nang Port, Vietnam", "Hai Phong Port, Vietnam", "Iloilo, Philippines", "Ka-Ho, Macau (People's Republic of China)", "Kemaman Port, Terengganu, Malaysia", "Ho Chi Minh City (Saigon port), Vietnam", "Port of Kaohsiung, Republic of China (Taiwan)", "Kota Kinabalu, Sabah, Malaysia", "Kuantan Port, Pahang, Malaysia", "Kuching Port, Sarawak, Malaysia", "Miri Port, Sarawak, Malaysia", "Rejang Port, Sarawak, Malaysia", "Bintulu Port, Sarawak, Malaysia", "Kwai Chung, Hong Kong, People's Republic of China", "Port of Manila, Philippines", "Muara Port, Brunei", "Puerto Princesa, Philippines", "Port of Shenzhen, Guangdong, People's Republic of China", "Subic Bay, Philippines", "Tuen Mun, Hong Kong People's Republic of China", "Van Phong Port, Vietnam", "Vung Tau Port, Vietnam", "Yantian, Shenzhen, Guangdong, People's Republic of China", "Zamboanga, Philippini", "Thi Nai Port, Vietnam", "Port of Guangzhou, Guangdong, People's Republic of China", "Botany Bay (Port Botany), New South Wales, Australia* Hobart, Tasmania, Australia", "Nelson, New Zealand", "Newcastle, New South Wales, Australia", "New Plymouth, New Zealand", "Port Jackson (Sydney Harbour), New South Wales, Australia", "Port Kembla, New South Wales, Australia", "Haenam, South Korea", "Port of Incheon, South Korea", "Qingdao, People's Republic of China", "Rizhao, People's Republic of China", "Tianjin, People's Republic of China", "Weihai, People's Republic of China");
var port_lat = new Array(5.336318, 5.5557169, 38.3565113, 42.620487, -38.711678 , -5.9871641, 10.9642103, -1.4550205, 60.3912628, 67.2803556, 42.3636, 49.1422983, 13.098938, 31.1499528, -34.6037232, 4.95, -5.556549, 36.5270612, 28.4103506, 38.9351125, -33.9248685, 33.6, 4.9227, 32.7765656, 9.358577, 51.8968917, 14.7645042, 4.047486, 40.6639916, 43.489646, 26.5284722, 8.484146, -3.7183943, 53.2705588, 6.804611, 64.066667 , 44.637025, 32.294816, 36.9742857, 68.7986342, 37.261421, 30.3321838, 6.441158, 28.1131545, 0.390841, 38.7252993, 6.1377778, -8.8383333, 3.75, 45.87333, 25.7741667, 6.300774, -34.8836111, 47.218371, 68.4384984, 25.06, -38.5544968, 40.6942691, 40.8410539, 5.823201, -23.5929886, 39.8749715, 26.0860222, 4.784821, 43.661471, 41.1566892, -30.0277041, -38.8760605, -8.0542775, 64.135338, -22.9035393, -12.9703817, 30.2820379, 28.4636296, -15.6176973, 32.1256519, 29.8942639, 45.2733153, 50.2132968, 38.5260437, 37.9571555, 58.209435, 52.6078189, 47.5605413, 35.7666667, 69.8178242, 63.4305149, 42.229644, -20.3153602, -22.948601, 39.7458333, 34.2257255, 63.336782, -25.5204691, -26.2421768, -26.9082576, -8.7618253, -23.9618356, -26.1173635, 43.6158299, 42.0874617, 41.1171432, 42.2880556, 41.3097222, 45.4724999, 42.4705556, 43.05, 45.332358, 41.814244 , 43.505079, 45.8206774, 45.4408474, 40.471882, 44.4183598, 45.8050468, 45.2198654, 45.443093, 40.8457193, 37.035339, 38.4109234, 38.3709813, 38.0842373, 35.3387352, 38.41885, 40.937607, 37.862209, 37.720531, 39.0724564, 37.9451893, 36.163149, 40.6393495, 39.3621896, 47.1, 46.758369, 47.097133, 47.2333333, 46.7, 54.4, 43.5579523, 43.492949, 43.659684, 43.3359773, 44.837789, 48.390394, 43.5541569, 43.3254703, 46.160329, 46.492958, 43.4623057, 41.6386111, 46.1833333, 42.5047926, 46.3055, 43.8172222, 44.3247768, 44.7166667, 46.484583, 42.150879, 44.0962, 45.483333 , 41.25, 43.231944, 41.292782, 44.61665, 43.00732, 41.00145, 47.3352415, 10.9642103, 15.998761, 17.497713, 13.098938, 17.896700 , 10.41373, 18.5001889, 9.358577, 14.609371, 10.6, 10.2333333, 20.143030 , 17.992731, 9.989424, 10.64504, 12.52458, 16.2411, 18.0074858, 18.539269, 18.425741 , 18.427990 , 10.6666667, 15.7166667, 10.4666667, 19.7807686, 16.0166667, 15.8486382, 16.3833333, 20.028891, 18.469, 15.6888889, 12.108129 , 39.2903848, 36.8507689, 38.3606736, 49.285216, 50.95129, 49.639093, 49.922992, 51.1191667, 49.49437, 51.5, 51.0377592, 50.79307, 51.2166667, 49.460563, 50.5710791, 50.8166667, 50.3754565, 51.335545, 48.649337, 50.8342086, 50.8965, 42.8864468, 41.6258708, 42.1946839, 41.4994954, 42.331427, 46.7866719, 42.1292241, 43.2500208, 44.2311717, 43.0389025, 45.553, 42.80907, 43.8970929, 43.4638418, 48.3808951, 47.0227111, 41.6639383, 43.653226, 46.521858, 46.4952996, 54.108967, 54.597285, 54.974253, 51.481581, 54.151971, 53.717856, 53.3498053, 53.29279, 53.9979451, 52.906718, 51.993927, 53.916661, 51.681598, 55.864237, 54.04199, 53.309441, 54.8575, 53.4083714, 51.714306, 53.312985, 51.691894, 52.2555556, 53.342078, 54.903367, 51.62144, 41.00527, 40.775986, 40.9833333, 37, 31.2000924, 36.1329769, 35.249299, 36.752887, 36.834047, 36.88414, 31.8238972, 41.3850639, 31.7579946, 33.8886289, 32.1166667, 39.2238411, 37.6256827, 35.8883838, 38.4109234, 42.0924982, 37.9386365, 36.7283, 36.618561, 44.4056499, 36.140751, 38.4262258, 35.8922222, 36.586863, 32.825, 34.9166667, 35.52145, 43.5293029, 34.7071301, 36.721261, 36.8505659, 43.296482, 35.2922775, 31.3543445, 36.8, 38.1938137, 32.374298, 35.1666667, 40.8517746, 35.6969444, 39.57119, 38.1156879, 38.2466395, 42.9256335, 37.9451893, 31.2652893, 33.5626094, 35.7666667, 41.1190191, 32.066158, 40.6393495, 35.57621, 34.4380941, 32.876174, 36.81881, 39.4699075, 30.0787508, 19.8301251, 18.64235, 18.140587, 27.8037778, 29.3013479, 30.3674198, 23.1168, 29.729997, 29.7843773, 30.2265949, 31.2448234, 25.8690294, 23.0511111, 30.6305977, 29.9369445, 30.1588129, 30.421309, 30.3596155, 29.1058333, 21.285215, 27.8636354, 22.2944797, 19.173773, 26.594475 , 57.149717, 52.412, 51.1879764, 55.126957, 53.548243, 53.0792962, 51.330074, 53.8632464, 53.3310272, 56.462018, 53.4475, 53.3594029, 55.476466, 51.9725345, 58.8314357, 51.1058333, 57.70887, 53.567471, 53.5461111, 51.9474132, 53.614012, 53.7456709, 58.1475779, 55.975117, 51.5, 54.574227, 54.978252, 51.2166667, 59.9138688, 51.9433333, 58.9699756, 51.3322854, 60.467541, 54.906869, 51.44322, 51.4572556, 51.4536672, 53.5815383, 63.336782, 55.6760968, 56.0464674, 58.9202065, 45.5086699, 46.8032826, 46.3432397, 46.3506215, 10.423219, 10.4056994, 10.6666667, 54.283113, 42.0924982, 40.8517746, 43.548473, 65.683868, 64.5333333, 71.2905556, 64.5252778, 58.7684112, 73.5, 69.4, 70.6634382, 70.9822909, 67.1700511, 67.4666667, 69.7269192, 68.9568301, 67.6710067, 69.0666667, 71.6333333, 69.7, 70.2556453, 61.2242696, 59.6532661, -34.9286212, 18.9012293, 9.9312328, 6.9270786, 13.08441, -29.857876, 7.9807996, -32.0560399, 22.060459, 5.3515922, -6.211544, 16.945181, 23.0333, -0.3602778, 14.2886008, 11.161257, 22.839254, 3.7613889, 12.9141417, 16.18438, -25.9666667, 1.7148333, 2.0333333, 24.84, 18.938096, 20.3167, -38.3463453, -20.3116266, -33.93264, -34.7195321, -20.165279, -33.1770846, 11.6233774, -1.6366667, -28.7807276, -4.0434771, 17.6868159, 22.5377872, 8.7641661, 12.8, 10.4333333, 11.2833333, 14.5301509, 11.5965129, 11.4720137, 11.3527778, 25.1322572, 24.84, 24.1299447, 24.8075944, 25.2016966, 25.2666667, 22.789387, 12.9441595, 14.7845817, 10.0760115, 9.929331, 19.7514798, 9.944722, 9.962765, 23.0130714, 15.4, 18.9012293, 19.6616667, 17.013870 , 27.383959, 27.1833333, 13.0524139, 11.749574, 22.303366, 13.2065203, 16.945181, 10.9254398, 14.2545822, 16.18438, 22.4888889, 10.7688016, 20.3167, 8.7641661, 17.6868159, 17.6166667, 20.79685, 19.258288, 22.060459, 22.5377872, 1.6628038, 3.004169, 33.229007, 56.3187356, 30.2496862, 5.2632341, 1.2657526, 1.366767, 1.366767, 16.8, 25.0685696, 23.6280556, 23.592427 , 25.3333333, 25.1322572, 25.8943018, 27.1833333, 30.4355556, 26.3926665, 25.280282, 25.271139, 25.296988, 28.4166667, 26.2833333, 29.3484875, 25.009011, 27.012563, 26.212634 , 26.2166667, 26.65, -38.15, -37.849839, 29.5319199, 29.6325617, 13.0166667, 11.588, 25.271139, 29.532118, 16.6960349, 27.2578957, 21.5433333, 16.89192, 15.6091667, 19.6166667, 22.8, 29.9668343, 24.0867, 16.863794, -23.65, -36.8484597, 16.9919444, 3.886611, 22.8905327, 14.8507059, 9.914756, -12.0333333, 12.4598, -29.9533, 5.4126399, 31.8508333, 40.8020712, 49.269247, -2.203816, 22.343651 , 21.3069444, -20.2167, 34.6369456, 13.1390621, 33.754185, 33.7291858, -43.6032583, -39.4928444, 23.2361111, 8.9942689, -45.8158966, 34.1807285, -41.4717, -39.4738444, 54.3150367, 20.615845, -33.583647, 13.4326204, 32.732312, 9.7571312, 13.3240963, -36.723928, -37.6877975, -44.3969718, -33.045646, -41.2864603, 35.4533736, 10.8230989, 46.106328, 45.6420869, -54.9333, -53.154478, -54.8019121, 38.5815719, 61.239432, 58.3019444, -12.4628271, 64.5011111, 39.148352, 37.434751 , 39.935377 , 40.836407, 40.667012 , 34.864871 , -12.6591475, -24.8649629, -27.384896, -23.8487083, -21.3055785, -9.481553, -19.2576268, 30.181462, 23.0108714, 25.1089809, 13.7278956, 13.1040552, 10.6455, 39.051425, 38.851705, 38.7333333, 40.100000 , 29.583755, 31.230416 , 30.540173, 24.070088 , 35.1795543, 42.4004569, 39.8554302, 37.751853, 42.8166667, 43.1666667, 54.4011111, 39.1475, 47.4804411, 47.9522595, 47.613886, 49.186495, 47.2602778, 49.1509048, 48.4284207, 37.7958226, 37.5132701, 37.9357576, 37.7749295, 38.1040864, 37.9577016, 38.0279762, 13.7572111, 13.9530785, 11.9088, 10.3156992, 16.0439678, 20.8230183, 10.7201501, 22.130000 , 4.5373209, 10.8225, 22.6133333, 5.976474, 3.966689, 1.55, 3.7369444, 2.5574285, 3.2666667, 22.3618749, 14.586937, 5.033333 , 9.9672163, 22.543099 , 14.7910576, 22.3908295, 12.671, 10.386, 22.570176, 14.6396049, 13.779, 23.129163 , -42.881903, -41.2706319, -32.926689, -39.0556253, -33.8524919, -34.4800735, 34.5732516, 37.4562557, 36.0569723, 35.416377 , 39.148352, 37.4233148);
var port_lng = new Array(-4.027751, -0.196306, -0.5047597, -73.7617595, -62.268078 , 12.3893488, -74.7970435, -48.5023682, 5.3220544, 14.404916, -71.0366019, -55.3440853, -59.613352, -81.4914894, -58.3815931, 8.325, 12.18984, -6.2885962, -80.6188156, -74.9060053, 18.4240553, -7.6166667, -52.3269, -79.9309216, -79.900015, -8.4863157, -17.3660286, 9.706374, -74.2107006, -8.2193451, -78.6965833, -13.22867, -38.5433948, -9.0566677, -58.154831, -21.950000 , -63.5680528, -64.781375, -76.367036, 16.5414503, -6.9447224, -81.655651, 3.417977, -15.4408832, 9.453644, -9.1500364, 1.2125, 13.2344444, 8.7833333, -61.259494, -80.1711111, -10.79716, -56.1819444, -1.553621, 17.4272612, -77.345, -58.7396088, -74.1323653, -74.0668764, -55.16788, -46.6061911, -75.2490713, -80.1152861, 7.005453, -70.2553259, -8.6239254, -51.2287346, -62.074089, -34.8812561, -21.89521, -43.2095869, -38.512382, -81.7483969, -16.2518467, -56.1295552, -81.1501295, -81.3132083, -66.0633081, -66.3757921, -8.8909328, -8.8608907, -6.3848692, -9.0965766, -52.7128315, -5.8, 18.7819365, 10.3950528, -8.7425717, -40.3017673, 14.50882, -75.5466667, -77.9447102, 8.486738, -48.5094856, -48.6356473, -48.6626023, -63.90196, -46.3322474, -48.6167637, 13.518915, 19.0839592, 16.8718715, 18.8425, 19.4572222, 13.616389, 14.2338889, 17.4333333, 14.421358, 19.591770 , 16.442156, 13.485314, 12.3155151, 19.490219, 12.2035294, 13.5331727, 12.2790144, 12.232826, 25.873962, 27.43029, 23.5490415, 26.1363457, 23.5371368, 25.1442126, 27.12872, 24.412866, 27.263729, 24.0463999, 26.5491893, 23.6502213, 27.9717606, 22.9446064, 22.942159, 39.4166667, 36.8080659, 37.543367, 38.9, 38.2833333, 18.65, -5.9246653, -1.474841, -7.360355, -3.0234624, -0.57918, -4.486076, -5.6808278, -1.9301396, -1.151139, -1.795493, -3.8099803, 41.6372222, 30.3333333, 27.4626361, 30.662245, 28.5827778, 28.6164987, 37.7666667, 30.7326, 41.667751, 28.6586807, 28.200000 , 35.4666667, 27.825278, 36.33128, 33.525367, 40.989151, 39.7177999, 43.4257465, -74.7970435, -61.725646, -88.186654, -59.613352, -71.652428 , -75.5335769, -88.296146, -79.900015, -61.07256, -66.9330556, -64.6, -75.209007 , -76.7920089, -83.037394, -71.637154, -70.026459, -61.5331, -66.5761989, -72.336408, -69.630833 , -70.015330 , -61.5166667, -88.5833333, -68.0166667, -70.6871091, -85.9666667, -87.9383822, -86.4, -75.828987, -69.883, -68.930206, 999 , -76.6121893, -76.2858726, -75.5993692, -0.248206, 1.858686, -1.625298, 1.077483, 1.3294444, 0.107929, 0.05, 2.3718803, 0.045574, 2.9, -2.533856, -2.4526813, -1.0833333, -4.1426565, 1.419895, -2.025674, -0.2715558, -1.3968, -78.8783689, -87.1333676, -87.9306256, -81.6954088, -83.0457538, -92.1004852, -80.085059, -79.8660914, -76.4859544, -87.9064736, -73.5265, -80.082283, -78.8657912, -76.5103858, -89.2476823, -91.6707322, -83.555212, -79.3831843, -84.3460896, -84.3453169, -3.218894, -5.93012, -5.024587, -3.17909, -4.485244, -6.3560985, -6.2603097, -6.1419369, -6.405957, -2.900338, -4.975989, -3.035673, -0.391206, -4.251806, -2.894475, -4.633038, -5.80986, -2.9915726, -5.042697, -3.267343, -4.943763, -6.3344444, -2.729673, -5.024055, -3.943646, 28.97696, 29.948357, 27.5166667, 35.3213333, 29.9187387, -5.453909, -3.937112, 3.042048, -2.4637136, 30.70563, 34.6471028, 2.1734035, 25.0792189, 35.4954794, 20.0666667, 9.1216613, -0.9965839, -5.3246356, 23.5490415, 11.7956811, 22.9322383, 27.6869, 29.116751, 8.946256, -5.353585, 15.8988669, 14.5127778, 36.172571, 35.0002778, 33.6333333, 35.7924, 10.3722477, 33.0226174, -4.4212655, 28.255586, 5.36978, -2.9380973, 27.2373159, 34.6333333, 15.5540152, 15.09492, -2.9333333, 14.2681244, -0.6330556, 2.646634, 13.3612671, 21.734574, 10.5258891, 23.6502213, 32.3018661, 35.3687268, -5.8, 1.2452119, 34.777819, 22.9446064, -5.368435, 35.8308371, 13.187507, 10.16596, -0.3762881, -94.0914849, -90.5349087, -91.829361, -94.4343817, -97.3931556, -94.7976958, -89.0928155, -82.388557, -95.272407, -92.1562386, -93.2173758, -92.1450245, -97.5027376, -81.5752778, -88.1898159, -90.0620461, -85.6602058, -87.2169149, -91.2607045, -90.1944444, -89.661768, -82.5267625, -97.8534153, -96.1342241, 56.471993 , -2.094278, 4.8079, 4.4518558, -1.510277, 8.582657, 8.8016937, 3.20137, 8.6930424, 6.9244598, -2.970721, 6.8013889, 7.2060095, 8.459405, 1.3272758, -3.1198657, 3.74, 11.97456, -0.080784, 9.9661111, 1.2554682, -0.215913, -0.3367413, 7.9966267, -3.166243, 0.05, -1.234956, -1.61778, 2.9, 10.7522454, 4.1425, 5.7331073, 3.8324265, -1.257156, -1.383801, 0.68585, 0.3523508, 3.5709125, 8.1291565, 8.486738, 12.5683371, 12.6945121, 14.0300394, -73.5539925, -71.242796, -72.5432834, -72.4350552, -70.198013, -61.4630653, -61.5166667, -0.399752, 11.7956811, 14.2681244, 10.3105674, -18.11046, 40.5333333, -156.7886111, 34.7658333, -94.164964, 80.5333333, 86.1833333, 23.6819665, 25.9702074, 32.4229656, 86.5833333, 30.0450432, 33.066412, 53.1078339, 33.4166667, 128.85, 170.3166667, -148.3384293, 10.5037755, 29.7159763, 138.5999594, 72.9753984, 76.2673041, 79.861243, 80.2899, 31.027581, 49.8150661, 115.7471797, 88.109748, 48.5249751, 106.845172, 82.238647, 70.2167, 42.5487778, 80.1248476, 48.197073, 69.721081, 47.2991667, 74.8559568, 81.134933, 32.5833333, 44.77, 45.35, 66.98, 72.835831, 86.6167, 141.6042096, 118.5752577, 25.56995, 135.8574623, 57.49638, 138.0100573, 92.7264828, 41.5861667, 32.0382856, 39.6682065, 83.2184815, 88.3043389, 78.1348361, 45.0333333, 45.0166667, 49.1833333, 49.1354935, 43.106257, 49.8739267, 43.4736111, 62.3249859, 66.98, 67.453141, 67.4043578, 64.6502762, 63.4666667, 69.7034159, 74.8168994, 75.1713767, 73.6303446, 76.2547399, 75.7138884, 76.272499, 76.2747035, 70.1813018, 73.8, 72.9753984, 57.7047222, 54.092270 , 52.735516, 56.2666667, 80.2508246, 79.763822, 91.7919034, 80.3185252, 82.238647, 79.8380056, 80.109357, 81.134933, 89.5952778, 79.8394266, 86.6167, 78.1348361, 83.2184815, 83.2333333, 86.907043, 84.905743, 88.109748, 88.3043389, 103.6782433, 101.4133759, -87.5772293, -3.0205991, -81.6007655, 100.4846227, 103.8050108, 103.551335, 103.551335, 96.15, 61.4170251, 58.5677778, 58.545589 , 56.35, 62.3249859, 68.5247149, 56.2666667, 49.1055556, 49.9777136, 51.522476, 55.307485, 55.333879, 48.5, 50.2, 47.9157145, 55.073967, 49.658128, 50.674188 , 50.5833333, 50.1666667, 144.35, 144.9650952, 35.0060842, 32.3300171, 42.7333333, 43.145, 55.307485, 34.941501, 42.1226825, 33.8116067, 39.1727778, 42.549751, 39.4452778, 37.2166667, 39.0333333, 32.5498069, 38.058552, -99.881614, -70.4, 174.7633315, 121.6369444, -77.070229, -109.9167371, 120.2649261, -84.7119632, -77.1333333, -87.046997, -71.3436, 125.426504, -116.6263889, -124.1636729, -122.758905, -79.897453, 114.282972, -157.8583333, -70.142223, 135.2288408, 123.7437995, -118.216458, -118.262015, 172.7193227, 176.9120178, -106.4152778, -79.518792, 170.6213504, -119.208159, -72.9369, 176.9048041, -130.3208187, -105.230256, -71.613065, -87.4554432, -117.197418, 125.5137674, 123.645139, -73.113099, 176.1651295, 171.2549729, -71.620361, 174.776236, 139.6327964, 106.6296638, -122.951638, -122.751308, -67.6167, -70.916476, -68.3029511, -121.4943996, -149.887896, -134.4197222, 130.8417772, -165.4063889, 117.204904, 118.674767 , 119.600492 , 121.0628814, 122.235418 , 109.447930 , 141.8384064, 152.348653, 153.17629, 151.2597998, 149.2921629, 147.190242, 146.8178707, 121.245095, 120.6660044, 121.7081454, 100.5241235, 100.9158073, 103.497, 121.810651, 121.261953, 125.4, 124.400000 , 106.529651, 121.473701 , 114.299872, -110.300594 , 129.0756416, 130.5234659, 127.6752642, 128.8760574, 132.8833333, 131.9333333, 48.8027778, 127.4461111, -122.6235455, -122.2897047, -122.3537824, -122.823134, -122.4083333, -122.8457213, -123.3656444, -122.279065, -122.2085765, -122.3477486, -122.4194155, -122.2566367, -121.2907796, -121.8846806, 121.0581111, 109.0491356, 109.147903, 123.8854366, 108.1993461, 106.7274047, 122.5621063, 113.584722 , 103.426668, 106.754, 120.2791667, 116.115777, 103.419311, 110.3833333, 115.4694444, 113.0011989, 113.0666667, 114.1350173, 120.969493, 115.066667 , 118.78551, 114.057868 , 120.2397336, 113.9725126, 109.278, 107.085, 114.254882, 121.0243904, 109.247, 113.264435 , 147.323814, 173.2839653, 151.7789205, 174.0752278, 151.1967667, 150.900495, 126.5989274, 126.7052062, 120.4229373, 119.526888 , 117.204904, 122.1750802);

if (ships_auto_complete == null) {
  ships_auto_complete = new Array("PETER SCHULTE", "Abram Schulte Mk2", "Acapulco", "Aintree", "Algoma Hansa", "Alina", "ALPINE MADELEINE", "ALPINE MATHILDE", "Amelia", "Amoliani-2", "Angelica Schulte (SSAS)", "ANNA SCHULTE", "APL Amman (SSAS)", "APL Bangkok", "APL Colorado", "APL ILLINOIS", "APL Oman", "APL Qatar", "APL Sharjah", "APL Sydney", "APL Tennessee", "Arctic Gas", "Ardmore Seafarer", "Ardmore Seatrader", "Astral Express", "Auguste Schulte (SSAS)", "Auteuil", "Baltic Gas", "BELAIA", "Besiktas GH", "Blue Rose", "Blue Sky 1 (new)", "BOCHEM ANTWERP", "Bomar Eris", "Bomar Mars", "BOMAR SEDNA", "Bomar Venus Mk2", "Bright Fortune", "Caecilia Schulte", "Cap Ferrato", "Cap Frio", "CAP INES", "CAP ISABEL", "Cap Moreton (SSAS)", "CAROLINE SCHULTE", "Cheltenham", "Chem Alya", "Chem Lyra", "Chem Orion", "CHRISTOPH SCHULTE", "Churun Meru", "Clamor Schulte", "Classy Victoria", "CMACGM Ravel SSAS", "Coniston", "Cygnus Ocean", "Daimon", "DIAMOND EXPRESS", "DONATA SCHULTE", "Dorothea Schulte", "Edzard Schulte", "Eilhard Schulte (SSAS)", "Elisabeth Schulte", "Elisalex Schulte", "Elise Schulte (SSAS)", "Emmy Schulte", "Eos", "Epsom", "Erika Schulte", "Erin Schulte", "Eva Schulte", "Everhard Schulte", "FOLEGANDROS", "Franz Schulte Mk2", "GAS RENOVATIO", "Georg Schulte (SSAS)", "GOLDEN BEIJING", "GOLDEN FUTURE", "GOLDEN MILLER", "GOLDEN WAVE", "Guenther Schulte", "Gustav Schulte", "Happy Bear", "Happy Bee", "Happy Bird", "Happy Bride", "Happy Condor", "Happy Eagle", "Happy Falcon", "Happy Fellow", "Happy Girl", "Happy Harrier", "Happy Pelican", "HAPPY PENGUIN", "Haruna Express", "Henriette Schulte", "Hero", "High Enterprise", "HIGH MARS", "HIGH MERCURY", "HIGH SATURN", "HOKKAIDO BULKER", "HORIZON THETIS", "ICARO", "Ikaria", "Immanuel Schulte", "Intrepid Canada", "Intrepid Republic", "Intrepid Seahawk", "JASMINE EXPRESS", "Johann Schulte", "Joost Schulte", "Jose Leonardo Chirinos", "Jose Maria Espana", "JOSE PROGRESS", "Juergen Schulte", "Kaspar Schulte (SSAS)", "Kempton", "Kokuka Courageous", "Kokuka Glorious", "Kokuka Vigorous", "KOMATI", "Konrad Schulte", "Kuroshio Express", "LADY HILDE", "LADY KATHLEEN", "LADY MARGUAX", "Lauren", "Lissy Schulte", "Longchamp", "Louisa Schulte", "Ludwig Schulte", "MAERSK NEEDHAM", "MAERSK NORWICH", "Malvern", "Manuel Gual", "MAPLE EXPRESS", "MAPLE EXPRESS (OLD)", "MARIANNE SCHULTE", "Mary Schulte", "Maxine", "Mistral", "MOL Continuity", "MOL Diamond", "MOL Dignity", "MOL Direction", "MOL Distinction", "MOL Inca (SSAS)", "MOL Pace", "MOL Proficiency", "MOL Prosperity", "MOL Wisdom", "Monsoon", "Moritz Schulte", "Moyra", "MSC ARICA", "MSC Mara", "MV STADT LUEBECK", "Naida", "NASHWAN", "Navigator Aries", "NAVIGATOR CAPRICORN", "Navigator Gemini", "Navigator Magellan", "NAVIGATOR MARINER", "Navigator Mars", "Navigator Neptune", "Navigator Pegasus", "Navigator Phoenix", "Navigator Pluto", "Navigator Saturn", "NAVIGATOR SCORPIO", "Navigator Venus", "Nereo", "New Market 1", "NIJINSKY", "Njord Hardrada", "Noble Acrux", "Noble Antares", "Noble Regor", "Noble Rigel", "None", "Nordic Gas", "Ocean Promise", "OCL EAGLE", "OOCL Antwerp", "Pacific Horizon II", "Parnaso", "PATAGONIAN MYSTIC", "Paul Schulte", "Peter Schulte", "Peter Schulte Mk 2", "Philine Schulte", "Princimar Courage", "Princimar Integrity", "Princimar Pride", "Proteo", "Raina", "Rebecca Schulte", "REINHOLD SCHULTE", "Rhodos", "Ridgebury Lessley B (new)", "RIO APURE", "RIO ARAUCA", "RIO CARONI", "Rio Genoa", "RIO ORINOCO", "Robert Schulte (SSAS)", "RUDOLF SCHULTE", "Ruth Schulte Mk2", "Sabrewing", "Sakura Express", "SAKURA SYMPHONY", "San Diego Bridge", "SCT Chile", "SCT Peru", "SCT Santiago", "SCT Vietnam", "SCT Zurich", "Senna Jumbo", "SFL Avon", "SFL Europa", "SFL Falcon", "SFL HAWK", "SFL Hudson", "SFL Hunter", "SFL Tiger", "Sigas Margrethe", "Silver Fern", "Simon Schulte", "SOPHIE SCHULTE", "Teseo", "Thekla Schulte", "TMN Pride", "Topaz Express", "Torero", "Trust Agility", "Trust Integrity", "Wilhelm Schulte", "WINCANTON", "XENA", "YM March", "Yuricosmos", "Zeus");
} else if (ships_auto_complete.length == 0) {
  ships_auto_complete = new Array("No SDCs selected.");
}

// Add 'PORT: ' prefix to port names.
for( var i=0;i<port_names.length; i++)
  port_names[i] = 'PORT: '+port_names[i];

ships_auto_complete = ships_auto_complete.concat(port_names);


function auto_complete_select() {

}

$("#vessel_name").autocomplete({
  target: $('#suggestions'),
  source: ships_auto_complete,
  minLength: 1,
  matchFromStart: false,
  // forceFirstChoiceOnEnterKey : true,
  // link: 'target.html?term=',
  link: "javascript:$('li a').click(function(e){var a=e.currentTarget;$('#vessel_name').val(a.text);$('#search_form').submit();$('#vessel_name').autocomplete('clear');});//"
});

var favoriteShips = new Array();
var sdc_settings = new Array();
var first_time = $.jStorage.get("first_time");
var launch_map = true;
var auto_update_map = true;
var req;

favoriteShips = JSON.parse($.jStorage.get("favoriteShips"));
sdc_settings = JSON.parse($.jStorage.get("sdc_settings"));

if (first_time != false) {
  hide_all_content();
  $('#vessel_name').hide();
  $('#popover_logout').hide();
  $('#search_box').hide();
  $('#search_form').hide();

  $('#top_home').hide();
  $('#top_settings').hide();
  $('#top_worldmap').hide();

  $('.login').show();
} else {
  login_success();
}

var bounds_start, bounds_end;
var marker_highlighted;

function login_success() {
  $('.login').hide();
  $(".spinner").css('display','none');
  $("#ajax_error").hide();
  $('#search_box').show();
  $('#vessel_name').show();
  $('#top_home').show();
  $('#top_settings').show();
  $('#top_worldmap').show();

  //Include jQuery Mobile Now.
  var script = document.createElement( 'script' );
  script.type = 'text/javascript';
  script.src = 'js/jquery.mobile-1.3.2.min.js';
  $("body").append( script );

  // show_popup('Welcome to BSM VesselTracker!', 'Please sign in using your windows login credentials to access BSM VesselTracker.','OK', 'Cancel');
  
  if (launch_map) {
    // fetch_vessel_wiki('1212');
    $('#map').show();
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 2,
      center: new google.maps.LatLng(20,20),
      mapTypeId: google.maps.MapTypeId.HYBRID,
      labels: true,
    });
    
    google.maps.event.addListener(map, 'dragstart', function(){
      bounds_start = map.getBounds();
      // alert('updated');
    });

    google.maps.event.addListener(map, 'dragend', function(){
      bounds_end = map.getBounds();

      bounds_start = bigger_bounds(bounds_start);

      if(marker_highlighted == false && bounds_start.contains(bounds_end.getNorthEast()) && bounds_start.contains(bounds_end.getSouthWest())) {
        // Do nothing. Already marked.
      } else {
        clear_all_markers();
        show_vessel_positions();
      }
      // alert('updated');
    });

    google.maps.event.addListener(map, 'zoom_changed', function(){
      var minZoomLevel = 2;
      if (map.getZoom() < minZoomLevel) map.setZoom(minZoomLevel);
      clear_all_markers();
      show_vessel_positions();
      // alert('updated');
    });
    save_sdc_settings();


  } else {
    $('.favorites').show();
  }

  if (auto_update_map) {
    // Now update positions every 2 minutes
    window.setInterval(function(){
      update_vessel_positions();
    }, 300000);
  }
  $('#popover_logout').show();
  if (favoriteShips == null || favoriteShips.length == 0) {
    $('.welcome').show();
  }
  // $(".welcome").center();

  if (first_time != false) {
    // Logged in successfully for the first time.
    $.jStorage.set("first_time", false);
    first_time = false;
    register_push_service();
  }
}

function login_failure() {
  $(".spinner").css('display','none');
  $("#ajax_error").show();
  $("#ajax_error").html('Wrong Email or Password. Please try again.');
  $("#ajax_error").attr('style','display:block; text-align:center;');
}

$('#login_submit').click(function(){
  $('#login_form').submit();
});

$('#login_form').submit(function(){
  var username = $('#login_email').val();
  var password = $('#login_password').val();

  $.jStorage.set("pal_user_id", username);
  
  var form_data= {
    'username': username,
    'password': password
  };
  req = $.ajax({
    url: 'https://getVesselTracker.com/ldap_test.php',
    type: "post",
    data: form_data,
    beforeSend: function() {
      // $(".spinner").css('display','inline');
        // $(".spinner").center();
      },

      success : function(response) {
        if (response == 'success') {
          login_success();
        // location.reload();
      } else {
        login_failure();
      }
    }
  });
  //}
  $('#login_password').blur();
  $('#login_email').blur();
  return false;
});


$('#popover_logout').click(function(){
  $.jStorage.deleteKey('first_time');
  $.jStorage.deleteKey('favoriteShips');
  // localStorage.removeItem('sdc_settings');
  location.reload();
});

if (favoriteShips == null || favoriteShips.length == 0) {
  favoriteShips = new Array();
}

if (sdc_settings == null || sdc_settings.length == 0) {
  if (first_time == 'false' ) {
    sdc_settings = new Array();
    $('#myPopover').addClass('visible');
    $('#myPopover').attr('style','display:block;');
    // $('.welcome').show();
  }
} else {
  show_sdc_settings();
  if (launch_map == false) {
    if (favoriteShips.length == 0) {
      if (first_time == 'false') {
        // $("#ajax_error").css('display','inline');
        // $("#ajax_error").html('No vessels starred. <br/>Search for a vessel and click on the star to add to favorites.');
        // $("#ajax_error").center();
      }
    } else {
      req = fetch_results('',sdc_settings,favoriteShips);
    }
  }
}

function add_bookmark(name_mmsi_id) {
  $('#i_'+name_mmsi_id).attr('src','img/star2.png');
  $('#'+name_mmsi_id).attr("onClick","remove_bookmark(this.id)");
  if (!( name_mmsi_id in favoriteShips ) ) {
    favoriteShips.push(name_mmsi_id);
  }
  $.jStorage.set("favoriteShips", JSON.stringify(favoriteShips));
}

function remove_bookmark(name_mmsi_id) {
  $('#i_'+name_mmsi_id).attr('src','img/star.png');
  $('#'+name_mmsi_id).attr('onclick','add_bookmark(this.id)');
  var index = favoriteShips.indexOf(name_mmsi_id);
  favoriteShips.splice(index, 1);
  $.jStorage.set("favoriteShips", JSON.stringify(favoriteShips));
  
}

function show_bookmarks_stars() {
  for(var i=0; i<favoriteShips.length; i++) {
    // $('.results #i_'+favoriteShips[i]).attr('src','img/star2.png');
    // $('.favorites #i_'+favoriteShips[i]).attr('src','img/star2.png');
    $('#i_'+favoriteShips[i]).attr('src','img/star2.png');
    $('#'+favoriteShips[i]).attr("onClick","remove_bookmark(this.id)");
  }
}


function getURLParameter(name) {
  return decodeURI(
    (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}

// if(getURLParameter('iframe')=='true') {
//   $('.toggle').click(function(){
//     if ($(this).hasClass('active')) {
//       $(this).removeClass('active');
//       $(this).children().first().attr('style','style="-webkit-transform: translate3d(47px, 0, 0);"');
//     } else {
//       $(this).addClass('active');
//       $(this).children().first().attr('style','style="-webkit-transform: translate3d(0, 0, 0);"');
//     }
//   });
// }

$("#search_form").submit(function() {
  $('input#vessel_name').blur();
  
  if($('#map').is(":visible")) {
    $(".results").html('');
    $(".results").show();
  }
  
  var query = $('#vessel_name').val();
  if (query.indexOf('PORT: ') != -1) {
    port_index = port_names.indexOf(query);
    
    if (port_lat[port_index] == 999) {
      alert('Sorry, unable to find port. We have been informed, and will fix this soon.');
    } else {
      map.setZoom(7);
      map.setCenter(new google.maps.LatLng(port_lat[port_index], port_lng[port_index]));
      show_vessel_positions();
    }
  } else {
    // query = encodeURIComponent(query);
    if ($('#vessel_name').val() == 'Name / IMO / MMSI / Callsign') {
      query = '';
    }
    
    fetch_results(query,sdc_settings);
  }
  return false;
});

$("#vessel_name").focus(function() {
  $(this).css('color','rgb(0,0,0)');
  if (this.value == 'Name / IMO / MMSI / Callsign') {this.value='';}
});

$("#vessel_name").blur(function(){
  if (this.value == '') {
    this.value = 'Name / IMO / MMSI / Callsign';
    $(this).css('color','rgb(146,146,146)');
  }
});

$('#top_settings').click(function(){
  if ($('#myPopover').hasClass('visible')) {
    save_sdc_settings();
    $('#myPopover').removeClass('visible');
    $('.backdrop').remove();
    $('#myPopover').attr('style', 'display: none;');
  } else {
    $('#myPopover').addClass('visible');
    $('#myPopover').attr('style','display:block;');
  }
});


$('#top_worldmap').click(function(){
  hide_all_content();
  $('#map').show();
  google.maps.event.trigger(map, 'resize'); 

});


$("#top_refresh").click(function(){
  $(".results").html('');
  $(".results").hide();
  $(".favorites").html('');
  $(".favorites").show();
  $("#ajax_error").hide();
  $('.welcome').show();
  $("#vessel_name").val('Name / IMO / MMSI / Callsign');
  $("#vessel_name").css('color','rgb(146,146,146)');
  $('.spinner').css('display', 'none');
  if (favoriteShips == null || favoriteShips.length == 0) {
    favoriteShips = new Array();
    if (first_time == 'false') {
      $("#ajax_error").css('display','inline');
      $("#ajax_error").html('No vessels starred. <br/>Search for a vessel and star to add to favorites.');
      $("#ajax_error").center();
    }
  } else {
    req = fetch_results('',sdc_settings,favoriteShips);
  }
});

$('#top_home').click(function(){

  hide_all_content();
  $(".favorites").html('');
  $(".favorites").show();
  
  // $('.welcome').show();
  $("#vessel_name").val('Name / IMO / MMSI / Callsign');
  $("#vessel_name").css('color','rgb(146,146,146)');
  // $('.spinner').css('display', 'none');
  if (favoriteShips == null || favoriteShips.length == 0) {
    favoriteShips = new Array();
    if (first_time == 'false') {
      $("#ajax_error").css('display','inline');
      $("#ajax_error").html('No vessels starred. <br/>Search for a vessel and star to add to favorites.');
      $("#ajax_error").center();
    }
  } else {
    req = fetch_results('',sdc_settings,favoriteShips);
  }
});

function parse_lat_lon(response) {
  var lat = 0.0, lon = 0.0, lat_display = '', lon_display = '';
  if (response['latitude-degrees-of-value']!= null) {
    lat += parseFloat(response['latitude-degrees-of-value']);
    // lat_display += parseFloat(response[i][j]['latitude-degrees-of-value']).toFixed(0) + '°%20';
  }
  if (response['latitude-minutes-of-value']!= null) {
    lat += parseFloat(response['latitude-minutes-of-value']) / 60;
    // lat_display += parseFloat(response[i][j]['latitude-minutes-of-value']).toFixed(0) + '\'%20';
  }
  if (response['latitude-seconds-of-value']!= null) {
    lat += parseFloat(response['latitude-seconds-of-value']) / 3600;
    // lat_display += parseFloat(response[i][j]['latitude-seconds-of-value']).toFixed(0) + '\"';
  }

  if (response['longitude-degrees-of-value']!= null) {
    lon += parseFloat(response['longitude-degrees-of-value']);
    // lon_display += parseFloat(response[i][j]['longitude-degrees-of-value']).toFixed(0) + '°%20';
  }
  if (response['longitude-minutes-of-value']!= null) {
    lon += parseFloat(response['longitude-minutes-of-value']) / 60;
    // lon_display += parseFloat(response[i][j]['longitude-minutes-of-value']).toFixed(0) + '\'%20';
  }
  if (response['longitude-seconds-of-value']!= null) {
    lon += parseFloat(response['longitude-seconds-of-value']) / 3600;
    // lon_display += parseFloat(response[i][j]['longitude-seconds-of-value']).toFixed(0) + '\"';
  }
  // lat = encodeURIComponent(lat);
  // lon = encodeURIComponent(lon);
  if (response['latitude-hemisphere-of-value'] != 'north') {lat = -1 * lat;}
  if (response['longitude-hemisphere-of-value'] != 'east') {lon = -1 * lon;}
  var lat_lon = new Array();
  lat_lon['lat'] = lat;
  lat_lon['lon'] = lon;
  return lat_lon;
}

// var locations = [
// ['kochi', 9.2892, 76.2542, 4],
// [' Ocean', 9.2900, 75.2592, 5]
//       // ['Cronulla Beach', -34.028249, 151.157507, 3],
//       // ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
//       // ['Maroubra Beach', -33.950198, 151.259302, 1],
//       // ['Tirunelveli',8.7300, 77.7000, 6],
//       // ['Khaba',21.4225, 39.8262,7]
//       ];

// PUT IN RIGHT PLACE

function show_popup_at_marker(marker, content) {
  var infowindow = new google.maps.InfoWindow({
    width:750,height:750,content:content
  });

  if (open_info_window) {
    open_info_window.close();
  }

  infowindow.setContent(content);
  infowindow.open(map, marker);
  open_info_window = infowindow;

  // zoom : 2;
  return false;
}

var vessel_positions;

function update_vessel_positions() {
  clear_all_markers();
  req = $.ajax({
    url: 'https://getVesselTracker.com/get_vessel_positions.php?sdc_settings='+JSON.stringify(sdc_settings),//+'&bounds='+bounds,
    beforeSend: function() {
      $(".spinner").css('display','inline');
      // $(".spinner").html("Loading Please wait few seconds...");
      $(".spinner").center();
    },

    success : function(response) {
      $(".spinner").hide();
      vessel_positions = response;
      show_vessel_positions();
    }
  });
}
var path_vessel_imo;
// Function to show Ship Position
function create_marker(name, imo, lat, longitude, degrees, highlight){
 var marker;
 if (highlight) {
  marker_highlighted = true;
  marker = new google.maps.Marker({
   position: new google.maps.LatLng(lat, longitude),
   icon: {
    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
    scale: 4,
    fillColor: "red",
    fillOpacity: 1,
    flat: true,
    strokeWeight: 2,
      rotation: degrees //this is how to rotate the pointer
    },
     map: map,
     title: name,
     size: new google.maps.Size(10, 10),
   });
  path_vessel_imo = imo;
  vessel_markers.push(marker);
  if (markerCluster) {
    markerCluster.clearMarkers();
  }
  markerCluster = new MarkerClusterer(map, vessel_markers, mcOptions);
} else {
 marker = new google.maps.Marker({
   position: new google.maps.LatLng(lat, longitude),
    //  icon: {
    //   path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
    //   scale: 2,
    //   fillColor: "red",
    //   fillOpacity: 1,
    //   flat: true,
    //   strokeWeight: 2,
    //   rotation: degrees //this is how to rotate the pointer
    // },
     // map: map,
     title: name,
     size: new google.maps.Size(10, 10),
   });
}

google.maps.event.addListener(marker, 'click', function() {
  var infowindow = new google.maps.InfoWindow({
    width:750,height:750,content:name
  });

  if (open_info_window) {
    open_info_window.close();
  }

  infowindow.setContent(name);
  infowindow.open(map, marker);
  open_info_window = infowindow;
  fetch_results(imo,sdc_settings);
});


    // for (i = 0; i < locations.length; i++) {
    //   show_ship_position(locations[i][1],locations[i][2]);
    //   // var line = new google.maps.Polyline({
    //   //           path: [new google.maps.LatLng(locations[0][1], locations[0][2]),new google.maps.LatLng(locations[1][1], locations[1][2]),new google.maps.LatLng(locations[2][1], locations[2][2]),new google.maps.LatLng(locations[3][1], locations[3][2]),new google.maps.LatLng(locations[4][1], locations[4][2]),new google.maps.LatLng(locations[5][1], locations[5][2]),new google.maps.LatLng(locations[6][1], locations[6][2])],
    //   //           map: map
    //   //         });



    //   plot_ship_track(marker.position,new google.maps.LatLng(locations[1][1], locations[1][2]));

    // } 


     // google.maps.event.addListener(marker, 'click', (function(marker, i) {
     //   show_popup_at_marker(marker, name);
     // })(marker, i));
return marker;
}

var vessel_positions;

function update_vessel_positions() {
  clear_all_markers();
  req = $.ajax({
    url: 'https://getVesselTracker.com/get_vessel_positions.php?sdc_settings='+JSON.stringify(sdc_settings),//+'&bounds='+bounds,
    beforeSend: function() {
      $(".spinner").css('display','inline');
      // $(".spinner").html("Loading Please wait few seconds...");
      $(".spinner").center();
    },

    success : function(response) {
      $(".spinner").hide();
      vessel_positions = response;
      show_vessel_positions();
      $('#vessel_name').removeClass();
    }
  });
}

var markerCluster;

function bigger_bounds(bounds) {
  // Increase the size of bounding box for UX
  bounds.fa.d -= 12;
  bounds.ga.b -= 12;

  bounds.fa.b += 12;
  bounds.ga.d += 12;

  return bounds;
}

function show_vessel_positions() {
  var bounds = map.getBounds();

  bounds = bigger_bounds(bounds);
  
  if (vessel_positions) {
    for (var i=0; i<vessel_positions.length; ++i) {
      var lat_lon = parse_lat_lon(vessel_positions[i]);
      var lat = lat_lon['lat'];
      var lon = lat_lon['lon'];

      // Check is vessel is inside bounds
      var vessel_pos = new google.maps.LatLng(lat, lon);
      if (bounds.contains(vessel_pos)) {
        // Add a marker on map.
        if(path_vessel_imo == vessel_positions[i]['i-m-o-number']) {
          // Add different marker, with angle.
          marker = create_marker(vessel_positions[i]['asset-name'], vessel_positions[i]['i-m-o-number'], lat, lon,vessel_positions[i]['heading-value-of-value'], true);
        } else {
          marker = create_marker(vessel_positions[i]['asset-name'], vessel_positions[i]['i-m-o-number'], lat, lon,vessel_positions[i]['heading-value-of-value']);
        }
        vessel_markers.push(marker);
        vessel_markers_with_imo.push(vessel_positions[i]['i-m-o-number']);
      }
    }
    
    if (markerCluster) {
      markerCluster.clearMarkers();
    }
    markerCluster = new MarkerClusterer(map, vessel_markers, mcOptions);
  }
}
google.maps.event.addDomListener(window, 'load');

function clear_all_markers() {
  // TODO: Not working
  // for (var key in vessel_markers_with_imo) {
  //   if (vessel_markers_with_imo[key] != null) {
  //     vessel_markers[vessel_markers_with_imo[key]].setMap(null);
  //   }
  // }

  for (var i = 0; i < vessel_markers.length; ++i) {
    if (vessel_markers[i] != null) {
      vessel_markers[i].setMap(null);
    }
  }
  if (markerCluster) {
    markerCluster.clearMarkers();
  }

  vessel_markers_with_imo = new Array();
  vessel_markers = new Array();
}

function clear_marker(imo) {
  index = vessel_markers_with_imo.indexOf(''+imo);
  vessel_markers[vessel_markers_with_imo.indexOf(''+imo)].setMap(null);
  vessel_markers.splice(index,1);
  vessel_markers_with_imo.splice(index,1);
}

function show_vessel_path(imo, degrees) {
  req = $.ajax({
    url: 'https://getVesselTracker.com/get_vessel_position_history.php?i-m-o-number='+imo,
    beforeSend: function() {
      $(".spinner").css('display','inline');
      // $(".spinner").html("Loading Please wait few seconds...");
      $(".spinner").center();
    },

    success : function(response) {
      $(".spinner").hide();
      var previous_positions_lat_lon = new Array();

      // clear_marker(imo);
      clear_all_markers();
      var cur_lat_lon = parse_lat_lon(response[0]);
      var cur_lat = cur_lat_lon['lat'];
      var cur_lon = cur_lat_lon['lon'];

      marker = create_marker(response[0]['asset-name'], imo, cur_lat, cur_lon, degrees, true);
      vessel_markers.push(marker);
      vessel_markers_with_imo.push(response[0]['i-m-o-number']);

      // Starting from index 1 because, skipping the most recent position.
      for (var i=1; i<response.length; ++i) {
        // For each vessel:

        // Parse the lat,lon
        var lat_lon = parse_lat_lon(response[i]);
        previous_positions_lat_lon.push(lat_lon);
        var lat = lat_lon['lat'];
        var lon = lat_lon['lon'];
      }

      plot_vessel_track(cur_lat_lon, previous_positions_lat_lon);
      show_vessel_positions();
    }
  });
}

var vessel_path_plotted;
// Function to Show ship_track
function plot_vessel_track(current_position_lat_lon,previous_positions_lat_lon) {
  // ABDUL (ToDo): Previous positions is an array.
  // cur_posiotions_lat_lon['lat'], cur_posiotions_lat_lon['lon']
  // previous_positions_lat_lon[0..length]['lat'], previous_positions_lat_lon[0..length]['lng'] -- Array

  var cur_pos = new google.maps.LatLng(current_position_lat_lon['lat'], current_position_lat_lon['lon']);
  var cur_pos_2 = [
  new google.maps.LatLng(current_position_lat_lon['lat'] - 1, current_position_lat_lon['lon'] - 1),
  new google.maps.LatLng(current_position_lat_lon['lat'] - 4, current_position_lat_lon['lon'] - 4)];
  var path_positions = new Array();
  path_positions.push(cur_pos);

  for(var i=0; i<previous_positions_lat_lon.length;++i) {
    path_positions.push(new google.maps.LatLng(previous_positions_lat_lon[i]['lat'], previous_positions_lat_lon[i]['lon']));
  }

  if (vessel_path_plotted != null) {
    vessel_path_plotted.setMap(null);
  }

  vessel_path_plotted = new google.maps.Polyline({
    path: [path_positions],
    strokeWeight: 2,
    strokeColor: 'red',
    map: map
  });
}

// show_vessel_positions();


$('#launch_map').bind('change', function() {
   // do something when checkbox with ID Genre is clicked

   if ($('#launch_map').is(':checked')) {
      // do something when the checkbox is checked
      $("#launch_map").attr("checked", "checked");
      hide_all_content();
      $('#map').show();
      google.maps.event.trigger(map, 'resize'); 

    }
  });

// fetch_vessel_wiki('1212');