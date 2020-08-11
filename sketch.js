let bg;
let bg_before_gatcha, bg_gatcha, bg_gatcha_rare, bg_each_card, bg_viewer, window_coin;
let bg_main, bg_wait, bg_result, bg_album;
let icon_lock, icon_star, icon_twinkle;
let arrow_left, arrow_right;
let btn_1x, btn_10x, btn_skip;


let status = 0;

let btn_1x_pos = new p5.Vector(735, 538);
let btn_10x_pos = new p5.Vector(930, 538);
let btn_skip_pos = new p5.Vector(1100, 10);

let btn_scout_size = new p5.Vector(180, 132);

let center_pos;

let img_letterA = [];
let img_letterB = [];
let letter_name = ["제로", "제로", "HiMERU", "오우카와 코하쿠", "아마기 린네", "20폼의 성좌", "인천 방향의 성좌", "할아버지의 기록", "홍소영의 앨범", "사랑의 마스코트 팬", "제로", "시이나 니키", "토모에 히요리", "미케지마 마다라", "제로", "?", "태우", "태우", "태우", "95년생 팬", "Showyourmind", "goodsoon96", "nicosj", "하버드", "동민", "준구", "보현", "도균", "상규", "김신", "준하", "윤정", "카카오의 새얼굴", "지원", "은비 선배", "동호", "진경", "별이", "FANNIE", "CAROLE&JACQUES", "Little Fucker", "아버지", "어머니", "소영", "Jin Youngwoo", "Loulou", "지현"];
let letter_price = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 6, 12, 8, 8, 8, 8, 8, 13, 15, 14, 18, 12, 16, 16, 16, 20, 20, 33, 50, 50, 55, 25, 52, 15];
let is_letter_shown = [];

let index = 0;
let now_selected_index = -1
let isRare = false;
let fadeIn = 0;
let fadeInTime = 2.0;
let results = [];
let revealed_results = [];

let coins = 0;
let album_page = 0;
let max_album_page;
let is_coin_window_shown = false;

let nowX = 0,
  nowY = 0;

let myFont;

function preload() {
  myFont = loadFont('assets/SDSwagger.otf');

  bg_before_gatcha = createVideo(['assets/bg_before_gatcha.mp4']);
  bg_gatcha = createVideo(['assets/blue.mp4']);
  bg_gatcha_rare = createVideo(['assets/colors.mp4']);
  bg_before_gatcha.hide();
  bg_gatcha.hide();
  bg_gatcha_rare.hide();
  bg_main = loadImage('assets/bg_main.png');
  bg_wait = loadImage('assets/bg_wait.png');
  bg_viewer = loadImage('assets/bg_viewer.png');
  bg_each_card = loadImage('assets/bg_each_card.png');
  bg_result = loadImage('assets/bg_result.png');
  bg_album = loadImage('assets/bg_album.png');

  window_coin = loadImage('assets/coin_window.png');
  ui_coin = loadImage('assets/ui_coin.png');
  icon_lock = loadImage('assets/icon_lock.png');
  icon_star = loadImage('assets/icon_star.png');
  icon_twinkle = loadImage('assets/icon_twinkle.png');

  arrow_left = loadImage('assets/arrow_left.png');
  arrow_right = loadImage('assets/arrow_right.png');

  btn_1x = loadImage('assets/btn_1x.png');
  btn_10x = loadImage('assets/btn_10x.png');
  btn_skip = loadImage('assets/btn_skip.png');

  for (let i = 0; i < 24; i++) {
    if (i < 9) {
      img_letterA.push(loadImage('assets/letters/normal0' + (i + 1) + '.png'));
    } else {
      img_letterA.push(loadImage('assets/letters/normal' + (i + 1) + '.png'));
    }
    is_letter_shown.push(false);
  }

  for (let i = 0; i < 23; i++) {
    if (i < 10) {
      img_letterB.push(loadImage('assets/letters/rare0' + (i) + '.png'));
    } else {
      img_letterB.push(loadImage('assets/letters/rare' + (i) + '.png'));
    }

    is_letter_shown.push(false);
  }

  max_album_page = floor((img_letterA.length + img_letterB.length) / 10);

}

function setup() {
  createCanvas(1280, 720);
  center_pos = new p5.Vector(width * 0.5, height * 0.5);
  // specify multiple formats for different browsers
  // by default video shows up in separate dom
  // element. hide it and draw it to the canvas
  // instead

}

