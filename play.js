var started = false;

var hitcount = 0;
var failcount = 0;

var success_value = 0;

var current_ar = 1.5;
var current_od = 5;
var current_cs = 4;

$('document').ready(function () {
});
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function start_game() {
	if (!started) {
		started = true;
		$('#play_btn').removeClass('btn-success').addClass('btn-danger').text('Ende');


	} else {
		return
	}

	while (true) {
		spawn_obj();
		await sleep(10000/current_od);
	}


}

function hit(id) {
	var obj = $('#'+id);
	obj.removeClass('hit_object');
	obj.children().remove();
	obj.attr('onclick','');
	obj.attr('id', "");
	obj.css('background-color','');
	obj.addClass('got_hit');
	setTimeout(function () {
		obj.remove();
	}, 500);

	hitcount = hitcount + 1;
	success_value = success_value + 1;
	$('#hit_count').text(hitcount);
	$('#level_count').text(success_value);

}

function score(value) {

	if (success_value == 10) {
		current_ar = 1.3;
		show_message("Level up: AR UP ("+current_ar+")");
	}

	if (success_value == 30) {
		current_ar = 2.0;
		object_count(2);
		show_message("Level up: Pump it up (Objects 2) AR("+current_ar+")");
	}

	if (success_value == 100) {
		current_ar = 1.7;
		show_message("Level up: AR UP ("+current_ar+")");
	}

	if (success_value == 150) {
		current_ar = 1.5;
		show_message("Level up: AR UP ("+current_ar+")");
	}

	if (success_value == 200) {
		current_ar = 2;
		show_message("Level up: Pump it up (Objects 3) AR("+current_ar+")");
		object_count(3);
	}
}

function add_fail() {
	failcount = failcount + 1;
	success_value = Math.floor(success_value - (hitcount/10));

	$('#fail_count').text(failcount);
	$('#level_count').text(success_value);

}

function object_count(ammount) {
	$('.hit_object:visible').remove();

	for(var i=0; i < ammount; i++){
		setTimeout(function () {
			spawn_obj();
		}, current_ar + 2 / ammount);
	}

}

function get_obj_color() {
	let red = Math.floor(Math.random() * 255)
	let green = Math.floor(Math.random() * 255)
	let blue = Math.floor(Math.random() * 255)
	return "rgba("+red+","+green+","+blue+",0.7)"
}

function spawn_obj(id) {

	let main = $('#playarea');

	let height = Math.floor(Math.random() * main.height() - 75/2);
	let width = Math.floor(Math.random() * main.width() - 75/2);

	var h_obj = $('#hit_object').children().clone();

	var obj_id = "btn_id_" + Math.floor(Math.random() * 10000000)

	h_obj.attr('id', obj_id);
	h_obj.attr('onclick', 'hit("'+obj_id+'")');

	// Pos
	h_obj.css('top', height);
	h_obj.css('left', width);

	// Size
	h_obj.css('heigth', (400/current_cs)+"px");
	h_obj.css('width', (400/current_cs)+"px");

	// color and fadein
	h_obj.css('background-color',get_obj_color());
	h_obj.children('.app_circle').css('animation-duration', String(current_ar) + "s");

	main.append(h_obj);

	// didn't hit?
	setTimeout(function () {
		var obj = $('#'+obj_id);
		if (obj.length == 0) {
			return;
		}
		add_fail();
		obj.children().remove();
		obj.attr('onclick','');
		obj.css('z-index','-1');

		obj.addClass('fail_to_hit');
		setTimeout(function () {
			obj.remove();
		}, 2500);

	}, (current_ar + 0.2) * 1000);

}

function show_message(content) {

	let m = $('<h2></h2>');

	var msg_id = "msg_id_" + Math.floor(Math.random() * 100000);
	m.text(content);
	m.attr('id', msg_id);

	$('#message_space').append(m);
	setTimeout(function () {
		$('#'+msg_id).remove();
	}, 2000);

}