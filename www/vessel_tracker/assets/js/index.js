var step_back = function(){};

function show_home_screen() {
	$('#app-content').html('');
	$('#app-content').hide();
	$('#top-back').hide();
	$('#app-index').show();
}

function show_next_assignment() {
	$('#app-index').hide();
	$('#app-content').show();
	$('#top-back').show();
	var content = "";

	content += '<p class="lead my-title">Next Assignments</p>';
	content += "<div class='assignment-details'>";
	content += "<div><p class='navbar-text'>Journey: <span class='label label-info'>Cochin</span> To <span class='label label-info'>Chennai</span> </p></div>";
	content += "<div><p class='navbar-text'>Dates: <span class='label label-info'>Jan-5-2014</span> to <span class='label label-info'>Feb-7-2014</span></p></div>";
	content += "<div><p class='navbar-text'>Assignemnt Type: <span class='label label-inverse'>Training</span></p></div>";
	content += "</div>";

	content += "<div class='assignment-details'>";
	content += "<div><p class='navbar-text'>Vessel: <span class='label label-info'>Angelina Schulte</span></p></div>";
	content += "<div><p class='navbar-text'>Journey: <span class='label label-info'>Chennai</span> To <span class='label label-info'>Hamburg</span></p></div>";
	content += "<div><p class='navbar-text'>Journey Dates: <span class='label label-info'>Feb-10-2014</span> to <span class='label label-info'>April-7-2014</span></p></div>";
	content += "<div><p class='navbar-text'>Assignemnt Type: <span class='label label-success'>Voyage</span></p></div>";
	content += "</div>";

	content += "<div class='assignment-details'>";
	content += "<div><p class='navbar-text'>Location: <span class='label label-info'>Hamburg</span></p></div>";
	content += "<div><p class='navbar-text'>Journey Dates: <span class='label label-info'>April-9-2014</span> to <span class='label label-info'>April-12-2014</span></p></div>";
	content += "<div><p class='navbar-text'>Assignemnt Type: <span class='label label-important'>Office Visit</span></p></div>";
	content += "</div>";
	$('#app-content').html(content);
	step_back = show_home_screen;
}

function show_my_itineraries() {
	$('#app-index').hide();
	$('#app-content').show();
	$('#top-back').show();
	var content = "";

	content += '<p class="lead">My Itineraries</p>';
	content += "<div class='assignment-details'>";
	content += "<div><p class='navbar-text'>Flight Number: <span class='label label-info'>EKJ7352</span></p></div>";
	content += "<div><p class='navbar-text'>Booking Id: <span class='label label-info'>EO73891234241</span></p></div>";
	content += "<div><p class='navbar-text'>Journey: <span class='label label-info'>Cohin</span> to <span class='label label-info'>Chennai</span></p></div>";
	content += "<div><p class='navbar-text'>Dates: <span class='label label-info'>Jan-5-2014</span> to <span class='label label-info'>Feb-7-2014</span></p></div>";
	content += "<div><p class='navbar-text'>Type: <span class='label label-inverse'>Flight</span></p></div>";
	content += "</div>";

	content += "<div class='assignment-details'>";
	content += "<div><p class='navbar-text'>Vessel: <span class='label label-info'>Angelina Schulte</span></p></div>";
	content += "<div><p class='navbar-text'>Journey: <span class='label label-info'>Chennai</span> To <span class='label label-info'>Hamburg</span></p></div>";
	content += "<div><p class='navbar-text'>Journey Dates: <span class='label label-info'>Feb-10-2014</span> to <span class='label label-info'>April-7-2014</span></p></div>";
	content += "<div><p class='navbar-text'>Type: <span class='label label-success'>Voyage</span></p></div>";
	content += "</div>";

	content += "<div class='assignment-details'>";
	content += "<div><p class='navbar-text'>Hotel: <span class='label label-info'>Holiday Inn</span></p></div>";
	content += "<div><p class='navbar-text'>Booking Id: <span class='label label-info'>E732962</span></p></div>";
	content += "<div><p class='navbar-text'>Reservation Dates: <span class='label label-info'>April-9-2014</span> to <span class='label label-info'>April-12-2014</span></p></div>";
	content += "<div><p class='navbar-text'>Type: <span class='label label-important'>Hotel</span></p></div>";
	content += "</div>";
	$('#app-content').html(content);
	step_back = show_home_screen;
}

