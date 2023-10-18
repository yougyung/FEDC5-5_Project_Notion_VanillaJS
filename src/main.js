import DocumentList from "./components/DocumentList.js";

const testData = [
    {
      "id": 1,
      "title": "노션을 만들자",
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
];

const $app = document.querySelector('#app');

const documentList = new DocumentList({
    $target: $app,
    initialState: testData
})