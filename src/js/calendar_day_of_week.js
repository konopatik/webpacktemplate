const day_of_week = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const days = document.querySelector(".calendar__field-day-of-week");
day_of_week.forEach(el => {
    days.innerHTML += `<div class="calendar__field-item-day">${el}</div>`;
})

const dates = document.querySelectorAll(".calendar__field-dates-restangle");

if (dates) {
    dates.forEach(el => {
        const calendarItem = el.querySelectorAll('.calendar__field-dates-item');
        calendarItem.forEach((el, index) => {
            el.setAttribute('data-color', index);
            calendarItem.innerHTML += `<li class="image-pagination__item ${index == 19 && index == 23 ? 'background-selection-date' : ''} data-index="${index}"></li>`;
        })
    })
}
// data_items.forEach((el, index) => {
//     dates.innerHTML += `<li class="calendar__field-dates-item background-data-item ${index<=2 || index>=34 ? 'other-month' : ''}">${el}</li>`;
// })

// for(let i=29; i<=31; i++) {
//     dates.innerHTML += `<li class="calendar__field-dates-item other-month">${i}</li>`
//     if(i==31){
//         for(let j=1; j<=31; j++){
//             dates.innerHTML += `<li class="calendar__field-dates-item">${j}</li>`
//             if (j==31) {
//                 dates.innerHTML += `<li class="calendar__field-dates-item other-month">1</li>`
//             }
//         }
//     }
// }