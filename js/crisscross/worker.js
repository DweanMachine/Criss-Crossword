// Build prefix map: prefix -> [words starting with that prefix]
function buildPrefixMap(wordList) {
  const map = new Map();
  for (const word of wordList) {
    for (let i = 1; i <= word.length; i++) {
      const prefix = word.slice(0, i);
      if (!map.has(prefix)) map.set(prefix, []);
      map.get(prefix).push(word);
    }
  }
  return map;
}

function findWordSquares(wordList) {
  const prefixMap = buildPrefixMap(wordList);
  //const wordSet = new Set(wordList);
  const results = [];
  const board = [];

  function getCandidates(row) {
    // For each column, get words matching that column's prefix so far
    // Then intersect — start from the column with fewest matches
    let smallestSet = null;

    for (let col = 0; col < 4; col++) {
      const prefix = board.map(w => w[col]).join('') ;
      const matches = prefixMap.get(prefix) ?? [];
      if (smallestSet === null || matches.length < smallestSet.length) {
        smallestSet = matches;
      }
    }
    return smallestSet ?? [];
  }

  function backtrack(row) {
    if (row === 4) {
      results.push([...board]);
      return;
    }

    const candidates = row === 0 ? wordList : getCandidates(row);

    for (const word of candidates) {
      board.push(word);

      // Verify all column prefixes are valid
      let valid = true;
      for (let col = 0; col < 4; col++) {
        const prefix = board.map(w => w[col]).join('');
        if (!prefixMap.has(prefix)) { valid = false; break; }
      }

      if (valid) backtrack(row + 1);
      board.pop();
    }
  }

  backtrack(0);
  return results;
}

// Receive wordList from main thread, send back results
self.onmessage = ({ data: wordList }) => {
  const squares = findWordSquares(wordList);
  self.postMessage(squares);
};