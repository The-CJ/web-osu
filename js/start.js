async function start_game() {

  current_ar = $('#AR').val();
  current_od = $('#OD').val();
  current_cs = $('#CS').val();
  current_hp = $('#HP').val();

  story_diff = $('input[name=story_diff]:checked').val();

  if (mod_story) {
    current_ar = 2;
    current_od = 2;
    current_cs = 2;
    current_hp = 2;

    start_story();
  }

  lifebar_drain();

  combo_multiplyer = (
    ( 1 / (3/current_ar) ) *
    ( 1 / (3/current_od) ) *
    ( 1 / (3/current_cs) ) *
    ( 1 / (3/current_hp) )
  )

  if (mod_auto) { combo_multiplyer = combo_multiplyer * 0; }

	while (started) {
    // make live ajustments to playfield
    playarea_window.css('padding-bottom', (400/current_cs)+'px');
    playarea_window.css('padding-right', (400/current_cs)+'px');

    let x = new hit_circle();
    x.setOn(playarea_window);
    x.activate();
		await sleep(4000/current_od);
	}

}

function spawn_new_object() {
  // debug fuction
  let x = new hit_circle();
  x.setOn(playarea_window);
  x.activate();
}

function reset_game() {
  count_hit = 0;
  count_fail = 0;
  count_combo = 0;
  life_bar = 100;
  score = 0;
  current_combo_number = 0;
  count_highest_combo = 0;

  object_on_screen = [];

  $('#score_count').text('0');
  $('#hit_count').text('0');
  $('#fail_count').text('0');
  $('#combo_count').text('0');
  // TODO: lifebar update
}

async function start_story() {

  for (var level = 1; level <= 10; level++) {

    await sleep(750*60*(level/5) );

    current_ar += (0.5 * story_diff);
    current_od += (0.5 * story_diff);
    current_cs += (0.2 * story_diff);
    current_hp += (0.7 * story_diff);

    show_message('Level: '+(level);
    show_message('AR: ' + current_ar.toFixed(1) + "(+"+(0.4 * story_diff).toFixed(1)+")" );
    show_message('OD: ' + current_od.toFixed(1) + "(+"+(0.4 * story_diff).toFixed(1)+")" );
    show_message('CS: ' + current_cs.toFixed(1) + "(+"+(0.1 * story_diff).toFixed(1)+")" );
    show_message('HP: ' + current_hp.toFixed(1) + "(+"+(0.7 * story_diff).toFixed(1)+")" );

  }

  await sleep(750*60*2 );

  started = false;

  await sleep(1500);
  event_gameover();

}
