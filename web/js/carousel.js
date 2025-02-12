// carousel.js
const carouselImages = document.querySelectorAll('.carousel-item img');
const modalImage = document.getElementById('modalImage');

carouselImages.forEach(image => {
    image.addEventListener('click', function () {
        modalImage.src = this.src; 
    });
});

const newImages = [
    './media/imagen1.png',
    './media/imagen2.png',
    './media/imagen3.png'
];
let currentImageIndex = 0;

function updateModalImage(index) {
    const modalImage = document.getElementById('modalImage');
    modalImage.src = newImages[index];
}

carouselImages.forEach((image, index) => {
    image.addEventListener('click', function () {
        currentImageIndex = index;
        updateModalImage(currentImageIndex);
    });
});

const changeImagesBtn = document.getElementById('changeImagesBtn');

changeImagesBtn.addEventListener('click', function () {
    currentImageIndex = (currentImageIndex + 1) % newImages.length; 
    updateModalImage(currentImageIndex);
});
