import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import SteakIcon from 'assets/svg/steak.svg';
import CoffeeIcon from 'assets/svg/coffee.svg';
import CheeseIcon from 'assets/svg/cheese.svg';
import GroceryIcon from 'assets/svg/grocery.svg';
import ChocolateIcon from 'assets/svg/chocolate.svg';
import ArrowIcon from '@material-ui/icons/ArrowBack';

// import {HttpService} from "services";
import {DeviceSizeService} from 'utilits/index';
import {Button, Dialog} from '@material-ui/core';
import connect from 'react-redux/es/connect/connect';
import Wrapper from 'shared/components/wrapper/Wrapper.component';
import ItemGoods from 'shared/components/goods/ItemGoods.component';
import CustomSelect from 'shared/components/customSelect/Select.component';
import ItemWithPrice from 'shared/components/goods/ItemWithPrice.component';
import MultiSelect from 'shared/components/customSelect/MultiSelect.component';
import {httpService} from "services";

const cheeseSelect = ['СИР', 'М\'ЯСО'];
const sortSelect = ['ВІД ДОРОГИХ ДО ДЕШЕВИХ', 'ВІД ДЕШЕВИХ ДО ДОРОГИХ'];
const brandSelect = ['РОСІЙСЬКИЙ', 'МАЦАРЕЛЛА'];
const typeSelect = ['ТВЕРДИЙ', 'ПЛАВЛЕНИЙ'];
const weightSelect = ['250г (8)','450г (44)','1кг (8)','10кг (44)','15кг (8)','20кг (44)'];


const keys = {
  syrMyaso : "syr-myaso"
};

const tabIcons = {
    bakaliya :  <GroceryIcon className="tab-icon"/>,
    kava :  <CoffeeIcon className="tab-icon"/>,
    [keys.syrMyaso] :  [<CheeseIcon className="tab-icon"/>,<SteakIcon className="tab-icon"/>],
    shokolad :  <ChocolateIcon className="tab-icon"/>,
};

class Catalog extends React.Component {
  static propTypes = {
    items : PropTypes.array,
    isAuthorized: PropTypes.bool
  };

  state = {
    /**
     * active tab
     */
    activeGoods: {
      bakaliya: true,
      kava: false,
      ["syr-myaso"]: false,
      shokolad: false,
    },
    /**
     * customSelect value
     */
    product: '',
    sort: '',
    brand: '',
    type: '',
    weight: [],
    tabs: [],

    openFilterModal: false,
  };

  componentDidMount() {
    this.deviceServiceId = DeviceSizeService.subscribe(() => this.forceUpdate());
    httpService.getRequest(httpService.URLS.shop).then(res => this.setState({
        tabs : res
    }));
  }

  componentWillUnmount() {
    DeviceSizeService.unsubscribe(this.deviceServiceId);
  }

  handleChangeSelect = name => event => {
    this.setState({[name]: event.target.value});
  };

  handleChangeGoods = name => {
    this.setState({
      activeGoods: {
        [name]: true,
      },
    });
  };

  getGoodsItem = (props, key) => {
    if(this.props.isAuthorized){
      return <ItemWithPrice {...props} key={key}/>;
    }
    return <ItemGoods {...props} key={key}/>
  };

  _toggleFilterModal = () => {
    this.setState({
      openFilterModal : !this.state.openFilterModal
    });
  };

  _getFilters = () => {
    if(DeviceSizeService.size.width < 992) {
      return (
        <div className='custom-filter-container'>
          <Button className="show-filters" onClick={this._toggleFilterModal}>фільтр і сортування</Button>
        </div>
      )
    }
    return (
      <div className="custom-filter-container">
        {this._getFiltersProduct()}
      </div>
    )
  };

  _getFiltersProduct = () => {
    const {
      product,
      sort,
      brand,
      type,
      weight,
    } = this.state;

    return (
      <div className="filter-product">

        <CustomSelect
          placeholder
          labelText="Продукт"
          items={cheeseSelect}
          selectedItem={product}
          handleChangeSelect={this.handleChangeSelect('product')}
        />

        <label className="filter-label-of-goods custom-label">Фільтр товарів:</label>

        <CustomSelect
          placeholder
          labelText="сортування"
          items={sortSelect}
          selectedItem={sort}
          handleChangeSelect={this.handleChangeSelect('sort')}
        />

        <CustomSelect
          placeholder
          labelText="Бренд"
          items={brandSelect}
          selectedItem={brand}
          handleChangeSelect={this.handleChangeSelect('brand')}
        />

        <CustomSelect
          placeholder
          labelText="тип сиру"
          items={typeSelect}
          selectedItem={type}
          handleChangeSelect={this.handleChangeSelect('type')}
        />

        <MultiSelect
          labelText="вага"
          countTheSelectedItem
          items={weightSelect}
          selectedItem={weight}
          weightLength={this.state.weight.length}
          resetSelectItems={this._resetSelectItems('weight')}
          handleChangeSelect={this.handleChangeSelect('weight')}
        />

      </div>
    )
  };

  _resetSelectItems = (resetItem) => (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      [resetItem]: []
    }, () =>  this.state[resetItem]);
  };

    getTabCategory = () => {
        return (
            <div className="tab-categories">
                {
                    this.state.tabs.map((elem, key) => {
                        return (
                            <Button
                                key={key} onClick={() => this.handleChangeGoods(elem.slug)}
                                classes={{label: 'tab-item-wrap'}}
                                className={classNames(`tab-item ${elem.slug}`, this.state.activeGoods[elem.slug] && 'active')}>
                                {
                                    tabIcons[elem.slug]
                                }
                                <span className="text">{elem.name}</span>
                            </Button>
                        )
                    })
                }
            </div>
        );
    };

  render() {
    return (
      <Wrapper>
        <div className="catalog-page">

          {
            this.getTabCategory()
          }

          {
            this._getFilters()
          }

          <div className="goods-wrap">
            {
              this.props.items.map((item, key) => {
                return this.getGoodsItem(item, key);
              })
            }
          </div>
          <Dialog
            fullScreen
            open={this.state.openFilterModal}
            onClose={this._handleOpenDescriptionModal}
            className="filters-mobile-modal"
          >
            <div className="catalog-mobile-filters">
              <button className="back-btn" onClick={this._toggleFilterModal}><ArrowIcon className="back-icon"/></button>
              {this._getFiltersProduct()}
            </div>

          </Dialog>
        </div>
      </Wrapper>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthorized: state.auth.isAuthorized,
    items : state.catalog.items
  };
};

export default connect(mapStateToProps)(Catalog);
