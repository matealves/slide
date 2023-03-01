export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.dist = {
      finalPosition: 0,
      startX: 0,
      movement: 0,
    };
  }

  moveSlide(distX) {
    // Salva valor do movimento e seta no CSS
    this.dist.movePostition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  updatePosition(clientX) {
    // Calcula o valor inicial menos o movimento
    // e aumenta a velocidade
    this.dist.movement = (this.dist.startX - clientX) * 1.3;
    return this.dist.finalPosition - this.dist.movement;
  }

  onStart(event) {
    let movetype;
    if (event.type === "mousedown") {
      event.preventDefault();
      // Salva a posição inicial no momento do clique
      this.dist.startX = event.clientX;
      movetype = "mousemove";
    } else {
      // Salva a posição inicial no momento do TOUCH
      this.dist.startX = event.changedTouches[0].clientX;
      movetype = "touchmove";
    }

    this.wrapper.addEventListener(movetype, this.onMove);
  }

  onMove(event) {
    // Verifica qual evento deve ser pego a posição atual
    const pointerPosition =
      event.type === "mousemove"
        ? event.clientX
        : event.changedTouches[0].clientX;
    const finalPosition = this.updatePosition(pointerPosition);
    this.moveSlide(finalPosition);
  }

  onEnd(event) {
    const moveType = event.type === "mouseup" ? "mousemove" : "touchmove";
    this.wrapper.removeEventListener(moveType, this.onMove);
    // Salva a posição final no momento que solta o clique
    this.dist.finalPosition = this.dist.movePostition;
  }

  addSlideEvents() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("touchstart", this.onStart);
    this.wrapper.addEventListener("mouseup", this.onEnd);
    this.wrapper.addEventListener("touchend", this.onEnd);
  }

  // Referencia o objeto como this, na função de callback
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
