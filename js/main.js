const lenis = new Lenis(
  duration=1.5,
  

)

lenis.on('scroll', (e) => {
  console.log(e)
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)
/////////////////////////////////////////////////////////////////
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

Splitting();

const stage=document.querySelector('.stage');
const slides=document.querySelectorAll('.slide');
const links=document.querySelectorAll('.slide_scroll-link'); //다음페이지로 이동
let slideID=0;

function initHeader(){
  let tl=gsap.timeline({delay:0.5});
  tl.from(".logo",1,{y:-40, opacity:0,ease: "power4.out",})
  //↪위아래 duration 아무거나 사용 가능 
  //tl.from(".logo",{y:-40, opacity:0,duration:1, ease: "power4.out",})
  tl.from(".nav-btn__svg rect",{
    scale:0, transformOrigin:"center right",
    duration:0.6,ease: "power4.out",
    stagger:0.1},0.6)
  tl.to(".nav-rect",{
    scale:0.8,
    transformOrigin:"center left",
    duration:0.4,ease: "power4.out",
    stagger:0.1},"-=0.6"
    )

  let navBtn=document.querySelector('.nav-btn');

  navBtn.addEventListener("mouseover",()=>{
    gsap.to('.nav-rect',{
    scaleX:1,
    transformOrigin:"top left",
    duration:0.4,ease: "power4.out"
    })
  })

  navBtn.addEventListener("mouseout",()=>{
    gsap.to('.nav-rect',{
    scaleX:0.8,
    transformOrigin:"top left",
    duration:0.4,ease: "power4.out"
    })
  })
    
}

function initIntro(){
  let gTl=gsap.timeline();
  //gTl.from(".intro_title .char",1,{})  ➡  1은 1초 duration을 의미
  gTl.from(".intro_img",1.5,{opacity:0,yPercent:130,stagger:0.9,}) 
  //↪이미지가 먼저 작동되게 위쪽에 실행  
  gTl.from(".intro_title .char",1,{opacity:0,yPercent:130,stagger:0.06,ease: "back.out(1.7)"},"-=0.9")
}

function initLinks(){
  links.forEach((link,index,e)=>{
    let linksT=link.querySelector('.slide_scroll-line');
    link.addEventListener("click",(e)=>{
      e.preventDefault();
      gsap.to(window,{
        duration:2,
        scrollTo:{
          y:"#slide_"+(index + 2)
        }
      })
      slideID++;
    })
  
  link.addEventListener("mouseover", (e) => {
    gsap.to(linksT, {
      y: 40,
      transformOrigin: "bottom center",
      duration: 0.6,
      ease: "power4",
      });
    });

  link.addEventListener("mouseout", (e) => {
    gsap.to(linksT, {
      y: 0,
      transformOrigin: "bottom center",
      duration: 0.6,
      ease: "power4",
      });
    });
  })

  let top=document.querySelector('.footer_link-top')
  top.addEventListener("click", (e) => {
    e.preventDefault();
    gsap.to(window,{
      duration:1,
      scrollTo:{
        y:"#slide_0"
      }
    })
    gsap.to('.footer_link-top-line',{
      scaleY:1,
      transformOrigin: "bottom center",
      duration: 0.6,
      ease: "power4",
    })
  });

  top.addEventListener("mouseover", (e) => {
    gsap.to(".footer_link-top-line", {
      scaleY: 3,
      transformOrigin: "bottom center",
      duration: 0.6,
      ease: "power4",
    });
  });

  top.addEventListener("mouseout", (e) => {
    gsap.to(".footer_link-top-line", {
      scaleY: 1,
      transformOrigin: "bottom center",
      duration: 0.6,
      ease: "power4",
    });
  });

  let slideLinks=document.querySelectorAll('.slide-link');
  slideLinks.forEach((slideLink,index)=>{
    let slideL=slideLink.querySelector('.slide-link_line');
    slideLink.addEventListener('mouseover',()=>{
      gsap.to(slideL,{
        x:20,
        scaleX:0.3,
        transformOrigin:"right center",
        duration:0.8,
        ease:"power4.out"
      })
    })
    slideLink.addEventListener('mouseout',()=>{
      gsap.to(slideL,{
        x:20,
        scaleX:1,
        transformOrigin:"right center",
        duration:0.8,
        ease:"power4.out"
      })
    })

  })
}

function initSlides(){
  slides.forEach((slide,i)=>{

    let tl=gsap.timeline({
      scrollTrigger:{
        trigger:slide,
        start:"40% 50%",
        //markers:true
        //trigger의 40%(start)가 화면(뷰포트)의 50%(scroller-start)에 도착하면 애니메이션 실행 
      }
    })
    tl.from(slide.querySelectorAll('.col_content-title'),{
      ease: "power4.out",
      y:"+=5vh",
      duration:2.5,
    })
    tl.from(slide.querySelectorAll(".line_inner"),{
      y:200, duration:2, ease: "power4.out", stagger:0.1
    },"<")

    tl.from(slide.querySelectorAll(".col_content-txt"),{
      x:200, y:50, duration:2, ease: "power4.out"
    },"0.4") 

    tl.from(slide.querySelectorAll(".slide-link_line"),{
      x:-100, y:100, opacity:0, duration:2, ease: "power4.out"
    },"0.3")

    tl.from(slide.querySelectorAll(".slide_scroll-link"),{
      y:200, duration:3, ease: "power4.out"
    },"0.4")

    tl.to(slide.querySelectorAll(".slide_scroll-line"),{
      duration:2.5, ease: "elastic.out(1,0.3)", 
      scaleY:0.6 , //scaleY:0.6 원래 크기에서 60%만 차지함 (1 =>100%)
      transformOrigin:"left bottom"
    },"1.4")
  })

}

function initParallax(){
  slides.forEach((slide, i) => {
    let imageWrappers = slide.querySelectorAll(".col_image-wrap");

    gsap.fromTo(
      imageWrappers,
      {
        y: "-50vh",
      },
      {
        y: "-100vh",
        scrollTrigger: {
          trigger: slide,
          scrub: true,
          start: "top bottom", // position of trigger meets the scroller position
          snap: {
            snapTo: 0.5, // 0.5 'cause the scroll animation range is 200vh for parallax effect
            duration: 1,
            ease: "power4.inOut",
          },
        },
        ease: "none",
      }
    );
  });
}

function initKeys(){
  document.addEventListener("keydown",(e)=>{
    e.preventDefault();
    if(event.keyCode == 40){ //keyCode 40 ➡ down화살표 버튼
      if(slideID<=slides.length){
        slideID++;
        gsap.to(window,{
          duration:1,
          scrollTo:{
            y:"#slide_"+slideID,
          }
        })
      }
    }
    else if(event.keyCode == 38){  //keyCode 40 ➡ up 화살표 버튼
      gsap.to(window,{
        duration:1,
        scrollTo:{
          y:"#slide_0",
        }
      })
    }
  })
}

function init(){
initHeader();
initIntro();
initLinks();
initSlides();
initParallax();
initKeys();
}


init();