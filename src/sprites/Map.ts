const LAVA = 13

export default class Map {
    
    private scene;
    private map;

    constructor(scene) {

        this.scene = scene;

        this.scene.load.image('tiles', 'assets/tiles2.png');
        this.scene.load.tilemapTiledJSON('map', 'assets/map2.json');
    }

    createGround() {

        this.map = this.scene.make.tilemap({ key: "map"});

        const tiles = this.map.addTilesetImage("tiles", "tiles");
        const ground = this.map.createStaticLayer("Ground", tiles, 0, 0);
    
        this.map.setCollisionByProperty({ collides: true });

        this.scene.physics.world.bounds.width = ground.width;
        this.scene.physics.world.bounds.height = ground.height;

        return ground
    }

    createDoors() {
    
        const doors = this.scene.add.group();

        // Finish Door
        const finishDoor = this.map.findObject("Objects", obj => obj.name === "Finish");
        let door = this.scene.add.sprite(finishDoor.x, finishDoor.y).setOrigin(1, 1)
        door.setSize(this.map.tileWidth, this.map.tileHeigth)

        this.scene.physics.add.existing(door)
        door.body.immovable = true
        door.body.moves = false

        doors.add(door)

        return doors
    }

    createEnemies() {
        return false
    }

    addLavaCollision(callback) {
        this.map.setTileIndexCallback(LAVA, callback, this.scene)    
    }
}