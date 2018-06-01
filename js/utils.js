function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function hard_mode(active) {

  if (active) {
    $('#diff_settings input[type=range]').attr('max', 300);
    $('#diff_settings').css('border','5px solid red')
  }
  else {
    $('#diff_settings input[type=range]').attr('max', 20);
    $('#diff_settings').css('border',' 3px solid white')
  }

}

function story_mode(active) {

  if (active) {
    mod_story = true;
    $('#story_settings').collapse('show');
  } else {
    mod_story = false;
    $('#story_settings').collapse('hide');
  }

}

function enable_auto(active) {

  if (active) {
    mod_auto = true;
    $('#diff_settings').css('background', 'rgba(0,0,255,0.2)');
  } else {
    mod_auto = false;
    $('#diff_settings').css('background', 'none');
  }

}

function show_message(content) {

  var m = $('<h2 class="message">');
  m.text(content);
  var rand_id = Math.floor(Math.random() * 100000);
  console.log(rand_id);
  m.attr('id', 'message_'+rand_id);

  $('#message_space').append(m);

  setTimeout(function () {
    $('#message_'+rand_id).remove();
  }, 5000);

}

function update_multiplyer(field, value) {

  var def = 3; // default diff.

  var x = Number(Number(1 / (def / value)).toFixed(2));

  $('#multi_'+field).text(x);

  var t = (
    ( 1 / ( 3 / $('#AR').val() ) ) *
    ( 1 / ( 3 / $('#OD').val() ) ) *
    ( 1 / ( 3 / $('#CS').val() ) ) *
    ( 1 / ( 3 / $('#HP').val() ) )
  );
  t = Number(Number(t).toFixed(2));

  if (mod_auto) {
    t = t * 0;
  }

  $('#combo_multiplyer').text(t);

}
