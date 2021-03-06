import React from 'react';
import PropTypes from 'prop-types';
import Textfit from 'react-textfit';

import getBossName from 'common/getBossName';
import Maintainer from 'Main/Maintainer';

import SkullRaidMarker from './Images/skull-raidmarker.png';

class Headers extends React.PureComponent {
  static propTypes = {
    config: PropTypes.shape({
      spec: PropTypes.shape({
        className: PropTypes.string.isRequired,
        specName: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    playerName: PropTypes.string.isRequired,
    boss: PropTypes.shape({
      headshot: PropTypes.string.isRequired,
    }),
    fight: PropTypes.object.isRequired,
  };

  render() {
    const { config: { spec, maintainers }, playerName, boss, fight } = this.props;

    return (
      <header>
        <div className={`player ${spec.className.replace(' ', '')}`}>
          <img src={`/specs/${spec.className.replace(' ', '')}-${spec.specName.replace(' ', '')}.jpg`} alt="Player avatar" />{' '}
          <Textfit mode="single" max={80}>
            {playerName}
          </Textfit>
        </div>
        <div className="versus">versus</div>
        <div className="boss">
          <img src={boss ? boss.headshot : SkullRaidMarker} alt="Boss avatar" />
          <Textfit mode="single" max={80}>
            {getBossName(fight)}
          </Textfit>
        </div>

        <div className="about maintainers">
          {spec.specName} {spec.className} analysis is maintained by {maintainers.map(maintainer => <Maintainer key={maintainer.nickname} {...maintainer} />)}
        </div>
      </header>
    );
  }
}

export default Headers;
