/**
 * Leact
 */
class Leact {
    /**
     * element 로 Dom 요소를 생성 합니다.
     * @param element
     */
    static render(id, element) {
        const parent = document.getElementById(id);
        const renderedElement = element.render();
        parent.appendChild(renderedElement);
    }
}

export default Leact;


// svg 관련 라이브러리
const ns = 'http://www.w3.org/2000/svg'

/**
 * Element 를 생성한다.
 */
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