function draw() {

  background(0);

  switch (status) {
    case 0:
      // page Main
      image(bg_main, 0, 0, 1280, 720);

      textFont(myFont);
      textSize(24);
      textAlign(CENTER);
      fill(12, 25, 93);
      text(coins, 505, 655);
      noFill();

      //image(btn_1x, btn_1x_pos.x, btn_1x_pos.y, 100, 50);
      //image(btn_10x, btn_10x_pos.x, btn_10x_pos.y, 100, 50);
      break;
    case 9:
      // page Gatcha touch to start
      image(bg_wait, 0, 0, 1280, 720); // draw the video frame to canvas
      break;
    case 1:
      // page Gatcha mp4 play
      if (isRare) {
        image(bg_gatcha_rare, 0, 0, 1280, 720); // draw the video frame to canvas
        if (bg_gatcha_rare.time() >= bg_gatcha_rare.duration()) {
          // If mp4 video file is played to end, 
          // go to page 

          status = 2;
        }
      } else {
        image(bg_gatcha, 0, 0, 1280, 720); // draw the video frame to canvas
        if (bg_gatcha.time() >= bg_gatcha.duration()) {
          // If mp4 video file is played to end, 
          // go to page 

          status = 2;
        }
      }
      image(btn_skip, btn_skip_pos.x, btn_skip_pos.y);

      break;
    case 2:
      // page Result

      drawMessage();

      break;
    case 10:
      // page Album
      image(bg_album, 0, 0, 1280, 720);
      image(ui_coin, 965, 50);

      textFont(myFont);
      textSize(24);
      textAlign(CENTER);
      fill(255);
      text(coins, 1073, 85);
      noFill();

      if (album_page > 0) {
        image(arrow_left, 35, 310);
      }
      if (album_page < max_album_page) {
        image(arrow_right, 1185, 310);
      }

      start_index = album_page * 10;
      // show 10 messages
      imageMode(CENTER);
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 2; j++) {
          index = start_index + (5 * j + i);

          if (is_letter_shown[index] == false) {
            tint(10, 150);
          }
          if (index < img_letterA.length) {
            image(img_letterA[index], width / 6 * (i + 1), height / 3 * (j + 1), img_letterA[index].width * 0.25, img_letterA[index].height * 0.25);
          } else {
            new_index = index - img_letterA.length;
            if (new_index < img_letterB.length) {
              image(img_letterB[new_index], width / 6 * (i + 1), height / 3 * (j + 1), img_letterB[new_index].width * 0.25, img_letterB[new_index].height * 0.25);
            }
          }
          if (is_letter_shown[index] == false) {
            noTint();
            image(icon_lock, width / 6 * (i + 1), height / 3 * (j + 1));
          }
        }
      }

      if (is_coin_window_shown) {
        image(window_coin, center_pos.x, center_pos.y);
        textFont(myFont);
        textSize(24);
        textAlign(CENTER);
        fill(12, 25, 93);
        
        if (coins - letter_price[now_selected_index] >= 0) {
          text(coins + "->" +(coins - letter_price[now_selected_index]), 620, 410);

        } else {
          text(-(coins - letter_price[now_selected_index]) + "코인이 부족합니다", 620, 410);
        }
        noFill();

      }
      imageMode(CORNER);
      break;
    case 11:
      // page Viewer
      image(bg_viewer, 0, 0, 1280, 720);

      textFont(myFont);
      textSize(80);
      textAlign(RIGHT);
      fill(255);
      text(letter_name[now_selected_index], 1275, 670);
      noFill();

      imageMode(CENTER);
      if (now_selected_index < img_letterA.length) {
        image(img_letterA[now_selected_index], center_pos.x, center_pos.y, img_letterA[now_selected_index].width, img_letterA[now_selected_index].height);
      } else {
        new_index = now_selected_index - img_letterA.length;
        if (new_index < img_letterB.length) {
          image(img_letterB[new_index], center_pos.x, center_pos.y, img_letterB[new_index].width * 0.25, img_letterB[new_index].height * 0.25);
        }
      }
      imageMode(CORNER);
      break;
  }
}


function touchEnded() {

  nowX = mouseX;
  nowY = mouseY;
  // nowX = touches[0].x;
  // nowY = touches[0].y;
  onInteraction();

}

function addNewMessage() {
  let randVal = random(0, 100);
  let p = [5.0, 95.0];

  let cumulative = 0.0;
  let out;

  for (let i = 0; i < 2; i++) {
    cumulative += p[i];
    if (randVal <= cumulative) {
      out = int(2 - i);
      break;
    }
  }

  let new_message_index;

  if (out === 2) {
    new_message_index = img_letterA.length + int(floor(random(img_letterB.length)));
    isRare = true;
  } else {
    new_message_index = int(floor(random(img_letterA.length)));
  }


  // check is letter shown before
  if (is_letter_shown[new_message_index] == false) {
    // not shown before
    is_letter_shown[new_message_index] = true;
  } else {
    // shown before
    coins++;
  }

  // add 1 message (index number) to results array 
  results.push(new_message_index);
}

