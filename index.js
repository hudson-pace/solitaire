const canvas = document.querySelector('#game-board');
canvas.width = 1800;
canvas.height = 900;
const context = canvas.getContext('2d');
const cardSize = {
  height: 300,
  width: 200,
}
const Suits = {
  spades: 'spades',
  hearts: 'hearts',
  clubs: 'clubs',
  diamonds: 'diamonds',
}
const numbers = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

const suitColumns = [
  cardSize.width / 4,
  cardSize.width / 2,
  cardSize.width - (cardSize.width / 4),
];
const suitRows = [
  (cardSize.height * 1) / 5,
  (cardSize.height * 1) / 4,
  (cardSize.height * 1) / 3,
  (cardSize.height * 2) / 5,
  (cardSize.height * 2) / 4,
  (cardSize.height * 3) / 5,
  (cardSize.height * 2) / 3,
  (cardSize.height * 3) / 4,
  (cardSize.height * 4) / 5,
]

const getSuitPosition = (col, row) => {
  return {
    x: suitColumns[col],
    y: suitRows[row],
  }
}

const suitPositions = {
  A: [[1, 4]],
  2: [[1, 1], [1, 7]],
  3: [[1, 1], [1, 4], [1, 7]],
  4: [[0, 1], [0, 7], [2, 1], [2, 7]],
  5: [[0, 1], [0, 7], [1, 4], [2, 1], [2, 7]],
  6: [[0, 1], [0, 4], [0, 7], [2, 1], [2, 4], [2, 7]],
  7: [[0, 1], [0, 4], [0, 7], [1, 3], [2, 1], [2, 4], [2, 7]],
  8: [[0, 1], [0, 4], [0, 7], [1, 3], [1, 6], [2, 1], [2, 4], [2, 7]],
  9: [[0, 0], [0, 3], [0, 5], [0, 8], [1, 4], [2, 0], [2, 3], [2, 5], [2, 8]],
  10: [[0, 0], [0, 3], [0, 5], [0, 8], [1, 2], [1, 6], [2, 0], [2, 3], [2, 5], [2, 8]],
  J: [[0, 1], [2, 7]],
  Q: [[0, 1], [2, 7]],
  K: [[0, 1], [2, 7]],
}

Object.keys(suitPositions).forEach((key) => {
  suitPositions[key] = suitPositions[key].map(([col, row]) => {
    return getSuitPosition(col, row);
  });
});

const randomSuit = () => {
  const i = Math.floor(Math.random() * Object.keys(Suits).length);
  return Suits[Object.keys(Suits)[i]];
}
const randomNumber = () => {
  const i = Math.floor(Math.random() * numbers.length);
  return numbers[i];
}

const createCard = (x, y, number, suit) => {
  console.log(`creating ${number} of ${suit}`);
  const card = {
    number,
    suit,
  };

  card.updatePosition = (x, y) => {
    card.position = { x, y };
    card.top = y - (cardSize.height / 2);
    card.bottom = y + (cardSize.height / 2);
    card.left = x - (cardSize.width / 2);
    card.right = x + (cardSize.width / 2);
    card.topLeft = { x: card.left, y: card.top };
    card.topRight = { x: card.right, y: card.top };
    card.bottomLeft = { x: card.left, y: card.bottom };
    card.bottomRight = { x: card.right, y: card.bottom };
  }

  card.updatePosition(x, y);
  return card;
}

const drawDiamondAt = (x, y) => {
  context.beginPath();
  const height = 30;
  const width = 20;
  context.moveTo(x - width, y);
  context.lineTo(x, y - height);
  context.lineTo(x + width, y);
  context.lineTo(x, y + height);
  context.lineTo(x - width, y);
  context.fill();
}

const drawHeartAt = (x, y) => {
  const height = 30;
  const width = 20;
  context.beginPath();
  context.arc(x - (width / 2), (y - height) + (width / 2), width / 2, Math.PI, 0);
  context.arc(x + (width / 2), (y - height) + (width / 2), width / 2, Math.PI, 0);
  
  context.moveTo(x - width, (y - height) + (width / 2));
  context.lineTo(x + width, (y - height) + (width / 2));
  context.lineTo(x, y + (height / 2));
  context.lineTo(x - width, (y - height) + (width / 2));
  
  context.fill();
}

const drawCard = (card) => {
  context.strokeStyle = 'black';
  context.fillStyle = 'white';
  context.lineWidth = 3;
  context.beginPath();
  context.rect(card.position.x, card.position.y, cardSize.width, cardSize.height);
  context.fill();
  context.stroke();
  context.fillStyle = 'red';
  suitPositions[card.number].forEach((position) => {
    drawHeartAt(position.x + card.position.x, position.y + card.position.y);
  });

  context.font = 'bold 48px serif';
  context.textBaseline = 'top';
  context.fillText(card.number, card.position.x, card.position.y);
}

const drawCards = (cards) => {
  cards.forEach((card) => {
    drawCard(card);
  });
}

const cards = [];
cards.push(createCard(100, 100, numbers[0], randomSuit()));



const draw = () => {
  drawCards(cards);
}


draw();

let i = 0;
canvas.addEventListener('click', () => {
  i++;
  if (i > 12) {
    i = 0;
  }
  cards[0].number = numbers[i];
  draw();
})