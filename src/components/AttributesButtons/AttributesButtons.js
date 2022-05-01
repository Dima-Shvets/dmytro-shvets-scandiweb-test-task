import { Component } from "react";

import { v4 as uuidv4 } from "uuid";

import s from "./AttributesButtons.module.scss";

export default class AttributesButtons extends Component {
  onInputChange = (name, value) => {
    if (this.props.cart) {
      const { id } = this.props.product;
      this.props.changeSelectedAttributes({ [name]: value }, id);
      return;
    }
    this.props.changeSelectedAttributes({ [name]: value });
  };

  render() {
    const { attributes, type, dropdown } = this.props;
    return (
      <div>
        {attributes.map((attribute) => {
          return (
            <div className={s.groupCatainer} key={attribute.id}>
              <h3 className={s[`${type}GroupName`]}>{attribute.name} :</h3>
              <div className={s[`${type}BtnsContainer`]}>
                {attribute.items.map((item) => {
                  const btnId = uuidv4();
                  return (
                    <div className={s[`${type}BtnWrapper`]} key={item.id}>
                      <input
                        className={s.btn}
                        id={btnId}
                        type="radio"
                        value={item.value}
                        onChange={() =>
                          this.onInputChange(attribute.name, item.value)
                        }
                        checked={
                          this.props.selectedAttributes[attribute.name] ===
                          item.value
                        }
                      ></input>
                      {attribute.type === "text"?
                        < label htmlFor={btnId} className={s[`${type}Label`]}>
                      {item.displayValue}
                      </label>: 
                    < label htmlFor={btnId} className={s[`${type}ColorLabel`]} style={{backgroundColor: `${item.displayValue}`}}></label>
              }
                  </div>
                );
              })}
                </div>
            </div>
          );
        })}
      </div>
    );
  }
}
