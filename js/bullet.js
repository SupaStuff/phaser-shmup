var Weapon = {};

var Bullet = function (game, key, group) {

        Phaser.Sprite.call(this, game, 0, 0, key);

        this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

        this.anchor.set(0.5);

        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        this.exists = false;

        this.tracking = false;
        this.scaleSpeed = 0;
		game.physics.arcade.enable(this);
		group.add(this);
    };

    Bullet.prototype = Object.create(Phaser.Sprite.prototype);
    Bullet.prototype.constructor = Bullet;

    Bullet.prototype.fire = function (x, y, angle, speed, gx, gy) {

        gx = gx || 0;
        gy = gy || 0;

        this.reset(x, y);
        this.scale.set(1);

        this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);

        this.angle = angle;

        this.body.gravity.set(gx, gy);

    };

    Bullet.prototype.update = function () {

        if (this.tracking)
        {
            this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
        }

        if (this.scaleSpeed > 0)
        {
            this.scale.x += this.scaleSpeed;
            this.scale.y += this.scaleSpeed;
        }

    };
	

    Weapon.SingleBullet = function (game, group) {

        Phaser.Group.call(this, game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE);

        this.nextFire = 0;
        this.bulletSpeed = 600;
        this.fireRate = 100;
		this.group = group;

        for (var i = 0; i < 64; i++)
        {
            this.add(new Bullet(game, 'bullet5', group), true);
        }

        return this;

    };

    Weapon.SingleBullet.prototype = Object.create(Phaser.Group.prototype);
    Weapon.SingleBullet.prototype.constructor = Weapon.SingleBullet;

    Weapon.SingleBullet.prototype.fire = function (source) {

        if (this.game.time.time < this.nextFire) { return; }

        var x = source.x;
        var y = source.y - 10;

		//(x, y, theta, v, gx, gy)
        this.getFirstExists(false).fire(x, y, -90, this.bulletSpeed, 0, 0);

        this.nextFire = this.game.time.time + this.fireRate;

    };


// A weapon with adjustable levels

    Weapon.SingleLevel = function (game, group) {
		//Phaser.Group.call(this, game, game.world, 'Single Level', false, true, Phaser.Physics.ARCADE);
        this.name = "Normal Shots";
		this.shots = 1;
		this.shotArray = [];
		for(var i=0; i<this.shots; i++) this.shotArray.push(new Weapon.SingleBullet(game, group));
        //this.weapon2 = new Weapon.SingleBullet(game);
    };
	//Weapon.SingleLevel.prototype = Object.create(Phaser.Group.prototype);
    //Weapon.SingleLevel.prototype.constructor = Weapon.SingleLevel;


    Weapon.SingleLevel.prototype.reset = function () {

		for(var i=0; i<this.shots; i++)
		{
			this.shotArray[i].visible = false;
			this.shotArray[i].callAll('reset', null, 0, 0);
        	this.shotArray[i].setAll('exists', false);
		}
		/*
        this.weapon1.visible = false;
        this.weapon1.callAll('reset', null, 0, 0);
        this.weapon1.setAll('exists', false);

        this.weapon2.visible = false;
        this.weapon2.callAll('reset', null, 0, 0);
        this.weapon2.setAll('exists', false);
		*/
    };

    Weapon.SingleLevel.prototype.fire = function (source) {

		var spacing = 10;
		var dev = spacing * (this.shots/2 - 0.5);
		for(var i=0; i<this.shots; i+=2)
		{
			if(i == this.shots-1)
			{	
				this.shotArray[i].fire(source);
				//odd nummber of bullets. this is the center one.
			}
			else
			{
				this.shotArray[i].fire({x: source.x+dev, y: source.y});
				this.shotArray[i+1].fire({x: source.x-dev, y: source.y});
				dev -= spacing;
				//if(this.shots-i <=3) dev /= 2;
			}
		}
        //this.weapon1.fire({x: source.x+10, y: source.y});
        //this.weapon2.fire({x: source.x-10, y: source.y});

    };

	Weapon.SingleLevel.prototype.levelUp = function (newLevel) {
		var oldLevel = this.shotArray.length;
		this.shots = newLevel;
		console.log(this.shotArray[0]);
		for(var i=0; i < newLevel-oldLevel; i++) this.shotArray.push(new Weapon.SingleBullet(this.shotArray[0].game, this.shotArray[0].group));
		//this.reset();
	};
