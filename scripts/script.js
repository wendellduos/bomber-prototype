const main = document.querySelector("main");

const map = [
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "-"],
  ["-", " ", "*", " ", "*", " ", "*", " ", "*", " ", "*", " ", "*", " ", "-"],
  ["-", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "-"],
  ["-", " ", "*", " ", "*", " ", "*", " ", "*", " ", "*", " ", "*", " ", "-"],
  ["-", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "-"],
  ["-", " ", "*", " ", "*", " ", "*", " ", "*", " ", "*", " ", "*", " ", "-"],
  ["-", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "-"],
  ["-", " ", "*", " ", "*", " ", "*", " ", "*", " ", "*", " ", "*", " ", "-"],
  ["-", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "-"],
  ["-", " ", "*", " ", "*", " ", "*", " ", "*", " ", "*", " ", "*", " ", "-"],
  ["-", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
];

//Draw map sprites acccording to 'map' const
map.forEach((row) => {
  row.forEach((sprite) => {
    switch (sprite) {
      case "-":
        main.innerHTML += `<div class="sprite map-wall-block"></div>`;

        break;
      case " ":
        main.innerHTML += `<div class="sprite map-floor-tile"></div>`;

        break;
      case "*":
        main.innerHTML += `<div class="sprite map-fixed-block"></div>`;
    }
  });
});

//Parameters
let playableArea = { xMin: 32, xMax: 416, yMin: 32, yMax: 352 };
let playerVelocity = 4;
let physicsTolerance = 10;

const playerElement = document.getElementById("player");
const playerPosition = { x: 32, y: 32 };

updtPlayerPosition();

//Buttons and states
const keyboardBtns = {
  left: {
    key: "a",
  },
  right: {
    key: "d",
  },
  up: {
    key: "w",
  },
  down: {
    key: "s",
  },
};

let intervalFrequency = 33;

let leftMotionI;
let rightMotionI;
let upMotionI;
let downMotionI;

//Handle WASD controls
addEventListener("keydown", ({ key }) => {
  if (key === keyboardBtns.left.key) {
    movePlayer("left");
  } else if (key === keyboardBtns.right.key) {
    movePlayer("right");
  } else if (key === keyboardBtns.up.key) {
    movePlayer("up");
  } else if (key === keyboardBtns.down.key) {
    movePlayer("down");
  }
});

//Listen for WASD keys release, stops motion and unsets interval
addEventListener("keyup", ({ key }) => {
  if (key === keyboardBtns.left.key) {
    clearInterval(leftMotionI);
    leftMotionI = undefined;
  } else if (key === keyboardBtns.right.key) {
    clearInterval(rightMotionI);
    rightMotionI = undefined;
  } else if (key === keyboardBtns.up.key) {
    clearInterval(upMotionI);
    upMotionI = undefined;
  } else if (key === keyboardBtns.down.key) {
    clearInterval(downMotionI);
    downMotionI = undefined;
  }
});

//Whenever the player hits or goes beyond the defined playableArea
//its position resets to the maximum/minimum position in the axis
//otherwise, player moves to direction by playerVelocity (in px)
function movePlayer(direction) {
  switch (direction) {
    case "left":
      if (!leftMotionI) {
        leftMotionI = setInterval(() => {
          if (playerPosition.x <= playableArea.xMin) {
            playerPosition.x = playableArea.xMin;

            updtPlayerPosition();
          } else {
            playerPosition.x -= playerVelocity;

            updtPlayerPosition();
          }
        }, intervalFrequency);
      }

      break;
    case "right":
      if (!rightMotionI) {
        rightMotionI = setInterval(() => {
          if (playerPosition.x >= playableArea.xMax) {
            playerPosition.x = playableArea.xMax;

            updtPlayerPosition();
          } else {
            playerPosition.x += playerVelocity;

            updtPlayerPosition();
          }
        }, intervalFrequency);
      }

      break;
    case "up":
      if (!upMotionI) {
        upMotionI = setInterval(() => {
          if (playerPosition.y <= playableArea.yMin) {
            playerPosition.y = playableArea.yMin;

            updtPlayerPosition();
          } else {
            playerPosition.y -= playerVelocity;

            updtPlayerPosition();
          }
        }, intervalFrequency);
      }

      break;
    case "down":
      if (!downMotionI) {
        downMotionI = setInterval(() => {
          if (playerPosition.y >= playableArea.yMax) {
            playerPosition.y = playableArea.yMax;

            updtPlayerPosition();
          } else {
            playerPosition.y += playerVelocity;

            updtPlayerPosition();
          }
        }, intervalFrequency);
      }
  }
}

//Update player position based in playerPosition variable
function updtPlayerPosition() {
  playerElement.style.left = `${playerPosition.x}px`;
  playerElement.style.top = `${playerPosition.y}px`;
}

// const playerAnimations = {
//   left: [],
//   right: {
//     x: [0, 130, 195, 260],
//     y: 65,
//   },
//   up: {
//     key: "w",
//   },
//   down: {
//     key: "s",
//   },
// };

// getComputedStyle(playerElement, ":after").backgroundPosition = `0px 100px`;

// setInterval(() => {
//   for (i = 0; i < playerAnimations.right.x.length; i++) {
//     getComputedStyle(
//       playerElement,
//       ":after"
//     ).backgroundPositionY = `${playerAnimations.right.x[i]}px`;
//   }
// }, 1000);
