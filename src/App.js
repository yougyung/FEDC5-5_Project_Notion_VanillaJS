import Editor from "./components/Editor.js"
import SideBar from "./components/SideBar.js"
import { request } from "./utils/api.js"

export default function App({$target}) {

    const ROOT_DUMMY_DATA = [
        {
          "id": 1, // Document id
          "title": "노션을 만들자", // Document title
          "documents": [
            {
              "id": 2,
              "title": "블라블라",
              "documents": [
                {
                  "id": 3,
                  "title": "함냐함냐",
                  "documents": []
                }
              ]
            }
          ]
        },
        {
          "id": 4,
          "title": "hello!",
          "documents": []
        }
    ]
    
    const sideBar = new SideBar({
        $target, 
        initialState: ROOT_DUMMY_DATA
    })

    const editor = new Editor({
        $target
    })

    const fetchDocuments = async() => {
        const documents = await request("")
        sideBar.setState(documents)
    }

    //fetchDocuments();
}