import { fetchPost, fetchPostList } from "../../api/fetch.js"
import { routeTrigger } from "../../router/router.js"
import PostList from "./PostList.js"

export default function PostListSection({ $target, initialState, onDelete, onAdd, onToggle }) {
    
    const $section = document.createElement('div')
    $target.appendChild($section)

    this.state = initialState

    this.setState = (newState) => {
        this.state = newState

        postList.setState(this.state)
    }

    const onAddPost = async (parentId) => {
        const newPost = await fetchPostList({
            method: 'POST',
            body: JSON.stringify({
                title: '',
                parent: parentId
            })
        })

        routeTrigger(`/posts/${newPost.id}`)

        onAdd()
    }

    const postList = new PostList({
        $target: $section,
        initialState: this.state,
        onAdd: (parentId) => onAddPost(parentId),
        onRemove : async (id) => {
            await fetchPost(id, {
                method: 'DELETE'
            })

            onDelete(id)
        },
    })

    const $addPostButton = document.createElement('button')
    $addPostButton.textContent = "글 추가하기"
    $addPostButton.addEventListener('click', () => {
        onAddPost(null)
    })
    $target.appendChild($addPostButton)
}