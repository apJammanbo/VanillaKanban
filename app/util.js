// const attributeExceptions = [
//     `role`,
// ];
//
// function appendText(el, text) {
//     const textNode = document.createTextNode(text);
//     el.appendChild(textNode);
// }
//
// function appendArray(el, children) {
//     children.forEach((child) => {
//         if (Array.isArray(child)) {
//             appendArray(el, child);
//         } else if (child instanceof window.Element) {
//             el.appendChild(child);
//         } else if (typeof child === `string`) {
//             appendText(el, child);
//         }
//     });
// }
//
// function setStyles(el, styles) {
//     if (!styles) {
//         el.removeAttribute(`styles`);
//         return;
//     }
//
//     Object.keys(styles).forEach((styleName) => {
//         if (styleName in el.style) {
//             el.style[styleName] = styles[styleName]; // eslint-disable-line no-param-reassign
//         } else {
//             console.warn(`${styleName} is not a valid style for a <${el.tagName.toLowerCase()}>`);
//         }
//     });
// }
//
// export function makeElement1(type, textOrPropsOrChild, ...otherChildren) {
//     const el = document.createElement(type);
//
//     if (Array.isArray(textOrPropsOrChild)) {
//         appendArray(el, textOrPropsOrChild);
//     } else if (textOrPropsOrChild instanceof window.Element) {
//         el.appendChild(textOrPropsOrChild);
//     } else if (typeof textOrPropsOrChild === `string`) {
//         appendText(el, textOrPropsOrChild);
//     } else if (typeof textOrPropsOrChild === `object`) {
//         Object.keys(textOrPropsOrChild).forEach((propName) => {
//             if (propName in el || attributeExceptions.includes(propName)) {
//                 const value = textOrPropsOrChild[propName];
//
//                 if (propName === `style`) {
//                     setStyles(el, value);
//                 } else if (value) {
//                     el[propName] = value;
//                 }
//             } else {
//                 console.warn(`${propName} is not a valid property of a <${type}>`);
//             }
//         });
//     }
//
//     if (otherChildren) appendArray(el, otherChildren);
//
//     return el;
// };


// svg 관련 라이브러리
const ns = 'http://www.w3.org/2000/svg'

export function makeElement(type, props, children) {
    const element = type === 'svg' || type === 'path' ? document.createElementNS(ns, type) : document.createElement(type);
    // 프로퍼티 설정
    if(props) {
        Object.keys(props).forEach((prop) => {
            if(type === 'svg' || type === 'path') {
                const value = props[prop];
                if (value) {
                    element.setAttributeNS(null, prop, value);
                }
            } else {
                if (prop in element) {
                    const value = props[prop];
                    if (value) {
                        element[prop] = value;
                    }
                }
            }
        });
    }

    // 자식설정
    if (Array.isArray(children)) {
        // 자식이 배열이면 배열을 추가하는 함수를 호출한다.
        appendChildren(element, children);
    } else {
        appendChild(element, children);
    }

    return element;
}

/**
 * 자식을 부모에 추가한다.
 * @param element
 * @param children
 */
function appendChildren(element, children) {
    children.forEach((child) => {
        if (Array.isArray(child)) {
            appendChildren(element, child);
        } else {
            appendChild(element, child);
        }
    });
}

/**
 * 단일 자식을 부모에 추가한다.
 * @param element
 * @param child
 */
function appendChild(element, child) {
    if(child instanceof window.Element) {
        // 태그이면
        element.appendChild(child);
    } else if(typeof child === 'string') {
        const textNode = document.createTextNode(child);
        element.appendChild(textNode);
    }
}