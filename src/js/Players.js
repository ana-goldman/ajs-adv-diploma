import Character from './Character';

export class Bowman extends Character {
  constructor(level) {
    super(level, 'bowman');
    this.attack = 25;
    this.defence = 25;
    this.distance = 2;
    this.attackRadius = 2;
  }
}

export class Swordsman extends Character {
  constructor(level) {
    super(level, 'swordsman');
    this.attack = 40;
    this.defence = 10;
    this.distance = 4;
    this.attackRadius = 1;
  }
}
export class Magician extends Character {
  constructor(level) {
    super(level, 'magician');
    this.attack = 10;
    this.defence = 40;
    this.distance = 1;
    this.attackRadius = 4;
  }
}
export class Vampire extends Character {
  constructor(level) {
    super(level, 'vampire');
    this.attack = 25;
    this.defence = 25;
    this.distance = 2;
    this.attackRadius = 2;
  }
}
export class Undead extends Character {
  constructor(level) {
    super(level, 'undead');
    this.attack = 40;
    this.defence = 10;
    this.distance = 4;
    this.attackRadius = 1;
  }
}
export class Daemon extends Character {
  constructor(level) {
    super(level, 'daemon');
    this.attack = 10;
    this.defence = 40;
    this.distance = 1;
    this.attackRadius = 4;
  }
}
