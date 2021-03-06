(function(factory , undefined){
  
  if(typeof window != 'undefined')
    window.FlexibleSlider = factory()
  if(typeof exports == 'object'  ){
    module.exports = factory()  
  }
  
})(function(){
  
   var FlexibleSlider = function(opts){
     this.settings = Object.assign({}, flxSlider.defaults, opts)
     
     if( typeof opts.slider == "string" )
        this.slider = document.querySelector(opts.slider)
      else if(opts.slider instanceof HTMLElement)
        this.slider = opts.slider
     
     this.slides = Array.from(this.slider.children)
     this.placeholderSlide = null
     
     this.currentIndex = 0
     
     this.waitInterval = null
     this.animationInterval = null
     
     this.currentSlide = null
     this.prevSlide = null
     
     this.isAnimating = false
     
     this.init()
   }
    
   FlexibleSlider.prototype.init = function(){
     var c = this.settings.classes
     if(this.slides.length){
       
       this.slider.classList.add(c.slider)       
       this.slider.classList.add(c.modes[this.settings.mode])
       
       this.placeholderSlide = this.slides[0].cloneNode(true)
       this.placeholderSlide.classList.add(c.slide.placeholder)
       this.slider.insertBefore(this.placeholderSlide, this.slides[0])
       
       this.slides.forEach(function(slide){
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
       
       var parent = this.slider.parentNode
       parent.replaceChild(this.sliderWrapper, this.slider)
       
       this.sliderWrapper.appendChild(this.sliderInner)
       this.sliderInner.appendChild(this.slider)
      
       var self = this
       if(this.settings.autoplay){
         this.waitInterval = setTimeout(function(){
          self.next()           
         }, this.settings.wait)
       }
       
     }
   }
  
   
   FlexibleSlider.prototype.next = function(){
      var c = this.settings.classes
      
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
     
     
     var self = this
     this.animationInterval = setTimeout(function(){       
       
        self.prevSlide.classList.remove(c.slide.animatingOut)
        self.currentSlide.classList.remove(c.slide.animatingIn)
        self.isAnimating = false
              
     }, this.settings.animationDuration )
     
     if(this.settings.autoplay){
      this.waitInterval = setTimeout(function(){
        self.next()           
      }, this.settings.wait)
    }
     
   }
     
   FlexibleSlider.prototype.back = function(){
     
   }
     
   FlexibleSlider.prototype.go = function(){
     
   }
     
  
   var flxSlider = function(opts){
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
         placeholder: 'flx-slide-placeholder',
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