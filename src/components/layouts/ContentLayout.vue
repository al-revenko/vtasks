<template>
  <div data-id="ContentLayout" :class="`h-full lg:pl-6 lg:pt-6 pb-8`">
    <header>
      <slot name="header" />
    </header>
    <main :class="`pt-12`">
      <slot />
    </main>
  </div>
</template>

