class Node {
  constructor(value = "") {
    this.value = value;
    this.end = false; // 마지막 리프 노드인지 여부
    this.children = new Map();
    this.idx = null;
  }
}

export default class Trie {
  constructor() {
    this.root = new Node();
  }

  insert(id, title) {
    let currentNode = this.root;
    for (const t of title) {
      if (!currentNode.children.has(t)) {
        currentNode.children.set(t, new Node(currentNode.value + t)); // {o : pro}
      }
      currentNode = currentNode.children.get(t);
    }
    currentNode.end = true;
    currentNode.idx = id;
  }

  exists(title) {
    let currentNode = this.root;
    for (const t of title) {
      if (!currentNode.children.has(t)) {
        return false;
      }
      currentNode = currentNode.children.get(t);
    }
    return currentNode;
  }

  autoComplete(title) {
    title = title.replace(" ", "");
    if (!title) {
      return [];
      // return "검색어를 입력하세요";
    }
    let currentNode = this.root;
    let madeword = [];
    currentNode = this.exists(title);
    if (currentNode) {
      madeword.push(title);
    } else {
      return [];
      // return `입력한 문자열: ${title} || 자동완성 가능한 단어 없음`;
    }

    let result = [];
    let queue = [currentNode];
    while (queue.length > 0) {
      let q = queue.shift();
      for (const next of q.children) {
        queue.push(next[1]);
        if (next[1].end) {
          result.push([next[1].idx, next[1].value]);
        }
      }
    }
    return result;
  }
}

export const searchTrie = new Trie();

// trie.insert("programmers");
