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
    this.dist.movement = (this.dist.startX - clientX) * 1.5;
    return this.dist.finalPosition - this.dist.movement;
  }

  onStart(event) {
    event.preventDefault();
    // Salva a posição inicial no momento do clique
    this.dist.startX = event.clientX;
    this.wrapper.addEventListener("mousemove", this.onMove);
  }

  onMove(event) {
    const finalPosition = this.updatePosition(event.clientX);
    this.moveSlide(finalPosition);
  }

  onEnd(event) {
    this.wrapper.removeEventListener("mousemove", this.onMove);
    // Salva a posição final no momento que solta o clique
    this.dist.finalPosition = this.dist.movePostition;
  }

  addSlideEvents() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("mouseup", this.onEnd);
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
