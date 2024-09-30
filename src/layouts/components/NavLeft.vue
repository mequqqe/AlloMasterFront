<template>
  <div class="nav">
    <ul class="nav-list">
      <li>Main</li>
      <li>Profile</li>
      <li>Contacts</li>
      <li>Settings</li>
    </ul>
  </div>
</template>

<style scoped>
.nav {
  background-color: #f0f0f0;
  padding: 10px;
}

.nav-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.nav-list li {
  display: block !important; /* Принудительно делаем вертикальным */
  margin-bottom: 10px !important; /* Отступы между элементами списка */
  font-size: 18px !important;
  color: #333 !important;
  cursor: pointer !important;
}

.nav-list li:hover {
  color: #007bff !important; /* Цвет при наведении */
}
</style>
