
const slider=document.querySelector('.slideshow-contenair')
const slides = document.querySelector('.slide')
const totalSlides = slides.length / 2
let holding=false
let fisrtClickX
let alreadyLeftScroll
let velocity
let rafID

slider.scrollLeft = slider.offsetWidth *  totalSlides


slider.addEventListener('mousedown', e =>{
    holding=true

    fisrtClickX= e.pageX - slider.offsetLeft
    alreadyLeftScroll= slider.scrollLeft
    stopTransition()
})

slider.addEventListener('mousemove', e => {
    if(!holding) return;

    const x =e.pageX - slider.offsetLeft;

    const scrolled = (x - fisrtClickX) *1
    const prevScrollLeft = slider.scrollLeft
    slider.scrollLeft = alreadyLeftScroll - scrolled
    velocity = slider.scrollLeft - prevScrollLeft

    infiniteScroll()

})
slider.addEventListener('mouseup', ()=>{
    holding=false;
    startTransition()

})
slider.addEventListener('mouseleave', ()=>{
    holding=false;
})

function startTransition(){
    stopTransition()

    rafID = requestAnimationFrame(decreasingTransition)
}
function stopTransition(){
    cancelAnimationFrame(rafID)
}

function decreasingTransition(){
    slider.scrollLeft += velocity
    velocity *= 0.95
    infiniteScroll()
    if(Math.abs(velocity)>0.5){
        rafID = requestAnimationFrame(decreasingTransition)
    }
}

slider.addEventListener('touchestart', e =>{
    holding = true
    fisrtClickX = e .targetTouches[0].pageX - 
    slider.offsetLeft
    alreadyLeftScroll = slider.prevScrollLeft
    stopTransition()
})
slider.addEventListener('touchend', ()=>{
    holder = false
    startTransition()
})

// slider.addEventListener('touchmove', e =>{
//     if(!holding) return;
//     const x = e.targetTouches[0].pageX - slider.offsetLeft
//     const scrolled = (x -fisrtClickX) *1
//     const prevScrollLeft = slider.scrollLeft
//     slider.scrollLeft = alreadyLeftScroll - scrolled
//     velocity = slider.scrollLeft - prevScrollLeft

//     infiniteScroll()
// })

function infiniteScroll(){
    const maxScrollLeft = slider.scrollWidth - slider.offsetWidth;
    const slideWidth = slider.offsetWidth / totalSlides
    if (slider.scrollLeft >= maxScrollLeft) {
        slider.scrollLeft = slideWidth
    } else if (slider.scrollLeft <= 0) {
        slider.scrollLeft = maxScrollLeft - slideWidth
    }
}
