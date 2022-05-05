//MAKE THE MAGIC HAPPEN

const butterfly = $('#butterfly'), net = $('#net'), screen = $(window);
let counter = 0, x = 0, y = 0;

function randint( bound ) {
	return Math.floor( Math.random() * bound );
}

function generateButterflyPosition() {
	x = randint( screen.width() - butterfly.width() );
	y = randint( screen.height() - butterfly.height() );
}

function moving() {
	generateButterflyPosition();
	let scale = 130 + randint( 300 - counter * 10 );
	
	butterfly.animate({ left:x, top:y, height:scale }, { duration: 1000 }, function() { moving() });
}


butterfly.mouseenter(function() {
	if (counter < 30) {
		counter ++;
		generateButterflyPosition();
		
		let adaptativeDuration = 1000;
		
		if (counter != 0 && counter <= 20) {
			adaptativeDuration = 1000 - 42.5 * counter;
		} else {
			adaptativeDuration = 150;
		}
	
		$(this).clearQueue();
		$(this).stop();
		$(this).animate({ left: x, top: y }, { duration : adaptativeDuration });
	
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
	
		console.table(stats)
	
		if (counter < 30) {
			for (let i = 0; i < 30 - counter; i++) {
				moving()
			}
		} else {
			butterfly.animate({ top: net.position().top, left: net.position().left }, { duration: 500 }).animate({rotate:'520deg'},{duration: 500});
		}
	} else {
		console.log("butterfly already captured...")
	}
})

butterfly.css('zIndex', '100');

for (let i = 0; i < 200; i++) {
	moving();
	
	if (counter == 30) {
		alert('you captured the butterfly !!!');
		console.log('you captured the butterfly !!!');
		break;
	}
}