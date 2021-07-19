document.addEventListener('DOMContentLoaded', async function () {
  let table = new tableConstructor();
  let loc = JSON.parse(localStorage.getItem('localTable')) || arrays;
  table.initial(loc);
  console.log(table);
});

function tableConstructor() {
  let bodyElm = qs('body');
  let o = this;
  let docElm = qs('#doc');
  let contentSetDoc = qs('#contentSetDoc');
  let contentAddHov = qs('#contentAddHov');
  let contentDeleteRow = qs('#contentDeleteRow');
  let contentDeleteCol = qs('#contentDeleteCol');
  let inputNewRow = qs('#contentNewRow');
  let inputNewCol = qs('#contentNewCol');
  let hoverHolder = qs('#hoverHolder');
  let tableElm = qs('#table-body');
  let tableTag = qs('#table');

  this.initial = function (rawTable) {
    this.parseTable(rawTable);
    updateHLJS();
    $on(
      qs('#table'),
      'focus',
      (event) => {
        var td = event.target;
        selectedHandler.selected = o.getCellByNode(td);
      },
      true
    );

    $on(
      document,
      'mousemove',
      function (ev) {
        let eval = `translate(${ev.clientX + 15}px,${ev.clientY + 15}px)`;
        hoverHolder.style.transform = eval;
        // hoverHolder.style.transform += `translateX()`;
      },
      false
    );
  };

  this.parseTable = function (rawTable) {
    this.table = rawTable.map((row, i) => {
      row = new tableRow(row);
      row.node.addEventListener('focusin', (x) => {
        let content = row?.doc || '';
        docElm.innerHTML = converter.makeHtml(content);
        docElm.querySelectorAll('pre code').forEach((block) => {
          hljs.highlightBlock(block);
        });

        // updateHLJS();
      });
      row.cells.map((x, j) => {
        return new tableCell(x, i, j);
      });
      return row;
    });
    this.table.columns = this.table[0].cells.length;
  };

  function tableRow(row) {
    row.node = qs('.table-body').insertRow(-1);
    let id = uuidv4();
    row.node.id = id;
    row.id = id;
    return row;
  }

  //
  //
  //
  // DRAG FUNCTION
  //
  //
  //
  //
  //
  const mouseDownHandler = function (e, cell) {
    // Attach the listeners to `document`
    document.addEventListener('mousemove', mouseOverHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  let isDraggingStarted = false;
  let rowx;
  let nxt;
  const mouseOverHandler = function (e) {
    // console.log(e);
    let selRowNode = o.selected.node.parentNode;
    let destRowNode = e.toElement.parentNode;
    if (!isDraggingStarted) {
      isDraggingStarted = true;
      bodyElm.classList.add('dragging-within');
      selRowNode.classList.add('dragged');
    }
    if (e.toElement.localName != 'td') return;
    if (selRowNode.id == destRowNode.id) return;
    let selIndex = o.table.findIndex((row) => row.id === selRowNode.id);
    let destIndex = o.table.findIndex((row) => row.id === destRowNode.id);
    // arraymove(o.table, selIndex, destIndex);

    // swap(selRowNode, destRowNode);
    // var b = o.table[selIndex];
    // o.table[selIndex] = o.table[destIndex];
    // o.table[destIndex] = b;

    console.log(selIndex, destIndex);
  };

  const mouseUpHandler = function (e) {
    // Remove the handlers of `mousemove` and `mouseup`
    document.removeEventListener('mousemove', mouseOverHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
    isDraggingStarted = false;

    bodyElm.classList.remove('dragging-within');
    o.selected.node.parentNode.classList.remove('dragged');
  };

  //
  //
  //
  //
  //
  //
  //
  //
  //

  function tableCell(cell, i, j) {
    cell.node = qs('.table-body').childNodes[i].insertCell(-1);
    cell.node.innerHTML = converter.makeHtml(cell.content);
    cell.node.tabIndex = 0;
    if (j < 1) {
      console.log(cell.node);

      cell.node.classList.add('draggable');
      // Attach event handler
      cell.node.addEventListener('mousedown', mouseDownHandler);
    }
    let id = uuidv4();
    cell.node.id = id;
    cell.id = id;
    if (cell?.hover != undefined) {
      cell.node.addEventListener('mouseenter', showHover);
      cell.node.addEventListener('mouseleave', hideHover);
    }

    return cell;
  }

  this.contentSetDoc = async function () {
    let row = o.getRowByCellNode(this.selected.node);
    let answer = await newModal('Enter row document content below.', row?.doc);
    docElm.innerHTML = converter.makeHtml(answer);
    row.doc = answer;
    updateHLJS();
    this.saveToLocal();
  };
  this.contentAddHov = async function () {
    let answer = await newModal(
      'Enter hover content below.',
      this?.selected?.hover
    );

    if (!answer) {
      delete this.selected.hover;
      this.selected.node.removeEventListener('mouseenter', showHover);
      this.selected.node.removeEventListener('mouseleave', hideHover);
      console.log('no input provided, deleted');
      this.saveToLocal();
      return;
    }
    if (this.selected.hover) {
      this.selected.hover = answer;
      console.log('hover exists already, updated');
      this.saveToLocal();
      return;
    }

    this.selected.hover = answer;
    $on(this.selected.node, 'mouseenter', showHover);
    $on(this.selected.node, 'mouseleave', hideHover);
    this.saveToLocal();
  };

  showHover = function (e) {
    let rowInd = e.target.parentNode.rowIndex;
    let colInd = e.target.cellIndex;

    hoverHandler.hoverSelected = o.table[rowInd].cells[colInd];
  };
  hideHover = function () {
    hoverHandler.hoverSelected = null;
  };

  this.contentDeleteRow = async function (rowIndex) {
    rowIndex = rowIndex ?? this.selected.node.parentNode.rowIndex;

    row = tableElm.childNodes[rowIndex];

    this.table.splice(rowIndex, 1);
    row.remove();

    let cellIndex = this.selected.node.cellIndex ?? 0;

    selectedHandler.selected =
      this?.table[rowIndex]?.cells[cellIndex] ??
      this?.table[this.table.length - 1].cells[cellIndex];

    this.saveToLocal();
  };
  this.contentDeleteCol = async function (colIndex) {
    colIndex = colIndex ?? this.selected.node.cellIndex;

    col = tableElm.childNodes[0].childNodes[colIndex];

    this.table.forEach((row) => {
      row.cells[colIndex].node.remove();
      row.cells.splice(colIndex, 1);
    });
    console.log(o);
    this.table.columns--;
    this.saveToLocal();
  };

  this.createNewRow = function () {
    let row = {
      cells: fill({ content: '' }, this.table.columns),
    };
    this.table.push(row);
    row = new tableRow(row);
    row.cells.map((x, j) => (x = new tableCell(x, this.table.length - 1, j)));
    this.saveToLocal();
  };
  this.createNewCol = function () {
    let cell = {
      content: '',
    };
    this.table.forEach((x, i) => {
      cell = new tableCell(Object.assign({}, cell), i, this.table.columns);
      x.cells.push(cell);
    });
    this.table.columns++;
    this.saveToLocal();
  };

  let selectedHandler = new Proxy(this, {
    set: function (target, key, value) {
      let bodyTable = document.getElementById('table-body');
      let old = target[key]?.node;
      let nrw = value?.node;

      bodyTable.classList.remove(bodyTable?.classList[1]);
      bodyTable.classList.add(rowIndexAsAlphabet(nrw.cellIndex));

      old?.classList.remove('selected');
      nrw?.classList.add('selected');

      old?.parentNode?.classList.remove('rowfocus');
      nrw?.parentNode?.classList.add('rowfocus');

      input.value = value.content;
      target[key] = value;
      nrw.focus();
      return true;
    },
  });
  let hoverHandler = new Proxy(this, {
    set: function (target, key, value) {
      let old = target[key]?.node;
      let nrw = value?.node;

      let x = value?.hover || '';

      hoverHolder.innerHTML = converter.makeHtml(x);
      // hoverHolder.highlightBlock(block);
      hljs.highlightBlock(hoverHolder);
      old?.classList.remove('hoverSelected');
      nrw?.classList.add('hoverSelected');
      // updateHLJS();
      target[key] = value;
      return true;
    },
  });

  $on(contentSetDoc, 'click', () => {
    this.contentSetDoc().catch((error) => console.log(error));
  });
  $on(contentAddHov, 'click', () => {
    this.contentAddHov().catch((error) => console.log(error));
  });
  $on(inputNewRow, 'click', () => {
    this.createNewRow();
  });
  $on(inputNewCol, 'click', () => {
    this.createNewCol();
  });
  $on(contentDeleteRow, 'click', () => {
    this.contentDeleteRow().catch((error) => console.log(error));
  });
  $on(contentDeleteCol, 'click', () => {
    this.contentDeleteCol().catch((error) => alert('Select a column cell'));
  });

  let input = qs('#contentInput');
  $on(input, 'click', (e) => {
    if (!o.selected?.node) {
      alert('Select a cell');
      input.blur();
      return;
    }
  });
  $on(input, 'keydown', (e) => {
    // This allows the focus to continue to the next element on Enter keypress.
    // But it still allows Shift+Enter combination for multiline content.
    if (e.key == 'Enter' && e.shiftKey) {
      return;
    }
    switch (e.key) {
      case 'Enter':
      case 'Tab':
        e.preventDefault();
        this.updateCell(this?.selected, input.value);
        let node =
          o.selected.node?.nextSibling || getNextTrChild(o.selected.node);
        node.focus();
        break;
      default:
        break;
    }
  });

  $on(qs('#table'), 'dblclick', (e) => {
    e.preventDefault();
    input.focus();
    input.select();
  });
  $on(qs('#table'), 'keydown', (e) => {
    let node = o.selected.node;
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        input.focus();
        break;
      case 'Delete':
        this.updateCell(this.selected, '');
        input.value = '';
        break;
      case 'Shift':
      case 'Tab':
        break;
      case 'ArrowUp':
        let nodeAbove =
          node.parentNode?.previousSibling?.childNodes[node.cellIndex] ?? node;
        nodeAbove.focus();
        console.log(nodeAbove);
        break;
      case 'ArrowRight':
        let nodeToRight = node?.nextSibling ?? node;
        nodeToRight.focus();
        break;
      case 'ArrowDown':
        let nodeBelow =
          node.parentNode?.nextSibling?.childNodes[node.cellIndex] ?? node;
        nodeBelow.focus();
        break;
      case 'ArrowLeft':
        let nodeToLeft = node?.previousSibling ?? node;
        nodeToLeft.focus();
        break;
      default:
        input.focus();
        input.select();
        break;
    }
  });
  $on(qs('#resetTable'), 'click', (e) => {
    this.resetLocal();
    location.reload();
  });

  this.updateCell = function (cell, value) {
    if (!cell) return;
    cell.content = value;
    cell.node.innerHTML = converter.makeHtml(value);
    // hljs.highlightBlock(cell.node);
    this.saveToLocal();
    // updateHLJS();
  };

  this.getRowByCellNodeID = function (ID) {
    // let row = ID.parentNode.rowIndex;

    return this.table.find((row) => (row.node.id = ID));
  };
  this.getRowByCellNode = function (ID) {
    let row = ID.parentNode.rowIndex;

    // let fnd = this.table.find((row) => (row.node.id = ID));
    // console.log(fnd);
    return this.table[row];
  };
  this.getCellByNode = function (ID) {
    let row = ID.parentNode.rowIndex;
    let col = ID.cellIndex;
    return this.table[row].cells[col];
  };
  this.saveToLocal = function () {
    localStorage.setItem('localTable', JSON.stringify(this.table));
  };
  this.resetLocal = function () {
    localStorage.removeItem('localTable');
  };
}

async function newModal(question, defaultx) {
  let modalElm = qs('#modal');

  let confirmBtn = modalElm.querySelector('.confirm');
  let cancelBtn = modalElm.querySelector('.cancel');
  let textArea = modalElm.querySelector('.modalInput');
  let title = modalElm.querySelector('.title');

  title.innerHTML = question || 'Set Input';
  textArea.value = defaultx || '';
  window.setTimeout(function () {
    textAreaAdjust(textArea);
    textArea.focus();
  }, 0);
  return new Promise((resolve, reject) => {
    modalElm.parentNode.classList.add('show');
    confirmBtn.onclick = function () {
      modalElm.parentNode.classList.remove('show');
      resolve(textArea.value);
    };
    cancelBtn.onclick = function () {
      modalElm.parentNode.classList.remove('show');
      reject('canceled');
    };
    modalElm.onkeydown = function (e) {
      if (e.key == 'Escape') {
        modalElm.parentNode.classList.remove('show');
        reject('canceled');
      }
    };
  });
}

// -----------

function toggleEdits() {
  var element = document.getElementById('edits');
  element.classList.toggle('visually-hidden');
}
function toggleFunctionInput() {
  var element = document.getElementById('input-function');
  element.classList.toggle('visually-hidden');
}
function toggleDoc() {
  var element = document.getElementById('doc');
  element.classList.toggle('visually-hidden');

  var element2 = document.getElementsByClassName('container')[0];
  element2.classList.toggle('full-doc');
}

// document.addEventListener('DOMContentLoaded', (event) => {
//   document.querySelectorAll('code').forEach((block) => {
//     block.classList.add('js');
//     hljs.highlightBlock(block);
//   });
// });
