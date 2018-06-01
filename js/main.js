// Global need Vars
var started = false;
var count_hit = 0;
var count_fail = 0;
var count_combo = 0;
var life_bar = 100;

var score = 0;

var mod_auto = false;
var mod_story = false;

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

  reset_game();

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

  playarea_window.html('');

  $('#overlay').css('z-index','1');
  $('#diff_settings').css('z-index','2');
  $('#playarea').css('z-index','0');

  $('.ui-element').removeClass('prepare-start');
  $('#countdown_space').hide();
  $('#stop_button').text('Start: Alt + N');
  $('.ui-element').show();

}

// ----

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
