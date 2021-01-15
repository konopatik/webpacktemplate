const day_of_week = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const days = document.querySelector(".calendar__field-day-of-week");
day_of_week.forEach(el => {
    days.innerHTML += `<div class="calendar__field-item-day">${el}</div>`;
})
