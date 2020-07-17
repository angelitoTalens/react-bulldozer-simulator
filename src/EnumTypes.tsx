export enum Direction {
    Up = "U",
    Down = "D",
    Left = "L",
    Right = "R",
}

export type Position = {
    X: number, 
    Y: number
}

export enum LandType {
    Plain = "o",
    Rocky = "r",
    TreePlanted = "t",
    Protected = "T",
    Cleared = ""
}

export enum SimulationStatus {
    Start,
    Ongoing,
    NoGrid,
    OutOfBounds,
    ClearedProtected,
    UserTerminated
}

export enum TabKeys {
    Simulation = "Simulation",
    Results = "Results"
}

