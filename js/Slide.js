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

  transition(active) {
    this.slide.style.transition = active ? "transform .3s" : "";
  }

  moveSlide(distX) {
    // Salva valor do movimento e seta no CSS
    this.dist.movePostition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  updatePosition(clientX) {
    // Calcula o valor inicial menos o movimento
    // e aumenta a velocidade
    this.dist.movement = (this.dist.startX - clientX) * 1.6;
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
    this.transition(false);
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
    this.transition(true);
    this.changeSlideOnEnd();
  }

  // Passar slide caso puxe um pouco
  changeSlideOnEnd() {
    if (this.dist.movement > 120 && this.index.next) {
      this.activeNextSlide();
    } else if (this.dist.movement < -120 && this.index.prev !== undefined) {
      this.activePrevSlide();
    } else {
      this.changeSlide(this.index.active);
    }
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

  // ######### SLIDES CONFIG

  slidePosition(slide) {
    // Calcula valor para ficar no centro da tela
    const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin);
  }

  slidesConfig() {
    this.slideArray = [...this.slide.children].map((element) => {
      const position = this.slidePosition(element);
      return { position, element };
    });
  }

  // Identifica primeiro e último slide
  slidesIndexNav(index) {
    const last = this.slideArray.length - 1;
    this.index = {
      prev: index ? index - 1 : undefined,
      active: index,
      next: index === last ? undefined : index + 1,
    };

    console.log(this.index);
  }

  // Definir slide atual
  changeSlide(index) {
    const activeSlide = this.slideArray[index];
    this.moveSlide(activeSlide.position);
    this.slidesIndexNav(index);
    this.dist.finalPosition = activeSlide.position;
  }

  activePrevSlide() {
    if (this.index.prev !== undefined) {
      this.changeSlide(this.index.prev);
    }
  }

  activeNextSlide() {
    if (this.index.next) {
      this.changeSlide(this.index.next);
    }
  }

  init() {
    this.bindEvents("onStart", "onMove", "onEnd");
    this.transition(true);
    this.addSlideEvents();
    this.slidesConfig();
    return this;
  }
}
