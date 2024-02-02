import Background from './pieces/Background';
import Label from './pieces/Label';
import Score from './pieces/Score';
import Status from './pieces/Status';
import Team from './pieces/Team';
import MatchWrapper from './pieces/Wrapper';

export const MatchCard = Object.assign(MatchWrapper, {
  Label,
  Score,
  Status,
  Team,
  Background,
});
