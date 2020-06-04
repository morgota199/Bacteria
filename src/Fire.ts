import {Game} from "./Game";
import {Abilities} from "./Abilities";

export class Fire extends Abilities {
    private _sx: number
    private _sy: number
    private _dx: number
    private _dy: number
    private _speed: number = 0.08
    private _direction: {x: number, y: number} = {x: 0, y: 0}
    gravitation: number = 10

    constructor(sx: number, sy: number, dx: number, dy: number) {
        super()

        this._sx = sx
        this._sy = sy
        this._dx = dx
        this._dy = dy
        console.log(this)
    }

    update(game: Game): void {
        this.move()
        this.draw(game.map.canvas)
    }

    move(): void {
        this._sy -= (this._sy - this._dy) * this._speed
        this._sx -= (this._sx - this._dx) * this._speed
    }

    draw(canvas: CanvasRenderingContext2D): void {
        canvas.beginPath()
        canvas.fillRect(this._sx - 7.5, this._sy - 7.5, 15, 15)
        canvas.closePath()
    }
}