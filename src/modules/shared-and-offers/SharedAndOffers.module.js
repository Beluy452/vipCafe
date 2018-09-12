import React from 'react';
import Wrapper from 'shared/components/wrapper/Wrapper.component';

export default class SharedAndOffers extends React.Component {
  render() {
    return(
      <Wrapper>
        <div className="shared-and-offers-page">
          <div className="width-container">
            <ul className="header-tab">
              <li className="header-tab-item">
                <button>акції</button>
              </li>
              <li className="header-tab-item">
                <button>новинки</button>
              </li>
            </ul>
            <div className="tab-content">
              item
            </div>
          </div>
        </div>
      </Wrapper>
    )
  }
}
