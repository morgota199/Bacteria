import {Game} from "./Game";
import {Player} from "./Player";

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
            this.bacteria[i].update(game, this.bacteria)
        }
    }

    randomInteger(min: number, max: number): number {
        return Math.floor(min + Math.random() * (max + 1 - min));
    }
}

export class Bacterium {
    x: number
    y: number
    width: number = 50
    height: number = 50
    speed: number = 0.5
    gravitation: number = 0.99
    deg: number = 0
    dir: {x: number, y: number}

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.dir = {x: 0, y: 0}
    }

    update(game: Game, bacteria: Array<this>): void {
        if (game.player.y + (game.player.height / 2) < this.y + (this.height / 2)) this.dir.y = -1
        if (game.player.y + (game.player.height / 2) > this.y + (this.height / 2)) this.dir.y = 1
        if (game.player.x + (game.player.width / 2) > this.x + (this.width / 2)) this.dir.x = 1
        if (game.player.x + (game.player.width / 2) < this.x + (this.width / 2)) this.dir.x = -1

        this.repulsionFromBacteria(bacteria, game)


        this.move(game)

        this.draw(game.map.canvas)
    }

    move(game: Game): void {
        this.x += this.dir.x * this.speed
        this.y += this.dir.y * this.speed

        this.dir.x *= this.gravitation
        this.dir.y *= this.gravitation

        this.deg = Math.atan2(
            game.player.x - (this.x + (this.width / 2)),
            -(game.player.y - (this.y + (this.height / 2)))
        )

        this.speed = 0.5
        this.gravitation = 0.99
    }

    draw(canvas: CanvasRenderingContext2D): void {
        canvas.save()
        canvas.translate(this.x + (this.width / 2), this.y + (this.height / 2))
        canvas.rotate(this.deg)
        canvas.translate(-(this.x + (this.width / 2)), -(this.y + (this.height / 2)))

        canvas.fillRect(this.x, this.y, this.width, this.height)

        canvas.restore()
    }

    repulsionFromBacteria(bacteria: Array<this>, game: Game): boolean {
        for(let i = 0; i < bacteria.length; i++) {
            if(this.x !== bacteria[i].x
                && this.y !== bacteria[i].y
                && this.deg !== bacteria[i].deg) {
                if(this.isRepulsionBacteria(bacteria[i])) return true
            }
        }

        return this.isRepulsionPlayer(game.player);
    }

    isRepulsionBacteria(bacteria: this): boolean {
        const myX = (this.x + this.width / 2),
            myY = (this.y + this.height / 2)

        const bacteriaX = (bacteria.x + bacteria.width / 2),
            bacteriaY = (bacteria.y + bacteria.width / 2)

        const a = Math.abs(myX - bacteriaX)
        const b = Math.abs(myY - bacteriaY)
        const c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))

        if(c > (this.height / 2 + bacteria.height / 2)) return false

        this.repulsion()

        return true
    }

    isRepulsionPlayer(player: Player): boolean {
        const bacteriaX = (this.x + this.width / 2),
            bacteriaY = (this.y + this.height / 2)

        const  playerX = (player.x + player.width / 2),
           playerY = (player.y + player.height / 2)

        const a = Math.abs(bacteriaX - playerX)
        const b = Math.abs( bacteriaY - playerY)
        const c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))

        if(c > (this.height / 2 + player.height / 2)) return false
        player.health -= 1
        this.repulsion()

        return true
    }

    repulsion(): void {
        this.dir.x *= -1
        this.dir.y *= -1
        this.speed = 50
        this.gravitation = 25
    }
}
