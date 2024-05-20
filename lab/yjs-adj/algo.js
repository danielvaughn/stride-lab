
// attempts to implement martin kleppmans move semantics algorithm...unsuccessfully

class Operation {
  constructor(move_time, move_parent, move_meta, move_child) {
    this.move_time = move_time;
    this.move_parent = move_parent;
    this.move_meta = move_meta;
    this.move_child = move_child;
  }
}

class LogMove {
  constructor(log_time, old_parent, new_parent, log_meta, log_child) {
    this.log_time = log_time;
    this.old_parent = old_parent;
    this.new_parent = new_parent;
    this.log_meta = log_meta;
    this.log_child = log_child;
  }
}

class State {
  constructor(log_ops, tree) {
    this.log_ops = log_ops;
    this.tree = tree;
  }
}

function getParent(tree, child) {
  for (let [parent, meta, nodeChild] of tree) {
    if (nodeChild === child) {
      return { parent, meta };
    }
  }
  return null;
}

function ancestor(tree, parent, child) {
  if (tree.some(([p, meta, c]) => p === parent && c === child)) {
    return true;
  }
  for (let [p, meta, c] of tree) {
    if (c === parent && ancestor(tree, p, child)) {
      return true;
    }
  }
  return false;
}

function doOp(op, tree) {
  const { move_time, move_parent, move_meta, move_child } = op;
  const newTree = new Set(tree);

  const parent = getParent(tree, move_child);
  if (parent && (ancestor(tree, move_child, move_parent) || move_parent === move_child)) {
    return newTree;
  } else {
    newTree.add([move_parent, move_meta, move_child]);
    return newTree;
  }
}

function undoOp(logOp, tree) {
  const newTree = new Set(tree);
  const { log_time, old_parent, new_parent, log_meta, log_child } = logOp;

  if (old_parent === null) {
    newTree.delete([new_parent, log_meta, log_child]);
  } else {
    newTree.add([old_parent, log_meta, log_child]);
    newTree.delete([new_parent, log_meta, log_child]);
  }
  return newTree;
}

function redoOp(logOp, tree) {
  const { log_time, new_parent, log_meta, log_child } = logOp;
  return doOp(new Operation(log_time, new_parent, log_meta, log_child), tree);
}

function applyOp(ops, state) {
  let [log_ops, tree] = state;
  for (let op of ops) {
    tree = doOp(op, tree);
    log_ops.push(op);
  }
  return [log_ops, tree];
}

function applyOps(ops, state) {
  return ops.reduce((s, op) => applyOp([op], s), state);
}

function uniqueParent(tree) {
  const seen = new Map();
  for (let [parent, meta, child] of tree) {
    if (seen.has(child)) {
      const [prevParent, prevMeta] = seen.get(child);
      if (prevParent !== parent || prevMeta !== meta) {
        return false;
      }
    } else {
      seen.set(child, [parent, meta]);
    }
  }
  return true;
}

function acyclic(tree) {
  for (let [parent, meta, child] of tree) {
    if (ancestor(tree, child, parent)) {
      return false;
    }
  }
  return true;
}
