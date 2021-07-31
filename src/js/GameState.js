export default class GameState {
  static from(object) {
    // TODO: create object
    this.playerTeam = object.playerTeam;
    this.computerTeam = object.computerTeam;
    this.level = object.level;
    this.score = object.score;
    this.maxScore = object.maxScore;
    return null;
  }
}
