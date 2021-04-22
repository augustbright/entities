import {Frame} from '../frame';

export interface ITickInput {

}

export interface ITickOutput {
    frames: Array<Frame>,
    done?: boolean
}
