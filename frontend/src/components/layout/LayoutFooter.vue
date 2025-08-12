<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import LayoutContainer from './LayoutContainer.vue';

const year = new Date().toLocaleString('ru-RU', {
  year: 'numeric'
})

const city = ref('');
const temp = ref(0);
const precStrength = ref(0);

const fetchWeatherData = (lat: number, long: number, headers: Record<string, string>) => {
  fetch(`https://api.weather.yandex.ru/v2/forecast?lat=${lat}&lon=${long}`, { headers })
    .then(response => response.json())
    .then(json => {
      city.value = json.geo_object.locality.name;
      temp.value = json.fact.temp;
      precStrength.value = json.fact.prec_strength
    });
}

onBeforeMount(() => {
  const headers = {
    'X-Yandex-Weather-Key': import.meta.env.VITE_APP_YANDEX_WEATHER_API
  };

  navigator.geolocation.getCurrentPosition((position) => {
    fetchWeatherData(position.coords.latitude, position.coords.longitude, headers)
  }, () => {
    fetchWeatherData(55.7569, 37.6151, headers)
  });
})
</script>

<template>
  <LayoutContainer>
    <div class="flex items-center justify-between py-8">
      <div>
        <p>Блог веб-разработчика</p>
        <p>
          <a href="mailto:web@developer.ru">web@developer.ru</a>
        </p>
      </div>
      <div class="text-right">
        <p>
          {{ city }}
          <time :datetime="year">{{ year }}</time>
        </p>
        <p>Погода: сила осадков {{ precStrength }}, {{ temp }} C</p>
      </div>
    </div>
  </LayoutContainer>
</template>
