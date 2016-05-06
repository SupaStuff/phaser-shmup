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
	console.log("takatakataka");
}

function spawnBaddy()
{
	var baddy = this.game.add.sprite(this.game.world.centerX, 0, 'baddy');
	this.game.physics.arcade.enable(baddy);
	baddy.body.immovable = true;
	baddy.body.velocity.y=15;
	baddy.movementPath = [];
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

