import Map from '../sprites/Map'
import Hero from '../sprites/Hero'

class GameScene extends Phaser.Scene {

    private map : Map;
    private hero : Hero;
    private player;
    private cursors;

    constructor() {

        super({
            key: 'GameScene'
        });
    }

    preload () {

        this.map = new Map(this)
        this.hero = new Hero(this, 200, 20)
    }
    
    create () {
    
        const ground = this.map.createGround()
        const doors = this.map.createDoors()
        const enemies = this.map.createEnemies()

        this.player = this.hero.create();
        
        // Collisions
        this.map.addLavaCollision(this.hero.respawn.bind(this.hero))
        this.physics.add.collider(this.player, ground);
        this.physics.add.overlap(this.player, doors, this.hero.respawn.bind(this.hero), null, this);

        // Camera to follow player
        this.cameras.main.startFollow(this.player);
    
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    /*findObjectsByType(type, map, layer) {
        var result = new Array();
        map.objects[layer].forEach(function(element){
          if(element.properties.type === type) {
            //Phaser uses top left, Tiled bottom left so we have to adjust the y position
            //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
            //so they might not be placed in the exact pixel position as in Tiled
            element.y -= map.tileHeight;
            result.push(element);
          }      
        });
        return result;
      }*/
    
    update () {
    
        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-160);
            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(160);
            this.player.anims.play('right', true);
        } else {
            this.player.body.setVelocityX(0);
            this.player.anims.play('turn');
        }
    
        if (this.cursors.up.isDown && this.player.body.blocked.down) {
            this.player.body.setVelocityY(-300);
        }
    }
}

export default GameScene;