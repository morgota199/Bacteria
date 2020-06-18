interface Distance {
    pos: Vec
    width: number,
    height: number
}

interface Vec {
    x: number,
    y: number
}

export class Vector {
    static VLength(vec: Vec): number {
        return Math.sqrt(Math.pow(vec.x, 2) + Math.pow(vec.y, 2))
    }

    static VNormalize(vec: Vec): Vec {
        return {
            x: vec.x / Vector.VLength(vec),
            y: vec.y / Vector.VLength(vec)
        }
    }

    static VDistanceCenter(vec1: Distance, vec2: Distance): number {
        const simpleX = (vec1.pos.x + vec1.width / 2),
            simpleY = (vec1.pos.y + vec1.height / 2)

        const  dirX = (vec2.pos.x + vec2.width / 2),
            dirY = (vec2.pos.y + vec2.height / 2)

        return Vector.VLength({x: simpleX - dirX, y: simpleY - dirY})
    }
}