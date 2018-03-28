var started = false;

var hitcount = 0;
var failcount = 0;
var combocount = 0;

var mod_auto = false;
var auto_courser_positions = [];

var generated_obj = 0;
var generated_color = "";
var new_combo = 1;

var combo_multiplyer = 1;

var current_ar = 4;
var current_od = 4;
var current_cs = 4;

$('document').ready(function () {
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function restart_game() {
  hitcount = 0;
  failcount = 0;
  combocount = 0;
  generated_obj=0;
  $('#level_count').text("0");
  $('#hit_count').text(hitcount);
	$('#combo_count').text(combocount);
  $('#fail_count').text(failcount);
}

async function start_game() {
	if (!started) {
		started = true;
    auto_courser_positions = []
    $('#play_btn').removeClass('btn-success').addClass('btn-danger').text('Stop');
    if (mod_auto) {
      $('#auto_courser').show();
    } else {
      $('#auto_courser').hide();
    }

	} else {
    started = false;
    auto_courser_positions = []
    $('#play_btn').removeClass('btn-danger').addClass('btn-success').text('Restart');
    $('.hit_main_class:visible').remove();
    $('#auto_courser').hide();
    return;
	}


  restart_game();
  current_ar = $('#AR').val();
  current_od = $('#OD').val();
  current_cs = $('#CS').val();

	while (started) {
		spawn_obj();
		await sleep(4000/current_od);
	}


}

function score_update() {
  let old_score = parseInt($('#level_count').text());
  let combo = parseInt($('#combo_count').text());
  add_ = (300 * ((100+combo-1)/100)) * combo_multiplyer;
  new_score = Math.floor(old_score + add_);

  $('#level_count').text(new_score);
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
		obj.parent().remove();
	}, 500);

  hitcount = hitcount + 1;
	combocount = combocount + 1;
	$('#hit_count').text(hitcount);
	$('#combo_count').text(combocount);
  score_update();
  if (mod_auto) {
    auto_courser_positions.shift();
    next_auto_target();
  }
}

function hit_fail() {
	failcount = failcount + 1;
  combocount = 0;

  $('#fail_count').text(failcount);
	$('#combo_count').text(combocount);

}

function get_obj_color() {
  new_combo = Math.floor(Math.random() * 10);
  if (new_combo < 6) {
    return generated_color;
  }
	let red = Math.floor(Math.random() * 255)
	let green = Math.floor(Math.random() * 255)
	let blue = Math.floor(Math.random() * 255)
  generated_color = "rgba("+red+","+green+","+blue+",0.7)"
	return generated_color
}

function spawn_obj(id) {

	let main = $('#playarea');

	let height = Math.floor(Math.random() * main.height() - (400/current_cs)/2);
	let width = Math.floor(Math.random() * main.width() - (400/current_cs)/2);

	var h_obj = $('#hit_object').children().clone();

	var obj_id = "btn_id_" + Math.floor(Math.random() * 10000000);

	h_obj.children('.hit_object').attr('id', obj_id);

	// Pos
	h_obj.css('top', height);
	h_obj.css('left', width);

  auto_courser_positions.push({'h':height,'w':width});
  next_auto_target();

  // higher than old obj
  h_obj.children('.hit_object').css('z-index', (100000-generated_obj));

	// Size
  h_obj.children().css('height', (400/current_cs)+"px");
	h_obj.children().css('width', (400/current_cs)+"px");

	// color and fadein
	h_obj.children('.hit_object').css('background-color',get_obj_color());
	h_obj.children('.app_circle').css('animation-duration', String(5/current_ar) + "s");

  generated_obj = generated_obj + 1
	main.append(h_obj);
  if (generated_obj > 90000) {
    generated_obj = 1;
  }

  // hit
  if (mod_auto) {
    setTimeout(function () {
      h_obj.children('.hit_object').click();
    },(5/current_ar) * 1000);
  }

  // un-lock
	setTimeout(function () {
    h_obj.children('.hit_object').attr('onclick', 'hit("'+obj_id+'")');
  	h_obj.children('.hit_object').attr('onkeydown', 'console.log(this)');


	}, (5/current_ar - 0.4) * 1000);

  // didn't hit?
	setTimeout(function () {
		var obj = $('#'+obj_id);
		if (obj.length == 0) {
			return;
		}
		hit_fail();
		obj.children().remove();
    obj.attr('onclick','');
		obj.attr('onkeydown','');
		obj.css('z-index','-1');

		obj.addClass('fail_to_hit');
		setTimeout(function () {
			obj.parent().remove();
		}, 950);

	}, (5/current_ar + 0.2) * 1000);

}

function next_auto_target() {
  if (!auto_courser_positions[0]) {
    return ;
  }
  let now = auto_courser_positions[0];
  let adjustment = 1;
  if (parseInt(current_ar) > parseInt(current_od)) {
    adjustment = current_ar - current_od;
  }
  $('#auto_courser').css('transition', (4/current_od) * (1/adjustment) + "s linear");
  $('#auto_courser').css('top', ( parseInt(now['h'])+(400/current_cs/2)-10) ).css('left', ( parseInt(now['w'])+(400/current_cs/2)-10) );
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