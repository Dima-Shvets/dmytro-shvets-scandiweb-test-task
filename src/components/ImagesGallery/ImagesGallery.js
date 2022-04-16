import { Component } from "react";

export default class ImagesGallery extends Component{
    state = {
        bigImage: this.props.gallery[0],
    }

    onImageClick = (e) => {
        this.setState({ bigImage: e.target.src });
    }

    render() {
        const { gallery, name } = this.props;

        return (
            <div>
            <ul>
                {gallery.map(picture => (
                    <li key={picture} onClick={this.onImageClick}>
                    <img src={picture} alt={name} width="250" />
                    </li>
                ))}
            </ul> 
                <img src={this.state.bigImage} alt={`Selected picture of ${name}`} width="450"/>
            </div>
        )
    }
}