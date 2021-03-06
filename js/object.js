var screen_size = 1;

class hit_circle {
  constructor() {
    this.y = Math.floor(Math.random() * playarea_window.height());
  	this.x = Math.floor(Math.random() * playarea_window.width());
    this.size = (400/current_cs)/2;
    this.success = false;

    this.jsquery_Object = null;
    this.generate_jsquery_object();
  }

  generate_jsquery_object() {
    let content_box = $('<div>'); // contains clickable circle and approache circle
    let circle = $('<div class="object_circle centered">');
    let approache_circle = $('<div class="object_approache ">');

    if ($(document).height() > $(document).width()) {
      screen_size = 1 * $(document).width() / screen.width;
    } else {
      screen_size = 1 * $(document).height() / screen.height;
    }

    circle.css('height', (400/current_cs*screen_size)+'px');
    circle.css('width', (400/current_cs*screen_size)+'px');
    let circle_style = get_circle_style();
    circle.css('background', circle_style.color);
    circle.append( $('<p class="object_inner centered">').text(circle_style.number) );
    circle.find('.object_inner').css( 'font-size', ((400/current_cs)*0.50*screen_size)+'px' )

    approache_circle.css('height', (400/current_cs*screen_size)+'px');
    approache_circle.css('width', (400/current_cs*screen_size)+'px');
    approache_circle.css('transition', (8/current_ar)+'s');

    content_box.append(approache_circle);
    content_box.append(circle);
    content_box.css('position', 'absolute');
    content_box.css('top', this.y+'px');
    content_box.css('left', this.x+'px');

    this.jsquery_Object = content_box;
    this.jsquery_Object.hide();

  }

  setOn (target) {
    target.prepend(this.jsquery_Object);
  }

  async activate() {
    if (mod_auto) {
      all_objects.push( this );
    }

    this.jsquery_Object.addClass('object_fadein');
    this.jsquery_Object.show();
    this.jsquery_Object.find('.object_approache').css('transform', 'scale(1)')

    // Make object clickable
    await sleep( ((8/current_ar)*1000)*0.8 );
    this.jsquery_Object.find('.object_circle').on("click", this.clicked_wrapper(this) );
    if (mod_auto) {
      await sleep( ((8/current_ar)*1000)*0.15 );
      this.jsquery_Object.find('.object_circle').click();3
    }

    // After some time, when object got not hit, it counts as failed.
    await sleep( ((8/current_ar)*1000)*0.3 );
    if (!this.success) {
      this.jsquery_Object.find('.object_circle').off("click");
      this.fail();
    }
  }

  clicked_wrapper (obj) {

    return function clicked() {
      if (!started) { return; }

      if (obj.succes) {
        return; // already hit
      }
      obj.success = true;
      return event_hit(obj);
    }

  }

  fail() {
    if (!started) { return; }
    return event_fail(this);
  }

}
