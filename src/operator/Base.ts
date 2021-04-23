import { reduceOperatorInputToFrame } from "./funcs";
import { IOperatorInputData, IOperatorOutputData, ITickInput, ITickOutput } from "./types";

export abstract class Operator<Props> {
    props: Props
    children?: Array<Operator<any>>
    childrenOutput: Array<ITickOutput> = []
    done: boolean
    currentFrame = 0;

    constructor(props: Props, children?: Array<Operator<any>>) {
        this.props = props;
        this.children = children;
        this.done = false;

        if (Array.isArray(this.children)) {
            this.childrenOutput = this.children.map(child => child.tick({}));
        }
    };

    tick(input: ITickInput): ITickOutput {
        this.currentFrame ++;
        if (this.done) {
            return {
                done: true
            }
        }
    
        const output = this.output({
            childrenOutput: this.childrenOutput,
            mergedFrame: reduceOperatorInputToFrame(this.childrenOutput),
            childDone: this.childrenOutput
                .every(({done}) => done)
        });

        this.done = output.done;

        if (Array.isArray(this.children)) {
            this.childrenOutput = this.children.map(child => {
                return child.tick({});
            });
        }

        return {
            frame: output.frame,
            done: output.done
        };
    }

    abstract output(input: IOperatorInputData): IOperatorOutputData;
};
