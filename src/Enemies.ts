import {Game} from "./Game";
import {Player} from "./Player";
import {Vector} from "./utils/Vector";
import {Fire} from "./Fire";

export class Enemies {
    counterEnemies: number
    bacteria: Array<Bacterium> = []

    constructor(counterEnemies: number, game: Game) {
        this.counterEnemies = counterEnemies
        for(let i = 0; i < this.counterEnemies; i++) {
            this.bacteria.push(
                new Bacterium(
                    this.randomInteger(0, game.map.width),
                    this.randomInteger(0, game.map.height)
                )
            )
        }
    }

    update(game: Game): void {
        for(let i = 0; i < this.bacteria.length; i++){
            if(!this.bacteria[i]) continue

            this.bacteria[i].update(game, this.bacteria)
        }
    }

    randomInteger(min: number, max: number): number {
        return Math.floor(min + Math.random() * (max + 1 - min));
    }
}

export class Bacterium {
    private _x: number
    private _y: number
    private _width: number = 50
    private _height: number = 50
    private _speed: number = 0.5
    private _gravitation: number = 0.99
    private _deg: number = 0
    private _dir: {x: number, y: number}

    constructor(x: number, y: number) {
        this._x = x
        this._y = y
        this._dir = {x: 0, y: 0}
    }

    public update(game: Game, bacteria: Array<this>): void {
        if (game.player.y + (game.player.height / 2) < this._y + (this._height / 2)) this._dir.y = -1
        if (game.player.y + (game.player.height / 2) > this._y + (this._height / 2)) this._dir.y = 1
        if (game.player.x + (game.player.width / 2) > this._x + (this._width / 2)) this._dir.x = 1
        if (game.player.x + (game.player.width / 2) < this._x + (this._width / 2)) this._dir.x = -1

        this.repulsionFromBacteria(bacteria, game)
        this.onDamage(bacteria, game)

        this.move(game)

        this.draw(game.map.canvas)
    }

    private move(game: Game): void {
        this._x += this._dir.x * this._speed
        this._y += this._dir.y * this._speed

        this._dir.x *= this._gravitation
        this._dir.y *= this._gravitation

        this._deg = Math.atan2(
            game.player.x - (this._x + (this._width / 2)),
            -(game.player.y - (this._y + (this._height / 2)))
        )

        this._speed = 0.5
        this._gravitation = 0.99
    }

    private draw(canvas: CanvasRenderingContext2D): void {
        canvas.save()

        canvas.translate(this._x + (this._width / 2), this._y + (this._height / 2))
        canvas.rotate(this._deg)
        canvas.translate(-(this._x + (this._width / 2)), -(this._y + (this._height / 2)))

        canvas.fillRect(this._x, this._y, this._width, this._height)

        canvas.restore()
    }

    private repulsionFromBacteria(bacteria: this[], game: Game): boolean {
        for(let i = 0; i < bacteria.length; i++) {
            if(!bacteria[i]) continue
            if(this._x !== bacteria[i]._x
                && this._y !== bacteria[i]._y
                && this._deg !== bacteria[i]._deg) {
                if(this.isRepulsionBacteria(bacteria[i])) return true
            }
        }

        return this.isRepulsionPlayer(game.player);
    }

    private isRepulsionBacteria(bacteria: this): boolean {
        const distance = Vector.VDistanceCenter(
            {x: this._x, y: this._y, width: this._width, height: this._height},
            {x: bacteria._x, y: bacteria._y, width: bacteria._width, height: bacteria._height}
        )

        if(distance > (this._height / 2 + bacteria._height / 2)) return false

        this.repulsion()

        return true
    }

    private isRepulsionPlayer(player: Player): boolean {
        const distance = Vector.VDistanceCenter(
            {x: this._x, y: this._y, width: this._width, height: this._height},
            {x: player.x, y: player.y, width: player.width, height: player.height}
            )

        if(distance > (this._height / 2 + player.height / 2)) return false

        player.health -= 1
        this.repulsion()

        return true
    }


    private repulsion(): void {
        this._dir.x *= -1
        this._dir.y *= -1
        this._speed = 50
        this._gravitation = 25
    }

    private onDamage(bacteria: this[], game: Game): void {
        for(let i = 0; i < bacteria.length; i++) {
            for(let j = 0; j < game.player.playerFire.length; j++) {
                if (!bacteria[i] || !game.player.playerFire[j]) continue
                this.isDamage(bacteria, game.player.playerFire[j], game)
            }
        }

    }

    private isDamage(bacteria: this[], fire: Fire, game: Game) {
        const distance = Vector.VDistanceCenter(
            {x: this._x, y: this._y, width: this._width, height: this._height},
            {x: fire.x, y: fire.y, width: fire.width, height: fire.height}
        )

        if(distance > this._height / 2 + fire.height / 2) return false

        fire.dead(game.player.playerFire)
        this.dead(bacteria)

        return true
    }

    public dead(bacteria: this[]): void {
        for(let i = 0; i < bacteria.length; i++) {
            if(!bacteria[i]) continue
            if (this._x === bacteria[i]._x
                && this._y === bacteria[i]._y
                && this._deg === bacteria[i]._deg) {
                delete bacteria[i]
            }
        }
    }

    public get x(): number { return this._x }
    public get y(): number { return this._y }
    public get width(): number { return this._width }
    public get height(): number { return this._height }
    public get dir(): {x: number, y: number} { return this._dir }

}
