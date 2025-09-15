document.addEventListener("mousemove", (e) => {
  eyesFollow(e.clientX, e.clientY);
});

async function eyeBlink() {
  const back = document.getElementById("eyes-closed");
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  while (true) {
    back.style.display = "inherit";
    await delay(100);
    back.style.display = "none";
    await delay(2500);
  }
}
window.onload = eyeBlink;

function eyesFollow(x, y) {
  const pupil = document.getElementById("pupil");
  const pupilBox = pupil.getBoundingClientRect();

  const diffX = pupilBox.right - (pupilBox.right - pupilBox.left) / 2 - x;
  let offsetX = 0;
  if (diffX > 18) {
    offsetX = -4;
  } else if (diffX > 5) {
    offsetX = -2;
  } else if (diffX < -18) {
    offsetX = 4;
  } else if (diffX < -5) {
    offsetX = 2;
  }
  offsetX -= 18;

  const diffY = pupilBox.top - (pupilBox.top - pupilBox.bottom) / 2 - y + 6;
  let offsetY = -1;
  if (diffY > 1) {
    offsetY = -2;
  } else if (diffY < -1) {
    offsetY = 0;
  }

  pupil.style.transform = "translate(" + offsetX + "px, " + offsetY + "px)";
}
