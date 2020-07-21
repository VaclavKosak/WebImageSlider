namespace Web {
    export class SliderController {
        private leftArrowClass = "slider__button--left";
        private rightArrowClass = "slider__button--right";

        private slides: HTMLCollectionOf<Element>;

        private currentSlide: number;
        private allSlides: number;

        private speed: number;

        constructor() {
            this.init();
        }

        private init(): void {
            // Add event listener for arrows
            this.initArrows();

            // Get slider items
            this.slides = document.getElementsByClassName("slider__items__img");
            // Number of items
            this.allSlides = this.slides.length;
            // index of first item
            this.currentSlide = 0;
            // Show first item
            this.slides[this.currentSlide].classList.add("slider__items__img--active");

            // Set slider speed
            this.speed = 5000;

            // Init auto slider scroll. Function call function autoSlide after every this.speed time
            setInterval(this.autoSlide.bind(this), this.speed);
        }

        private initArrows(): void {
            document.getElementsByClassName(this.leftArrowClass)[0].addEventListener("click", this.clickLeftArrow.bind(this));
            document.getElementsByClassName(this.rightArrowClass)[0].addEventListener("click", this.clickRightArrow.bind(this));
        }

        private clickLeftArrow(): void {
            // Go to left side
            this.changeSlide((this.currentSlide - 1));
        }

        private clickRightArrow(): void {
            // Go to right side
            this.changeSlide((this.currentSlide + 1));
        }

        private changeSlide(change:number): void {
            // Check, if next item is not in range
            if (Math.abs(change) >= this.allSlides) {
                change = change % this.allSlides;
            }
            if (change < 0) {
                change = this.allSlides - Math.abs(change);
            }
            // remove class from old item
            this.slides[this.currentSlide].classList.remove("slider__items__img--active");
            // update current slide index
            this.currentSlide = change;
            // add class to new item
            this.slides[this.currentSlide].classList.add("slider__items__img--active");
        }

        private autoSlide(): void {
            // Go to right side
            this.changeSlide((this.currentSlide + 1));
        }
    }
}