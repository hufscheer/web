import Background from './pieces/Background';
import Label from './pieces/Label';
import Score from './pieces/Score';
import Status from './pieces/Status';
import Team from './pieces/Team';
import GameWrapper from './pieces/Wrapper';

export const GameCard = Object.assign(GameWrapper, {
  Label,
  Score,
  Status,
  Team,
  Background,
});