function add10NewMessages() {

  let cnt_rare = 0;
  for (let i = 0; i < 10; i++) {

    let randVal = random(0, 100);
    let p;

    if (i < 3) {
      p = [10.0, 90.0];
    } else if (i == 9) {
      p = [100.0, 100.0];
    } else {
      p = [5.0, 95.0];
    }

    let cumulative = 0.0;
    let out;

    for (let i = 0; i < 2; i++) {
      cumulative += p[i];
      if (randVal <= cumulative) {
        out = int(2 - i);
        break;
      }
    }

    let new_message_index;

    if (out === 2) {
      new_message_index = img_letterA.length + int(floor(random(img_letterB.length)));
      cnt_rare++;
    } else {
      new_message_index = int(floor(random(img_letterA.length)));

    }

    // check is letter shown before
    if (is_letter_shown[new_message_index] == false) {
      // not shown before
      is_letter_shown[new_message_index] = true;
    } else {
      // shown before
      coins++;
    }

    results.push(new_message_index);
  }
  if (cnt_rare >= 2)
    isRare = true;


}

function onInteraction() {
  print(nowX, nowY);
  switch (status) {
    case 0:
      if (nowX >= 270 && nowX <= 360 &&
        nowY >= 585 && nowY <= 670) {
        // If button album is pressed, 

        album_page = 0;
        // change to page Album
        status = 10;
        changeStatus();
      } else if (nowX >= btn_1x_pos.x && nowX <= btn_1x_pos.x + btn_scout_size.x &&
        nowY >= btn_1x_pos.y && nowY <= btn_1x_pos.y + btn_scout_size.y) {
        // If button scout * 1 is pressed, 

        // add 1 message (index number) to results array
        addNewMessage();

        // change to page Wait
        status = 9;
        changeStatus();
      } else if (nowX >= btn_10x_pos.x && nowX <= btn_10x_pos.x + btn_scout_size.x &&
        nowY >= btn_10x_pos.y && nowY <= btn_10x_pos.y + btn_scout_size.y) {
        // If button scout * 10 is pressed,

        // add 10 messages (index number) to results array
        add10NewMessages();

        // change to page Wait
        status = 9;
        changeStatus();
      }
      break;
    case 9:
      status = 1;
      changeStatus();
      break;
    case 1:
      if (nowX >= btn_skip_pos.x && nowX <= btn_skip_pos.x + 132 &&
        nowY >= btn_skip_pos.y && nowY <= btn_skip_pos.y + 61) {
        // If button skip pressed,
        status++;
        changeStatus();
      }
      break;
    case 2:
      if (results.length > 0) {
        // If all results are now shown yet,
        revealed_results.push(results[0]); // move shown result index to revealed_results
        results.splice(0, 1); // remove shown result index from results
        fadeIn = fadeInTime;
      } else {
        // If all results are shown, 
        if (nowX >= 960 && nowX <= 1230 &&
          nowY >= 605 && nowY <= 670) {
          // If button ok pressed,
          status++;
        }
      }
      changeStatus();
      break;
    case 3:
      status = 0;
      changeStatus();
      break;
    case 10:

      if (!is_coin_window_shown) {
        if (nowX >= 10 && nowX <= 80 &&
          nowY >= 16 && nowY <= 90) {
          // If button back pressed,
          // change to Page Main
          status = 0;
        } else if (nowX >= 30 && nowX <= 90 &&
          nowY >= 305 && nowY <= 395) {
          // If arrow left pressed,

          if (album_page > 0) {
            album_page--;
          }
        } else if (nowX >= 1175 && nowX <= 1235 &&
          nowY >= 305 && nowY <= 395) {
          // If arrow right pressed,


          if (album_page < max_album_page) {
            album_page++;
          }
        }

        start_index = album_page * 10;

        for (let i = 0; i < 5; i++) {
          for (let j = 0; j < 2; j++) {
            index = start_index + (5 * j + i);

            if (index < img_letterA.length) {
              let thumbnail_x = width / 6 * (i + 1);
              let thumbnail_y = height / 3 * (j + 1);
              let thumbnail_w = img_letterA[index].width * 0.25;
              let thumbnail_h = img_letterA[index].height * 0.25
              if (nowX >= (thumbnail_x - thumbnail_w * 0.5) && nowX <= (thumbnail_x + thumbnail_w * 0.5) &&
                nowY >= (thumbnail_y - thumbnail_h * 0.5) && nowY <= (thumbnail_y + thumbnail_h * 0.5)) {

                now_selected_index = index;
                if (is_letter_shown[index] == false) {
                  // if is not shown,
                  // show window coin;
                  is_coin_window_shown = true;
                } else {
                  // if is shown,
                  status = 11;

                }
              }
            }
          }
        }
      } else {
        // when is Coin Window shown,
        if (nowX >= 760 && nowX <= 835 &&
          nowY >= 380 && nowY <= 420) {
          // If btn okay pressed,
          if (coins - letter_price[now_selected_index] > 0) {

            coins -= letter_price[now_selected_index];
            is_letter_shown[now_selected_index] = true;
            is_coin_window_shown = false;
            now_selected_index = -1;
          }
        } else if (nowX >= 590 && nowX <= 690 &&
          nowY >= 455 && nowY <= 495) {
          // If btn cancel pressed,
          is_coin_window_shown = false;
          now_selected_index = -1;
        }




      }
      break;

    case 11:
      if (nowX >= 10 && nowX <= 80 &&
        nowY >= 16 && nowY <= 90) {
        // If button back pressed,
        // change to Page Album
        status = 10;
        now_selected_index = -1;
      }
      break;
  }

}

