class hit_circle {
  constructor() {
    this.y = Math.floor(Math.random() * playarea_window.height());
  	this.x = Math.floor(Math.random() * playarea_window.width());
    this.color = null;
    this.combo_n = null;
    this.size = (400/current_cs)/2;
    this.ar = null;
    this.success = true;

    this.jsquery_Object = null;
    this.generate_jsquery_object();
  }

  generate_jsquery_object() {
    let content_box = $('<div>'); // contains clickable circle and approache circle
    let circle = $('<div class="object_circle centered">');
    let approache_circle = $('<div class="object_approache ">');

    circle.css('height', (400/current_cs)+'px');
    circle.css('width', (400/current_cs)+'px');
    circle.css('background', 'rgba(100,0,0,0.2)');

    approache_circle.css('height', (400/current_cs)+'px');
    approache_circle.css('width', (400/current_cs)+'px');
    approache_circle.css('transition', (8/current_ar)+'s');

    content_box.append(approache_circle);
    content_box.append(circle);
    content_box.css('position', 'absolute');
    content_box.css('top', this.y+'px');
    content_box.css('left', this.x+'px');

    this.jsquery_Object = content_box;
    this.jsquery_Object.find('.object_circle').clicked = this.clicked;
    this.jsquery_Object.hide();

  }

  setOn (target) {
    target.append(this.jsquery_Object);
  }

  async activate() {
    this.jsquery_Object.addClass('object_fadein');
    this.jsquery_Object.show();
    this.jsquery_Object.find('.object_approache').css('transform', 'scale(1)')
    await sleep( ((8/current_ar)*1000)*0.8 );
    this.jsquery_Object.find('.object_circle').on("click", this.clicked );
    await sleep( ((8/current_ar)*1000)*0.2 ); // OD .
    if (!this.success) {
      this.jsquery_Object.find('.object_circle').off("click");
      this.fail();
    }
  }

  clicked () {
    this.success = true;
    alert('SUCCESS');
  }

  fail() {
    alert('FAIL');
  }

}
