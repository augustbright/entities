import {Frame} from '../frame';

export interface ITickInput {

}

export interface ITickOutput {
    frame?: Frame,
    done?: boolean
}

export interface IOperatorInputData {
    childrenOutput: Array<ITickOutput>
    mergedFrame: Frame,
    childDone: boolean
}

export interface IOperatorOutputData {
    frame?: Frame,
    done?: boolean    
}

export interface IOperator {
    tick(input: ITickInput): ITickOutput
}