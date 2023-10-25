import DocsList from './DocsList.js'

const DUMMY_LIST = [
  {
    "id": 1, // Document id
    "title": "노션을 만들자", // Document title
    "documents": [
      {
        "id": 2,
        "title": "1 하위페이지",
        "documents": [
          {
            "id": 3,
            "title": "1-2 하위페이지",
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

export default function DocsPage({ $target }) {
  const $page = document.createElement('div')
  $page.id = 'sidebar'
  
  new DocsList({
    $target: $page,
    initialState: DUMMY_LIST,
    onClickAddRoot: () => {
      console.log('페이지추가 눌림')
    },
    onClickAddSub: () => {
      console.log('하위페이지추가 눌림')
    },
  })

  this.render = () => {
    console.log($page)
    $target.appendChild($page)
  }
  this.render()
}