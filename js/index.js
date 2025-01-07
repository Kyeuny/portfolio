// 로딩 페이지--------------------------------------------------------------------------------
const loadingPageElement = document.querySelector("#loading_page");
const cursorElement = document.querySelector(".cursor");

document.body.classList.add("loading_scroll");
cursorElement.style.display = "none";

setTimeout(() => {
  loadingPageElement.style.display = "none";
  cursorElement.style.display = "block";
  document.body.classList.remove("loading_scroll"); // 중복 제거
}, 3000);

// nav 스크롤 시 변경 --------------------------------------------------------------------------
const defaultNav = document.querySelector("#nav_default");
const movingNav = document.querySelector("#nav_scroll");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  if (scrollY === 0) {
    defaultNav.style.transform = `translateY(0%)`;
    movingNav.style.transform = `translateY(0%)`;
  } else {
    defaultNav.style.transform = `translateY(-100%)`;
    movingNav.style.transform = `translateY(-100%)`;
  }
});

// 커서 스타일 변경 -----------------------------------------------------------------------------
const cursor = document.querySelector(".cursor");
const cursorCircle = document.querySelector(".cursor>.circle");
const cursorText = document.querySelector(".cursor>.text");

const cursorSet = () => {
  // 커서 위치
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX - 20}px`;
    cursor.style.top = `${e.clientY - 20}px`;
  });

  const links = document.querySelectorAll("a, button, .img_link");

  // 포인터 스타일 변경

  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      cursorCircle.style.transform = "scale(0.5)";
      cursorCircle.style.backgroundColor = "#45ef55";
      cursor.style.opacity = "1";
      cursor.style.mixBlendMode = "difference";
      cursorText.innerHTML = "Click";
    });
    link.addEventListener("mouseleave", () => {
      cursorCircle.style.transform = "scale(1)";
      cursorCircle.style.backgroundColor = "#f5f5f5";
      cursor.style.opacity = "0.5";
      cursor.style.mixBlendMode = "";
      cursorText.innerHTML = "Scroll";
    });
  });
};

const ScreenSize = () => {
  if (window.innerWidth >= 1024) {
    cursorSet();
  }
};

ScreenSize();

window.addEventListener("resize", () => {
  if (window.innerWidth >= 1024) {
    cursorSet();
  }
});

gsap.registerPlugin(ScrollToPlugin);

document.querySelectorAll("#nav_scroll a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      gsap.to(window, {
        scrollTo: {
          y: targetElement,
          offsetY: 0,
        },
        duration: 1,
      });
      document
        .querySelectorAll("#nav_scroll a")
        .forEach((a) => a.classList.remove("active"));
      this.classList.add("active");
    }
  });
});

// 섹션 도달 시 active 클래스 변경
const anchors = document.querySelectorAll("#nav_scroll a");
window.addEventListener("scroll", () => {
  let scrollPosition = window.scrollY;

  anchors.forEach((anchor) => {
    const targetId = anchor.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const sectionHeight = targetElement.offsetHeight;

      if (
        scrollPosition >= sectionTop - 10 &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        document
          .querySelectorAll("#nav_scroll a")
          .forEach((a) => a.classList.remove("active"));
        anchor.classList.add("active");
      }
    }
  });
});

// 스크롤 부드럽게 lenis
const lenis = new Lenis({
  smoothWheel: true,
  duration: 1.2,
  // easing: (t) => Math.min(1, 1.001 - Math.pow(8, -10 * t)),
  // easing: (t),
  easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  direction: "vertical",
  gestureDirection: "vertical",
  smooth: true,
  smoothTouch: false,
  touchMultiplier: 2,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// 텍스트 애니메이션 textify 플러그인 사용 ----------------------------------------
setTimeout(() => {
  const MovingTitle = new TextifyTitle({
    selector: ".moving_title",
    duration: 300,
    stagger: 100,
    top: true,
    reveal: true,
    once: false,
    rotation: 45,
    scale: 2,
    easing: "elasticOut",
    threshold: 0.5,
    transformOrigin: "center center",
  });
}, 3200);

const profileTitle = new TextifyTitle({
  selector: "#profile_top h2",
  duration: 300,
  stagger: 500,
  delay: 200,
  top: false,
  reveal: true,
  once: false,
  rotation: 0,
  scale: 1,
  easing: "ease",
  threshold: 0.5,
  transformOrigin: "center center",
});

const skillsTitle = new TextifyTitle({
  selector: "#design h2",
  duration: 300,
  delay: 300,
  once: false,
  stagger: 0.05,
  ease: "expo.inOut",
  rotation: 60,
  transformOrigin: "center center",
});

// 스크롤 이벤트 = gsap
gsap.registerPlugin(ScrollTrigger);

// skills 도형 회전
const spinningWrap = document.querySelector("#spinning_wrap");
const spinningShape = document.querySelector(".spinning_shape");

spinningWrap.style.height =
  document.getElementById("skills").offsetHeight + "px";

const spinningShapeHeight = spinningShape.offsetHeight;

const spinningMobile = window.matchMedia("(max-width: 768px)").matches; //모바일 대응

const rotation = spinningMobile ? 1000 : 500; // 모바일에서 회전 각도 감소
const scrubValue = spinningMobile ? 20 : 2; // 모바일에서 scrub 증가
const startValue = spinningMobile ? "0% 0%" : "0% 20%";

const tl = gsap.timeline({
  scrollTrigger: {
    scrub: scrubValue,
    pin: false,
    trigger: ".spinning_shape",
    start: startValue,
  },
});

tl.to(".spinning_shape", {
  y: () => spinningWrap.offsetHeight - spinningShapeHeight,
  rotateZ: rotation,
  ease: "power1.out",
});

// portfolio 섹션 스크롤 슬라이드 ---------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  let projectSections = gsap.utils.toArray("#project_wrap .project");
  let ProjectTrigger = document.querySelector("#portfolio");

  let projectHorizontal = gsap.matchMedia();

  // 1025 이상은 horizontal 스크롤
  projectHorizontal.add("(min-width: 1025px)", () => {
    gsap.to(projectSections, {
      xPercent: -100 * (projectSections.length - 1),
      x: 0,
      // ease: "",
      scrollTrigger: {
        trigger: "#portfolio",
        pin: true,
        scrub: 1,
        // snap: 1 / 4.7,
        start: "top top",
        end: () => "+=" + ProjectTrigger.offsetWidth,
        pinSpacing: true,
        invalidateOnRefresh: true,
      },
    });
  });

  // 1024 이하는 vertical 스크롤 (section pin)
  projectHorizontal.add("(max-width: 1024px)", () => {
    let projectVideo = document.querySelector("video");
    gsap.utils.toArray(".project").forEach((project) => {
      ScrollTrigger.create({
        trigger: project,
        start: "top top",
        pin: true,
        pinSpacing: false,
        snap: 1 / 5,
        onEnter: () => projectVideo.play(),
        onEnterBack: () => projectVideo.play(),
      });
    });
  });

  // deisgn 영역 오토 슬라이더 swiper플러그인 사용 ----------------------------
  const swiper = new Swiper(".swiper", {
    slidesPerView: 4,
    loop: true,
    centeredSlides: true,
    freeMode: true,
    freeModeMomentum: false,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    breakpoints: {
      1440: {
        slidesPerView: 4,
        spaceBetween: 0,
      },
      // 1024px 이상
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      // 768px 이상
      768: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      // 480px 이상
      0: {
        slidesPerView: 1.5,
        paceBetween: 20,
      },
    },
  });

  //design 이미지 클릭시 전체 화면 ----------------------------
  const imgPage = document.querySelector("#img_page");
  const imgPageIn = imgPage.querySelector("img");
  const imgBox = document.querySelectorAll("#design_slider li>img");

  imgBox.forEach((img) => {
    img.addEventListener("click", () => {
      const imgSrc = img.getAttribute("src");
      imgPageIn.setAttribute("src", imgSrc);
      imgPage.classList.add("visible");
    });
  });

  imgPage.addEventListener("click", function () {
    this.classList.remove("visible");
  });
});
