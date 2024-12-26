// 로딩 페이지
const loadingPage = document.querySelector('#loading_page');
const cursorStyle = document.querySelector('.cursor')

document.body.classList.add('loading_scroll');
cursorStyle.style.display = 'none';


setTimeout(() => {
    loadingPage.style.display = 'none';
    cursorStyle.style.display = 'block';
    document.html.classList.remove('loading_scroll');
    document.body.classList.remove('loading_scroll');
}, 3000);


const defaultNav = document.querySelector('#nav_default');
const movingNav = document.querySelector('#nav_scroll');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY === 0) {
        defaultNav.style.transform = `translateY(0%)`;
        movingNav.style.transform = `translateY(0%)`;
    } else {
        defaultNav.style.transform = `translateY(-100%)`;
        movingNav.style.transform = `translateY(-100%)`;
    }
});

const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

const links = document.querySelectorAll('a, button');

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.style.backgroundColor = '#45ef55';
        cursor.style.opacity = '0.8';
    });
    link.addEventListener('mouseleave', () => {
        cursor.style.backgroundColor = '#f5f5f5';
        cursor.style.opacity = '0.8';
    });

});

gsap.registerPlugin(ScrollToPlugin);

document.querySelectorAll('#nav_scroll a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            gsap.to(window, {
                scrollTo: {
                    y: targetElement,
                    offsetY: 0
                },
                duration: 1
            });
            document.querySelectorAll('#nav_scroll a').forEach(a => a.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// 섹션 도달 시 active 클래스 변경
const anchors = document.querySelectorAll('#nav_scroll a');
window.addEventListener('scroll', () => {
    let scrollPosition = window.scrollY;

    anchors.forEach(anchor => {
        const targetId = anchor.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const rect = targetElement.getBoundingClientRect();
            const sectionTop = rect.top + window.scrollY;
            const sectionHeight = targetElement.offsetHeight;

            if (
                scrollPosition >= sectionTop - 10 &&
                scrollPosition < sectionTop + sectionHeight
            ) {
                document.querySelectorAll('#nav_scroll a').forEach(a => a.classList.remove('active'));
                anchor.classList.add('active');
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


// 텍스트 애니메이션 textify
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
    ease: 'expo.inOut',
    rotation: 60,
    transformOrigin: "center center",
});



// 스크롤 이벤트 = gsap
gsap.registerPlugin(ScrollTrigger);



// skills 도형 회전
const spinningWrap = document.querySelector("#spinning_wrap");
const spinningShape = document.querySelector(".spinning_shape");


spinningWrap.style.height = document.getElementById('skills').offsetHeight + 'px';

const spinningShapeHeight = spinningShape.offsetHeight;

const tl = gsap.timeline({
    scrollTrigger: {
        scrub: 2,
        pin: false,
        trigger: ".spinning_shape",
        start: "0% 20%",
    },
});

tl.to(".spinning_shape", {
    y: () => spinningWrap.offsetHeight - spinningShapeHeight,
    rotateZ: 500,
    ease: "power1.out"
});


// portfolio 섹션 스크롤 슬라이드


document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    let projectSections = gsap.utils.toArray("#project_wrap .project");
    let ProjectTrigger = document.querySelector('#portfolio')

    let projectHorizontal = gsap.matchMedia();

    // 768 이상은 horizontal 스크롤
    projectHorizontal.add("(min-width: 769px)", () => {
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
                markers: true,
                invalidateOnRefresh: true, // 리사이즈 시 위치 재계산
            }
        });
    });

    // 768 이하는 vertical 스크롤 (section pin)
    projectHorizontal.add("(max-width: 768px)", () => {
        gsap.utils.toArray('.project').forEach(project => {
            ScrollTrigger.create({
                trigger: project,
                start: 'top top',
                pin: true,
                pinSpacing: false,
                snap: 1 / 5,
            });
        });
    });

    const swiper = new Swiper('.swiper', {
        slidesPerView: 4,
        loop: true,
        centeredSlides: true,
        freeMode: true,
        freeModeMomentum: false,
        autoplay: {
            delay: 1500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        breakpoints: {
            1440: {
                slidesPerView: 4, // 한 화면에 3개의 슬라이드
                spaceBetween: 0, // 간격 30px
            },
            // 1024px 이상
            1024: {
                slidesPerView: 3, // 한 화면에 3개의 슬라이드
                spaceBetween: 30, // 간격 30px
            },
            // 768px 이상
            768: {
                slidesPerView: 2, // 한 화면에 2개의 슬라이드
                spaceBetween: 24, // 간격 20px
            },
            // 480px 이상
            0: {
                slidesPerView: 1.5,
                paceBetween: 20,
            }
        },
    });

});