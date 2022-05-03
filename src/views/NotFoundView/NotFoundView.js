import { Component } from "react";

import s from "./NotFoundView.module.scss"

export default class NotFoundView extends Component {
    render() {
        return (
            <div className={s.container}>
                <p>404. Page Not Found</p>
            </div>
        )
    }
}