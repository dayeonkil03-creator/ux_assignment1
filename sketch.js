let products = [
  { id: 1, name: "셔츠" },
  { id: 2, name: "바지" },
  { id: 3, name: "신발" }
];

let wishlist = [];
let purchasedList = [];

function setup() {
  createCanvas(600, 400);
  textSize(14);
}

function draw() {
  background(245);

  // 제목
  textSize(18);
  text("상품 목록", 20, 30);
  text("좋아요 목록", 300, 30);

  textSize(14);

  // 상품 목록 출력
  for (let i = 0; i < products.length; i++) {
    let y = 60 + i * 50;

    text(products[i].name, 20, y);

    // 좋아요 버튼
    drawButton(120, y - 15, "좋아요", () => {
      addToWishlist(products[i]);
    });

    // 구매 버튼
    drawButton(200, y - 15, "구매", () => {
      purchaseItem(products[i].id);
    });
  }

  // 좋아요 목록 출력
  for (let i = 0; i < wishlist.length; i++) {
    let item = wishlist[i];
    let y = 60 + i * 40;

    let label = item.purchased ? " (구매 완료)" : "";

    text(item.name + label, 300, y);
  }
}

// 좋아요 추가
function addToWishlist(product) {
  // 이미 있는지 체크
  let exists = wishlist.find(item => item.id === product.id);
  if (exists) return;

  let isPurchased = purchasedList.includes(product.id);

  wishlist.push({
    id: product.id,
    name: product.name,
    purchased: isPurchased
  });
}

// 구매 기능
function purchaseItem(id) {
  // 구매 리스트에 추가
  if (!purchasedList.includes(id)) {
    purchasedList.push(id);
  }

  // 좋아요 목록에서 제거
  wishlist = wishlist.filter(item => item.id !== id);
}

// 버튼 그리기
function drawButton(x, y, label, onClick) {
  fill(200);
  rect(x, y, 60, 25, 5);

  fill(0);
  text(label, x + 10, y + 17);

  // 클릭 감지
  if (mouseIsPressed &&
      mouseX > x && mouseX < x + 60 &&
      mouseY > y && mouseY < y + 25) {
    onClick();
  }
}