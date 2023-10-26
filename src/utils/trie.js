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
    let currentNode = this.root.children.get(" ");
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
    }
    let currentNode = searchTrie.root.children.get(" ");
    let madeword = [];
    currentNode = searchTrie.exists(title);
    if (currentNode) {
      madeword.push(title);
    } else {
      return [];
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

  init() {
    let currentNode = this.root.children.get(" ");
    searchTrie.root.children.get(" ").children = new Map();
  }
}

export const searchTrie = new Trie();
