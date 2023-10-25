import SideMenuListHeader from './SideMenuListHeader.js';
import CreateMenu from './CreateMenu.js';

export default function SideMenuList({ $target, initialState, onNavRemove, onNavCreate }) {
    const $sideMenuList = document.createElement('div');
    $sideMenuList.classList.add('leftBar');
    $target.appendChild($sideMenuList);

    this.state = initialState;
    this.setState = newState => {
        this.state = newState;
        console.log(this.state)
        this.render();
    }

    // const dfs = (documents, parentNav) => {
    //     if(Array.isArray(documents) && documents.length > 0) {
    //         documents.map(({id, title, documents}) => {
    //             const childNav = document.createElement('div');
    //             childNav.setAttribute('data-id', id);
    //             childNav.innerHTML = `
    //                 <span>${title}</span>
    //                 <button class="remove" data-id="${id}">삭제</button>
    //                 <button class="create" data-id="${id}">추가</button>
    //             `;
    //             parentNav.appendChild(childNav);
    //             if(documents.length > 0) dfs(documents, childNav);
    //         })
    //     }
    //     return;
    // }

    this.render = () => {
        $sideMenuList.innerHTML = `
            <ul>
                ${CreateMenu(this.state)}
            </ul>
        `
        // this.state.map(({id, title, documents}) => {
        //     const parentNav = document.createElement('div');
        //     parentNav.setAttribute('data-id', id);
        //     parentNav.innerHTML = `
        //         <span>${title}</span>
        //         <button class="remove" data-id="${id}">삭제</button>
        //         <button class="create" data-id="${id}">추가</button>
        //     `;
        //     dfs(documents, parentNav);
        //     $sideMenuList.appendChild(parentNav);
        // })
    }

    $sideMenuList.addEventListener('click', e => {
        const { target }  = e;

        // 토글 메뉴
        const $li = target.closest('li');
        if(e.target.className === 'toggle') {
            $li.classList.toggle('show');
        }

        if($li) {
            const { id } = $li.dataset;

            // 버튼 클릭 시 동작 (삭제, 추가)
            if(target.className === 'remove') {
                onNavRemove(Number(id));
            } else if(target.className === 'create') {
                onNavCreate('테스트', Number(id));
            }
        }

        if(target.nodeName === 'SPAN') {
            console.log($li.dataset.id);
        }
    })

    

    this.render();
}