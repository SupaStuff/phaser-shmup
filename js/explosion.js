function suicide(player, badguy)
{
	console.log("suicide");
}

function death(player, bullet)
{
}

function damage(bullet, baddy)
{
	bullet.kill();
	console.log("takatakataka");
}








//copied this from space invaaders example

function boom (){
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

