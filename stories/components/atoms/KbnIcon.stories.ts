import { storiesOf } from '@storybook/vue'
import KbnIcon from '@/components/atoms/KbnIcon.vue'

storiesOf('Components/atoms/KbnIcon', module)
  .add('close', () => ({
    components: { KbnIcon },
    data () {
      return {
        name: 'close'
      }
    },
    template: '<kbn-icon :name="name" />'
  }))
  .add('remove', () => ({
    components: { KbnIcon },
    data () {
      return {
        name: 'remove'
      }
    },
    template: '<kbn-icon :name="name" />'
  }))
  .add('add', () => ({
    components: { KbnIcon },
    data () {
      return {
        name: 'add'
      }
    },
    template: '<kbn-icon :name="name" />'
  }))
