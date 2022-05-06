//MAKE THE MAGIC HAPPEN

// Thomas

// Variables
let apple1 = $("#apple1");
let apple2 = $("#apple2");
let apple3 = $("#apple3");
let tree = $("#tree");
let basket = $("#basketfront");

let apples = [apple1, apple2, apple3];

// Get the area where the apples can appear
let treePosition = {
  minLeft: tree.position().left + 100,
  maxLeft: tree.position().left + 600,
  minTop: tree.position().top + 100,
  maxTop: tree.position().top + 375,
};

// Get the area where apples can move to in the basket
let basketPosition = {
  top: basket.position().top,
  minLeft: basket.position().left + 10,
  maxLeft: basket.position().left + 120,
};

// Iterate over the list of apples
apples.forEach((apple) => {
  // Get the random position of the X axis
  let randX =
    Math.floor(
      Math.random() * (treePosition.maxLeft - treePosition.minLeft + 1)
    ) + treePosition.minLeft;

  // Get the random position on the Y axis
  let randY =
    Math.floor(
      Math.random() * (treePosition.maxTop - treePosition.minTop + 1)
    ) + treePosition.minTop;

  // Changing css property to avoid using an animate() function making an unwanted animation
  apple.css({ top: randY, left: randX });

  // on click listener to move the apple to the basket when clicked
  apple.click(() => {
    let randBasketX =
      Math.floor(
        Math.random() * (basketPosition.maxLeft - basketPosition.minLeft + 1)
      ) + basketPosition.minLeft;

    apple.animate({ top: basketPosition.top, left: randBasketX }, 2000);
  });
});
//
