// Functions to add the images on the carousel
// The first one is to read data from json
async function getCarouselImages() {
    const response = await fetch("./assets/js/carouselImages.json")

    return response.json()
}

// This one is to effectively add the images
async function addCarouselImages(){
    const carouselUl = document.querySelector(".glide__slides")

    const images = await getCarouselImages()

    images.forEach((image) => {
        const item = document.createElement('li')
        item.classList.add('glide__slide')
        item.innerHTML = `
            <div class="glide__card">
                <img src="./assets/images/${image.file}" alt="${image.name}" class="glide__image" />
                <h5 class="glide__card-title">${image.name}</h5>
            </div>
        `

        carouselUl.appendChild(item)
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

    // Setting up Cleave Zen input format
    const { formatDate } = window.cleaveZen

    const startDateInput = document.querySelector("#start_date")
    const endDateInput = document.querySelector("#end_date")
    
    startDateInput.addEventListener('input', e => {
        startDateInput.value = formatDate(e.target.value, {
            datePattern: ["d", "m", "y"]
        })
    })

    endDateInput.addEventListener('input', e => {
        endDateInput.value = formatDate(e.target.value, {
            datePattern: ["d", "m", "y"]
        })
    })
    
    // Prevent the normal actions of form
    document.querySelector(".contact_form").addEventListener('submit', (event) => {
        event.preventDefault()

        MicroModal.show('modal')
    })
});