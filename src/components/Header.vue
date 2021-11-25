<template>
  <header class="header">
    <ul class="header__menu">
      <li v-for="link in menu.links" :key="link.href" class="header__menu-item">
        <a :href="link.href">{{ link.name }}</a>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      menu: {
        links: [
          {
            name: "Главная",
            href: "/",
          },
          {
            name: "Игрок vs игрок",
            href: "/game",
          },
          {
            name: "Игрок vs бот",
            href: "/game-bot",
          },
        ],
      },
    };
  },
};
</script>

<style scoped></style>
