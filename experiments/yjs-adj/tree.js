import { randomId } from "../yjs/utils"

export class AdjTree {

  constructor() {
    this.model = {}
    this.parent_cache = {}
    this.data = {}
  }

  add_node(parentId, index) {
    if (!parentId) {
      return
    }

    const parent = this.model[parentId]
    

  }

}
