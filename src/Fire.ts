import {Game} from "./Game";
import {Abilities} from "./Abilities";
import {Vector} from "./utils/Vector";

export class Fire extends Abilities {
    private _speed: number = 5
    private _direction: number[] = []
    private _sx: number
    private _sy: number
    private _dx: number
    private _dy: number

    constructor(sx: number, sy: number, dx: number, dy: number) {
        super()

        this._sx = sx
        this._sy = sy
        this._dx = dx
        this._dy = dy
        this._direction = Vector.VNormalize([this._sx - this._dx, this._sy - this._dy])
    }

    update(game: Game): void {
        this.move()
        this.draw(game.map.canvas)
    }

    move(): void {
        this._sx -= this._direction[0] * this._speed
        this._sy -= this._direction[1] * this._speed
    }

    draw(canvas: CanvasRenderingContext2D): void {
        canvas.beginPath()
        canvas.fillRect(this._sx - 7.5, this._sy - 7.5, 15, 15)
        canvas.closePath()
    }
}