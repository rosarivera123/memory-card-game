var BoxOpened = "";
var ImgOpened = "";
var Counter = 0;
var ImgFound = 0;

var Source = "#boxcard";

var ImgSource = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Dahlia_-_%22Small_World%22_cultivar.jpg/100px-Dahlia_-_%22Small_World%22_cultivar.jpg" ,
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Rue_Anemone_Thalictrum_thalictroides_Flower_2479px.jpg/100px-Rue_Anemone_Thalictrum_thalictroides_Flower_2479px.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Tagetes_1.jpg/100px-Tagetes_1.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/DahliaMoonfire.jpg/100px-DahliaMoonfire.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Chrysanthemum_x_grandiflorum_03.jpg/100px-Chrysanthemum_x_grandiflorum_03.jpg",
  "http://www.materflorist.com.au/Test/Elegant-Oriental-Lily-Bouquet-From-100px.JPG",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Dahlia_-_%22Cameo%22_cultivar.jpg/100px-Dahlia_-_%22Cameo%22_cultivar.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Peach_flowers.jpg/100px-Peach_flowers.jpg",
  "http://4.bp.blogspot.com/_sTjGmVnfXJc/SOw5W88itsI/AAAAAAAAGiQ/r1-LR24-ruw/s200/100px-Desert_rose.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/LiliumBulbiferumCroceumBologna.jpg/100px-LiliumBulbiferumCroceumBologna.jpg"
];

function RandomFunction(MaxValue, MinValue) {
		return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
	}
	
function ShuffleImages() {
	var ImgAll = $(Source).children();
	var ImgThis = $(Source + " div:first-child");
	var ImgArr = new Array();

	for (var i = 0; i < ImgAll.length; i++) {
		ImgArr[i] = $("#" + ImgThis.attr("id") + " img").attr("src");
		ImgThis = ImgThis.next();
	}
	
		ImgThis = $(Source + " div:first-child");
	
	for (var z = 0; z < ImgAll.length; z++) {
	var RandomNumber = RandomFunction(0, ImgArr.length - 1);

		$("#" + ImgThis.attr("id") + " img").attr("src", ImgArr[RandomNumber]);
		ImgArr.splice(RandomNumber, 1);
		ImgThis = ImgThis.next();
	}
}

function ResetGame() {
	ShuffleImages();
	$(Source + " div img").hide();
	$(Source + " div").css("visibility", "visible");
	Counter = 0;
	$("#success").remove();
	$("#counter").html("" + Counter);
	BoxOpened = "";
	ImgOpened = "";
	ImgFound = 0;
	return false;
}

function OpenCard() {
	var id = $(this).attr("id");

	if ($("#" + id + " img").is(":hidden")) {
		$(Source + " div").unbind("click", OpenCard);
	
		$("#" + id + " img").slideDown('fast');

		if (ImgOpened == "") {
			BoxOpened = id;
			ImgOpened = $("#" + id + " img").attr("src");
			setTimeout(function() {
				$(Source + " div").bind("click", OpenCard)
			}, 300);
		} else {
			CurrentOpened = $("#" + id + " img").attr("src");
			if (ImgOpened != CurrentOpened) {
				setTimeout(function() {
					$("#" + id + " img").slideUp('fast');
					$("#" + BoxOpened + " img").slideUp('fast');
					BoxOpened = "";
					ImgOpened = "";
				}, 400);
			} else {
				$("#" + id + " img").parent().css("visibility", "hidden");
				$("#" + BoxOpened + " img").parent().css("visibility", "hidden");
				ImgFound++;
				BoxOpened = "";
				ImgOpened = "";
			}
			setTimeout(function() {
				$(Source + " div").bind("click", OpenCard)
			}, 400);
		}
		Counter++;
		$("#counter").html("" + Counter);

		if (ImgFound == ImgSource.length) {
			$("#counter").prepend('<span id="success">You Found All Pictues With </span>');
		}
	}
}

$(function() {

for (var y = 1; y < 3 ; y++) {
	$.each(ImgSource, function(i, val) {
		$(Source).append("<div id=card" + y + i + "><img src=" + val + " />");
	});
}
	$(Source + " div").click(OpenCard);
	ShuffleImages();
});