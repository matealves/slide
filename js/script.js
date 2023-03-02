import { SlideNav } from "./Slide.js";

const slide = new SlideNav(".slide", ".slide-wrapper");
slide.init();

slide.addArrow(".prev", ".next");

slide.addControl(".custom-controls");
