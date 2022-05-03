//MAKE THE MAGIC HAPPEN

// Thomas

let apple1 = $("#apple1");
let apple2 = $("#apple2");
let apple3 = $("#apple3");
let tree = $("#tree");
let basket = $("#basketfront");

let apples = [apple1, apple2, apple3];

let treePosition = {
  minLeft: tree.position().left + 100,
  maxLeft: tree.position().left + 600,
  minTop: tree.position().top + 100,
  maxTop: tree.position().top + 375,
};

let basketPosition = {
  top: basket.position().top,
  minLeft: basket.position().left + 10,
  maxLeft: basket.position().left + 120,
};

apples.forEach((apple) => {
  let randX =
    Math.floor(
      Math.random() * (treePosition.maxLeft - treePosition.minLeft + 1)
    ) + treePosition.minLeft;

  let randY =
    Math.floor(
      Math.random() * (treePosition.maxTop - treePosition.minTop + 1)
    ) + treePosition.minTop;

  apple.animate({ top: randY, left: randX });

  apple.click(() => {
    let randBasketX =
      Math.floor(
        Math.random() * (basketPosition.maxLeft - basketPosition.minLeft + 1)
      ) + basketPosition.minLeft;
    apple.animate({ top: basketPosition.top, left: randBasketX }, 2000);
  });
});

//