function changeStatus() {

  switch (status) {
    case 0:
      // page Main
      break;
    case 1:
      // page Gatcha.mp4 play
      if (isRare) {
        bg_gatcha_rare.time(0);
        bg_gatcha_rare.play();
      } else {
        bg_gatcha.time(0);
        bg_gatcha.play();
      }
      break;
    case 2:
      // page Result
      fadeIn = fadeInTime;
      break;
    case 3:
      status = 0;
      isRare = false;
      revealed_results = [];
      break;
  }

}

function drawMessage() {
  if (results.length > 0) {

    imageMode(CENTER);
    background(0);
    image(bg_each_card, center_pos.x, center_pos.y);
    // show each message

    /*
    fill(0, 100);
    noStroke();
    rect(50, 50, width - 100, height - 240);
    fill(255);
    textSize(24);
    textAlign(CENTER, CENTER);
    index = results[0];
    text(congratulations[index], width * 0.5, height * 0.35);
*/
    index = results[0];

    textFont(myFont);
    textSize(80);
    textAlign(RIGHT);
    fill(12, 25, 93);
    rect(1275 - textWidth(letter_name[index]), 600, textWidth(letter_name[index]), 80);
    fill(255);
    text(letter_name[index], 1275, 670);
    noFill();

    if (index < img_letterA.length) {
      image(img_letterA[index], center_pos.x, center_pos.y);
      for (let i = 0; i < 3; i++) {
        let x_pos = 1235 - icon_star.width * i;
        image(icon_star, x_pos, 125);
      }
    } else {
      image(img_letterB[index - img_letterA.length], center_pos.x, center_pos.y);
      for (let i = 0; i < 4; i++) {
        let x_pos = 1235 - icon_star.width * i;
        image(icon_star, x_pos, 125);
      }
    }
    imageMode(CORNER);


    // FADE EFFECT for each Message
    if (fadeIn > 0) {
      fadeIn -= deltaTime / 300;

      let alpha = constrain(map(fadeIn, fadeInTime, 0, 500, 0), 0, 255);
      noStroke();
      fill(255, alpha);
      rect(0, 0, width, height);
    }
  } else {
    image(bg_result, 0, 0);
    // show all message
    if (revealed_results.length == 1) {
      // show 1 message at center
      imageMode(CENTER);
      index = revealed_results[0];

      if (index < img_letterA.length) {
        image(img_letterA[index], center_pos.x, center_pos.y, img_letterA[index].width * 0.25, img_letterA[index].height * 0.25);
      } else {
        new_index = index - img_letterA.length;
        image(img_letterB[new_index], center_pos.x, center_pos.y, img_letterB[new_index].width * 0.25, img_letterB[new_index].height * 0.25);
      }
      imageMode(CORNER);
    } else if (revealed_results.length == 10) {
      // show 10 messages
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 2; j++) {
          imageMode(CENTER);
          index = revealed_results[j * 5 + i];

          if (index < img_letterA.length) {
            image(img_letterA[index], width / 6 * (i + 1), height / 3 * (j + 1) - 40, img_letterA[index].width * 0.25, img_letterA[index].height * 0.25);
          } else {
            new_index = index - img_letterA.length;
            image(img_letterB[new_index], width / 6 * (i + 1), height / 3 * (j + 1) - 40, img_letterB[new_index].width * 0.25, img_letterB[new_index].height * 0.25);
          }
          imageMode(CORNER);
        }
      }
    }

  }
}