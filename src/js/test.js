import 'ion-rangeslider';
import 'ion-rangeslider/css/ion.rangeSlider.min.css';



$(".js-range-slider").ionRangeSlider({
    step: 1000,
    grid_num: 3,
    type: "double",
    grid: true,
    min: 0,
    max: 15000,
    from: 5000,
    to: 5000,
    onChange: function (data) {
        console.dir(data);
    }
})