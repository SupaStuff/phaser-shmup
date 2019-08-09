
BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;



};

BasicGame.MainMenu.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		this.music = this.add.audio('titleMusic');
		this.music.play();

		//scaling isn't actually working. This is the title background. In case the image doesn't fit properly, scale it to fit the screen
		var thebg = this.add.sprite(0, 0, 'titlepage');
		thebg.scale.setTo(thebg.width/this.game.width, thebg.width/this.game.width);

		//Add the play button. over, out, and down are defined in the button's JSON file
		this.playButton = this.add.button(400, 600, 'playButton', this.startGame, this, 'over', 'out', 'down');

	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		this.music.stop();

		//	And start the actual game
		this.state.start('Game');

	}

};
