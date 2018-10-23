import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {toastr} from "react-redux-toastr";
import connect from "react-redux/es/connect/connect";
import {Button, TextField} from "@material-ui/core";
import {userIsAuthenticated} from "core/auth-redirect";
import Wrapper from "shared/components/wrapper/Wrapper.component";
import CustomSelect from "shared/components/customSelect/Select.component";
import CustomCheckbox from "shared/components/custom-checkbox/CustomCheckbox.component";

import CheckIcon from "assets/svg/check-2.svg";
import {httpService} from "../../services";

const initialState = {
  userProfile : {
    id: '',
    f_name: '',
    l_name: '',
    p_name: '',
    tel: {
      number : '',
      telegram : false,
      viber : false
    },
    mail: '',
    company: '',
    site: '',

    /*select default props*/
    city: '',
    delivery: '',
    trade_format: '',
    /*select default props*/
  },
  openThanksModal: false,
  saveChanges: false,
};

const deliveryItems = ["Нова Пошта", "Міст Експрес"];

const cityItems = ["Чернівці", "Львів", "Київ"];

const tradeFormatSelect = ["Ларьок", "Бокс", "Прилавок"];

class Dashboard extends React.Component {
  static propTypes = {
    userProfile: PropTypes.object
  };

  state = initialState;

  componentDidMount() {
    this._setFields();
  }

  _setFields = () => {
    this.setState({
      userProfile : {
        ...this.props.userProfile
      }
    })
  };

  fieldsChange = event => {
    this.setState({
      userProfile: {
        ...this.state.userProfile,
        [event.target.name]: event.target.value
      },
    });
  };

