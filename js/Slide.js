export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
  }

  onStart(event) {
    event.preventDefault();
    console.log("clicou");
    this.wrapper.addEventListener("mousemove", this.onMove);
  }

  onMove(event) {
    console.log("moveu");
  }

  onEnd(event) {
    console.log("soltou");
    this.wrapper.removeEventListener("mousemove", this.onMove);
  }

  addSlideEvents() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("mouseup", this.onEnd);
  }

  bindEvents(...methods) {
    methods.forEach((method) => {
      this[method] = this[method].bind(this);
    });
  }

  init() {
    this.bindEvents("onStart", "onMove", "onEnd");
    this.addSlideEvents();
    return this;
  }
}
