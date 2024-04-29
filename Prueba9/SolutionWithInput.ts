import * as readline from 'readline';

function askQuestion(query: string) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}

async function ElevatorWithInput(floors: number[], currentFloor: number) {
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

        let answer = await askQuestion("Quiere presionar un piso? [s/n] ");
        if (answer == 's') {
            let floor = await askQuestion("Ingrese el piso");
            if(!isNaN(Number(floor)) && floors.indexOf(Number(floor)) == -1) {
                floors.push(Number(floor));
                console.log(`Piso ingresado ${floor}`, floors);
            }
        }
        if(direction == 1) {
            direction = [...floors].filter((x) => x > currentFloor).length > 0 ? 1 : 0;
        } else {
            direction = [...floors].filter((x) => x < currentFloor).length > 0 ? 0 : 1;
        }
    }
}

ElevatorWithInput([5,29,13,10], 4);