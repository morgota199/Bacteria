import {Map} from "./Map";
import {Controller} from "./Controller";
import {Player} from "./Player";
import {Cursor} from "./Cursor";
import {Enemies} from "./Enemies";

export class Game {
    map: Map
    controller: Controller
    player: Player
    cursor: Cursor
    enemies: Enemies
    counterEnemies: number = 25

    constructor(canvas: HTMLCanvasElement) {
        this.map = new Map(canvas)
        this.controller = new Controller()
        this.player = new Player((this.map.width / 2) - 25, this.map.height / 2 - 50)
        this.cursor = new Cursor(this.map.width / 2, this.map.height / 2)

        this.enemies = new Enemies(this.counterEnemies, this)
        this.controller.addListener()
    }


    loop(): number {
        this.clear()
        this.update()
        return requestAnimationFrame(this.loop.bind(this))
    }

    update(): void {
        this.enemies.update(this)
        this.player.update(this)
        this.cursor.update(this)
        this.healthIndicator()
    }

    clear() {
        this.map.canvas.clearRect(0, 0, this.map.width, this.map.height)
    }

    healthIndicator(): void {
        for(let i = 0 ; i < this.player.health; i++){
            this.map.canvas.beginPath()
            this.map.canvas.moveTo(this.map.width - (10 * i) - 20, 20)
            this.map.canvas.lineTo(this.map.width - (10 * i) - 20, 40)
            this.map.canvas.stroke()
            this.map.canvas.closePath()
        }
    }
}