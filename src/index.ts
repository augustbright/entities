import { EntityType } from "./entity";
import { SpawnEntity } from "./operator";
import { Transpose } from "./operator/Transpose";

const operator = new Transpose({
    propName: 'position',
    vector: {
        x: 20,
        y: 30
    },
    framesCount: 10        
}, [
    new SpawnEntity({
        types: ['dot'],
        payload: {
            position: {
                x: 10,
                y: 10
            }
        }
    })
]);

console.log(console.log(JSON.stringify(operator.tick({}), null, 4)));
console.log(console.log(JSON.stringify(operator.tick({}), null, 4)));
console.log(console.log(JSON.stringify(operator.tick({}), null, 4)));
console.log(console.log(JSON.stringify(operator.tick({}), null, 4)));
console.log(console.log(JSON.stringify(operator.tick({}), null, 4)));
console.log(console.log(JSON.stringify(operator.tick({}), null, 4)));
console.log(console.log(JSON.stringify(operator.tick({}), null, 4)));
console.log(console.log(JSON.stringify(operator.tick({}), null, 4)));
console.log(console.log(JSON.stringify(operator.tick({}), null, 4)));
console.log(console.log(JSON.stringify(operator.tick({}), null, 4)));
