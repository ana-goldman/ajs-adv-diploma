/* eslint-disable no-undef */
import GameStateService from '../js/GameStateService';

jest.mock('../js/GameStateService');

test('should load', () => {
  const state = {
    playerTeam: [],
    computerTeam: [],
    level: 2,
    score: 100,
    maxScore: 275,
  };
  const stateService = new GameStateService();
  stateService.load.mockReturnValue(state);
  expect(stateService.load()).toEqual(state);
});
