import {Game} from "./Game";
import {Bacterium} from "./Enemies";
import {Fire} from "./Fire";

export class Player {
    x: number
    y: number
    width: number = 50
    height: number = 50
    speed: number = 2
    gravitation: number = 0.99
    dir: {x: number, y: number}
    deg: number = 0
    animationCount: number = 0
    stateAnimation: boolean = false
    tickAnimate: number = 7
    fusionCount: number = 0
    img: Array<CanvasImageSource>
    health = 5
    playerFire: Fire | null = null

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.dir = {x: 0, y: 0}


        const startImagePlayer = new Image()
        startImagePlayer.src = "../image/player/1.png"
        const twoImagePlayer = new Image()
        twoImagePlayer.src = "../image/player/10.png"
        const threeImagePlayer = new Image()
        threeImagePlayer.src = "../image/player/20.png"
        const endImagePlayer = new Image()
        endImagePlayer.src = "../image/player/30.png"

        this.img = [startImagePlayer, twoImagePlayer, threeImagePlayer, endImagePlayer]
    }

    update(game: Game): void {
        if(this.health === 0) {
            alert("Вы проиграли")
            window.location.reload()
        }

        if (game.controller.direction.up) this.dir.y = -1
        if (game.controller.direction.down) this.dir.y = 1
        if (game.controller.direction.left) this.dir.x = 1
        if (game.controller.direction.right) this.dir.x = -1

        this.repulsionFromBacteria(game.enemies.bacteria)

        this.move(game)
        this.fire(game)

        this.draw(game.map.canvas)
    }

    move(game: Game): void {
        this.x += this.dir.x * this.speed
        this.y += this.dir.y * this.speed

        this.dir.x *= this.gravitation
        this.dir.y *= this.gravitation

        this.deg = Math.atan2(
            game.cursor.x - (this.x + (this.width / 2)),
            -(game.cursor.y - (this.y + (this.height / 2)))
        )

        this.speed = 2
        this.gravitation = 0.99
    }

    draw(canvas: CanvasRenderingContext2D) {
        canvas.save()
        canvas.translate(this.x + (this.width / 2), this.y + (this.height / 2))
        canvas.rotate(this.deg)
        canvas.translate(-(this.x + (this.width / 2)), -(this.y + (this.height / 2)))

        this.animatePlayer(canvas)

        canvas.restore()
    }


    repulsionFromBacteria(bacteria: Array<Bacterium>): boolean {
        for(let i = 0; i < bacteria.length; i++) {
            if(this.isRepulsion(bacteria[i]))
                return true
        }
        return false
    }

    isRepulsion(bacteria: Bacterium): boolean {
        const myX = (this.x + this.width / 2),
            myY = (this.y + this.height / 2)

        const bacteriaX = (bacteria.x + bacteria.width / 2),
            bacteriaY = (bacteria.y + bacteria.width / 2)

        const a = Math.abs(myX - bacteriaX)
        const b = Math.abs(myY - bacteriaY)
        const c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))

        if(c > (this.width / 2 + bacteria.height / 2)) return false

        if(this.dir.x !== 0 && this.dir.y !== 0){
            this.dir.x *= -1
            this.dir.y *= -1
        } else {
            this.dir.x = bacteria.dir.x * -1
            this.dir.y = bacteria.dir.y * -1
        }

        this.speed = 10
        this.gravitation = 0.99
        return true
    }

    fire(game: Game): void {
        if(game.controller.fire){
            this.playerFire = new Fire(
                this.x + (this.width / 2),
                this.y + (this.height / 2),
                game.cursor.x,
                game.cursor.y
                )
        }

        game.controller.fires = false

        if(this.playerFire) this.playerFire.update(game)
    }

    animatePlayer(canvas: CanvasRenderingContext2D): void {
        if(this.tickAnimate === this.fusionCount){
            if(!this.stateAnimation && this.animationCount <= this.img.length) {
                canvas.drawImage(this.img[this.animationCount], this.x, this.y, this.width, this.height)

                this.animationCount += 1

                if(this.animationCount === this.img.length) {
                    this.stateAnimation = true
                    this.animationCount -= 2
                }
            } else {
                canvas.drawImage(this.img[this.animationCount], this.x, this.y, this.width, this.height)

                this.animationCount -= 1

                if(this.animationCount === 0) this.stateAnimation = false
            }

            this.fusionCount = 0
        } else {
            canvas.drawImage(this.img[this.animationCount], this.x, this.y, this.width, this.height)
        }


        this.fusionCount += 1
    }
}