/**
 * App 입니다.
 * 프로그램의 Root 컨테이너 입니다.
 */
import Header from '../components/Header';
import Container from '../components/Container';
import Footer from '../components/Footer';
import AddTaskDlg from '../components/dialog/AddTaskDlg';

class App {
    constructor() {
        this.element = null;
        this.children = null;

        /**
         * 데이터 설정
         */
        this.state = {
            // 등록된 Task 리스트 입니다.
            tasks: [
                {
                    type: 'todo',
                    title: '타이틀',
                    description: '설명',
                    assignees: ['피츄', '잠만보'],
                },
                {
                    type: 'todo',
                    title: '타이틀',
                    description: '설명',
                    assignees: ['피츄', '잠만보'],
                },
                {
                    type: 'todo',
                    title: '타이틀',
                    description: '설명',
                    assignees: ['피츄', '잠만보'],
                },
                {
                    type: 'todo',
                    title: '타이틀',
                    description: '설명',
                    assignees: ['피츄', '잠만보'],
                },
                {
                    type: 'todo',
                    title: '타이틀',
                    description: '설명',
                    assignees: ['피츄', '잠만보'],
                },
                {
                    type: 'inProgress',
                    title: '타이틀',
                    description: '설명',
                    assignees: ['깝깝츄', '잠만보'],
                },
                {
                    type: 'done',
                    title: '타이틀',
                    description: '설명',
                    assignees: ['이상해씨', '꼬렛'],
                }
            ],
            // 추가 다이얼로그
            openAddDialog: false,
        }
    }

    handleToggleAddDlg = (open) => {
        const prevState = this.state;
        this.state = Object.assign({}, this.state, {openAddDialog: open});
        this.update(prevState, this.state);
    }

    create = () => {
        // create
        this.element = document.createElement('div');
        this.element.id = 'main';
        this.children = [
            new Header(),
            new Container({
                tasks: this.state.tasks,
                onToggleAddDlg: this.handleToggleAddDlg,
            }),
            new Footer(),
            new AddTaskDlg({
                open: this.state.openAddDialog,
                onToggleAddDlg: this.handleToggleAddDlg
            }),
        ];
        this.children.forEach(child => {
            const childElement = child.render();
            if(childElement) {
                this.element.appendChild(childElement);
            }
        });
    }

    update = (prevState, state) => {
        // 다이얼로그 토글을 업데이트 한다.
        if(prevState.openAddDialog !== state.openAddDialog) {
            this.children[3] = new AddTaskDlg({
                open: state.openAddDialog,
                onToggleAddDlg: this.handleToggleAddDlg
            });
            if(state.openAddDialog === true) {
                const childElement =  this.children[3].render();
                if(childElement) {
                    this.element.appendChild(childElement);
                }
            } else {
                this.element.removeChild(this.element.lastChild);
            }
        }
    }

    render() {
        if(!this.element) {
            this.create();
            return this.element;
        } else {
            this.update({});
            return false;
        }
    }
}


export default App;

