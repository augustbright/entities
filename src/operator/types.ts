export interface TickInput {

}

export interface TickOutput {

}

export interface Operator {
    tick(input: TickInput): TickOutput
};
