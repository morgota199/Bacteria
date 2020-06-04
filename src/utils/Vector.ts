export class Vector {
    static VLength(vec: number[]): number {
        return Math.sqrt(Math.pow(vec[0], 2) + Math.pow(vec[1], 2))
    }

    static VNormalize(vec: number[]): number[] {
        return [vec[0] / Vector.VLength(vec), vec[1] / Vector.VLength(vec)]
    }
}