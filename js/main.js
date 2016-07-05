
var width = $(window).width();

$(".nav-container").hover(

	function(){$(".main-container").addClass("margin-adjust")},
	function(){$(".main-container").removeClass("margin-adjust")}

)

$(".nav-container").hover(

	function(){$("nav").addClass("display")},
	function(){$("nav").removeClass("display")}

)

$(".nav-container").hover(
	function(){$("#header").addClass("margin-adjust")},
	function(){$("#header").removeClass("margin-adjust")}
	)

$("#info-button").click(
	function(){$(".info-box").toggleClass("show-box");

	});
console.log(width);