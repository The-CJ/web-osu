async function start_game() {

  current_ar = $('#AR').val();
  current_od = $('#OD').val();
  current_cs = $('#CS').val();
  current_hp = $('#HP').val();

	while (started) {
    // make live ajustments to playfield
    playarea_window.css('padding-bottom', (400/current_cs)+'px');
    playarea_window.css('padding-right', (400/current_cs)+'px');

    let x = new hit_circle();
    x.setOn(playarea_window);
    x.activate();
		// spawn_obj();
		await sleep(4000/current_od);
	}


}
