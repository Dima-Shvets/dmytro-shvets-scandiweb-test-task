import { Component } from "react";

export default class AttributesButtons extends Component {
    state = {
        attributes: {},
    };
    
    componentDidUpdate(prevProps, prevState) {
        
        if (prevProps.selectedAttributes !== this.props.selectedAttributes) {
            this.setState({attributes: this.props.selectedAttributes})
        }
    }
    
    onInputChange = (e) => {
    const { name, value } = e.target;
        this.props.updateSelectedAttributes({ [name]: value });
    }


    render() { 
        const { attributes } = this.props;
        return (
            <div>
                {attributes.map(attribute => {
                return (<div key={attribute.id}>
                    <h3>{attribute.name}</h3>
                    {attribute.items.map(item => (
                    <label key={item.id}>
                        <input 
                        type="radio" 
                        name={attribute.name}
                        value={item.value}
                        onChange={this.onInputChange}
                        checked={this.state.attributes[attribute.name] === item.value}
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