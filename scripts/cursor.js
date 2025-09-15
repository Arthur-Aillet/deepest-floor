document.addEventListener("mousemove", (e) => {
  const cursor = document.querySelector(".custom-cursor");
  cursor.style.left = `${e.clientX - 20.5}px`;
  cursor.style.top = `${e.clientY - 20.5}px`;
  // const cursorType = getComputedStyle(e.target).cursor;
  // if (cursorType != "none") {
  //   cursor.style.display = "none";
  // } else {
  //   cursor.style.display = "inherit";
  // }
});

function getCurrentRotation(el) {
  var st = window.getComputedStyle(el, null);
  var tm =
    st.getPropertyValue("-webkit-transform") ||
    st.getPropertyValue("-moz-transform") ||
    st.getPropertyValue("-ms-transform") ||
    st.getPropertyValue("-o-transform") ||
    st.getPropertyValue("transform") ||
    "none";
  if (tm != "none") {
    var values = tm.split("(")[1].split(")")[0].split(",");
    /*
    a = values[0];
    b = values[1];
    angle = Math.round(Math.atan2(b,a) * (180/Math.PI));
    */
    //return Math.round(Math.atan2(values[1],values[0]) * (180/Math.PI)); //this would return negative values the OP doesn't wants so it got commented and the next lines of code added
    var angle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
    return angle < 0 ? angle + 360 : angle; //adding 360 degrees here when angle < 0 is equivalent to adding (2 * Math.PI) radians before
  }
  return 0;
}

let angle = 0;
let animate = true;

let updateAngle = () => {
  angle += 2;
  document.querySelector(
    ".custom-cursor"
  ).style.transform = `rotate(${angle}deg) scale(100%)`;
  if (animate == true) {
    requestAnimationFrame(updateAngle);
  }
};

requestAnimationFrame(updateAngle);

function portraitHover() {
  animate = false;
  const cursor = document.querySelector(".custom-cursor");
  angle = Math.floor(angle / 90) * 90 - 1;
  cursor.style.transition =
    "transform 0.4s linear(0, 0.012 0.6%, 0.047 1.2%, 0.186 2.5%, 0.387 3.8%, 0.948 7%, 1.186 8.7%, 1.278 9.6%, 1.338 10.4%, 1.378 11.2%, 1.398 12.1%, 1.398 12.7%, 1.387 13.4%, 1.331 14.8%, 1.253 16.1%, 1.022 19.4%, 0.922 21.2%, 0.865 22.8%, 0.842 24.4%, 0.844 25.6%, 0.86 26.8%, 1.023 33.2%, 1.052 35%, 1.063 36.8%, 1.056 39.2%, 0.992 45.5%, 0.975 49.1%, 1.01 61.4%, 0.996 73.6%, 1)";
  setTimeout(() => {
    cursor.style.transform = `rotate(${angle}deg) scale(90%)`;
  }, 400);
}

function portraitLeave() {
  animate = true;
  requestAnimationFrame(updateAngle);
}
