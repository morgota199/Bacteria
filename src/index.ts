import {Game} from "./Game";

const canvas = document.getElementById("canvas")

if(canvas instanceof HTMLCanvasElement) {
    const game = new Game(canvas)

    game.loop()
}
