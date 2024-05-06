<template>
  <div data-id="ContentLayout" :class="`lg:pl-6 lg:pt-6`">
    <header>
      <slot name="header" />
    </header>
    <main :class="`pt-12`">
      <slot />
    </main>
  </div>
</template>

