const Hour = document.querySelector('.hour');
const Minute = document.querySelector('.minute');
const Second = document.querySelector('.second');

setInterval(() => {
    const date = new Date();
    let Htime = date.getHours();
    let Mtime = date.getMinutes();
    let Stime = date.getSeconds();

    let hrotation = (Htime * 30) + (Mtime / 2);
    let mrotation = (Mtime * 6) + (Stime / 10);
    let srotation = Stime * 6;

    Hour.style.transform = `rotate(${hrotation}deg)`;
    Minute.style.transform = `rotate(${mrotation}deg)`;
    Second.style.transform = `rotate(${srotation}deg)`;
}, 1000)