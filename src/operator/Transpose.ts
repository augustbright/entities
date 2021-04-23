import { Vector } from '../common/types';
import { cloneEntity } from '../entity/funcs';
import { Frame } from '../frame';
import { Operator } from './Base';
import {IOperatorInputData, IOperatorOutputData, ITickInput, ITickOutput} from './types';

interface ITransposeOperatorProps {
    propName: string,
    vector: Vector
    framesCount?: number
};

export class Transpose extends Operator<ITransposeOperatorProps> {    
    cachedFrame: Frame;
    output(input: IOperatorInputData): IOperatorOutputData {
        this.cachedFrame = input.childDone ? this.cachedFrame : input.mergedFrame;
        const frameOffset = Math.min(this.props.framesCount, this.currentFrame);

        const move: Vector = {
            x: this.props.vector.x / this.props.framesCount * frameOffset,
            y: this.props.vector.y / this.props.framesCount * frameOffset
        };        

        return {
            frame: ({
                entities: this.cachedFrame.entities.map(
                    entity => entity.payload[this.props.propName] ? cloneEntity(entity, [], {
                        [this.props.propName]: {
                            x: entity.payload[this.props.propName].x + move.x,
                            y: entity.payload[this.props.propName].y + move.y
                        }
                    }) : entity
                )
            }),
            done: (this.currentFrame >= this.props.framesCount && input.childDone)
        };
    }
};