  changeTel = event => {
    this.setState({
      userProfile: {
        ...this.state.userProfile,
        tel : {
          ...this.state.userProfile.tel,
          [event.target.name]: event.target.value
        }
      },
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const {id, f_name, p_name, l_name, city, company, delivery, site, tel, trade_format} = this.state.userProfile;
    httpService.getRequest(httpService.URLS.changeUserInformation +
      `?user=${id}&f_name=${f_name}&l_name=${l_name}&p_name=${p_name}&tel=${tel.number}&telegram=${tel.telegram}&viber=${tel.viber}&site=${site}&city=${city}&company=${company}&trade_format=${trade_format}&delivery=${delivery}`)
      .then(res => {
        if (res) {
          toastr.success('Зміни внесено!');
          this.setState({
            saveChanges : true
          });
        }
      })
  };

  /**
   * checkbox functionality
   */

  handleChangeCheckbox = name => event => {
    this.setState({
      userProfile : {
        ...this.state.userProfile,
        tel : {
          ...this.state.userProfile.tel,
          [name]: event.target.checked
        }
      }
    });
  };

  /**
   * checkbox functionality
   */

  /**
   * handleChangeSelect functionality
   */

  handleChangeSelect = name => event => {
    console.warn([name], event.target.value);
    this.setState({
      userProfile : {
        ...this.state.userProfile,
        [name]: event.target.value
      }
    });
  };

  /**
   * handleChangeSelect functionality
   */

  _getContent = () => {
    const {
      f_name, l_name,
      p_name, tel,
      mail, company,
      site,
      city,
      delivery,
      trade_format
    } = this.state.userProfile;

    return (
      <form autoComplete="off" method="post" className="shared-form" onSubmit={this.handleSubmit}>
        <div className="shared-form-container">
          <div className="input-container input-container-name">
            <label className="form-label" htmlFor="#f_name">Ім’я:</label>
            <TextField
              autoComplete="off"
              onChange={this.fieldsChange}
              required
              placeholder="Боб"
              value={f_name}
              type="text"
              name="f_name"
              id="f_name"
              className="form-input-wrap"
              InputProps={{
                classes: {
                  root: "form-input",
                  input: "input-style",
                },
              }}/>
          </div>

          <div className="input-container input-container-surName">
            <label className="form-label" htmlFor="#l_name">Прізвище:</label>
            <TextField
              onChange={this.fieldsChange}
              required
              placeholder="Боб"
              value={l_name}
              type="text"
              name="l_name"
              id="l_name"
              className="form-input-wrap"
              InputProps={{
                classes: {
                  root: "form-input",
                  input: "input-style",
                },
              }}/>
          </div>

          <div className="input-container input-container-lastName">
            <label className="form-label" htmlFor="#p_name">По-батькові:</label>
            <TextField
              onChange={this.fieldsChange}
              value={p_name}
              placeholder="Бобіков"
              type="text"
              name="p_name"
              id="p_name"
              className="form-input-wrap"
              InputProps={{
                classes: {
                  root: "form-input",
                  input: "input-style",
                },
              }}/>
          </div>

          <div className="input-container input-container-mobile">
            <label className="form-label" htmlFor="#number">Телефон:</label>
            <TextField
              onChange={this.changeTel}
              required
              value={tel.number}
              placeholder="+380"
              type="number"
              name="number"
              id="mobile"
              className="form-input-wrap"
              InputProps={{
                classes: {
                  root: "form-input",
                  input: "input-style",
                },
              }}/>
          </div>

          <div className="input-container input-container-email">
            <label className="form-label" htmlFor="#email">Електронна адреса:</label>
            <TextField
              disabled
              id="email"
              name="mail"
              type="email"
              value={mail}
              className="form-input-wrap"
              onChange={this.fieldsChange}
              placeholder="coffeeman@gmail.com"
              InputProps={{
                classes: {
                  root: "form-input",
                  input: "input-style",
                },
              }}/>
          </div>

          <div className="input-container input-container-nameCompany">
            <label className="form-label" htmlFor="#company">Назва компанії:</label>
            <TextField
              onChange={this.fieldsChange}
              value={company}
              placeholder="lariok.com"
              type="text"
              name="company"
              id="company"
              className="form-input-wrap"
              InputProps={{
                classes: {
                  root: "form-input",
                  input: "input-style",
                },
              }}/>
          </div>

          <div className="input-container input-container-city">
            <CustomSelect
              items={cityItems}
              labelText="Місто"
              selectedItem={city}
              handleChangeSelect={this.handleChangeSelect("city")}
            />
          </div>

          <div className="input-container input-container-delivery">
            <CustomSelect
              items={deliveryItems}
              labelText="Доставка:"
              selectedItem={delivery}
              handleChangeSelect={this.handleChangeSelect("delivery")}
            />
          </div>

          <div className="input-container input-container-tradeFormat">
            <CustomSelect
              items={tradeFormatSelect}
              labelText="Формат торгівлі:"
              selectedItem={trade_format}
              handleChangeSelect={this.handleChangeSelect("trade_format")}
            />
          </div>

          <div className="input-container input-container-sitePage">
            <label className="form-label" htmlFor="#site">Сайт:</label>
            <TextField
              onChange={this.fieldsChange}
              value={site}
              placeholder="LariOK"
              type="text"
              name="site"
              id="site"
              className="form-input-wrap"
              InputProps={{
                classes: {
                  root: "form-input",
                  input: "input-style",
                },
              }}/>
          </div>

          <div className="input-container-telegram-and-viber">
            <p className="telegram-and-viber-title">На вказаному телефоні є:</p>
            <CustomCheckbox
              handleChangeCheckbox={this.handleChangeCheckbox("viber")}
              checked={tel.viber}
              className="viber"
              labelText="Viber"
            />

            <CustomCheckbox
              handleChangeCheckbox={this.handleChangeCheckbox("telegram")}
              checked={tel.telegram}
              className="telegram"
              labelText="Telegram"
            />
          </div>
        </div>

        <div className="button-container">
          <div className={classNames("submit-button-wrap", this.state.saveChanges && "save")}>
            <CheckIcon className="check-icon"/>
            <Button
              className="submit-button text"
              variant="extendedFab"
              aria-label="signUp"
              type="submit">Зберегти зміни</Button>
          </div>
        </div>
      </form>
    );

  };

  render() {
    return (
      <Wrapper>
        <div className="dashboard-page">
          {
            this._getContent()
          }
        </div>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => {
  return {
    userProfile: state.userProfile,
  };
};

export default connect(mapStateToProps)(userIsAuthenticated((Dashboard)));
