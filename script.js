// 모바일 메뉴 열고 닫기
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenuPopup = document.querySelector('.mobile-menu-popup');

if (mobileMenuBtn && mobileMenuPopup) {
  mobileMenuBtn.addEventListener('click', function() {
    this.classList.toggle('active');
    mobileMenuPopup.classList.toggle('active');
    if (mobileMenuPopup.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  });

  // 모바일 메뉴에서 링크 클릭 시 메뉴 닫기
  mobileMenuPopup.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
      mobileMenuBtn.classList.remove('active');
      mobileMenuPopup.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  });
}

// 스크롤 시 헤더 배경+높이 변화
window.addEventListener('scroll', function() {
  const headerEl = document.getElementById('header');
  if (!headerEl) return;

  // 스크롤이 50px 이상이면 scrolled 클래스 부여
  if (window.scrollY > 50) {
    headerEl.classList.add('scrolled');
  } else {
    headerEl.classList.remove('scrolled');
  }
});

// 내부 앵커 이동 시, 헤더 높이 보정
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetEl = document.querySelector(targetId);

    if (targetEl) {
      const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
      const offsetTop = targetEl.offsetTop - headerHeight;

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });

      // 모바일 메뉴 닫기
      if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
      if (mobileMenuPopup) mobileMenuPopup.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
});

// 팝업 (가격표)
const openPopupBtn = document.getElementById('openPopup');
const closePopupBtn = document.getElementById('closePopup');
const popup = document.getElementById('popup');

if (openPopupBtn && closePopupBtn && popup) {
  openPopupBtn.addEventListener('click', function () {
    popup.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });

  closePopupBtn.addEventListener('click', function () {
    popup.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  // 팝업 바깥 클릭 시 닫기
  popup.addEventListener('click', function(e) {
    if (e.target === popup) {
      popup.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // Esc 키로 닫기
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && popup.style.display === 'block') {
      popup.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
}

// Read More (학력/경력) 버튼
const readMoreBtn = document.getElementById('readMoreBtn');
const expandableContent = document.getElementById('expandableContent');

if (readMoreBtn && expandableContent) {
  const arrowIcon = readMoreBtn.querySelector('.arrow-icon');
  readMoreBtn.addEventListener('click', function () {
    expandableContent.classList.toggle('expanded');
    arrowIcon.classList.toggle('rotate');
    if (expandableContent.classList.contains('expanded')) {
      readMoreBtn.innerHTML = 'Show Less <span class="arrow-icon rotate">▼</span>';
    } else {
      readMoreBtn.innerHTML = 'Read More About Dr. Kim\'s Background <span class="arrow-icon">▼</span>';
    }
  });
}

// 리뷰 데이터
const testimonialsData = [
  {
    name: "Jessica Ko",
    rating: "★★★★★",
    text: "Bansuk did amazing work with my teeth. The nurses were kind and helpful. The doctor spoke both English and Korean...",
    logo: "./images/google_logo.png",
  },
  {
    name: "Peter Kang",
    rating: "★★★★★",
    text: "I've visited many dental clinics in Seoul, but this place is truly the best. The staff provide incredibly friendly service...",
    logo: "./images/google_logo.png",
  },
  {
    name: "Lauryn Duriez",
    rating: "★★★★★",
    text: "Une clinique foreigner friendly pour vos détartrages ! (Root canal, etc.) Très professionnel et serviable.",
    logo: "./images/google_logo.png",
  },
  {
    name: "Ryan Kyungsoo Shim",
    rating: "★★★★★",
    text: "Located in the CBD area, easy to access. I had my upper and lower wisdom teeth taken out a week ago...",
    logo: "./images/google_logo.png",
  },
  {
    name: "Lauren Kim",
    rating: "★★★★★",
    text: "Dr. Kim and all the nurses were very kind during my visit, and they explained everything thoroughly...",
    logo: "./images/google_logo.png",
  },
];

// 화면폭에 따라 리뷰 몇 개씩 보여줄지 결정
function getItemsPerPage() {
  if (window.innerWidth < 768) {
    return 1;
  } else {
    return 3;
  }
}

let currentPage = 1;

// 리뷰 렌더링
function renderReviews(page) {
  const container = document.querySelector('.testimonials-container');
  if (!container) return;

  const itemsPerPage = getItemsPerPage();
  const totalPages = Math.ceil(testimonialsData.length / itemsPerPage);
  if (page < 1) page = totalPages;
  if (page > totalPages) page = 1;
  currentPage = page;

  container.innerHTML = "";
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const sliceData = testimonialsData.slice(startIdx, endIdx);

  sliceData.forEach(item => {
    const card = `
      <div class="testimonial-card">
        <h3 class="testimonial-name">${item.name}</h3>
        <div class="testimonial-rating">${item.rating}</div>
        <p class="testimonial-text">${item.text}</p>
        <div class="testimonial-source">
          <img src="${item.logo}" alt="Google logo">
        </div>
      </div>
    `;
    container.innerHTML += card;
  });
}

// 이전 페이지
window.prevPage = function() {
  renderReviews(currentPage - 1);
};

// 다음 페이지
window.nextPage = function() {
  renderReviews(currentPage + 1);
};

// 페이지 로드 후 초기 리뷰 렌더
document.addEventListener('DOMContentLoaded', function() {
  renderReviews(currentPage);
});

// 스크롤 시 원장 이미지 흔들림 (옵션)
document.addEventListener('DOMContentLoaded', function() {
  const doctorSection = document.querySelector('.intro-doctor-section');
  const doctorImage = document.querySelector('.intro-doctor-image');
  const doctorContent = document.querySelector('.intro-doctor-content');

  if (doctorSection && doctorImage && doctorContent) {
    window.addEventListener('scroll', function() {
      const sectionRect = doctorSection.getBoundingClientRect();
      const contentRect = doctorContent.getBoundingClientRect();
      const imageRect = doctorImage.getBoundingClientRect();
      const headerHeight = document.querySelector('.header')?.offsetHeight || 0;

      if (sectionRect.top < window.innerHeight && sectionRect.bottom > 0) {
        const maxScroll = contentRect.height - imageRect.height;
        const sectionScrollPosition = Math.max(0, -sectionRect.top + headerHeight);
        const imagePosition = Math.min(maxScroll, sectionScrollPosition);
        doctorImage.style.transform = `translateY(${imagePosition}px)`;
      }
    });
  }
});

// 모바일에서 원장 이미지를 h2 아래로 복제(옵션)
document.addEventListener('DOMContentLoaded', function() {
  const doctorH2 = document.querySelector('.intro-doctor-text h2');
  const originalImg = document.querySelector('.intro-doctor-image img');
  if (doctorH2 && originalImg) {
    const mobileImg = document.createElement('div');
    mobileImg.className = 'mobile-doctor-image';
    mobileImg.innerHTML = `<img src="${originalImg.src}" alt="Dr. Kim Profile Image" style="width:100%;"/>`;
    doctorH2.after(mobileImg);
  }
});
