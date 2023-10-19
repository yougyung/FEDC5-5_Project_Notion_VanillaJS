import DocumentList from "./DocumentList.js";
import { request } from "../utils/api.js";

export default function SidebarContainer({$target}) {
    const $sidebar = document.createElement('div');
    $target.appendChild($sidebar);

    const DUMMY_DATA = [
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

    const documentList = new DocumentList({
        $target: $sidebar,
        initialState: DUMMY_DATA
    })

    this.render = () => {
        
    };
    
    this.render();
}