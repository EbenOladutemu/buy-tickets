<template>
  <img class="loading" src="@/assets/img/loading.svg" v-if="loading" />
  <div v-else>
    <HeaderSection />
    <SearchBar v-model="searchText" />
    <h6 class="mb-0 mt-4">Featured Events</h6>
    <div class="featured">
      <EventsComponent
        v-for="(featuredEvent, i) in featuredEvents"
        :key="featuredEvent.id"
        :event="featuredEvent"
        :artistes="artistes[i]"
      >
        <template v-slot:right>
          <ButtonComponent :event="featuredEvent"></ButtonComponent>
        </template>
      </EventsComponent>
    </div>
    <h6 class="mb-0 mt-4">All Events</h6>
    <div class="row">
      <div
        class="col col-lg-3"
        v-for="(allEvent, i) in computedEvents"
        :key="allEvent.id"
      >
        <EventsComponent
          class="all-events"
          :event="allEvent"
          :artistes="artistes[i]"
        >
          <template v-slot:right>
            <small>{{
              moment(new Date(allEvent?.starts_at)).format("D MMM")
            }}</small>
          </template>
          <template v-slot:left>
            <ButtonComponent :event="allEvent"></ButtonComponent>
          </template>
        </EventsComponent>
      </div>
    </div>
    <div class="empty" v-if="computedEvents.length === 0">
      <span>No Event Found</span>
    </div>
  </div>
</template>

<script setup>
import HeaderSection from "./components/HeaderSection.vue";
import SearchBar from "./components/SearchBar.vue";
import EventsComponent from "./components/EventsComponent.vue";
import ButtonComponent from "./components/ButtonComponent.vue";
import { onMounted, ref } from "@vue/runtime-core";
import data from "./data.json";
import moment from "moment";
import { computed } from "@vue/reactivity";

const loading = ref(true);

const searchText = ref("");

const artistes = ref(data.artistes);

const allEvents = ref([]);

const featuredEvents = ref([]);

const addFeaturedEvents = () =>
  featuredEvents.value.push(
    artistes.value[Math.floor(Math.random() * artistes.value.length)]
  );
let i = 0;
while (i < 2) {
  addFeaturedEvents();
  i++;
}

const computedEvents = computed(() => {
  return !loading.value
    ? allEvents.value
        .concat(
          artistes.value.map((artist) =>
            Object.assign(artist, { url: allEvents.value[0]?.url })
          )
        )
        .filter(
          (event) =>
            event.artist?.name.match(new RegExp(searchText.value.trim(), "i"))
          // || event.venue?.city.match(new RegExp(searchText.value.trim(), "i"))
        )
    : [];
});

onMounted(() => {
  async function fetchData() {
    await fetch(
      `https://rest.bandsintown.com/artists/john%20legend/events?app_id=0ab49580-c84f-44d4-875f-d83760ea2cfe`,
      {
        method: "GET",
      }
    )
      .then((res) => {
        console.log(res);
        if (res.ok) {
          loading.value = false;
          res.json().then((data) => {
            allEvents.value = data;
          });
        }
      })
      // eslint-disable-next-line no-unused-vars
      .catch(() => {
        // eslint-disable-next-line no-undef
        swal({
          title: "Oops!",
          text: "There was an error fetching data. Please refresh",
          icon: "error",
          buttons: "Reload",
        }).then((reload) => {
          if (reload) {
            location.reload();
          }
        });
      });
  }

  fetchData();
});
</script>

<style lang="scss">
@use "./assets/styles/var.scss";

small {
  font-size: 12px;
  background: rgba(255, 106, 44, 0.08);
  color: #ff6a2c;
  padding: 0.5rem;
  border-radius: 6px;

  &::before {
    content: "";
    position: absolute;
    background-color: var.$white;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    margin-top: -0.85rem;
    margin-left: 0.575rem;
  }

  &::after {
    content: "";
    position: absolute;
    background-color: var.$white;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    margin-top: 1.2rem;
    margin-left: -0.8rem;
  }
}

.featured {
  display: flex;
  overflow: scroll;

  .event-card {
    margin-right: 1.5rem;
    width: 50%;

    &:last-child {
      margin-right: 0;
    }
  }
}

.loading {
  display: flex;
  height: 100vh;
  margin: auto;
}

.empty {
  background: #fff;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 10px;
  text-align: center;
}

@media screen and (min-width: 1384px) {
  small {
    &::before {
      margin-left: 0.675rem;
    }

    &::after {
      margin-left: -1.5rem;
    }
  }
}
</style>
