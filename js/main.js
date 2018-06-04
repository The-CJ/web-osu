// Global need Vars
var started = false;
var count_hit = 0;
var count_fail = 0;
var count_combo = 0;
var count_highest_combo = 0;
var life_bar = 100;

var score = 0;

var mod_auto = false;
var mod_story = false;
var story_diff = 0;

var combo_multiplyer = 1;

var current_ar = 3;
var current_od = 3;
var current_cs = 3;
var current_hp = 3;

var current_combo_number = 0;
var current_combo_color = {'r':255, 'g':0, 'b':0};

var playarea_window = $('#playarea');
var overlay_window = $('#overlay');
var diff_window = $('#diff_settings');
var end_window = $('#endscreen');
var countdown_window = $('#countdown_space');
var submit_window = $('#score_submit');

var all_objects = [];

// Functions

function init_start() {

  if (started) {
    show_message('Allready Running');
    return;
  } else {
    started = true;
  }

  reset_game();

  if ($('#button_story').is(':checked')) {
    mod_story = true;
    show_message('Story Mode enabled');
    show_message('User Diff. setting get ignored');
  }

  if ($('#button_auto').is(':checked')) {
    mod_auto = true;
  }

  end_window.hide();
  overlay_window.css('opacity', '1');
  overlay_window.css('z-index','-1');
  diff_window.css('z-index','-2');
  playarea_window.css('z-index','100');

  $('.lifebar').css('opacity', '1');
  $('.inner_lifebar').css('transition', '3s');
  $('.inner_lifebar').css('width', '100%');

  $('#stop_button').text('Stop: Alt + Q');

  $('.ui-element').addClass('prepare-start');
  countdown_window.hide();

  async function f() {
    for (var i = 3; i >= 1; i--) {
      countdown_window.text(i);
      await sleep(1000);
    }
    countdown_window.text('Go');
    await sleep(750);
    countdown_window.hide();
    start_game();
  }

  setTimeout(function () {
    $('.ui-element').hide();
    countdown_window.show();
    f();
  }, 1000);
}

function init_stop() {
  started = false;

  playarea_window.html('');

  end_window.hide();

  submit_window.hide();
  overlay_window.css('opacity', '0');
  overlay_window.css('z-index','1');
  playarea_window.css('z-index','0');
  diff_window.css('z-index','2');
  countdown_window.hide();

  $('.inner_lifebar').css('transition', '3s');
  $('.inner_lifebar').css('width', '0%');
  $('.lifebar').css('opacity', '0');

  $('.ui-element').removeClass('prepare-start');
  $('#stop_button').text('Start: Alt + N');
  $('.ui-element').show();

}
