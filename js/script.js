import Slide from "./Slide.js";

const slide = new Slide(".slide", ".slide-wrapper");
slide.init();
console.log(slide);

slide.changeSlide(3);
