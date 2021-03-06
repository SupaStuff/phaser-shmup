
BasicGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)
    this.music;
    this.speech;
    this.baddyDeathSnd;

	//this.swipe;


    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

	var platforms;
	var player;
	var cursors;
	var explosions;
	var btnFire;
	var inGame;
	var weapons;
	var dir;
	var inTouch;
	var touchMultiplier;
	var pBullet;
	var eBullet;


	var baddies;
	var pathIndex;
	var paths;

	//var Swipe = require('phaser-swipe');


};

BasicGame.Game.prototype = {

    create: function () {

		//this.swipe = new Swipe(this.game);

		this.pathIndex = 0;

        this.music = this.add.audio('legion');
        this.speech = this.add.audio('open');
        this.baddyDeathSnd = this.add.audio('legionDeath');

        this.music.play();
        this.speech.play();
	//phaser.io/waveforms is the bomb
	this.paths = [null,{"type":2,"closed":false,"x":[0,128,256,384,512,1280],"y":[146,101,324,57,427,800]},{"type":0,"closed":false,"x":[0,128,256,384,512,1280],"y":[82,144,139,205,305,800]},{"type":0,"closed":false,"x":[0,128,256,384,512,1280],"y":[358,218,203,261,236,800]},{"type":0,"closed":false,"x":[0,128,256,384,512,1280],"y":[133,236,55,212,35,800]},{"type":0,"closed":false,"x":[0,128,256,384,512,1280],"y":[216,179,382,361,309,800]},{"type":0,"closed":false,"x":[0,128,256,384,512,1280],"y":[423,189,123,365,202,800]},{"type":0,"closed":false,"x":[0,128,256,384,512,1280],"y":[262,376,316,200,368,800]},{"type":0,"closed":false,"x":[0,128,256,384,512,1280],"y":[56,150,51,369,303,800]}]


		weapons = [];
		this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'planetbg');
		 //Leaving this here. We shouldn't be scaling by a hard coded numerical value like below.
		//this.background.scale.setTo(this.background.width/this.game.width, this.background.width/this.game.width);
		this.background.scale.setTo(2,2);

		//place the star sprites on the screen
		var star1 = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'stars1');
		var star2 = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'stars2');

		//scale to fit
		star1.scale.setTo(2,2);
		star2.scale.setTo(2,2);

		//Make the stars move down a different velocities. This is called "parallax scrolling background."It gives the scrolling background the illusion of depth.
		star1.autoScroll(0, 50);
        star2.autoScroll(0, 200);
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

		var size = 64;

	//  We're going to be using physics, so enable the Arcade Physics system
	this.game.physics.startSystem(Phaser.Physics.ARCADE);


	// The player and its settings
	player = this.game.add.sprite(this.game.world.centerX, this.game.world.height - size/2, 'ship');
	player.scale.setTo(size/player.width, size/player.height);
	player.anchor.setTo(0.5, 0.5);


	//set up inputs
	cursors = this.game.input.keyboard.createCursorKeys();
	btnFire = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);

	//testing death by pressing spacebar. Adding a callback and passing it this as context.
	//btnFire.onDown.add(boom,this);

	//  We need to enable physics on the player
	this.game.physics.arcade.enable(player);
	player.body.setSize(8,8,4,4);
	player.body.collideWorldBounds = true;


	//  An explosion pool
	explosions = this.game.add.group();
	explosions.createMultiple(30, 'died');
	explosions.forEach(setupInvader, this);




		pBullet = this.game.add.physicsGroup();
		pBullet.enableBody = true;
    	pBullet.physicsBodyType = Phaser.Physics.ARCADE;
	//add weapons
	//weapons.push(new Weapon.SingleBullet(this.game));
	weapons.push(new Weapon.SingleLevel(this.game, pBullet));
	weapons[0].levelUp(6);

	console.log(pBullet);
	//pBullet.add(weapons);
	touchMultiplier = 50;


	//var style = { font: "32px Arial", fill: "#ff0044", wordWrap: false, wordWrapWidth: baddy.width, align: "center", backgroundColor: "#000000" };

    //var text = this.game.add.text(0, 0, ":p", style);
    //text.anchor.set(0.5);

		baddies = this.game.add.physicsGroup();

	//var baddy = this.game.add.sprite(this.game.world.centerX, 0, 'baddy');
	//this.game.physics.arcade.enable(baddy);
	//baddy.body.immovable = true;
	//baddy.body.velocity.y=15;
	//baddies.add(baddy);
	//
	//every second spawn a bad guy
	//console.log(this);
	this.game.time.events.loop(Phaser.Timer.SECOND * 2, spawnBaddy, this);


		eBullet = this.game.add.physicsGroup();
	//this.game.physics.arcade.enable(weapons[0]);
	//console.log(baddy);
	//console.log(baddies);
	//pBullet.add(weapons[0]);
	player.body.z = 8;
	},

    update: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
		//play();
		//  Reset the players velocity (movement)

		//this.game.debug.pointer(this.game.input.mousePointer);
    	//this.game.debug.pointer(this.game.input.pointer1);

		player.body.velocity.x = 0;
		player.body.velocity.y = 0;

		if(!this.game.input.activePointer.isDown)
		{
			inTouch = null;
			dir = null;
		}
		else
		{
			if(inTouch === null) inTouch = {x: this.game.input.activePointer.x, y: this.game.input.activePointer.y};
			dir = {x: touchMultiplier*(this.game.input.activePointer.x - inTouch.x), y: touchMultiplier*(this.game.input.activePointer.y - inTouch.y)};
			inTouch = {x: this.game.input.activePointer.x, y: this.game.input.activePointer.y};
		}


	//dir = this.swipe.check();
	/*
	if(dir !== null) {
		console.log(dir);
		dir = dir.direction;
		if(((dir & this.swipe.DIRECTION_UP) === this.swipe.DIRECTION_UP) && (player.body.center.y > 0))
			player.body.velocity.y = -150;
		else if(((dir & this.swipe.DIRECTION_DOWN) === this.swipe.DIRECTION_DOWN) && (player.body.center.y < this.game.world.height))
			player.body.velocity.y = 150;

		if(((dir & this.swipe.DIRECTION_LEFT) === this.swipe.DIRECTION_LEFT) && (player.body.center.x > 0))
			player.body.velocity.x = -150;
		else if(((dir & this.swipe.DIRECTION_RIGHT) === this.swipe.DIRECTION_RIGHT) && (player.body.center.x < this.game.world.width))
			player.body.velocity.x = 150;
	}
	*/
	///*
		if(dir === null)
		{
			if (cursors.left.isDown)// && player.body.center.x > 0)
			{
				//  Move to the left
				player.body.velocity.x = -150;
			}
			else if (cursors.right.isDown)// && player.body.center.x < this.game.world.width)
			{
				//  Move to the right
				player.body.velocity.x = 150;
			}

			if (cursors.up.isDown)// && player.body.center.y > 0)
			{
				//  Move to the right
				player.body.velocity.y = -150;
			}
			else if (cursors.down.isDown)// && player.body.center.y < this.game.world.height)
			{
				//  Move to the right
				player.body.velocity.y = 150;
			}
		}
		else
		{
			player.body.velocity.x = dir.x;
			player.body.velocity.y = dir.y;

			if(player.body.center.x < 0) player.position.x = 0;
			else if(player.body.center.x > this.game.world.width) player.position.x = this.game.world.width;
			if(player.body.center.y < 0) player.position.y = 0;
			else if(player.body.center.y > this.game.world.height) player.position.y = this.game.world.height;

		}
	//*/

		if(btnFire.isDown || this.game.input.activePointer.isDown)
		{
			weapons[0].fire(player);
		}


		//Collisions
		this.game.physics.arcade.collide(pBullet, baddies, damage, null);
		this.game.physics.arcade.collide(player, baddies, suicide, null);
		this.game.physics.arcade.collide(player, eBullet, death, null);

		baddies.forEach(function(baddy) {
			baddy.travel();
		}, this);
    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};
