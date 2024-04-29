import * as readline from 'readline';

function ElevatorWithInput(floors: number[], currentFloor: number, pressedFloors: {[key: number]: number}) {
    let direction: number = floors[0] > currentFloor ? 1 : 0;

    console.log('Elevador en piso', currentFloor);
    let nextFloor: number;
    let superiorFloors: number[];
    let inferiorFloors: number[];
    while (floors.length > 0) {
        if (direction == 1) {
            superiorFloors = [...floors].filter((x) => x > currentFloor);
            nextFloor = Math.min(...superiorFloors);
            console.log('Elevador subiendo');
            while (currentFloor < nextFloor) {
                currentFloor++;
                console.log('Elevador en piso', currentFloor);
            }
        } else {
            inferiorFloors = [...floors].filter((x) => x < currentFloor);
            nextFloor = Math.max(...inferiorFloors);
            console.log('Elevador descendiendo');
            while (currentFloor > nextFloor) {
                currentFloor--;
                console.log('Elevador en piso', currentFloor);
            }
        }
        floors.splice(floors.indexOf(nextFloor), 1);
        console.log('Elevador se detiene', floors);
        if(pressedFloors[nextFloor] && floors.indexOf(pressedFloors[nextFloor]) == -1) {
            floors.push(pressedFloors[nextFloor]);
            console.log(`Piso ingresado ${pressedFloors[nextFloor]}`, floors);
        }
        if(direction == 1) {
            direction = [...floors].filter((x) => x > currentFloor).length > 0 ? 1 : 0;
        } else {
            direction = [...floors].filter((x) => x < currentFloor).length > 0 ? 0 : 1;
        }
    }
}