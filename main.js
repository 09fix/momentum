// ⭐ 랜덤 배경 이미지
// img 폴더 내 이미지를 가져옵니다.
const images = ["img/img1.jpg", "img/img2.jpg", "img/img3.jpg"];

// 랜덤으로 하나를 선택해서 배경으로 설정합니다.
document.body.style.backgroundImage = `url('${
  images[Math.floor(Math.random() * images.length)]
}')`;

// ⭐ 실시간 시계 기능
function updateClock() {}
