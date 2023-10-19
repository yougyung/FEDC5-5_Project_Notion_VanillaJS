import Post from './Post.js';
import { request } from './Api.js'

export default function PostList({ $target, initialState, getRootData, onDelete }) {
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
                // onInsert : (id) => {
                //     console.log(id);
                // },
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
