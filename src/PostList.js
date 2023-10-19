import Post from './Post.js';
import { request } from './Api.js'

export default function PostList({ $target, initialState, getRootData,}) {
    const $ul = document.createElement('ul');
    $target.appendChild($ul);

    this.state = initialState;


    let isAlreadyRender = false;

    this.setState = nextState => {
        this.state = nextState;
        this.render();
    }

    getRootData();


    this.render = () => {
        if (isAlreadyRender === true) {
            $ul.innerHTML = ''
            isAlreadyRender = false;
        }

        const $div = document.createElement('div'); // div

        this.state.forEach(({ id, title, documents }) => {
            Post({
                id,
                title,
                documents,
                $target: $div,
                onInsert : async (id) => {
                    const insertData = { title : '추가 버튼을 누르면 추가', parent : id }; 
                    await request('', {
                        method : "POST",
                        body : JSON.stringify(insertData),
                    })
                    const newData = await request('');
                    this.setState(newData);
                },
                onDelete: async (id) => {
                    console.log(id)
                    await request(`/${id}`, {
                        method: "DELETE",
                    })
                    const newData = await request('');
                    this.setState(newData);
                }
            });
        })
        console.log($div);
        isAlreadyRender = true
        $ul.appendChild($div);



    }

}
