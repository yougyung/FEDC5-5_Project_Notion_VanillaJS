import NotionList from './notionList.js'
import { request } from './api.js'

export default function NotionPage({
    $target,
}) {

    const $page = document.createElement('div')

    const notionList = new NotionList({
        $target: $page,
        initialState: [],  //
    }) 

    const $newNotionButton = document.createElement('button')
    $newNotionButton.textContent = "+"
    $page.appendChild($newNotionButton)

    //notionList를 렌더링 하는 로직 
    const fetchPost = async () => {
        const lists = await request('/documents')
        notionList.setState(lists)
    }

    this.render = async() => {
        await fetchPost()
        $target.appendChild($page)
    }
}

/*
const DUMMY_DATA = [{
    id: 1,
    title: "노션을 만들자",
    documents: []
}, {
    id: 2,
    title: "노션을 작성하자",
    documents: []
}]*/