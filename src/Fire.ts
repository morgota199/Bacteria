import {Game} from "./Game";
import {Abilities} from "./Abilities";

export class Fire extends Abilities {
    private _sx: number
    private _sy: number
    private _dx: number
    private _dy: number
    private _speed: number = 10
    private _direction: {x: number, y: number} = {x: 0, y: 0}
    gravitation: number = 0.007

    constructor(sx: number, sy: number, dx: number, dy: number) {
        super()

        this._sx = sx
        this._sy = sy
        this._dx = dx
        this._dy = dy
    }

    update(game: Game): void {
        this.move()
        this.draw(game.map.canvas)
    }

    move(): void {
        const val_x = this._sx - this._dx
        const val_y = this._sy - this._dy
        const len = Math.sqrt(Math.pow(val_x, 2) + Math.pow(val_y, 2))

        this._sx -= this._speed * (val_x / len)
        this._sy -= this._speed * (val_y / len)
    }

    draw(canvas: CanvasRenderingContext2D): void {
        canvas.beginPath()
        canvas.fillRect(this._sx - 7.5, this._sy - 7.5, 15, 15)
        canvas.closePath()
    }
}