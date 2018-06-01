async function start_game() {

  current_ar = $('#AR').val();
  current_od = $('#OD').val();
  current_cs = $('#CS').val();
  current_hp = $('#HP').val();

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

  object_on_screen = [];

  $('#score_count').text('0');
  $('#hit_count').text('0');
  $('#fail_count').text('0');
  $('#combo_count').text('0');
  // TODO: lifebar update
}
