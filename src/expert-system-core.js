class ExpertSystem {
  constructor() {
    this.knoledgeBase = {};
  }

  addEntity(entity, entityName) {
    this.knoledgeBase[entityName] = entity;
  }

  doesEntityMatch(entity, properties) {
    const keysForCheck = Object.keys(properties);
    keysForCheck.forEach(key => {
      if (entity[key] !== properties[key]) return false;
    });
    return true;
  }

  checkEntity(characteristics) {
    const entityName = Object.keys(this.knoledgeBase).find(it =>
      this.doesEntityMatch(this.knoledgeBase[it], characteristics)
    );

    if (!entityName || entityName === -1) {
      return 'entity not found';
    }
    return entityName;
  }
}

let expertSystem;

function getInstance() {
  if (!expertSystem) {
    expertSystem = new ExpertSystem();
  }
  return expertSystem;
}

export default getInstance;
