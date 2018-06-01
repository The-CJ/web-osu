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

  // TODO: regenerate life bar

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

  // TODO: hurt life bar

}
