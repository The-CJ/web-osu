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
