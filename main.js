// ⭐ 랜덤 배경 이미지 설정
const images = ["img/img1.jpg", "img/img2.jpg", "img/img3.jpg"];
document.body.style.backgroundImage = `url('${
  images[Math.floor(Math.random() * images.length)]
}')`;

// ⭐ 실시간 시계 기능 (오전/오후 00:00 형식)
function updateClock() {
  const now = new Date(); // 현재 시간 가져오기
  const options = { hour: "2-digit", minute: "2-digit", hour12: true }; // 12시간 형식
  const timeString = now.toLocaleTimeString("ko-KR", options); // "오전 00:00" 형식으로 변환

  // 오전/오후와 시간을 분리하여 표시
  const amPm = timeString.split(" ")[0]; // 오전/오후
  const time = timeString.split(" ")[1]; // 시간

  document.getElementById("am-pm").innerHTML = amPm;
  document.getElementById("time").innerHTML = time;
}
setInterval(updateClock, 1000);
updateClock();

// ⭐ 할 일 추가 기능
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

todoInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter" && todoInput.value.trim() !== "") {
    const li = document.createElement("li");
    li.innerHTML = todoInput.value;
    todoList.appendChild(li);
    todoInput.value = "";

    // 클릭하면 삭제
    li.addEventListener("click", function () {
      this.remove();
    });
  }
});

// ⭐ 날씨 정보 가져오기
navigator.geolocation.getCurrentPosition(getWeather);
const API_KEY = "123cc587f06008e695889dda43c15fc3"; // OpenWeatherMap API 키 입력

function getWeather(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const temp = data.main.temp.toFixed(1); // 소수점 1자리까지 온도
      const iconCode = data.weather[0].icon; // 날씨 아이콘 코드
      let weatherIcon = "wi-na"; // 기본 아이콘

      // 아이콘 매핑
      if (iconCode.includes("01")) weatherIcon = "wi-day-sunny";
      else if (iconCode.includes("02")) weatherIcon = "wi-day-cloudy";
      else if (iconCode.includes("03") || iconCode.includes("04"))
        weatherIcon = "wi-cloud";
      else if (iconCode.includes("09") || iconCode.includes("10"))
        weatherIcon = "wi-rain";
      else if (iconCode.includes("11")) weatherIcon = "wi-thunderstorm";
      else if (iconCode.includes("13")) weatherIcon = "wi-snow";
      else if (iconCode.includes("50")) weatherIcon = "wi-fog";

      document.getElementById(
        "weather"
      ).innerHTML = `<i class="wi ${weatherIcon}"></i> (${temp}°C)`;
    })
    .catch(() => {
      console.error("날씨 정보를 불러오지 못했습니다.");
    });
}
