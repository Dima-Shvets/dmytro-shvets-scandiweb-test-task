import { Component } from "react";

export default class AttributesButtons extends Component {
    state = {
        attributes: {},
    };

    componentDidMount() {
        this.setDefaultAttributes()
    }
    
    setDefaultAttributes = () => {
        const defaultAttributes = this.props.attributes.reduce((a, v) => ({ ...a, [v.name]: v.items[0].value }), {});
        this.props.updateSelectedAtributes(defaultAttributes)
        this.setState({attributes: defaultAttributes})
    }
  
    onInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      attributes: {
        ...prevState.attributes,
        [name] : value
      },
    }))
        this.updateSelectedAttributes({ ...this.state.attributes, [name]: value });
    }

    updateSelectedAttributes = (updatedAttributes) => {
        this.props.updateSelectedAtributes(updatedAttributes);
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