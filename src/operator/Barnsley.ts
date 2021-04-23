import { createEntity } from '../entity/funcs';
import { createFrame } from '../frame';
import { Operator } from './Base';
import {IOperatorInputData, IOperatorOutputData, } from './types';

interface BarnsleyParamsRow {
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number,
    pFrom: number,
    pTo: number,
}

interface IBarnsleyOperatorProps {
    params: Array<BarnsleyParamsRow>
    offsetX: number,
    offsetY: number,
    multiply: number
};

export class Barnsley extends Operator<IBarnsleyOperatorProps> {    
    x: number = 0
    y: number = 0

    getParamsRow(): BarnsleyParamsRow {
        const p = Math.random()*100;
        return this.props.params.find(row => row.pFrom <= p && row.pTo > p) || this.props.params[0];
    }

    output(input: IOperatorInputData): IOperatorOutputData {
        const r = this.getParamsRow();
        const x = this.x;
        const y = this.y;

        const entity = createEntity(['dot'], {
            position: {
                x: x*this.props.multiply + this.props.offsetX,
                y: -y*this.props.multiply + this.props.offsetY
            }
        });

        this.x = r.a*x + r.b*y + r.e;
        this.y = r.c*x + r.d*y + r.f;

        return {
            frame: createFrame([entity]),
            done: false
        }
    }
};
