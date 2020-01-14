import React from 'react';
import { emojify } from 'react-emojione';
import './App.css';
import Linkify from 'react-linkify';

class ListItem extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <li className="listItem"><Linkify>{emojify(this.props.children)}</Linkify></li>
        )
    }
}

export default ListItem;