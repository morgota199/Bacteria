import {Game} from "./Game";
import {Abilities} from "./Abilities";
import {Fire} from "./Fire";

export class Player {
    private _position: {x: number, y: number, deg: number}
    private _direction: {x: number, y: number}
    private _size: {width: number, height: number}
    private _impact: {speed: number, gravitation: number}
    private _properties: {health: number}
    private _abilities: Abilities[]
    private _animation: {
        animation_count : number
        state_animation: boolean
        tick_animate: number
        fusion_count: number
        img: CanvasImageSource[]
    }

    constructor(x: number, y: number) {
        this._position = {x, y, deg: 0}
        this._size = {width: 50, height: 50}
        this._impact = {speed: 3, gravitation: 0.99}
        this._direction = {x: 0, y: 0}
        this._properties = {health: 5}
        this._abilities = []

        const startImagePlayer = new Image()
        startImagePlayer.src = "../image/player/1.png"
        const twoImagePlayer = new Image()
        twoImagePlayer.src = "../image/player/10.png"
        const threeImagePlayer = new Image()
        threeImagePlayer.src = "../image/player/20.png"
        const endImagePlayer = new Image()
        endImagePlayer.src = "../image/player/30.png"


        this._animation = {
            animation_count: 0,
            state_animation: false,
            tick_animate: 7,
            fusion_count: 0,
            img: [
                startImagePlayer,
                twoImagePlayer,
                threeImagePlayer,
                endImagePlayer
            ]
        }
    }

    //обновление
    update(game: Game): void {
        this._move(game)
        this._abilities_update(game)
        this._draw(game.map.canvas)
    }

    private _abilities_update(game: Game) {
        this._fire(game)

        for(const ab of this._abilities){
            if(ab) ab.update(game)
        }
    }

    //движение
    private _move(game: Game): void {
        if (game.controller.direction.up) this._direction.y = -1
        if (game.controller.direction.down) this._direction.y = 1
        if (game.controller.direction.left) this._direction.x = 1
        if (game.controller.direction.right) this._direction.x = -1

        this._direction.x *= this._impact.gravitation
        this._direction.y *= this._impact.gravitation

        this._position.x += this._direction.x * this._impact.speed
        this._position.y += this._direction.y * this._impact.speed


        const x = this._position.x
        const y = this._position.y
        const w = (this._size.width / 2)
        const h = (this._size.height / 2)

        const c_x = game.cursor.position.x
        const c_y = game.cursor.position.y

        this._position.deg = Math.atan2(
            c_x - (x + w),
            -(c_y - (y + h))
        )
    }


    private _fire(game: Game) {
        if (!game.controller.fire) return

        const c_w = this._size.width / 2
        const c_h = this._size.height / 2
        const x = this._position.x + c_w
        const y = this._position.y + c_h

        const c_x = game.cursor.position.x
        const c_y = game.cursor.position.y

        const fire = new Fire({x, y}, {x: c_x, y: c_y})
        this._abilities.push(fire)

        game.controller.fires = false
    }

    //отрисовка
    private _draw(canvas: CanvasRenderingContext2D) {
        const x = this._position.x
        const y = this._position.y
        const deg = this._position.deg
        const width = (this._size.width / 2)
        const height = (this._size.height / 2)

        canvas.save()
        canvas.translate(x + width, y + height)
        canvas.rotate(deg)
        canvas.translate(-(x + width), -(y + height))

        this._animatePlayer(canvas)

        canvas.restore()
    }



    //начало блока с методами анимации
    private _animatePlayer(canvas: CanvasRenderingContext2D): void {
        const tick_animate = this._animation.tick_animate,
            fusion_count = this._animation.fusion_count

        if(tick_animate === fusion_count) this._drawImageUp(canvas)
        else this._drawImage(canvas)

        this._animation.fusion_count += 1
    }

    private _drawImage(canvas: CanvasRenderingContext2D): void {
        canvas.drawImage(
            this._animation.img[this._animation.animation_count],
            this._position.x,
            this._position.y,
            this._size.width,
            this._size.height
        )
    }

    private _drawImageUp (canvas: CanvasRenderingContext2D): void {
        const state_animation = this._animation.state_animation
        const animation_count = this._animation.animation_count
        const img_length      = this._animation.img.length

        if(!state_animation && animation_count <= img_length) {
            this._drawImage(canvas)

            this._animation.animation_count += 1

            if(this._animation.animation_count === img_length) {
                this._animation.state_animation = true
                this._animation.animation_count -= 2
            }
        } else {
            this._drawImage(canvas)

            this._animation.animation_count -= 1

            if(this._animation.animation_count === 0) {
                this._animation.state_animation = false
            }
        }

        this._animation.fusion_count = 0
    }
    //конец блока с методами анимации



    get health(): number {
        return this._properties.health
    }
}