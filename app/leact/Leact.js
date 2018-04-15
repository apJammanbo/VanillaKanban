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
        if(renderedElement) {
            while (parent.firstNode) {
                parent.removeChild(parent.firstNode);
            }
            parent.appendChild(renderedElement);
        }
    }
}

export default Leact;