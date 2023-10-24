# 📌 5주차 프로젝트[Project1]

## 요구 사항

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

## 남은 처리사항

- [x] documentItem에 부여된id를 key로 display-none 값을 localStorage에 저장 후 다시 렌더링되도 펼쳐져 보이게...
- [ ] 전역store생성 및 구독 시스템
- [ ] 에디터 부분 css처리
- [ ] 하위문서 갯수가 넘칠때 예외처리(css포함)
- [x] 재사용 가능한 Title 컴포넌트 제작(documentListTitle, documentTitle 분리)
- [x] 버튼들 모두 재사용 가능한 Button 컴포넌트로 교체
- [ ] 하위문서가 존재하지 않을때 '하위문서 없음' 렌더링(재사용 가능한 Title을 렌더링하면 될것도 같다.)
- [ ] 시간 남으면 구독 시스템을 flux패턴으로 제작. 안되면 구독자 전체에게 알림
- [ ] 에디터 contentEditable로 전환(추가 요구사항)
