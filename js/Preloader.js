
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		var thebg = this.background = this.add.sprite(0, 0, 'preloaderBackground');
		thebg.scale.setTo(thebg.width/this.game.width, thebg.height/this.game.width);
		this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, swap them for your own.
		this.load.image('titlepage', imgdir+'title.jpg');
		this.load.atlasJSONHash('playButton', imgdir+'play_button.png', imgdir+'play_button.json');
		this.load.audio('titleMusic', [snddir+'main_menu.mp3']);
		//	+ lots of other required assets here

		//ship and explosion
		this.game.load.image('ship', imgdir+'chapel-fighter.png');
		this.game.load.spritesheet('died', imgdir+'explode.png', 128, 128);

		//background images
		this.game.load.image('planetbg', imgdir+'planet.jpg');
		this.game.load.image('stars1', imgdir+'stars1.png');
		this.game.load.image('stars2', imgdir+'stars2.png');
		this.load.image('bullet5', imgdir+'bullet5.png');

		//baddies
		this.game.load.image('baddy', imgdir+'pegasus.gif');

		//music
		game.load.audio('titleMusic', [snddir+'main_menu.mp3']);
		game.load.audio('legion', [snddir+'legion.mp3']);
		game.load.audio('legion_death', [snddir+'legion_dead_sound.wav']);
		game.load.audio('open', [snddir+'opening_sound_TALK.wav']);
	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;

	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.

		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.

		if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}

	}

};
