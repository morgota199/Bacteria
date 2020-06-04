import {Game} from "./Game";
import {Abilities} from "./Abilities";
import {Vector} from "./utils/Vector";

export class Fire extends Abilities {
    private _sy: number
    private _sx: number
    private readonly _dx: number
    private readonly _dy: number
    private readonly _direction: number[] = []

    private _speed: number = 5
    private _width: number = 15
    private _height: number = 15
    private _active: boolean = true

    constructor(sx: number, sy: number, dx: number, dy: number) {
        super()

        this._sx = sx
        this._sy = sy
        this._dx = dx
        this._dy = dy
        this._direction = Vector.VNormalize([this._sx - this._dx, this._sy - this._dy])
    }

    public update(game: Game): void {
        this.move()
        this.draw(game.map.canvas)
    }

    private move(): void {
        this._sx -= this._direction[0] * this._speed
        this._sy -= this._direction[1] * this._speed

        if(this._sx > window.innerWidth || this._sx < 0) this._active = false
        if(this._sy > window.innerHeight || this._sy < 0) this._active = false
    }

    private draw(canvas: CanvasRenderingContext2D): void {
        canvas.beginPath()
        canvas.fillRect(this._sx - (this._width / 2), this._sy - (this._height / 2), this._width, this._height)
        canvas.closePath()
    }

    public get active(): boolean {
        return this._active
    }

    public dead(fires: this[]): void {
        for(let i = 0; i < fires.length; i++) {
            if(!fires[i]) continue
            if (this._sx === fires[i].x && this._sy === fires[i].y) {
                delete fires[i]
            }
        }
    }

    public get x(): number      {  return this._sx  }
    public get y(): number      {  return this._sy  }
    public get width(): number  {  return this._width  }
    public get height(): number {  return this._height }
}