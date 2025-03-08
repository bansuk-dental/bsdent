// 모바일 메뉴 열고 닫기
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenuPopup = document.querySelector('.mobile-menu-popup');

if (mobileMenuBtn && mobileMenuPopup) {
  mobileMenuBtn.addEventListener('click', function() {
    this.classList.toggle('active');
    mobileMenuPopup.classList.toggle('active');
    // 메뉴 열릴 때 스크롤 방지
    if(mobileMenuPopup.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  });
  mobileMenuPopup.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
      mobileMenuBtn.classList.remove('active');
      mobileMenuPopup.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  });
}

// 스크롤 시 헤더 scrolled 클래스
window.addEventListener('scroll', function() {
  const headerEl = document.getElementById('header');
  if(window.scrollY > 50) {
    headerEl.classList.add('scrolled');
  } else {
    headerEl.classList.remove('scrolled');
  }
});

// 앵커 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetEl = document.querySelector(targetId);
    if(targetEl) {
      const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
      const offsetTop = targetEl.offsetTop - headerHeight;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      // 모바일 메뉴가 열려있다면 닫기
      mobileMenuBtn.classList.remove('active');
      mobileMenuPopup.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
});

// 팝업 (가격표)
const openPopupBtn = document.getElementById('openPopup');
const closePopupBtn = document.getElementById('closePopup');
const popup = document.getElementById('popup');

if(openPopupBtn && closePopupBtn && popup) {
  openPopupBtn.addEventListener('click', function () {
    popup.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });
  closePopupBtn.addEventListener('click', function () {
    popup.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
  popup.addEventListener('click', function(e) {
    if(e.target === popup) {
      popup.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
  document.addEventListener('keydown', function(e) {
    if(e.key === 'Escape' && popup.style.display === 'block') {
      popup.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
}

// Read More (학력/경력 접기)
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

// 리뷰 (3개씩 or 1개씩 - 반응형)
const testimonialsData = [
  {
    name: "Jessica Ko",
    rating: "★★★★★",
    text: "Bansuk did amazing work with my teeth. The nurses were kind and helpful. The doctor spoke both English and Korean...",
    logo: "./images/google_logo.png",
  },
  {
    name: "peter kang",
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

// 화면 폭에 따라 itemsPerPage 결정
function getItemsPerPage() {
  if (window.innerWidth < 768) {
    return 1; // 모바일(768px 미만)에서는 1개씩
  } else {
    return 3; // 데스크톱은 3개씩
  }
}

let currentPage = 1;

function renderReviews(page) {
  const container = document.querySelector('.testimonials-container');
  if(!container) return;

  const itemsPerPage = getItemsPerPage();
  const totalPages = Math.ceil(testimonialsData.length / itemsPerPage);

  // 페이지 범위
  if(page > totalPages) page = totalPages;
  if(page < 1) page = 1;
  currentPage = page;

  container.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const items = testimonialsData.slice(start, end);

  items.forEach(item => {
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
  const itemsPerPage = getItemsPerPage();
  const totalPages = Math.ceil(testimonialsData.length / itemsPerPage);
  currentPage = (currentPage === 1) ? totalPages : currentPage - 1;
  renderReviews(currentPage);
};

// 다음 페이지
window.nextPage = function() {
  const itemsPerPage = getItemsPerPage();
  const totalPages = Math.ceil(testimonialsData.length / itemsPerPage);
  currentPage = (currentPage === totalPages) ? 1 : currentPage + 1;
  renderReviews(currentPage);
};

// 초기 렌더
document.addEventListener('DOMContentLoaded', function() {
  renderReviews(currentPage);
});

// 리사이즈 시 재렌더 (3->1 or 1->3)
window.addEventListener('resize', function() {
  renderReviews(currentPage);
});

// 원장 소개 sticky 기능
document.addEventListener('DOMContentLoaded', function() {
  const doctorSection = document.querySelector('.intro-doctor-section');
  const doctorImage = document.querySelector('.intro-doctor-image');
  const doctorContent = document.querySelector('.intro-doctor-content');
  
  if(doctorSection && doctorImage && doctorContent) {
    window.addEventListener('scroll', function() {
      const sectionRect = doctorSection.getBoundingClientRect();
      const contentRect = doctorContent.getBoundingClientRect();
      const imageRect = doctorImage.getBoundingClientRect();
      const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
      
      if(sectionRect.top < window.innerHeight && sectionRect.bottom > 0) {
        const maxScroll = contentRect.height - imageRect.height;
        const sectionScrollPosition = Math.max(0, -sectionRect.top + headerHeight);
        const imagePosition = Math.min(maxScroll, sectionScrollPosition);
        doctorImage.style.transform = `translateY(${imagePosition}px)`;
      }
    });
  }
});

// 모바일에서 원장 이미지 위치 조정 (간단한 버전)
document.addEventListener('DOMContentLoaded', function() {
  const doctorH2 = document.querySelector('.intro-doctor-text h2');
  const imgSrc = document.querySelector('.intro-doctor-image img').src;
  
  if (doctorH2 && imgSrc) {
    // h2 바로 아래에 모바일용 이미지 동적 추가
    const mobileImg = document.createElement('div');
    mobileImg.className = 'mobile-doctor-image';
    mobileImg.innerHTML = `<img src="${imgSrc}" alt="Dr. Kim Profile Image" style="width:100%;">`;
    doctorH2.after(mobileImg);
  }
});
