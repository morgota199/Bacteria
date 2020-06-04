export class Map {
    private _canvas: CanvasRenderingContext2D
    private readonly _width: number
    private readonly _height: number


    constructor(canvas: HTMLCanvasElement) {
        this._height = window.innerHeight
        this._width = window.innerWidth

        canvas.height = this._height
        canvas.width = this._width

        this._canvas = canvas.getContext("2d")!
    }

    get width(): number { return this._width}
    get height(): number { return this._height}
    get canvas(): CanvasRenderingContext2D {return this._canvas}
}