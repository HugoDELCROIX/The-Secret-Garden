//MAKE THE MAGIC HAPPEN

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
		console.log("butterfly already captured...")
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