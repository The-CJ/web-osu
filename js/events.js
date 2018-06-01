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

  // TODO: add score, combo and more

}

function event_fail(obj) {
  obj.jsquery_Object.addClass('object_fail');
  setTimeout(function () {
    obj.jsquery_Object.remove();
    delete obj;
  }, 300);

  

}
