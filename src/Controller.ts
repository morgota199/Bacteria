export class Controller {
    private _direction: {up: boolean, down: boolean, left: boolean, right: boolean} =
        {up: false, down: false, left: false, right: false}
    private _positionCursor: {x: number, y: number} = {x: 30, y: 30}
    private _fire: boolean = false

    addListener(): void {
        this.pressStart()
        this.pressEnd()
        this.moveCursor()
        this.onFire()
    }

    pressStart(): void {
        window.addEventListener("keydown", event => {
            if(event.key === "ArrowUp"    || event.key === "w") return this.direction.up = true
            if(event.key === "ArrowDown"  || event.key === "s") return this.direction.down = true
            if(event.key === "ArrowLeft"  || event.key === "d") return this.direction.left = true
            if(event.key === "ArrowRight" || event.key === "a") return this.direction.right = true
        })
    }

    pressEnd(): void {
        window.addEventListener("keyup", event => {
            if(event.key === "ArrowUp"    || event.key === "w") return this.direction.up = false
            if(event.key === "ArrowDown"  || event.key === "s") return this.direction.down = false
            if(event.key === "ArrowLeft"  || event.key === "d") return this.direction.left = false
            if(event.key === "ArrowRight" || event.key === "a") return this.direction.right = false
        })
    }

    moveCursor(): void {
        window.addEventListener("mousemove", event => {
            this._positionCursor.x = event.offsetX
            this._positionCursor.y = event.offsetY
        })
    }

    onFire(): void {
        window.addEventListener("click", event => {
            this._fire = true
        })
    }

    public get direction(): { up: boolean; down: boolean; left: boolean; right: boolean } {
        return this._direction
    }

    public get positionCursor(): {x: number, y: number} {
        return this._positionCursor
    }

    public get fire(): boolean {
        return this._fire
    }

    public set fires(fire: boolean) {
        this._fire = fire
    }
}