document.addEventListener('DOMContentLoaded', function() {
    // Header 컴포넌트가 로드되었는지 확인하고 이벤트 리스너 추가
    function initializeHeader() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        const header = document.querySelector('.header');

        if (!mobileMenuBtn || !navLinks || !header) {
            // 컴포넌트가 아직 로드되지 않았다면 재시도
            setTimeout(initializeHeader, 100);
            return;
        }

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

        // 스무스 스크롤
        document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // 모바일 메뉴가 열려있다면 닫기
                    navLinks.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            });
        });
    }

    // Header 컴포넌트 로드
    fetch('components/Header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-component').innerHTML = data;
            // Header 컴포넌트가 로드된 후 초기화 함수 실행
            initializeHeader();
        })
        .catch(error => {
            console.error('Error loading Header component:', error);
        });
});