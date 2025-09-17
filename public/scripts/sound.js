function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function playAtencion() {
  const element = document.getElementById(
    "atencion-" + randomIntFromInterval(1, 3)
  );
  element.volume = 0.1;
  element.play();
}

function playShot() {
  const element = document.getElementById("shot");
  element.volume = 0.1;

  const portrait = document.getElementById("portrait-img");
  portrait.style.animation = "blink normal 0.1s 3 linear";

  const atencion = document.getElementById("atencion-img");
  atencion.style.animation = "blink normal 0.1s 3 linear";

  element.play();

  const atencion1 = document.getElementById("atencion-1");
  atencion1.pause();
  atencion1.currentTime = 0;
  const atencion2 = document.getElementById("atencion-2");
  atencion2.pause();
  atencion2.currentTime = 0;
  const atencion3 = document.getElementById("atencion-3");
  atencion3.pause();
  atencion3.currentTime = 0;
}

function stopShot() {
  const element = document.getElementById("shot");

  const portrait = document.getElementById("portrait-img");
  portrait.style.animation = "none";

  const atencion = document.getElementById("atencion-img");
  atencion.style.animation = "none";

  element.pause();
  element.currentTime = 0;
}
