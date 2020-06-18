import {Game} from "./Game";
import {Abilities} from "./Abilities";
import {Vector} from "./utils/Vector";

interface Position {
    x: number,
    y: number
}

interface Size {
    width: number,
    height: number
}

export class Fire extends Abilities {
    private readonly _position: Position
    private readonly _size    : Size
    private _move_to          : Position
    private _direction        : Position

    private _speed: number = 5
    private _active: boolean = true

    constructor(player: Position, cursor: Position) {
        super()

        this._position = player
        this._move_to = cursor

        this._size = {width: 15, height: 15}

        this._direction = Vector.VNormalize({
            x: this._position.x - this._move_to.x,
            y: this._position.y - this._move_to.y
        })
    }

    public update(game: Game): void {
        this.move()
        this.draw(game.map.canvas)
    }

    private move(): void {
        this._position.x -= this._direction.x * this._speed
        this._position.y -= this._direction.y * this._speed

        const x = this._position.x
        const y = this._position.y

        if(x > window.innerWidth || x < 0)  this._active = false
        if(y > window.innerHeight || y < 0) this._active = false
    }

    private draw(canvas: CanvasRenderingContext2D): void {
        const x = this._position.x
        const y = this._position.y
        const w = this._size.width
        const h = this._size.height
        const c_w = this._size.width / 2
        const c_h = this._size.height / 2

        canvas.beginPath()
        canvas.fillRect(x - c_w, y - c_h, w, h)
        canvas.closePath()
    }



    public dead(fires: this[]): void {
        const x = this._position.x
        const y = this._position.y

        for(let i = 0; i < fires.length; i++) {
            if(!fires[i]) continue

            const f_x = fires[i].position.x
            const f_y = fires[i].position.y

            if (x === f_x && y === f_y) {
                delete fires[i]
            }
        }
    }

    public get active()  : boolean  {return this._active}
    public get position(): Position {return this._position}
    public get size()    : Size     {return this._size}
}