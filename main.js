const listImage = document.querySelector('.list-images');
const imgs = document.getElementsByTagName('img');
const btnLeft = document.querySelector('.btn-left');
const btnRight = document.querySelector('.btn-right');
const length = imgs.length;
let current = 0;
let isTransitioning = false;

// Clone the first image and append it to the end of the list
const firstImageClone = imgs[0].cloneNode(true);
listImage.appendChild(firstImageClone);

const handleChangeSlide = (direction = 1) => {
    if (isTransitioning) return; // Prevent new transitions while one is ongoing

    let width = imgs[0].offsetWidth;
    isTransitioning = true;

    current += direction;

    listImage.style.transition = 'transform 0.5s ease';
    listImage.style.transform = `translateX(${width * -1 * current}px)`;

    if (current === length) {
        // When the last slide is reached, quickly reset to the first slide without transition
        setTimeout(() => {
            listImage.style.transition = 'none';
            listImage.style.transform = `translateX(0px)`;
            current = 0;
            updateActiveIndicator(current);
        }, 500);
    } else {
        updateActiveIndicator(current);
    }

    setTimeout(() => {
        isTransitioning = false;
    }, 500);
};

const updateActiveIndicator = (currentIndex) => {
    document.querySelector('.active').classList.remove('active');
    document.querySelector('.index-item-' + (currentIndex % length)).classList.add('active');
};

let handleEventChangeSlide = setInterval(() => handleChangeSlide(1), 4000);

btnRight.addEventListener('click', () => {
    clearInterval(handleEventChangeSlide);
    handleChangeSlide(1);
    handleEventChangeSlide = setInterval(() => handleChangeSlide(1), 4000);
});

btnLeft.addEventListener('click', () => {
    clearInterval(handleEventChangeSlide);
    if (current === 0) {
        current = length;
        listImage.style.transition = 'none';
        let width = imgs[0].offsetWidth;
        listImage.style.transform = `translateX(${width * -1 * current}px)`;
    }
    handleChangeSlide(-1);
    handleEventChangeSlide = setInterval(() => handleChangeSlide(1), 4000);
});
