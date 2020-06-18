import {Game} from "./Game";

export class Cursor {
    private readonly _position: {x: number, y: number}
    private _lineWidth: number = 3

    constructor(x: number, y: number) {
        this._position = {x, y}
    }

    update(game: Game) {
        this._position.x = game.controller.positionCursor.x
        this._position.y = game.controller.positionCursor.y

        this.draw(game.map.canvas)
    }

    draw(canvas: CanvasRenderingContext2D) {
        const x = this._position.x
        const y = this._position.y

        canvas.beginPath()
        canvas.lineWidth = this._lineWidth;
        canvas.moveTo(x, y - 5)
        canvas.lineTo(x, y - 20)


        canvas.moveTo(x - 5, y)
        canvas.lineTo(x - 20, y)


        canvas.moveTo(x, y + 5)
        canvas.lineTo(x, y + 20)


        canvas.moveTo(x + 5, y)
        canvas.lineTo(x + 20, y)
        canvas.stroke()
        canvas.closePath()
    }

    public get position (): {x: number, y: number} {
        return this._position
    }
}
