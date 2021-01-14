const day_of_week = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const days = document.querySelector(".calendar__field-day-of-week");
day_of_week.forEach(el => {
    days.innerHTML += `<div class="calendar__field-item-day">${el}</div>`;
})


const dates = document.querySelector(".calendar__field-dates");
for(let i=29; i<=31; i++) {
    dates.innerHTML += `<li class="calendar__field-dates-item">${i}</li>`
    if(i==31){
        for(let j=1; j<=31; j++){
            dates.innerHTML += `<li class="calendar__field-dates-item">${j}</li>`
        }
    }
}