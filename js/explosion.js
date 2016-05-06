function suicide(player, badguy)
{
	enemyHitsPlayer(player, player.game.world.centerX, player.game.world.height);
}

function death(player, bullet)
{
}

function damage(bullet, baddy)
{
	bullet.kill();
	baddy.destroy();
	//console.log("takatakataka");
}


function spawnBaddy()
{
	var baddy = this.game.add.sprite(this.game.world.centerX, 0, 'baddy');
	this.game.physics.arcade.enable(baddy);
	baddy.body.immovable = true;
	baddy.body.velocity.y=15;
	baddy.movementPath = [];
	//console.log(this);
	var x = 1 / this.game.width;
	this.pathIndex++;
	this.pathIndex = this.pathIndex % this.paths.length;
    if(this.pathIndex == 0) this.pathIndex++;
		for (var i = 0; i <= 1; i += x)
        {
            //var px = this.math.linearInterpolation(this.points.x, i);
            //var py = this.math.linearInterpolation(this.points.y, i);

            // var px = this.math.bezierInterpolation(this.points.x, i);
            // var py = this.math.bezierInterpolation(this.points.y, i);

			//used waveforms that are in reverse
             var py = this.math.catmullRomInterpolation(this.paths[this.pathIndex].x, i);
             var px = this.math.catmullRomInterpolation(this.paths[this.pathIndex].y, i);

			 baddy.movementPath.push( { x: px, y: py });
        }
	baddy.pi = 0;
	
	baddy.travel = function(){
		//console.log(this);
		this.x = this.movementPath[this.pi].x;
		this.y = this.movementPath[this.pi].y;
		
		this.pi++;

		if (this.pi >= this.movementPath.length)
		{
    		this.destroy();
		}
	};

	baddies.add(baddy);
}



//copied this from space invaaders example

function suicidal (){
	enemyHitsPlayer(player, this.game.world.centerX, this.game.world.height);
}

	function enemyHitsPlayer (player,x,y) {
    		//  And create an explosion :)
			player.kill();
    		var explosion = explosions.getFirstExists(false);
    		explosion.reset(player.body.x, player.body.y);
    		explosion.play('died', 30, false, true);
			player.position.setTo(x, y+64);
			
			player.revive();
	}

function setupInvader (invader) {

    invader.anchor.x = 0.5;
    invader.anchor.y = 0.5;
    invader.animations.add('died');

}

