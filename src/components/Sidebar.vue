<template>
  <div class="bg-white flex flex-shrink-0">
    <div class="w-96 flex flex-col">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="shadow-md pt-8 pb-4 flex flex-col flex-grow overflow-y-auto">
        <div class="flex-shrink-0 px-4 flex flex-col items-center justify-center">
          <img
            class="inline-block h-28 w-28 rounded-full shadow-md custom-shadow-md"
            src="../assets/avatar.jpeg"
            alt="Workflow"
          />
          <span class="m-4 text-lg font-cabin font-medium tracking-wide text-gray-600">Hello, Jerry Mei</span>
        </div>

        <div class="flex-grow mt-12 flex flex-col">
          <nav class="flex-1 pl-4">
            <div class="mb-8">
              <span class="font-cabin text-xs text-gray-400 tracking-widest inline-block ml-2 mb-4">MENU</span>
              <a
                v-for="item in navigation"
                :key="item.name"
                :href="item.href"
                :class="[
                  item.index == activeNavigation ? 'text-green-500 border-r-2' : 'text-gray-600 hover:text-green-500',
                  'group my-4 pl-2 flex items-center text-xs font-medium border-green-500',
                ]"
                @click="setActiveNavigation(item.index)"
              >
                <component
                  :is="item.icon"
                  :class="[
                    item.index == activeNavigation ? 'text-green-500' : 'text-gray-400 group-hover:text-green-500',
                    'mr-3 flex-shrink-0 h-6 w-6',
                  ]"
                  aria-hidden="true"
                />
                {{ item.name }}
              </a>
            </div>

            <div class="mb-8">
              <span class="font-cabin text-xs text-gray-400 tracking-widest inline-block ml-2 mb-4">PLAYLIST</span>
              <a
                v-for="item in playlists"
                :key="item.id"
                :href="`#/playlists/${item.id}`"
                :class="[
                  item.id == activeNavigation ? 'text-green-500 border-r-2' : 'text-gray-600',
                  'group px-2 py-2 flex items-center text-xs font-medium border-green-500 cursor-pointer hover:bg-gray-50',
                ]"
                @click="setActiveNavigation(item.id)"
              >
                <img class="h-10 w-10 rounded-full mr-3" :src="item.cover_image_url" alt="" />
                <div class="text-xs leading-5 flex flex-col justify-between">
                  <span
                    :class="[
                      item.id == activeNavigation ? 'text-green-500' : 'text-gray-600',
                      'max-w-xs truncate group-hover:text-green-500',
                    ]"
                    :title="item.name"
                    >{{ item.name }}</span
                  >
                  <span class="text-gray-400">{{ item.track_count }} 首</span>
                </div>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { CloudIcon } from '@heroicons/vue/outline'
import useActiveNavigation from '../composables/useActiveNavigation'

export default defineComponent({
  components: {
    CloudIcon,
  },
  props: {
    playlists: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const { activeNavigation, setActiveNavigation } = useActiveNavigation()
    const navigation = [{ index: 1, name: '云盘', href: '#/cloud', icon: CloudIcon }]
    return {
      navigation,
      activeNavigation,
      setActiveNavigation,
    }
  },
})
</script>
