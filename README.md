# 📌 5주차 프로젝트[Project1]

## 필수 프로젝트

- 프로젝트 기한
  - 프로젝트 수행 기간 : 2023년 10월 17일(화) ~ 2023년 10월 26일(목)
  - 멘티 코드 리뷰 기간 : 2023년 10월 27일(금) ~ 2023년 10월 30일(월)
  - 멘토 코드 리뷰 기간 : 2023년 10월 27일(금) ~ 2023년 11월 2일(목)
  - 코드 리뷰 반영 기간 : 2023년 11월 3일(금) ~ 2023년 11월 6일(월)
- 내용
  - [Day 21] 노션 클로닝 요구사항을 확인해 주세요.

---

## API

### API 사용법

- 기본적으로 모든 API에 headers에 값 추가

  ```
  'x-username': '다른 사람과 겹치지 않는 고유한 이름'
  ```

### Root Documents 가져오기

- 전체 Document의 구조를 트리 형태로 가져옵니다.
- https://kdt-frontend.programmers.co.kr/documents - GET
- Response

  ```
  [
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
  ```

### 특정 Document의 content 조회하기

- https://kdt-frontend.programmers.co.kr/documents/{documentId} - GET
- Response
  ```
  {
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
  ```

### Document 생성하기

- https://kdt-frontend.programmers.co.kr/documents - POST

- Request Body

  ```
  {
  "title": "문서 제목",
  // parent가 null이면 루트 Document가 됩니다.
  // 특정 Document에 속하게 하려면 parent에
  // 해당 Document id를 넣으세요.
  "parent": null
  }
  ```

- Response

  ```
  {
  "id": 6,
  "title": "문서 제목",
  "createdAt": "생성된 날짜",
  "updatedAt": "수정된 날짜"
  }
  ```

### 특정 Document 수정하기

- https://kdt-frontend.programmers.co.kr/documents/{documentId} - PUT
- Request Body

  ```
  {
    "title": "제목 수정",
    "content": "내용 수정"
  }
  ```

### 특정 Document 삭제하기

- https://kdt-frontend.programmers.co.kr/documents/{documentId} - DELETE
- documentId에 해당하는 Document를 삭제합니다.
- 만약 하위 documents가 있는 document를 삭제한 경우, 하위 documents 등은 상위 document가 없어지므로 root document로 인식됩니다.
