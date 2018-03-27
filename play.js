var started = false;

var hitcount = 0;
var failcount = 0;
var combocount = 0;

var success_value = 0;

var current_ar = 1;
var current_od = 5;
var current_cs = 3;

$('document').ready(function () {
});
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function start_game() {
	if (!started) {
		started = true;
    $('#play_btn').removeClass('btn-success').addClass('btn-danger').text('Stop');

	} else {
    started = false;
    $('#play_btn').removeClass('btn-danger').addClass('btn-success').text('Restart');
	}

	while (started) {
		spawn_obj();
		await sleep(4000/current_od);
	}


}

function hit(id) {
	var obj = $('#'+id);
	obj.removeClass('hit_object');
	obj.siblings().remove();
	obj.attr('onclick','');
	obj.attr('id', "");
	obj.css('background-color','');
	obj.addClass('got_hit');
	setTimeout(function () {
		obj.remove();
	}, 500);

  hitcount = hitcount + 1;
	combocount = combocount + 1;
	success_value = success_value + 1;
	$('#hit_count').text(hitcount);
  $('#level_count').text(success_value);
	$('#combo_count').text(combocount);

}

function hit_fail() {
	failcount = failcount + 1;
  combocount = 0;

  $('#fail_count').text(failcount);
	$('#combo_count').text(combocount);

}

function get_obj_color() {
	let red = Math.floor(Math.random() * 255)
	let green = Math.floor(Math.random() * 255)
	let blue = Math.floor(Math.random() * 255)
	return "rgba("+red+","+green+","+blue+",0.7)"
}

function spawn_obj(id) {

	let main = $('#playarea');

	let height = Math.floor(Math.random() * main.height() - (400/current_cs)/2);
	let width = Math.floor(Math.random() * main.width() - (400/current_cs)/2);

	var h_obj = $('#hit_object').children().clone();

	var obj_id = "btn_id_" + Math.floor(Math.random() * 10000000)

	h_obj.children('.hit_object').attr('id', obj_id);
	h_obj.children('.hit_object').attr('onclick', 'hit("'+obj_id+'")');

	// Pos
	h_obj.css('top', height);
	h_obj.css('left', width);

	// Size
	h_obj.children().css('height', (400/current_cs)+"px");
	h_obj.children().css('width', (400/current_cs)+"px");

	// color and fadein
	h_obj.children('.hit_object').css('background-color',get_obj_color());
	h_obj.children('.app_circle').css('animation-duration', String(5/current_ar) + "s");

	main.append(h_obj);

	// didn't hit?
	setTimeout(function () {
		var obj = $('#'+obj_id);
		if (obj.length == 0) {
			return;
		}
		hit_fail();
		obj.children().remove();
		obj.attr('onclick','');
		obj.css('z-index','-1');

		obj.addClass('fail_to_hit');
		setTimeout(function () {
			obj.parent().remove();
		}, 2500);

	}, (5/current_ar + 0.2) * 1000);

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