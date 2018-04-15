const attributeExceptions = [
    `role`,
];

function appendText(el, text) {
    const textNode = document.createTextNode(text);
    el.appendChild(textNode);
}

function appendArray(el, children) {
    children.forEach((child) => {
        if (Array.isArray(child)) {
            appendArray(el, child);
        } else if (child instanceof window.Element) {
            el.appendChild(child);
        } else if (typeof child === `string`) {
            appendText(el, child);
        }
    });
}

function setStyles(el, styles) {
    if (!styles) {
        el.removeAttribute(`styles`);
        return;
    }

    Object.keys(styles).forEach((styleName) => {
        if (styleName in el.style) {
            el.style[styleName] = styles[styleName]; // eslint-disable-line no-param-reassign
        } else {
            console.warn(`${styleName} is not a valid style for a <${el.tagName.toLowerCase()}>`);
        }
    });
}

function makeElement(type, textOrPropsOrChild, ...otherChildren) {
    const el = document.createElement(type);

    if (Array.isArray(textOrPropsOrChild)) {
        appendArray(el, textOrPropsOrChild);
    } else if (textOrPropsOrChild instanceof window.Element) {
        el.appendChild(textOrPropsOrChild);
    } else if (typeof textOrPropsOrChild === `string`) {
        appendText(el, textOrPropsOrChild);
    } else if (typeof textOrPropsOrChild === `object`) {
        Object.keys(textOrPropsOrChild).forEach((propName) => {
            if (propName in el || attributeExceptions.includes(propName)) {
                const value = textOrPropsOrChild[propName];

                if (propName === `style`) {
                    setStyles(el, value);
                } else if (value) {
                    el[propName] = value;
                }
            } else {
                console.warn(`${propName} is not a valid property of a <${type}>`);
            }
        });
    }

    if (otherChildren) appendArray(el, otherChildren);

    return el;
}

const a = (...args) => makeElement(`a`, ...args);
const button = (...args) => makeElement(`button`, ...args);
const div = (...args) => makeElement(`div`, ...args);
const h1 = (...args) => makeElement(`h1`, ...args);
const header = (...args) => makeElement(`header`, ...args);
const p = (...args) => makeElement(`p`, ...args);
const span = (...args) => makeElement(`span`, ...args);


const Header = props => (
    header({ className: `header` },
        h1({ className: `header__title` }, `Know It All`),
        a(
            {
                className: `header__help`,
                target: `_blank`,
                rel: `noopener noreferrer`,
                title: `Find out more about know it all, version ${props.version}`,
                href: `https://hackernoon.com/what-you-dont-know-about-web-development-d7d631f5d468#.ex2yp6d64`,
            },
            `What is this?`,
        ),
    )
);

const Table = props => div({ className: `skill-table` }, props.rows);

const App = props => (
    div({ id: `app` },
        Header({ version: props.version }),
        Table({ rows: props.rows }),
    )
);


document.getElementById('app').appendChild(
    App({
        version: "1.0",

    })
);
