import { ITickInput, ITickOutput } from "./types";

export abstract class Operator<Props> {
    props: Props
    constructor(props: Props) {
        this.props = props;
    };

    abstract tick(input: ITickInput): ITickOutput
};
