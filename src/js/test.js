import 'ion-rangeslider';
import 'ion-rangeslider/css/ion.rangeSlider.min.css';


function logslider(position, reverse) {
    // position will be between 0 and 100
    var minp = 0;
    var maxp = 100;

    // The result should be between 100 an 10000000
    var minv = Math.log(10);
    var maxv = Math.log(10000);

    // calculate adjustment factor
    var scale = (maxv - minv) / (maxp - minp);

    return reverse
        ? (Math.log(position) - minv) / scale + minp
        : Math.exp(minv + scale * (position - minp))
        ;
}


$(".js-range-slider").ionRangeSlider({
    step: 1000,
    type: "double",
    grid: true,
    min: 0,
    max: 15000,
    from: 5000,
    to: 5000,
    prettify(position) {
        return Math.round(logslider(position, false)).toLocaleString();
    }
})