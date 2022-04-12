<template>
  <div class="event-card" v-if="!loading">
    <img
      class="event-img"
      :src="
        event.artist?.image_url || 'https://source.unsplash.com/random/?concert'
      "
      alt="Event image"
    />
    <h5>
      {{ event.artist?.name || artistes.artist?.name }}
    </h5>
    <div class="d-flex justify-between event-card-body">
      <div class="event-details-container">
        <p
          class="d-flex"
          v-for="eventDetail in eventDetails"
          :key="eventDetail.id"
        >
          <span
            class="event-details"
            v-for="venueDateDetail in eventDetail.venueDateDetails"
            :key="venueDateDetail.id"
          >
            <img
              :src="require(`@/assets/img/${venueDateDetail.image}.svg`)"
              alt="Venue"
            />
            <span>{{ venueDateDetail.text }}</span>
          </span>
          <span class="event-details event-date">
            <img
              :src="require(`@/assets/img/${eventDetail.image}.svg`)"
              alt="Date"
            />
            <span
              >Starting from
              <span class="price">₦{{ eventDetail.price }}</span>
            </span>
          </span>
        </p>
        <slot name="left"></slot>
      </div>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, watch } from "vue";
import moment from "moment";

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
  artistes: {
    type: Object,
  },
});

const loading = ref(true);

const eventDetails = ref([
  {
    id: 1,
    image: "ticket",
    price: "N100,000",
    venueDateDetails: [
      {
        id: 1,
        image: "venue",
        text:
          props.event.venue?.city !== "Las Vegas"
            ? props.event.venue?.city
            : props.artistes.venue.city,
      },
      {
        id: 2,
        image: "date",
        text: moment(new Date(props.event?.starts_at)).format("Do MMMM, YYYY"),
      },
    ],
  },
  {
    id: 2,
    image: "ticket",
    price: props.event?.venue.ticket || props.artistes.venue.ticket,
  },
]);

watch(
  () => props.event,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      loading.value = false;
    }
  },
  {
    immediate: true,
  }
);
</script>

<style lang="scss" scoped>
@use "./../assets/styles/var.scss";

h5 {
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: var.$black;
}

.event-card-body {
  align-items: flex-start;
  flex-direction: column;
}

.all-events .event-card-body {
  flex-direction: row;
  .event-details-container p:first-child .event-details:nth-child(2) {
    display: none;
  }
}

.event-card {
  padding: 1rem;
  background: var.$white;
  border-radius: 10px;
  margin-top: 1.5rem;
}
.event-img {
  width: 100%;
  border-radius: 6px;
}

.event-details-container {
  p {
    margin-bottom: 0.5rem;
  }

  p:first-child {
    .event-details:nth-child(2) {
      img {
        top: -1px;
      }
    }
    .event-details:last-child {
      display: none;
    }
  }
}

.event-details {
  margin-right: 2rem;

  img {
    width: 13px;
    position: relative;
    margin-right: 0.5rem;
  }

  span {
    font-size: 14px;
    color: var.$grey;
  }

  .price {
    font-size: 16px;
    color: var.$purple;
  }
}

@media screen and (min-width: 458px) {
  button {
    margin-top: 0;
  }
  .event-card-body {
    flex-direction: row;
    align-items: flex-end;
  }

  .all-events .event-card-body {
    align-items: flex-start;
  }

  .event-details-container {
    p:last-child {
      margin-bottom: 0;
    }
  }
}

@media screen and (min-width: 600px) {
  button {
    font-size: 16px;
  }
}
</style>