function show_open_positions() {
	$('#app-index').hide();
	$('#app-content').show();
	$('#top-back').show();
	var content = "";

	content += '<p class="lead">Open Positions</p>';
	content += "<div class='assignment-details'>";
	content += "<div><p class='navbar-text'>SDC: <span class='label label-info'>BSMDE</span></p></div>";
	content += "<div><p class='navbar-text'>Vessel: <span class='label label-info'>Angelina Schulte</span></p></div>";
	content += "<div><p class='navbar-text'>Voyage: <span class='label label-info'>Hamburg</span> to <span class='label label-info'>Hong Kong</span></p></div>";
	content += "<div><p class='navbar-text'>Journey Dates: <span class='label label-info'>Dec-4-2014</span> to <span class='label label-info'>Jan-12-2014</span></p></div>";
	content += "</div>";

	content += "<div class='assignment-details'>";
	content += "<div><p class='navbar-text'>SDC: <span class='label label-info'>BSMGR</span></p></div>";
	content += "<div><p class='navbar-text'>Vessel: <span class='label label-info'>Susanne Schulte</span></p></div>";
	content += "<div><p class='navbar-text'>Voyage: <span class='label label-info'>Cape Town</span> to <span class='label label-info'>Durban</span></p></div>";
	content += "<div><p class='navbar-text'>Journey Dates: <span class='label label-info'>Nov-27-2014</span> to <span class='label label-info'>Dec-9-2014</span></p></div>";
	content += "</div>";

	content += "<div class='assignment-details'>";
	content += "<div><p class='navbar-text'>SDC: <span class='label label-info'>BSMHK</span></p></div>";
	content += "<div><p class='navbar-text'>Vessel: <span class='label label-info'>Intrepid</span></p></div>";
	content += "<div><p class='navbar-text'>Voyage: <span class='label label-info'>Singapore</span> to <span class='label label-info'>Hong Kong</span></p></div>";
	content += "<div><p class='navbar-text'>Journey Dates: <span class='label label-info'>Dec-9-2014</span> to <span class='label label-info'>Dec-22-2014</span></p></div>";
	content += "</div>";

	content += "<div class='assignment-details'>";
	content += "<div><p class='navbar-text'>SDC: <span class='label label-info'>BSMIN</span></p></div>";
	content += "<div><p class='navbar-text'>Vessel: <span class='label label-info'>Erika Schulte</span></p></div>";
	content += "<div><p class='navbar-text'>Voyage: <span class='label label-info'>Mumbai</span> to <span class='label label-info'>Dubai</span></p></div>";
	content += "<div><p class='navbar-text'>Journey Dates: <span class='label label-info'>Dec-4-2014</span> to <span class='label label-info'>Jan-12-2014</span></p></div>";
	content += "</div>";
	$('#app-content').html(content);
	step_back = show_home_screen;
}


function show_doa() {
	$('#app-index').hide();
	$('#app-content').show();
	$('#top-back').show();
	var content ='';

	content += '<p class="lead">When are you available next?</p>';
	content +=
		'<div id="login"> \
         <form class="form-horizontal" id="login-form"> \
            <div class="control-group"> \
               <label class="control-label" for="inputEmail">From</label> \
               <div class="controls"> \
                  <input type="date" id="inputEmail"> \
               </div> \
            </div> \
            <div class="control-group"> \
               <label class="control-label" for="inputPassword">Remarks</label> \
               <div class="controls"> \
                  <input type="text" id="inputPassword" placeholder="Remarks"> \
               </div> \
            </div> \
            <div class="control-group"> \
               <div class="controls"> \
                  <button type="submit" class="btn">Submit</button> \
               </div> \
            </div> \
         </form> \
      	</div>';
 	$('#app-content').html(content);
	step_back = show_home_screen;
}

