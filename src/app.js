import NotionPage from "./notionPage.js"

export default function App({$target}){
    const notionpage = new NotionPage({$target})
    notionpage.render()
}