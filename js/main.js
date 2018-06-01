// Global need Vars
var started = false;
var count_hit = 0;
var count_fail = 0;
var count_combo = 0;
var life_bar = 1000;

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
