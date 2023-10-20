import { createNewElement } from '../../../../Util/element.js';
import { CURRENT_USER_KEY, setItem } from '../../../../Store/localStroage.js';
import Observer from '../../../../Store/userObserver.js';

export default class UserForm {
    constructor({ $target, onSubmitCallback }) {
        this.$target = $target;
        this.onSubmitCallback = onSubmitCallback;
        this.$nameAndForm = createNewElement('div', [{ property: 'className', value: 'name-and-form' }]);

        this.init();
    }

    init() {
        const $name = createNewElement('h3', [{ property: 'className', value: 'name-and-form__name' }]);
        const $form = createNewElement('form', [{ property: 'className', value: 'user-form' }]);
        const $input = createNewElement('input', [
            { property: 'className', value: 'user-form__input' },
            { property: 'name', value: 'name' },
        ]);
        const $button = createNewElement('button', [{ property: 'className', value: 'user-form__button' }], '+');

        $form.appendChild($input);
        $form.appendChild($button);
        this.$nameAndForm.appendChild($name);
        this.$nameAndForm.appendChild($form);
        this.$target.appendChild(this.$nameAndForm);

        // 구독 해둔 상태가 변경되면 콜백함수 실행
        Observer.getInstance().subscribe((currentUser) => this.setState({ currentUser }));
        this.$nameAndForm.addEventListener('submit', (e) => this.handleOnSubmit(e));
        this.render();
    }

    setState(nextState) {
        setItem(CURRENT_USER_KEY, nextState.currentUser);
        this.render();
    }

    render() {
        const currentUser = Observer.getInstance().getState();
        const $name = this.$nameAndForm.querySelector('.name-and-form__name');

        $name.innerText = `${currentUser ? `${currentUser}님` : '사용자 없음'}`;
    }

    handleOnSubmit(e) {
        e.preventDefault();
        const {
            target,
            target: { className },
        } = e;

        // 사용자 추가
        if (className === 'user-form') {
            const name = target.name.value;

            if (name.length > 10) {
                return alert('10자 이내로 작성해주세요.');
            }
            if (!name) {
                return alert('이름을 입력해주세요.');
            }

            target.name.value = '';
            target.name.focus();
            this.onSubmitCallback(name);
        }
    }
}
