document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('openPopup').addEventListener('click', function () {
        document.getElementById('popup').style.display = 'flex';
    });

    document.getElementById('closePopup').addEventListener('click', function () {
        document.getElementById('popup').style.display = 'none';
    });

    // 팝업 외부 클릭 시 닫기
    document.getElementById('popup').addEventListener('click', function (event) {
        if (event.target === this) {
            this.style.display = 'none';
        }
    });
});


// 데이터 배열 생성
const testimonials = [
    { name: "John D.", rating: "★★★★★", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti explicabo distinctio iure facere perspiciatis aliquam, impedit veritatis quia exercitationem quo alias! Accusantium nemo alias tempore quasi minima voluptatem beatae reiciendis eaque corporis? Ad, voluptatem! Maiores quaerat reiciendis, dicta deserunt magnam explicabo sapiente quae dolores repudiandae nam, tempora blanditiis? Doloribus, quos!", logo: "./templet/google_logo.png" },
    { name: "Jane S.", rating: "★★★★★", text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur, dolorem. Libero magni soluta distinctio ipsam doloribus laboriosam, nam vel officia, esse eos assumenda, repudiandae reprehenderit. Asperiores quis quod consectetur recusandae harum iure nam provident cumque aperiam dolores, optio inventore ipsa cupiditate numquam ducimus necessitatibus impedit. Placeat commodi incidunt sunt maiores..", logo: "./templet/google_logo.png" },
    { name: "Emily R.", rating: "★★★★★", text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate sed ipsum dolores officiis adipisci vitae est quisquam quia iusto deserunt nobis, ullam odit quas voluptates sint ea alias repudiandae libero..", logo: "./templet/google_logo.png" },
    { name: "Michael T.", rating: "★★★★★", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, ullam architecto quia, reiciendis corporis quas aut quidem minus nihil doloremque consequatur odio sunt eius culpa optio eveniet distinctio perspiciatis ea expedita adipisci similique dolor id unde natus? Soluta, minima illum!.", logo: "./templet/google_logo.png" },
    { name: "Sarah W.", rating: "★★★★★", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos..", logo: "./templet/google_logo.png" },
    { name: "Chris P.", rating: "★★★★★", text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus placeat sed molestias accusamus eum voluptatum quos beatae nemo, fugiat est, aut ullam aperiam consequuntur consequatur asperiores enim non assumenda aliquam? Porro modi optio delectus culpa?", logo: "./templet/google_logo.png" },
    { name: "Anna L.", rating: "★★★★★", text: "I was in so much pain when I walk in this place and without any appointment. But they help me on the spot to reduce the pain. Dr. Kopacz and the whole team are excellent. Very nice and makes you fee comfortable. They will answer all your questions. Had 2 Root canal and you wont feel anything during the procedure. All the good reviews about this place are true.", logo: "./templet/google_logo.png" },
    { name: "David K.", rating: "★★★★★", text: "Cras pellentesque magna sit amet luctus.", logo: "./templet/google_logo.png" },
    { name: "Sophia G.", rating: "★★★★★", text: "Morbi varius justo sit amet orci.", logo: "./templet/google_logo.png" },
    { name: "Ethan B.", rating: "★★★★★", text: "Mauris aliquam consectetur tortor.", logo: "./templet/google_logo.png" },
    { name: "Olivia Z.", rating: "★★★★★", text: "Suspendisse potenti vestibulum ac.", logo: "./templet/google_logo.png" },
    { name: "James C.", rating: "★★★★★", text: "Phasellus nec turpis at sapien.", logo: "./templet/google_logo.png" },
    { name: "Emma H.", rating: "★★★★★", text: "Donec congue facilisis eros.", logo: "./templet/google_logo.png" },
    { name: "Noah M.", rating: "★★★★★", text: "Aliquam gravida ligula ut nisl.", logo: "./templet/google_logo.png" },
    { name: "Liam F.", rating: "★★★★★", text: "Nunc faucibus sem nec mauris.", logo: "./templet/google_logo.png" }
];

// 페이지네이션 변수
const itemsPerPage = 3;
let currentPage = 1;

// 페이지 렌더링 함수
function renderPage(page) {
    const container = document.querySelector('.testimonials-container');
    container.innerHTML = ""; // 기존 카드 초기화

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const items = testimonials.slice(start, end);

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
function prevPage() {
    const totalPages = Math.ceil(testimonials.length / itemsPerPage);
    currentPage = currentPage === 1 ? totalPages : currentPage - 1;
    renderPage(currentPage);
}

// 다음 페이지
function nextPage() {
    const totalPages = Math.ceil(testimonials.length / itemsPerPage);
    currentPage = currentPage === totalPages ? 1 : currentPage + 1;
    renderPage(currentPage);
}

// 초기 렌더링
renderPage(currentPage);
