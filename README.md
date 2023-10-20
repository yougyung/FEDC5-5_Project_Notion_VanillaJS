# 📌 5주차 프로젝트[Project1]

## 필수 프로젝트

- 프로젝트 기한
  - 프로젝트 수행 기간 : 2023년 10월 17일(화) ~ 2023년 10월 26일(목)
  - 멘티 코드 리뷰 기간 : 2023년 10월 27일(금) ~ 2023년 10월 30일(월)
  - 멘토 코드 리뷰 기간 : 2023년 10월 27일(금) ~ 2023년 11월 2일(목)
  - 코드 리뷰 반영 기간 : 2023년 11월 3일(금) ~ 2023년 11월 6일(월)

### 기본 요구사항

- [x] 바닐라 JS만을 이용해 노션을 클로닝합니다.
- [x] 기본적인 레이아웃은 노션과 같으며, 스타일링, 컬러값 등은 원하는대로 커스텀합니다.
- [x] 글 단위를 Document라고 합니다. Document는 Document 여러개를 포함할 수 있습니다.
- [x] 화면 좌측에 Root Documents를 불러오는 API를 통해 루트 Documents를 렌더링합니다.
  - [x] Root Document를 클릭하면 오른쪽 편집기 영역에 해당 Document의 Content를 렌더링합니다.
  - [x] 해당 Root Document에 하위 Document가 있는 경우, 해당 Document 아래에 트리 형태로 렌더링 합니다.
  - [x] Document Tree에서 각 Document 우측에는 + 버튼이 있습니다. 해당 버튼을 클릭하면, 클릭한 Document의 하위 Document로 새 Document를 생성하고 편집화면으로 넘깁니다.
- [x] 편집기에는 기본적으로 저장 버튼이 없습니다. Document Save API를 이용해 지속적으로 서버에 저장되도록 합니다.
- [x] History API를 이용해 SPA 형태로 만듭니다.
  - [x] 루트 URL 접속 시엔 별다른 편집기 선택이 안 된 상태입니다.
  - [x] /documents/{documentId} 로 접속시, 해당 Document 의 content를 불러와 편집기에 로딩합니다.

### 기타 챌린지

- [ ] 사이드바에 토글 버튼을 추가합니다.
  - [ ] 토글 버튼을 누르면 하위 documents가 펼쳐집니다. 다시 누르면 닫힙니다.
  - [ ] 펼쳐둔 documents는 창을 닫고 다시 열어도 유지되어있습니다.
- [ ] 사이드바의 사이즈를 늘리거나 줄일 수 있습니다.
- [ ] 노션의 명령어 기능을 구현합니다.
  - [ ] 제목1, 제목2, 제목3에 따라 글씨의 사이즈와 굵기가 달라집니다.
  - [ ] 글머리를 추가하면 list 형태로 변경됩니다.

## 커밋 메세지 설명서

해당 프로젝트의 커밋 메세지는 <a href="https://gitmoji.dev/">깃모지</a>를 사용하고 있습니다.

프로젝트에서 사용하는 깃모지의 의미는 다음과 같습니다.

🎉: 첫 커밋 메세지(프로젝트 시작 시)에 사용됩니다. </br>
📝: 리드미 추가/수정이나 주석 추가/수정 시에 사용됩니다. </br>
✨: 새로운 기능 추가 시에 사용됩니다. </br>
🚚: 파일명/폴더명 또는 파일/폴더의 경로가 변경됐을 시에 사용됩니다. </br>
👽: 외부 API에 의해서 코드가 변경된 경우 사용됩니다. </br>
⚰️: 더이상 사용하지 않는 코드를 지웠을 때 사용됩니다. </br>
🔥: 파일이나 코드를 삭제했을 때 사용됩니다. </br>
💄: UI, style을 추가/변경했을 때 사용됩니다. </br>
