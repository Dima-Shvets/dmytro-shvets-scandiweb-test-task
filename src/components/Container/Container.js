import { Component } from "react"
import s from "./Container.module.scss"

export default class Container extends Component {
    render() {
        return (
            <div className={s.Container}>{this.props.children}</div>
        )
    }
}