function show_my_accounts() {
	$('#app-index').hide();
	$('#app-content').show();
	$('#top-back').show();
	var content = "";

	content += '<p class="lead">My Accounts</p>';

	content += "<div class='assignment-details'>";
	content += "<div><p class='navbar-text'>Payments This Month: <span class='label label-success'>USD 12,100</span></p></div>";
	content += "<div><p class='navbar-text'>Payments Due: <span class='label label-inverse'>USD 5,400</span></p></div>";
	content += "</div>";


	content += "<div class='assignment-details'>";
	content += "<div><p class='navbar-text'>Amount: <span class='label label-info'>USD 4,300</span></p></div>";
	content += "<div><p class='navbar-text'>Vessel: <span class='label label-info'>Angelina Schulte</span></p></div>";
	content += "<div><p class='navbar-text'>Voyage: <span class='label label-info'>Hamburg</span> to <span class='label label-info'>Hong Kong</span></p></div>";
	content += "<div><p class='navbar-text'>Journey Dates: <span class='label label-info'>Dec-4-2014</span> to <span class='label label-info'>Jan-12-2014</span></p></div>";
	content += "<div><p class='navbar-text'>Type: <span class='label label-success'>Salary Deposited</span></p></div>";
	content += "</div>";

	content += "<div class='assignment-details'>";
	content += "<div><p class='navbar-text'>Amount: <span class='label label-info'>USD 3,200</span></p></div>";
	content += "<div><p class='navbar-text'>Vessel: <span class='label label-info'>Angelina Schulte</span></p></div>";
	content += "<div><p class='navbar-text'>Voyage: <span class='label label-info'>Hamburg</span> to <span class='label label-info'>Hong Kong</span></p></div>";
	content += "<div><p class='navbar-text'>Journey Dates: <span class='label label-info'>Dec-4-2014</span> to <span class='label label-info'>Jan-12-2014</span></p></div>";
	content += "<div><p class='navbar-text'>Type: <span class='label label-inverse'>Invoice Registered</span></p></div>";
	content += "</div>";

	content += "<div class='assignment-details'>";
	content += "<div><p class='navbar-text'>Amount: <span class='label label-info'>USD 7,800</span></p></div>";
	content += "<div><p class='navbar-text'>Vessel: <span class='label label-info'>Susanne Schulte</span></p></div>";
	content += "<div><p class='navbar-text'>Voyage: <span class='label label-info'>Cape Town</span> to <span class='label label-info'>Durban</span></p></div>";
	content += "<div><p class='navbar-text'>Journey Dates: <span class='label label-info'>Nov-27-2014</span> to <span class='label label-info'>Dec-9-2014</span></p></div>";
	content += "<div><p class='navbar-text'>Type: <span class='label label-success'>Invoice Paid</span></p></div>";
	content += "</div>";

	content += "<div class='assignment-details'>";
	content += "<div><p class='navbar-text'>Amount: <span class='label label-info'>$2,200</span></p></div>";
	content += "<div><p class='navbar-text'>Vessel: <span class='label label-info'>Intrepid</span></p></div>";
	content += "<div><p class='navbar-text'>Voyage: <span class='label label-info'>Singapore</span> to <span class='label label-info'>Hong Kong</span></p></div>";
	content += "<div><p class='navbar-text'>Journey Dates: <span class='label label-info'>Dec-9-2014</span> to <span class='label label-info'>Dec-22-2014</span></p></div>";
	content += "<div><p class='navbar-text'>Type: <span class='label label-inverse'>Medical Claim Submitted</span></p></div>";
	content += "</div>";

	$('#app-content').html(content);
	step_back = show_home_screen;
}

function show_my_alerts() {
	$('#app-index').hide();
	$('#app-content').show();
	$('#top-back').show();
	var content = "";

	content += '<p class="lead">My Alerts</p>';
	content += "<div class='assignment-details'>";
	content += "<div><p class='navbar-text'><span class='label label-info'> Next Assignment Cochin to Chennai added.</span></p></div>";
	content += "</div>";

	content += "<div class='assignment-details'>";
	content += "<div><p class='navbar-text'><span class='label label-success'> USD 4,300 Salary Deposited to BankofAmerica xxx1134.</span></p></div>";
	content += "</div>";

	content += "<div class='assignment-details'>";
	content += "<div><p class='navbar-text'><span class='label label-inverse'> New Open Position from Mumbai to Dubai.</span></p></div>";
	content += "</div>";

	content += "<div class='assignment-details'>";
	content += "<div><p class='navbar-text'><span class='label label-info'> Hotel Booking April-9-2014 to April-12-2014 Added To Itineraries.</span></p></div>";
	content += "</div>";

	content += "<div class='assignment-details'>";
	content += "<div><p class='navbar-text'><span class='label label-inverse'> New Open Position from Hamburg to Hong Kong.</span></p></div>";
	content += "</div>";

	content += "<div class='assignment-details'>";
	content += "<div><p class='navbar-text'><span class='label label-info'> Next Assignment Chennai to Hamburg added.</span></p></div>";
	content += "</div>";

	$('#app-content').html(content);
	step_back = show_home_screen;
}