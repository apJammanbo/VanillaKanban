import BaseComponent from './BaseComponent';
import { makeElement } from '../util';

class A extends BaseComponent {
    /**
     * Constructor
     * @param params
     */
    constructor() {
        super();
        this.props = {
            className: `header__help`,
            target: `_blank`,
            rel: `noopener noreferrer`,
            title: `Find out more about know it all, version`,
            href: `https://hackernoon.com/what-you-dont-know-about-web-development-d7d631f5d468#.ex2yp6d64`,
        }
    }


    render () {
        makeElement('h1', this.props);
    }
}

export default A;