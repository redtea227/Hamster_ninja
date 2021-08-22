// 宣告區
const
  btn = document.querySelector("button"),
  ninja = document.getElementsByTagName("img"),
  clrRY = new Array();
let
  sec = 60, count = 0;
  timeNode = document.getElementById("time"),
  countNode = document.getElementById("count");


// 遊戲開始
const gamestart = () => {
  // 初始化
  timeNode.textContent = sec;
  count = 0;
  countNode.textContent = count;
  btn.removeEventListener('click', gamestart);

  // 倒數至0
  const start = setInterval(() => {
    if (!sec) {
      clearInterval(start);
      btn.addEventListener('click', gamestart);
    }
    else {
      sec--;
      timeNode.textContent = sec;
    }
  }, 1000);
  // 圖片替換前置準備
  for (let i = 0; i < 100; i++) {
    const
      ontime = Math.floor(Math.random() * 55000),   // 0~54999 ms
      onSpace = Math.floor(Math.random() * 9),  // 0~8
      onDelay = Math.floor(Math.random() * 3) + 2;  // 2~4

    setTimeout(() => {
      showOn(i, onSpace, onDelay)
    }, ontime)
  }
}

// 圖片替換出現作業
const showOn = (siwho, siwhere, sihow) => {
  if (ninja[siwhere].style.backgroundColor == "") { //位置必須是黃色 才能轉紅色
    ninja[siwhere].src = "two.png";
    ninja[siwhere].alt = siwho; //炸彈序號
    ninja[siwhere].style.backgroundColor = "red";

    //red to yellow
    clrRY[siwho] = setTimeout(() => { // 在sihow秒之後，將圖片改回黃色並清除style屬性
      ninja[siwhere].src = "one.png";
      // ninja[siwhere].style.backgroundColor = null;
      ninja[siwhere].removeAttribute('style');
      ninja[siwhere].removeAttribute('alt');
    }, sihow * 1000);
  } else { //往下一格塞
    // const next = (siwhere == 8) ? 0 : siwhere + 1; //method1
    const next = (siwhere + 1) % 9; //method2
    setTimeout(() => {
      showOn(siwho, next, sihow);
    }, 100);
  }
}

// 得分計算
const getCount = (item) => {
  const ni = ninja[item];
  if (ni.style.backgroundColor == "red") {
    ni.style.backgroundColor = "green",
      ni.src = "three.png"

    countNode.textContent = ++count;

    //green to yellow
    setTimeout(() => {
      ni.src = "one.png";
      ni.removeAttribute('style');
      ni.removeAttribute('alt');
    }, 1000);

    // clear red to yellow's bomb
    clearTimeout(clrRY[ni.alt])
  }
};


// 按鈕
btn.addEventListener('click', gamestart);

// 滑鼠
for (let i = 0; i < ninja.length; i++) {
  ninja[i].addEventListener('click', function () {
    getCount(i);
  })
}

// 鍵盤
window.addEventListener('keydown', function(e){
  switch (e.code) {
    case "Numpad7":getCount(0);break;
    case "Numpad8":getCount(1);break;
    case "Numpad9":getCount(2);break;
    case "Numpad4":getCount(3);break;
    case "Numpad5":getCount(4);break;
    case "Numpad6":getCount(5);break;
    case "Numpad1":getCount(6);break;
    case "Numpad2":getCount(7);break;
    case "Numpad3":getCount(8);break;
  }
});