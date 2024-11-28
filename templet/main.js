document.addEventListener('DOMContentLoaded', function() {
    // 모든 컴포넌트 로드
    function loadComponent(componentName, containerId) {
        return fetch(`components/${componentName}.html`)
            .then(response => response.text())
            .then(data => {
                document.getElementById(containerId).innerHTML = data;
            })
            .catch(error => {
                console.error(`Error loading ${componentName} component:`, error);
            });
    }

    // 모든 컴포넌트 로드 후 초기화
    Promise.all([
        loadComponent('Header', 'header-component'),
        loadComponent('Map', 'map-component'),
        loadComponent('About', 'about-component'),
        loadComponent('Introduction', 'introduction-component'),
        loadComponent('Seoul', 'seoul-component'),
        loadComponent('Equipment', 'equipment-component'),
        loadComponent('Price', 'price-component'),
        loadComponent('Schedule', 'schedule-component'),
        loadComponent('Footer', 'footer-component')
    ]).then(() => {
        initializeAllComponents();
    });

    function initializeAllComponents() {
        // 헤더 초기화
        initializeHeader();
        // 스크롤 이벤트 초기화
        initializeScrollEvents();
        // 기타 컴포넌트 초기화
        initializeOtherComponents();
    }

    function initializeHeader() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        const header = document.querySelector('.header');

        if (mobileMenuBtn && navLinks && header) {
            // 모바일 메뉴 토글
            mobileMenuBtn.addEventListener('click', function() {
                navLinks.classList.toggle('active');
                this.classList.toggle('active');
            });

            // 스크롤 이벤트
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }
    }

    function initializeScrollEvents() {
        // 모든 내부 링크에 스무스 스크롤 적용
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const targetPosition = targetElement.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // 모바일 메뉴가 열려있다면 닫기
                    const navLinks = document.querySelector('.nav-links');
                    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
                    if (navLinks && mobileMenuBtn) {
                        navLinks.classList.remove('active');
                        mobileMenuBtn.classList.remove('active');
                    }
                }
            });
        });
    }

    function initializeOtherComponents() {
        // Price 컴포넌트 팝업 초기화
        const openPopupBtn = document.getElementById('openPopup');
        const closePopupBtn = document.getElementById('closePopup');
        const popup = document.getElementById('popup');

        if (openPopupBtn && closePopupBtn && popup) {
            openPopupBtn.addEventListener('click', function() {
                popup.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });

            closePopupBtn.addEventListener('click', function() {
                popup.style.display = 'none';
                document.body.style.overflow = 'auto';
            });

            popup.addEventListener('click', function(e) {
                if (e.target === popup) {
                    popup.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }

        // 여기에 다른 컴포넌트들의 초기화 코드 추가
    }
});