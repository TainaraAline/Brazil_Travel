// Functions to add the images on the carousel
// The first one is to read data from json
async function getCarouselImages() {
    const response = await fetch("/assets/js/carouselImages.json")

    return response.json()
}

// This one is to effectively add the images
async function addCarouselImages(){
    const carouselUl = document.querySelector(".glide__slides")
    // const bulletContainer = document.querySelector(".glide__bullets")

    const images = await getCarouselImages()

    images.forEach((image, index) => {
        const item = document.createElement('li')
        item.classList.add('glide__slide')

        const img = document.createElement('img')
        img.classList.add('glide__image')
        img.src = `/assets/images/${image.file}`
        img.alt = image.name

        item.appendChild(img)
        carouselUl.appendChild(item)

        // const bullet = document.createElement('button')
        // bullet.classList.add('glide__bullet')
        // bullet.dataset.glideDir = `=${index}`
        // bulletContainer.appendChild(bullet)
    })
}

// Functions from libraries and other implementations that needs to wait the page load to run
document.addEventListener("DOMContentLoaded", async function () {
    await addCarouselImages()
    
    // Glide library to make the carousel functional
    new Glide('.glide', {
        type: 'carousel',
        startAt: 0,
        perView: 1,
        autoplay: 4000,
        hoverpause: true,
        animationDuration: 800,
        animationTimingFunc: 'ease-in-out',
    }).mount();

    // Initialize Animate on Scroll
    AOS.init();

    // Micromodal initialization
    MicroModal.init();

    // Prevent the normal actions of form
    document.querySelector("form").addEventListener('submit', (event) => {
        event.preventDefault()
    })
});