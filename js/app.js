$("button").on("click", () => {
    console.log("Game Start");
    // createSquares(200); // for testing prior to setting up the rounds
    setTimer();
    setUpRound();
});

const createSquares = numberOfSquares => {
    const $squares = $(".game-board");
    for (let i = 0; i < numberOfSquares; i++) {
      const $square = $("<div/>");
      $square.addClass("square");
      $square.css("background-color", applyRandomColor());
      $squares.append($square);
    }
  };

  const applyRandomColor = () => {
    const colors = ["red", "green", "blue"];
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
  };

  $(".squares").on("click",".square", e => {
    handlePoke(e);
  });
  
  
let score = 0;

const handlePoke = e => {
  if (e.target.classList.contains("poked")) {
    return;
  }
  if (e.target.classList.contains("square")) {
    $(e.target).css("opacity", 0.3);
    const color = $(e.target).css("background-color");
    $(e.target).addClass("poked");
    checkValidPoke(color);
  }
};

const checkValidPoke = squareColor => {
  // console.log('SQUARE', square, typeof square);
  const colors = squareColor.substring(4, squareColor.length - 1).split(" "); // Get rgba from div inline style
  const blue = parseInt(colors[2]);
  if (blue === 255) {
    score++;
    $("h1").text("scoreboard: " + score);
  } else {
    score--;
    $("h1").text("scoreboard: " + score);
  }
};


let time = 30;
let round = 1;

const setTimer = () => {
  const timer = setInterval(() => {
    time--;
    if (time === 0) {
      round++;
      clearInterval(timer);
      setUpRound();
      setTimer();
    }
    updateTime();
  }, 1000);
};

const updateTime = () => {
  const $timer = $("#timer");
  $timer.text(`timer: ${time}s`);
};



const setUpRound = () => {
    $(".squares").empty();
    $("#round").text("round: " + round);
  
    if (round === 1) {
      createSquares(10);
      time = 30;
    } else if (round === 2) {
      createSquares(20);
      time = 20;
    } else if (round === 3) {
      createSquares(30);
      time = 10;
    } else {
      createSquares(40);
      time = 10;
    }
  };
  
