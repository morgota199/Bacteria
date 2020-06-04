import {Game} from "./Game";

export class Cursor {
    private _x: number
    private _y: number
    private _lineWidth: number = 3

    constructor(x: number, y: number) {
        this._x = x
        this._y = y
    }

    update(game: Game) {
        this._x = game.controller.positionCursor.x
        this._y = game.controller.positionCursor.y

        this.draw(game.map.canvas)
    }

    draw(canvas: CanvasRenderingContext2D) {
        canvas.beginPath()
        canvas.lineWidth = this._lineWidth;
        canvas.moveTo(this._x, this._y - 5)
        canvas.lineTo(this._x, this._y - 20)


        canvas.moveTo(this._x - 5, this._y)
        canvas.lineTo(this._x - 20, this._y)


        canvas.moveTo(this._x, this._y + 5)
        canvas.lineTo(this._x, this._y + 20)


        canvas.moveTo(this._x + 5, this._y)
        canvas.lineTo(this._x + 20, this._y)
        canvas.stroke()
        canvas.closePath()
    }

    get x(): number { return this._x }
    get y(): number { return this._y }
}
