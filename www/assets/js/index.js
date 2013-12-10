function show_login() {
	$('#login').show();
	$('#apps').hide();
}

$('#login-form').submit(function(){
	var username = $('#inputEmail').val();
	var password = $('#inputPassword').val();

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
		$(".spinner").css('display','inline');
		$(".spinner").center();
	},

	success : function(response) {
		if (response == 'success') {
			login_success();
			// location.reload();
		}
		else {
			login_failure();
		}
	}
	});
	//}
	$('#inputEmail').blur();
	$('#inputPassword').blur();
	return false;
});

function login_success() {
	$('#login').hide();
	$('#apps').show();
}

user_id = $.jStorage.get("pal_user_id");
if (user_id == null) {
	// Need to login
	show_login();
} else {
	login_success();
}


function toTitleCase(str)
{ if(str)
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
                                                $(window).scrollLeft()) + "px");
    return this;
};

Number.prototype.formatMoney = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };