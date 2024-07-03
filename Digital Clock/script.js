const clock = document.getElementById('clock');

setInterval(function () {
    let mydate = new Date();
    // console.log(mydate.toLocaleTimeString())
    clock.innerHTML = mydate.toLocaleTimeString();
}, 1000);