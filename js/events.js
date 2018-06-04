document.addEventListener('keydown', (event) => {

  if (event.altKey && event.key == 'q') {
    init_stop();
  }
  if (event.altKey && event.key == 'n') {
    init_start()
  }
  if (event.altKey && event.key == 's') {
    console.log('S');
  }

}, false);

function event_hit(obj) {
  obj.jsquery_Object.addClass('object_hit');

  setTimeout(function () {
    obj.jsquery_Object.remove();
    delete obj;
  }, 200);

  score += 300 * (count_combo/100+1) * combo_multiplyer;
  $('#score_count').text(Math.round(score));

  count_hit += 1;
  $('#hit_count').text(count_hit);

  count_combo += 1;
  $('#combo_count').text(count_combo);
  if (count_combo > count_highest_combo) {
    count_highest_combo = count_combo;
  }

  life_bar = life_bar + (1 * current_hp / 0.75  * (count_combo+1 / 10));

}

function event_fail(obj) {
  obj.jsquery_Object.addClass('object_fail');

  setTimeout(function () {
    obj.jsquery_Object.remove();
    delete obj;
  }, 300);

  count_fail += 1;
  $('#fail_count').text(count_fail);

  count_combo = 0;
  $('#combo_count').text('0');

  life_bar = life_bar - (1 * current_hp);

}

function event_gameover() {
  started = false;
  playarea_window.html('');

  overlay_window.css('z-index', '-1');
  end_window.css('z-index', '100');
  diff_window.hide();
  playarea_window.css('z-index', '-1');
  $('.lifebar').css('opacity', '0');

  // show endscreen with results
  let e = end_window.show();

  e.find('#end_combo').text(count_highest_combo);
  e.find('#end_hit').text(count_hit);
  e.find('#end_miss').text(count_fail);
  e.find('#end_acc').text(Number( (100 * count_hit) / (count_hit+count_fail) ).toFixed(1)+"%");
  e.find('#end_score').text(Number(Math.round(score)).toLocaleString());

}

function event_submit() {

  end_window.css('z-index', '-1').hide();
  submit_window.css('z-index', '100').show();

  $('#submitscore').val(score);


}
