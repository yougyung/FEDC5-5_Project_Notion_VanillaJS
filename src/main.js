import App from "./App.js"

const $app = document.querySelector('.app')

const initialState = {
    documents: [
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
      ],
    selectedDocument: {
        "id": 1,
        "title": "노션을 만들자",
        "content": "즐거운 자바스크립트의 세계!",
        "documents": [
          {
            "id": 2,
            "title": "",
            "createdAt": "",
            "updatedAt": ""
          }
        ],
        "createdAt": "",
        "updatedAt": ""
      }
}

new App({
    $target: $app,
    initialState
})