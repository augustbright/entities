import {Operator, TickInput, TickOutput} from './types';

export class Entity implements Operator {
    tick(input: TickInput): TickOutput {
        return {};
    }
};
