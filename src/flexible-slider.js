(function(factory , undefined){
  
    if(typeof window != 'undefined')
      window.FlexibleSlider = factory()
    else if(typeof exports == 'object'  )
      modules.exports.FlexibleSlider = factory()  
    
  })(function(){
    
     let FlexibleSlider = function(opts){
       this.settings = Object.assign({}, flxSlider.defaults, opts)
       
       if( typeof opts.slider == "string" )
          this.slider = document.querySelector(opts.slider)
        else if(opts.slider instanceof HTMLElement)
          this.slider = opts.slider
       
       this.slides = Array.from(this.slider.children)
       this.currentIndex = 0
       
       this.waitInterval = null
       this.animationInterval = null
       
       this.currentSlide = null
       this.prevSlide = null
       
       this.isAnimating = false
       
       this.init()
     }
      
     FlexibleSlider.prototype.init = function(){
       let c = this.settings.classes
       if(this.slides.length){
         
         this.slider.classList.add(c.slider)       
         this.slider.classList.add(c.modes[this.settings.mode])
         
         this.slides.forEach(slide => {
           slide.classList.add(c.slide.all)
         })
         
         this.currentSlide = this.slides[this.currentIndex++]
         this.currentSlide.classList.add(c.slide.active)
  
         // sliderWrapper
         this.sliderWrapper = document.createElement('div')
         this.sliderWrapper.classList.add(c.sliderWrapper)
         
         // slider inner
         this.sliderInner = document.createElement('div')
         this.sliderInner.classList.add(c.sliderInner)
         
         let parent = this.slider.parentNode
         parent.replaceChild(this.sliderWrapper, this.slider)
         
         this.sliderWrapper.appendChild(this.sliderInner)
         this.sliderInner.appendChild(this.slider)
                
         if(this.settings.autoplay){
           this.waitInterval = setTimeout(()=>{
              this.next()           
           }, this.settings.wait)
         }
         
       }
     }
    
     
     FlexibleSlider.prototype.next = function(){
        let c = this.settings.classes
        
        if(this.isAnimating)
          return 
  
       
       this.currentSlide.classList.remove(c.slide.active)
       this.currentSlide.classList.add(c.slide.animatingOut)       
       this.isAnimating = true
       
      
       this.prevSlide = this.currentSlide
       this.currentSlide = this.slides[this.currentIndex % this.slides.length]
       
       
       this.currentSlide.classList.add(c.slide.active)
       this.currentSlide.classList.add(c.slide.animatingIn)
       
       this.currentIndex++
       
       
       
       this.animationInterval = setTimeout(()=>{       
         
         this.prevSlide.classList.remove(c.slide.animatingOut)
         this.currentSlide.classList.remove(c.slide.animatingIn)
         this.isAnimating = false
         
         if(this.settings.autoplay){
           this.waitInterval = setTimeout(()=>{
              this.next()           
           }, this.settings.wait)
         }
  
         
       }, this.settings.animationDuration )
       
       
     }
       
     FlexibleSlider.prototype.back = function(){
       
     }
       
     FlexibleSlider.prototype.go = function(){
       
     }
       
    
     let flxSlider = function(opts){
       return new FlexibleSlider(opts);
     }
     
     flxSlider.extend = function(functions){
       
     }
    
    flxSlider.defaults = {
      wait: 5000,
      animationDuration: 2000,
      autoplay: true,
      mode: 'gallery',
      classes: {
         slider : 'flx-slider',
         sliderWrapper: 'flx-slider-wrapper',
         sliderInner : 'flx-slider-inner',
         slide :{
           all : 'flx-slide',
           active : 'flx-slide-active',
           animatingOut : 'flx-slide-animating-out',
           animatingIn : 'flx-slide-animating-in',         
         },
        modes:{
          gallery : 'flx-slider-gallery',
          slider : 'flx-slider-slider',
          carousel : 'flx-slider-carousel'
        }
      }
    }
     
     return flxSlider;
    
  })
  
  
  FlexibleSlider({
    slider : '.slider',
    wait : 6000,
    animationDuration: 4000,
    autoplay: true
    
  })