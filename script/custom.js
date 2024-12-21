/* include header */
fetch("/clone-class101/include/header.html")
.then(response => response.text())
.then(data => {
  document.querySelector('.header-include').innerHTML = data;

  function initMegaNavi() {
    const trigger = document.querySelector('.trigger');
    const megaNavi = document.querySelector('.mega-navi');

    if (!trigger || !megaNavi) return;

    const isPC = window.innerWidth > 767;
    megaNavi.style.display = isPC ? "none" : "";
    trigger.classList.remove('active');

    if (isPC) {
      trigger.addEventListener('click', toggleMegaNavi);

      // 섹션 클릭 시 메가 네비 숨김
      document.querySelectorAll('.front-slider, .category-shortcut, .focus-class, .best-class, .timer, .eary-bird').forEach(section => {
        section.addEventListener('click', hideMegaNavi);
      });
    } else {
      // 모바일에서는 필요 없는 이벤트 리스너 제거
      trigger.removeEventListener('click', toggleMegaNavi);
      document.querySelectorAll('.front-slider, .category-shortcut, .focus-class, .best-class, .timer, .eary-bird').forEach(section => {
        section.removeEventListener('click', hideMegaNavi);
      });
    }
  }

  function toggleMegaNavi() {
    this.classList.toggle('active');
    const megaNavi = document.querySelector('.mega-navi');
    megaNavi.style.display = megaNavi.style.display === "block" ? "none" : "block";
  }

  function hideMegaNavi() {
    const megaNavi = document.querySelector('.mega-navi');
    megaNavi.style.display = "none";
    document.querySelector('.trigger').classList.remove('active');
  }

  initMegaNavi();
  window.addEventListener('resize', initMegaNavi);
  loginModal();
  headerLoginAfter();
});

/* Login Modal */
function loginModal() {
  const loginOverlay = document.querySelector('.member-login-overlay');
  const loginButtons = document.querySelectorAll('.btn-login');
  const modalClose = document.querySelector('.member-login .btn-modal-close');
  // 모달 열기/닫기 토글 함수
  const toggleModal = (isOpen) => {
    if (isOpen) {
      loginOverlay.style.display = 'block';       
      document.body.classList.add('active'); 
    } else {
      loginOverlay.style.display = 'none'; 
      document.body.classList.remove('active'); 
    }
  };
  // 로그인 버튼에 클릭 이벤트 추가
  loginButtons.forEach(btn => btn.addEventListener('click', () => toggleModal(true)));
  // 모달 닫기 버튼에 클릭 이벤트 추가
  modalClose.addEventListener('click', () => toggleModal(false));
}

/* Login 후 Header UI 변경 */
function headerLoginAfter(){
  document.querySelector('.btn-member-primary').addEventListener('click', function(){
    document.querySelector('.member-login-overlay').style.display="none"; //로그인 모달
    document.querySelector('.user-alarm').style.display="block"; //유저알람
    document.querySelector('.login-register-buttons').style.display="none";//로그인버튼 숨기기
  });
};

/* Include Footer */
fetch("/clone-class101/include/footer.html")
.then(response => response.text())
.then(data=> {
  document.querySelector(".footer-include").innerHTML = data
  
  /* Responsive For moble */
  //Footer LNB
  document.querySelectorAll(".link-item-title").forEach(item => {
    item.addEventListener("click", function() {
      this.nextElementSibling.style.display = this.nextElementSibling.style.display === "block" ? "none" : "block";
      this.classList.toggle("active");
    });
  });
  //Footer Info Trigger
  const address = document.querySelector("address");
  document.querySelector(".company-info-trigger").addEventListener("click", function() {
    address.style.display = address.style.display === "block" ? "none" : "block";
  });

  // 화면 Resize 이벤트
  function handleResize() {
    const isDesktop = window.innerWidth > 767;
  
    // 링크 목록과 회사 정보 초기화
    document.querySelectorAll(".link-item-title").forEach(item => {
      item.nextElementSibling.style.display = isDesktop ? "block" : "none";
    });
    address.style.display = isDesktop ? "block" : "none";
  }
  
  window.addEventListener("resize", handleResize);
  handleResize(); 
  });

/* class-detail 아코디언 */
function initAccordion(){
  let faqTitle=document.querySelectorAll('.faq-title');
  faqTitle.forEach(title=>{
    title.addEventListener('click', ()=>{
      let content = title.nextElementSibling;
      document.querySelectorAll('.faq-content').forEach(item=>{
        if(item !== content){
          item.classList.remove('active');
        }
      });
      content.classList.toggle('active')
    })
  })
}
/* DOMContentLoaded 시 모든 기능 초기화 */
document.addEventListener('DOMContentLoaded', function(){
  initAccordion();
})


//slider
const sliders = document.querySelector('.sliders'); // 슬라이더 컨테이너
const slides = document.querySelectorAll('.slide'); // 개별 슬라이드
const slideCount = slides.length; // 슬라이드 개수
let currentIndex = 0; // 현재 슬라이드 인덱스

function autoSlide() {
  currentIndex = (currentIndex + 1) % slideCount; // 인덱스 증가 (마지막 슬라이드 다음 첫 번째로 돌아감)
  sliders.style.transform = `translateX(-${currentIndex * 100}%)`; // 슬라이더 이동
}

// 3초마다 슬라이드 전환
setInterval(autoSlide, 3000);


//count down
function startCountdown(hours) {
  const endTime = new Date().getTime() + hours * 3600 * 1000; // 현재 시간에서 7시간 후 시간 계산

  function updateDisplay() {
    const now = new Date().getTime();
    const remainingTime = Math.max(0, endTime - now); // 남은 시간 계산

    // 남은 시간을 시, 분, 초로 계산
    const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
    const minutes = Math.floor((remainingTime / (1000 * 60)) % 60).toString().padStart(2, '0');
    const seconds = Math.floor((remainingTime / 1000) % 60).toString().padStart(2, '0');

    // 각 자리수별로 업데이트
    document.getElementById("hour1").textContent = hours[0];
    document.getElementById("hour2").textContent = hours[1];
    document.getElementById("minute1").textContent = minutes[0];
    document.getElementById("minute2").textContent = minutes[1];
    document.getElementById("second1").textContent = seconds[0];
    document.getElementById("second2").textContent = seconds[1];

    // 타이머 종료 조건: 남은 시간이 0이면 카운트다운 중지
    if (remainingTime <= 0) {
      clearInterval(interval);
    }
  }

  // 처음 한 번 호출하여 즉시 화면에 표시
  updateDisplay();
  const interval = setInterval(updateDisplay, 1000); // 1초마다 업데이트
}

// 7시간 카운트다운 시작
startCountdown(7);
