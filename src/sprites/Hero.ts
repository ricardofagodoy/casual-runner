export default class Hero {
   
    private scene;
    private spawnX;
    private spawnY;
    private player;

    constructor(scene, x, y) {
        
        this.scene = scene
        this.spawnX = 200
        this.spawnY = 0

        scene.load.spritesheet('dude', 'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 })
    }

    create() {
        this.player = this.scene.add.sprite(200, 21, 'dude')
        this.scene.physics.add.existing(this.player)
        this.player.body.setBounce(0.05);
        this.player.body.setCollideWorldBounds(true);

        this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.scene.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });
    
        this.scene.anims.create({
            key: 'right',
            frames: this.scene.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        return this.player
    }

    respawn(sprite) {
        sprite.setPosition(this.spawnX, this.spawnY)
    }
}