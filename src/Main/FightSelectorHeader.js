import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Toggle from 'react-toggle';

import { getFightId } from 'selectors/url/report';
import { getReport } from 'selectors/report';
import { getFightById } from 'selectors/fight';
import getFightName from 'common/getFightName';

import SelectorBase from './SelectorBase';
import FightSelectionList from './FightSelectionList';

class FightSelectorHeader extends SelectorBase {
  static propTypes = {
    parser: PropTypes.shape(),
    report: PropTypes.shape({
      code: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      fights: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        difficulty: PropTypes.number,
        boss: PropTypes.number.isRequired,
        start_time: PropTypes.number.isRequired,
        end_time: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        kill: PropTypes.bool,
      })),
    }),
    fight: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      killsOnly: false,
    };
  }

  render() {
    const { report, fight, parser, ...others } = this.props;
    delete others.dispatch;
    const { killsOnly, show } = this.state;
    return (
      <div ref={this.setRef} {...others}>
        <a onClick={this.handleClick}>{getFightName(report, fight)}</a>
        {show && parser && parser.player && (
          <span className="selectorHeader">
            <div className="panel">
              <div className="panel-heading">
                <div className="flex wrapable">
                  <div className="flex-main" style={{ minWidth: 200 }}>
                    <h2>Select the fight to parse {parser && parser.player ? ` for ${parser.player.name}` : ''}</h2>
                  </div>
                  <div className="flex-sub text-right toggle-control action-buttons">
                    <Toggle
                      checked={killsOnly}
                      icons={false}
                      onChange={event => this.setState({ killsOnly: event.currentTarget.checked })}
                      id="kills-only-toggle"
                    />
                    <label htmlFor="kills-only-toggle">
                      Kills only
                    </label>
                  </div>
                </div>
              </div>
              <div className="panel-body" style={{ padding: 0 }} onClick={this.handleClick}>
                {parser && parser.player && (
                  <FightSelectionList
                    report={report}
                    fights={
                      parser.player.fights.map(f => report.fights[f.id - 1]) // TODO: We should check if the id's match!
                    }
                    playerId={parser.player.id}
                    killsOnly={this.state.killsOnly}
                  />
                )}
              </div>
            </div>
          </span>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  report: getReport(state),
  fight: getFightById(state, getFightId(state)),
});

export default connect(mapStateToProps)(FightSelectorHeader);
