import "phaser";
import GameScene from "./scenes/GameScene";

const width = window.innerWidth //* window.devicePixelRatio
const height = window.innerHeight //* window.devicePixelRatio

const config: GameConfig = {
  width: width,
  height: height,
  type: Phaser.AUTO,
  parent: "game",
  scene: GameScene,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: true
    }
  }
};

export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

window.onload = () => {
  var game = new Game(config);
};