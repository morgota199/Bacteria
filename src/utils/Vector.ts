interface Distance {
    x: number,
    y: number,
    width: number,
    height: number
}

export class Vector {
    static VLength(vec: number[]): number {
        return Math.sqrt(Math.pow(vec[0], 2) + Math.pow(vec[1], 2))
    }

    static VNormalize(vec: number[]): number[] {
        return [vec[0] / Vector.VLength(vec), vec[1] / Vector.VLength(vec)]
    }

    static VDistanceCenter(vec1: Distance, vec2: Distance): number {
        const simpleX = (vec1.x + vec1.width / 2),
            simpleY = (vec1.y + vec1.height / 2)

        const  dirX = (vec2.x + vec2.width / 2),
            dirY = (vec2.y + vec2.height / 2)

        return Vector.VLength([simpleX - dirX, simpleY - dirY])
    }
}