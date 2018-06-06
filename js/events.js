var current_mouse_pos = {'x':0, 'y':0};
$(document).bind('mousemove',function(mouseMoveEvent){
  current_mouse_pos.x = mouseMoveEvent.pageX;
  current_mouse_pos.y = mouseMoveEvent.pageY;
});

document.addEventListener('keydown', (event) => {

  if (event.altKey && event.key == 'q') {
    init_stop();
  }
  if (event.altKey && event.key == 'n') {
    init_start()
  }
  if (event.key == 'x' || event.key == 'y') {
    document.elementFromPoint(current_mouse_pos.x, current_mouse_pos.y).click();
  }

}, false);

function event_hit(obj) {
  obj.jsquery_Object.addClass('object_hit');

  setTimeout(function () {
    obj.jsquery_Object.remove();
    delete obj;
  }, 200);

  combo_multiplyer = (
    ( 1 / (3/current_ar) ) *
    ( 1 / (3/current_od) ) *
    ( 1 / (3/current_cs) ) *
    ( 1 / (3/current_hp) )
  )
  if (mod_auto) {
    all_objects.shift();
    combo_multiplyer = combo_multiplyer * 0
  }

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

  $('#submitscore').val(score.toLocaleString());


}

function event_show_leaderboard(mode) {

  playarea_window.css('z-index', '-1');
  overlay_window.css('z-index', '-1');
  diff_window.css('z-index', '-1').hide();
  end_window.css('z-index', '-1');
  countdown_window.css('z-index', '-1');
  submit_window.css('z-index', '-1');
  score_window.css('z-index', '100').show();

  if (mode == null) {
    mode_e = "";
  } else if (mode == true) {
    mode_e = "?story=True";
  } else if (mode == false) {
    mode_e = "?story=False";
  }

  $('label[for=leaderb]').text(mode ? 'Story' : 'Endless');

  $.get('http://phaaze.net/api/games/webosu'+mode_e).done(function (data) {
    let x = score_window.find('.content_').html('');
    data['data'].sort(function (a, b) {
      if (parseInt(a['score']) < parseInt(b['score'])) {return 1;}
      else {return -1}
    })
    var t = 1;
    for (entry of data['data']) {
      if (t >= 10) {
        return;
      }
      let e = $('<div class="row"><div class="col m text-right"><h3></h3></div><div class="col n text-right"><h3></h3></div><div class="col s"><h3></h3></div><div>');
      e.find('.n h3').text(entry['name']);
      let al = parseInt(entry['count_hit']) + parseInt(entry['count_fail']);
      let combo_c = ' (' + entry['highest_combo'] + "/" + al + ")";
      let acc_c = " ["+ Number(entry['count_hit']*100/al).toFixed(2)+"%]";
      e.find('.m h3').text('#'+t + combo_c + acc_c);
      e.find('.s h3').text(Math.round(Number(entry['score'])).toLocaleString() );
      x.append(e);
      t = t + 1;
    }
  })

}
