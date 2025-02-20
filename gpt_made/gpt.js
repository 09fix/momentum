// ⭐ 1. 랜덤 배경 이미지 변경 기능 ⭐
// Unsplash에서 랜덤 이미지 가져오기
const images = [
  "https://source.unsplash.com/random/1920x1080?nature",
  "https://source.unsplash.com/random/1920x1080?city",
  "https://source.unsplash.com/random/1920x1080?mountains",
];

// 랜덤으로 하나 선택해서 배경으로 설정
document.body.style.backgroundImage = `url('${
  images[Math.floor(Math.random() * images.length)]
}')`;

// ⭐ 2. 실시간 시계 기능 ⭐
function updateClock() {
  const now = new Date(); // 현재 시간 가져오기
  const timeString = now.toLocaleTimeString(); // 시간을 문자열로 변환
  document.getElementById("clock").textContent = timeString; // 화면에 표시
}

// 1초마다 시계 업데이트
setInterval(updateClock, 1000);
updateClock(); // 처음 실행

// ⭐ 3. 랜덤 동기부여 문구 표시 ⭐
const quotes = [
  "오늘도 최선을 다하자!",
  "작은 노력의 반복이 큰 변화를 만든다.",
  "실패는 성공의 어머니!",
  "포기하지 않으면 불가능은 없다!",
];

// 랜덤 문구 선택해서 표시
document.getElementById("quote").textContent =
  quotes[Math.floor(Math.random() * quotes.length)];

// ⭐ 4. 할 일 추가 기능 ⭐
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// 사용자가 Enter를 눌렀을 때 실행
todoInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter" && todoInput.value.trim() !== "") {
    const li = document.createElement("li"); // 새로운 리스트 아이템 생성
    li.textContent = todoInput.value; // 입력한 값 넣기

    // 클릭하면 삭제되는 기능 추가
    li.addEventListener("click", function () {
      this.remove();
    });

    todoList.appendChild(li); // 리스트에 추가
    todoInput.value = ""; // 입력창 비우기
  }
});

// ⭐ 5. 날씨 정보 가져오기 ⭐
// OpenWeatherMap API 사용
const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY"; // 👉 여기에 API 키 입력!

// 위치 정보를 가져와 날씨를 요청하는 함수
function getWeather(position) {
  const lat = position.coords.latitude; // 위도
  const lon = position.coords.longitude; // 경도

  // OpenWeatherMap API 요청
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`;

  fetch(url)
    .then((response) => response.json()) // JSON 변환
    .then((data) => {
      // 날씨 정보 가져오기
      const temp = data.main.temp; // 온도
      const weather = data.weather[0].description; // 날씨 상태

      // 화면에 표시
      document.getElementById(
        "weather"
      ).textContent = `현재 온도: ${temp}°C, ${weather}`;
    })
    .catch((error) => {
      console.error("날씨 정보를 불러오지 못했습니다.", error);
    });
}

// 위치 정보 가져오기 실패 시
function showError(error) {
  console.warn(`ERROR(${error.code}): ${error.message}`);
  document.getElementById("weather").textContent =
    "날씨 정보를 불러올 수 없습니다.";
}

// 브라우저에서 위치 정보 요청
navigator.geolocation.getCurrentPosition(getWeather, showError);
