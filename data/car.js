class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkopen = false;

  constructor(carInfo) {
    this.#brand = carInfo.brand;
    this.#model = carInfo.model;
  }

  go() {
    if (!this.isTrunkopen) {
      this.speed += 5;
    }

    if (this.speed > 200) {
      this.speed = 200;
    }
  }

  brake() {
    this.speed -= 5;
    if (this.speed < 0) {
      this.speed = 0;
    }
  }

  displayInfo() {

    const trunkStatus = this.isTrunkopen ? 'open' : 'closed';

    console.log(`${this.#brand} ${this.#model} speed : ${this.speed} km/hr Trunk : ${trunkStatus}`);
  }

  openTrunk() {
    if (this.speed === 0) {
      this.isTrunkopen = true;
    }
  }
  closeTrunk() {
    this.isTrunkopen = false;
  }
}

class RaceCar extends Car {
  acceleration;

  constructor(carInfo) {
    super(carInfo)
    this.acceleration = carInfo.acceleration;
  }

  go() {
    this.speed += this.acceleration;
    if (this.speed > 300) {
      this.speed = 300;
    }
  }

  openTrunk() {
    console.log('Race cars do not have a trunk.');
  }

  closeTrunk() {
    console.log('Race cars do not have a trunk.');
  }
}

const car1 = new Car({ brand: 'toyota', model: 'chevrolet' });
const car2 = new Car({ brand: 'tesla', model: 'model3' });
const car3 = new RaceCar({ brand: 'McLaren', model: 'F1', acceleration: 30 });

console.log(car1);
console.log(car2);

car1.displayInfo();
car1.go();
car1.go();
car1.go();
car1.brake();
car1.displayInfo();

// Trunk should not open since the car is moving.
car1.openTrunk();
car1.displayInfo();

car2.displayInfo();
car2.go();
// car2.brake();
car2.brake();
car2.displayInfo();

// Trunk should open since the car is not moving.
car2.openTrunk();
// Car should not go since the trunk is open.
car2.go();
car2.openTrunk();
car2.displayInfo();

car3.go();
car3.go();
car3.go();
car3.displayInfo();
car3.openTrunk();
car3.displayInfo();
car3.brake();
car3.displayInfo();


