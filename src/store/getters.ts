import { GetterTree } from 'vuex'
import State from './state'

// GetterTree<[current state], [root state]>
const getters: GetterTree<any, any> = {
  getTaskById: state => (id: any) => {
    const tasks: any = []
    state.board.lists.forEach((list: any) => {
      tasks.push(...list.items)
    })
    return tasks.find((task: any) => task.id === id)
  }
/*
* It's just color with new name.
* Example for using getters.
colour(state: State): string {
  return state.color;
}
*/
}

export default getters
