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

// Hugo
$(document).mousemove(function (e) {
    $("#net").css({
        left: e.pageX - 1,
        top: e.pageY - 1
    });
});

setInterval(function () {
    $("body").toggleClass('night');
}, 5000);


// Constantin

alert('Hover the butterfly 30 times to catch it !')

const butterfly = $('#butterfly'), net = $('#net'), screen = $(window);
let counter = 0, x = 0, y = 0, adaptativeDuration = 1000;

// function to generate a random int between 0 and a bound (the parameter)
function randint( bound ) {
	return Math.floor( Math.random() * bound );
}

// function to generate a possible position in the screen for the butterfly
// (everywhere in the sreen resolution but less the butterfly size to not overflow)
function generateButterflyPosition() {
	x = randint( screen.width() - butterfly.width() );
	y = randint( screen.height() - butterfly.height() );
}

// function to move the butterfly when we don't hover
function moving() {
	generateButterflyPosition();
	// the butterfly can randomly change its size according the number of hover on it
	// the more we hover it then it's more and more likely to be smaller
	let scale = 130 + randint( 300 - counter * 10 );
	
	butterfly.animate({ left:x, top:y, height:scale }, { duration: 1000 }, function() { moving() });
}

// this defines how the butterfly behaves when we hover it
butterfly.mouseenter(function() {
	// we check that the victory condition is not met
	if (counter < 30) {
		counter ++;
		generateButterflyPosition();
		
		// the butterfly goes faster and faster according to the number of hover
		// its maximum speed is reached at 20 hover (so it lasts 10 hover to finish the game with the highest speed)
		if (counter != 0 && counter <= 20) {
			adaptativeDuration = 1000 - 42.5 * counter;
		} else {
			adaptativeDuration = 150;
		}
	
		// we stop the normal motion to make the "reaction move" of the butterfly
		$(this).clearQueue();
		$(this).stop();
		$(this).animate({ left: x, top: y }, { duration : adaptativeDuration });
	
		// here is just some of the variables formatted as an array of objects to look good in the console
		let stats = [
			{
				name: 'adaptativeDuration',
				value: adaptativeDuration
			},
			{
				name: 'counter',
				value: counter
			}
		]
	
		// enjoy the console by pressing F12 and selecting "console" ;)
		// if you didn't know this little tips give us a good grade ^^ (even if it's more relevant with native JSON data...)
		console.table(stats)
	
		// if we didn't hover 30 times, so the butterfly continue to fly
		if (counter < 30) {
			for (let i = 0; i < 30 - counter; i++) {
				moving()
			}
		} else {
			// if we reached the 30 hover then the butterfly does a cool animation and dives into the net
			butterfly.animate({ top: net.position().top, left: net.position().left }, { duration: 500 }).animate({ rotate: '520deg' }, { duration: 500 });
		}
	} else {
		console.log("butterfly captured...")
	}
})

// just a little change in order to be able to hover the butterfly whenever we want and not to have it stuck behind the tree for instance
butterfly.css('zIndex', '100');

// here is the heart of the execution code : the butterfly "fly" 200 times maximum if nothing happens
for (let i = 0; i < 200; i++) {
	moving();
	
	if (counter == 30) {
		alert('you captured the butterfly !!!');
		console.log('you captured the butterfly !!!');
		break;
	}
}
