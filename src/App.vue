<template>
  <div class="h-screen bg-indigo-50 overflow-hidden flex">
    <!-- Static sidebar for desktop -->
    <div class="bg-white flex flex-shrink-0">
      <div class="w-96 flex flex-col">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div class="shadow-md pt-8 pb-4 flex flex-col flex-grow overflow-y-auto">
          <div class="flex-shrink-0 px-4 flex flex-col items-center justify-center">
            <img
              class="inline-block h-28 w-28 rounded-full shadow-md custom-shadow-md"
              src="./assets/avatar.jpeg"
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
                    item.current ? 'text-green-500 border-r-2' : 'text-gray-600 hover:text-green-500',
                    'group my-4 pl-2 flex items-center text-xs font-medium border-green-500',
                  ]"
                >
                  <component
                    :is="item.icon"
                    :class="[
                      item.current ? 'text-green-500' : 'text-gray-400 group-hover:text-green-500',
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
                  :class="[
                    item.current ? 'text-green-500 border-r-2' : 'text-gray-600',
                    'group px-2 py-2 flex items-center text-xs font-medium border-green-500 cursor-pointer hover:bg-gray-50',
                  ]"
                >
                  <img class="h-10 w-10 rounded-full mr-3" :src="item.cover_image_url" alt="" />
                  <div class="text-xs leading-5 flex flex-col justify-between">
                    <span
                      :class="[
                        item.current ? 'text-green-500' : 'text-gray-600',
                        'max-w-xs truncate group-hover:text-green-500',
                      ]"
                      :title="item.name"
                      >{{ item.name }}</span
                    >
                    <span class="text-gray-400">{{ item.track_count }}</span>
                  </div>
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-1 max-w-4xl mx-auto w-0 flex flex-col md:px-8 xl:px-0">
      <div class="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 flex">
        <div class="flex-1 flex justify-between px-4 md:px-0">
          <div class="flex-1 flex">
            <form class="w-full flex md:ml-0" action="#" method="GET">
              <label for="search-field" class="sr-only">Search</label>
              <div class="relative w-full text-gray-400 focus-within:text-gray-600">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                  <SearchIcon class="h-5 w-5" aria-hidden="true" />
                </div>
                <input
                  id="search-field"
                  class="
                    block
                    h-full
                    w-full
                    border-transparent
                    py-2
                    pl-8
                    pr-3
                    text-gray-900
                    placeholder-gray-500
                    focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent
                    sm:text-sm
                  "
                  placeholder="Search"
                  type="search"
                  name="search"
                />
              </div>
            </form>
          </div>
          <div class="ml-4 flex items-center md:ml-6">
            <button
              type="button"
              class="
                bg-white
                p-1
                rounded-full
                text-gray-400
                hover:text-gray-500
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              "
            >
              <span class="sr-only">View notifications</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
            </button>

            <!-- Profile dropdown -->
            <Menu as="div" class="ml-3 relative">
              <div>
                <MenuButton
                  class="
                    max-w-xs
                    flex
                    items-center
                    text-sm
                    rounded-full
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                  "
                >
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </MenuButton>
              </div>
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="
                    origin-top-right
                    absolute
                    right-0
                    mt-2
                    w-48
                    rounded-md
                    shadow-lg
                    bg-white
                    ring-1 ring-black ring-opacity-5
                    py-1
                    focus:outline-none
                  "
                >
                  <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                    <a
                      :href="item.href"
                      :class="[active ? 'bg-gray-100' : '', 'block py-2 px-4 text-sm text-gray-700']"
                      >{{ item.name }}</a
                    >
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>

      <main class="flex-1 relative overflow-y-auto focus:outline-none">
        <div class="py-6">
          <div class="px-4 sm:px-6 md:px-0">
            <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
          </div>
          <div class="px-4 sm:px-6 md:px-0">
            <!-- Replace with your content -->
            <div class="py-4">
              <div class="h-96 border-4 border-dashed border-gray-200 rounded-lg" />
            </div>
            <!-- /End replace -->
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Api from '@/api'
import {
  Dialog,
  DialogOverlay,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'

import { BellIcon, HomeIcon, MenuAlt2Icon, XIcon } from '@heroicons/vue/outline'

import { SearchIcon } from '@heroicons/vue/solid'

const navigation = [{ name: '云盘', href: '#', icon: HomeIcon, current: true }]

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

export default {
  components: {
    Dialog,
    DialogOverlay,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
    BellIcon,
    MenuAlt2Icon,
    SearchIcon,
    XIcon,
  },
  setup() {
    const sidebarOpen = ref(false)

    // 我的歌单
    const playlists = ref([])
    const uid = 372063478

    // 获取我的歌单
    const getMyPlayList = () => {
      Api.User.getPlaylist({
        uid: uid,
      }).then(res => {
        playlists.value = res.playlist.map(o => {
          if (o.name == 'Maple_Joyous喜欢的音乐') {
            o.current = true
          } else {
            o.current = false
          }
          return {
            id: o.id,
            name: o.name,
            cover_image_url: o.coverImgUrl,
            track_count: o.trackCount,
            current: o.current,
          }
        })
      })
    }

    getMyPlayList()

    return {
      navigation,
      userNavigation,
      sidebarOpen,
      getMyPlayList,
      playlists,
    }
  },
}
</script>

<style scoped>
.custom-shadow-md {
  box-shadow: 0 12px 12px 4px rgba(0, 0, 0, 0.12), 0 4px 8px 2px rgba(0, 0, 0, 0.06);
}
</style>
