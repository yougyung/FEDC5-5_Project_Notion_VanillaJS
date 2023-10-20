//Document 생성하기
import NotionEditPage from './notionEditPage.js'
import App from "./app.js"
const $target = document.querySelector('#app')

//new App({$target})
console.log("1")
const notionEditPage = new NotionEditPage({
    $target,
    initialState: {
        postId: 'new'
    }
})
console.log("2")
notionEditPage.render()

// notionEditPage.setState({
//     postId: 1
// })