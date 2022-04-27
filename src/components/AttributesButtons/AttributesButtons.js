import { Component, } from "react";

export default class AttributesButtons extends Component {
    
    onInputChange = (name, value) => {
        if (this.props.cart) {
            const {id} = this.props.product
            this.props.changeSelectedAttributes({ [name]: value }, id);
            return
        }
        this.props.updateSelectedAttributes({ [name]: value });
    }

    render() { 
        const { attributes } = this.props;
        console.log()
        return (
            <div>
                {attributes.map(attribute => {
                return (<div key={attribute.id}>
                    <h3>{attribute.name}</h3>
                    {attribute.items.map(item => (
                    <label key={item.id}>
                        <input 
                        type="radio" 
                        value={item.value}
                        onChange={()=>this.onInputChange(attribute.name, item.value)}
                        checked={this.props.selectedAttributes[attribute.name] === item.value}
                        >
                        </input>
                        {attribute.type === "text" ? item.displayValue: item.value} 
                    </label>
                    ))  
                }
                </div>)
                })}
            </div>
        )
    }
} 