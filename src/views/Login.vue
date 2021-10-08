<template>
  <div class="bg-white flex my-12 mx-auto w-10/12 rounded-xl shadow-lg">
    <div
      class="lg:block relative flex-1 w-6/12 rounded-l-xl"
      style="
        background: url('https://cdn.pixabay.com/photo/2021/01/29/08/10/musician-5960112_960_720.jpg');
        background-size: 100% 100%;
      "
    ></div>
    <div class="flex-1 flex flex-col justify-center">
      <div class="mx-auto w-6/12 max-w-sm">
        <div>
          <img class="h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">登陆网易云歌单助手</h2>
        </div>

        <div class="mt-8">
          <div>
            <div class="mt-6 relative">
              <div class="absolute inset-0 flex items-center" aria-hidden="true">
                <div class="w-full border-t border-gray-300" />
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500"> 使用手机号和密码登录 </span>
              </div>
            </div>
          </div>

          <div class="mt-6">
            <div class="space-y-6">
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700"> 手机号 </label>
                <div class="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required=""
                    class="
                      appearance-none
                      block
                      w-full
                      px-3
                      py-2
                      border border-gray-300
                      rounded-md
                      shadow-sm
                      placeholder-gray-400
                      focus:outline-none focus:ring-green-500 focus:border-green-500
                      sm:text-sm
                    "
                  />
                </div>
              </div>

              <div class="space-y-1">
                <label for="password" class="block text-sm font-medium text-gray-700"> 密码 </label>
                <div class="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    required=""
                    class="
                      appearance-none
                      block
                      w-full
                      px-3
                      py-2
                      border border-gray-300
                      rounded-md
                      shadow-sm
                      placeholder-gray-400
                      focus:outline-none focus:ring-green-500 focus:border-green-500
                      sm:text-sm
                    "
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  class="
                    w-full
                    flex
                    justify-center
                    py-2
                    px-4
                    border border-transparent
                    rounded-md
                    shadow-sm
                    text-sm
                    font-medium
                    text-white
                    bg-green-500
                    hover:bg-green-600
                    focus:outline-none
                  "
                >
                  登录
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
