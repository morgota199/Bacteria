// import {Game} from "./Game";
// import {Player} from "./Player";
// import {Vector} from "./utils/Vector";
// import {Fire} from "./Fire";
//
// export class Enemies {
//     counterEnemies: number
//     bacteria: Array<Bacterium> = []
//
//     constructor(counterEnemies: number, game: Game) {
//         this.counterEnemies = counterEnemies
//         for(let i = 0; i < this.counterEnemies; i++) {
//             this.bacteria.push(
//                 new Bacterium(
//                     this.randomInteger(0, game.map.width),
//                     this.randomInteger(0, game.map.height),
//                     game.player.x,
//                     game.player.y
//                 )
//             )
//         }
//     }
//
//     update(game: Game): void {
//         for(let i = 0; i < this.bacteria.length; i++){
//             if(!this.bacteria[i]) continue
//
//             this.bacteria[i].update(game, this.bacteria)
//         }
//     }
//
//     randomInteger(min: number, max: number): number {
//         return Math.floor(min + Math.random() * (max + 1 - min));
//     }
// }
//
// export class Bacterium {
//     private _sx: number
//     private _sy: number
//     private _dx: number
//     private _dy: number
//     private _width: number = 50
//     private _height: number = 50
//     private _speed: number = 3
//     private _gravitation: number = 0.1
//     private _deg: number = 0
//     private _direction: number[] = []
//
//     constructor(sx: number, sy: number, dx: number, dy: number) {
//         this._sx = sx
//         this._sy = sy
//         this._dx = dx
//         this._dy = dy
//         this._direction = Vector.VNormalize([this._sx - this._dx, this._sy - this._dy])
//     }
//
//     public update(game: Game, bacteria: Array<this>): void {
//         this.repulsionFromBacteria(bacteria, game)
//
//         this.move(game)
//
//
//         this.onDamage(bacteria, game)
//
//         this.draw(game.map.canvas)
//     }
//
//     private move(game: Game): void {
//         this._sx -= this._direction[0] * this._speed
//         this._sy -= this._direction[1] * this._speed
//
//         this._deg = Math.atan2(
//             game.player.x - (this._sx + (this._width / 2)),
//             -(game.player.y - (this._sy + (this._height / 2)))
//         )
//
//         this._direction = Vector.VNormalize([this._sx - game.player.x, this._sy - game.player.y])
//
//         if(this._speed > 0.5) {
//             this._speed *= this._gravitation
//         }
//     }
//
//     private draw(canvas: CanvasRenderingContext2D): void {
//         canvas.save()
//
//         canvas.translate(this._sx + (this._width / 2), this._sy + (this._height / 2))
//         canvas.rotate(this._deg)
//         canvas.translate(-(this._sx + (this._width / 2)), -(this._sy + (this._height / 2)))
//
//         canvas.fillRect(this._sx, this._sy, this._width, this._height)
//
//         canvas.restore()
//     }
//
//     private repulsionFromBacteria(bacteria: this[], game: Game): boolean {
//         for(let i = 0; i < bacteria.length; i++) {
//             if(!bacteria[i]) continue
//             if(this._sx !== bacteria[i]._sx
//                 && this._sy !== bacteria[i]._sy
//                 && this._deg !== bacteria[i]._deg) {
//                 if(this.isRepulsionBacteria(bacteria[i])) return true
//             }
//         }
//
//         return this.isRepulsionPlayer(game.player);
//     }
//
//     private isRepulsionBacteria(bacteria: this): boolean {
//         const distance = Vector.VDistanceCenter(
//             {x: this._sx, y: this._sy, width: this._width, height: this._height},
//             {x: bacteria._sx, y: bacteria._sy, width: bacteria._width, height: bacteria._height}
//         )
//
//         if(distance > (this._height / 2 + bacteria._height / 2)) return false
//
//         this.repulsion()
//
//         return true
//     }
//
//     private isRepulsionPlayer(player: Player): boolean {
//         const distance = Vector.VDistanceCenter(
//             {x: this._sx, y: this._sy, width: this._width, height: this._height},
//             {x: player.x, y: player.y, width: player.width, height: player.height}
//             )
//
//         if(distance > (this._height / 2 + player.height / 2)) return false
//
//         player.health -= 1
//         this.repulsion()
//
//         return true
//     }
//
//
//     private repulsion(): void {
//         this._sx -= this._direction[0] * this._speed
//         this._sy -= this._direction[1] * this._speed
//     }
//
//     private onDamage(bacteria: this[], game: Game): void {
//         for(let i = 0; i < bacteria.length; i++) {
//             for(let j = 0; j < game.player.playerFire.length; j++) {
//                 if (!bacteria[i] || !game.player.playerFire[j]) continue
//                 this.isDamage(bacteria, game.player.playerFire[j], game)
//             }
//         }
//
//     }
//
//     private isDamage(bacteria: this[], fire: Fire, game: Game) {
//         const distance = Vector.VDistanceCenter(
//             {x: this._sx, y: this._sy, width: this._width, height: this._height},
//             {x: fire.x, y: fire.y, width: fire.width, height: fire.height}
//         )
//
//         if(distance > this._height / 2 + fire.height / 2) return false
//
//         fire.dead(game.player.playerFire)
//         this.dead(bacteria)
//
//         return true
//     }
//
//     public dead(bacteria: this[]): void {
//         for(let i = 0; i < bacteria.length; i++) {
//             if(!bacteria[i]) continue
//             if (this._sx === bacteria[i]._sx
//                 && this._sy === bacteria[i]._sy
//                 && this._deg === bacteria[i]._deg) {
//                 delete bacteria[i]
//             }
//         }
//     }
//
//     public get x(): number { return this._sx }
//     public get y(): number { return this._sy }
//     public get width(): number { return this._width }
//     public get height(): number { return this._height }
//     public get direction(): number[] { return this._direction }
// }
