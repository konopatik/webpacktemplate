import 'ion-rangeslider';
import 'ion-rangeslider/css/ion.rangeSlider.min.css';
import 'ion-rangeslider/js/ion.rangeSlider.min.js'


$(".js-range-slider").ionRangeSlider({
    skin: "round",
    step: 1000,
    grid_num: 3,
    type: "double",
    grid: true,
    min: 0,
    max: 15000,
    from: 5000,
    to: 10000,
})