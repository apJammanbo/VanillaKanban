/**
 * Leact Component
 */

class Component {
    constructor(props = {}) {
        this.element = null;
        this.props = props;
    }
    /**
     * 컴포넌트를 생성한다.
     */
    create = (props) => {
        // Nothing To Do
    }

    /**
     * 컴포넌트를 업데이트 한다.
     */
    update = () => {
        // Nothing To Do
    }


    /**
     * 변경된 속성들로 부터 Dom 을 조작한다.
     */
    render = (props = null) => {
        if(!this.element) {
            // 초기생성이면 create 함수를 호출한다.
            if(props) {
                this.element = this.create(props);
            } else {
                this.element = this.create(this.props);
            }
        } else {
            // 이미 생성이 되었으면 업데이트 한다.
            this.update(props);
        }
        return this.element;
    }
}

export default Component;