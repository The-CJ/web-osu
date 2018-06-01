// Global need Vars
var started = false;
var count_hit = 0;
var count_fail = 0;
var count_combo = 0;

var mod_auto = false;
var combo_multiplyer = 1;

var current_ar = 3;
var current_od = 3;
var current_cs = 3;
var current_hp = 3;

var playarea_window = $('#playarea');

// Functions

function init_start() {

  if (started) {
    show_message('Allready Running');
    return;
  } else {
    started = true;
  }

  $('#overlay').css('z-index','-1');
  $('#diff_settings').css('z-index','-2');
  $('#playarea').css('z-index','100');
  $('#stop_button').text('Stop: Alt + Q');

  $('.ui-element').addClass('prepare-start');
  var countdown = $('#countdown_space').hide();

  async function f() {
    for (var i = 3; i >= 1; i--) {
      countdown.text(i);
      await sleep(1000);
    }
    countdown.text('Go');
    await sleep(750);
    countdown.hide();
    start_game();
  }

  setTimeout(function () {
    $('.ui-element').hide();
    countdown.show();
    f();
  }, 1000);
}

function init_stop() {
  if (!started) {
    show_message('Allready stopped');
    return;
  } else {
    started = false;
  }

  $('#overlay').css('z-index','1');
  $('#diff_settings').css('z-index','2');
  $('#playarea').css('z-index','0');

  $('.ui-element').removeClass('prepare-start');
  $('#countdown_space').hide();
  $('#stop_button').text('Start: Alt + N');
  $('.ui-element').show();

}

// ----

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
	obj.children().remove();
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

function get_circle_style() {
  new_combo = Math.floor(Math.random() * 10);
  if (new_combo < 6) {
    generated_style.number = generated_style.number + 1;
    return generated_style;
  }
	let red = Math.floor(Math.random() * 255)
	let green = Math.floor(Math.random() * 255)
	let blue = Math.floor(Math.random() * 255)
  generated_style.number = 1;
  generated_style.color = "rgba("+red+","+green+","+blue+",0.7)"
	return generated_style
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
  h_obj.children('.hit_object').children('div').css('font-size', (150*5/current_cs)+'%');
  h_obj.children().css('height', (400/current_cs)+"px");
  h_obj.children().css('width', (400/current_cs)+"px");

	// color and fadein
  let s = get_circle_style()
  h_obj.children('.hit_object').css('background-color',s.color);
	h_obj.children('.hit_object').children('div').text(s.number);
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
