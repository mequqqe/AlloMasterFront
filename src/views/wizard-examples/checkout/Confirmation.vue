<script setup lang="ts">
import type { CheckoutData } from "./types";

const props = defineProps<{
  currentStep?: number;
  checkoutData: CheckoutData;
}>();

defineEmits<{
  (e: "update:currentStep", value: number): void;
  (e: "update:checkout-data", value: CheckoutData): void;
}>();

const selectedDeliveryAddress = computed(() => {
  return props.checkoutData.addresses.filter((address) => {
    return address.value === props.checkoutData.deliveryAddress;
  });
});

const resolveDeliveryMethod = computed(() => {
  if (props.checkoutData.deliverySpeed === "overnight")
    return { method: "Overnight Delivery", desc: "In 1 business day." };
  else if (props.checkoutData.deliverySpeed === "express")
    return {
      method: "Express Delivery",
      desc: "Normally in 3-4 business days",
    };
  else return { method: "Standard Delivery", desc: "Normally in 1 Week" };
});
</script>

<template>
  <section class="text-base">
    <div class="text-center">
      <h5 class="text-h5 mb-3">Thank You! 😇</h5>
      <p>
        Your order <span class="text-primary">#1536548131</span> has been
        placed!
      </p>
      <p class="mb-0">
        We sent an email to
        <span class="text-primary">john.doe@example.com</span> with your order
        confirmation and receipt.
      </p>
      <p>
        If the email hasn't arrived within two minutes, please check your spam
        folder to see if the email was routed there.
      </p>
      <div class="d-flex align-center gap-2 justify-center">
        <VIcon size="20" icon="tabler-clock" />
        <span>Time placed: 25/05/2020 13:35pm</span>
      </div>
    </div>

    <VRow class="border rounded ma-0 mt-6">
      <VCol
        cols="12"
        md="4"
        class="pa-5"
        :class="$vuetify.display.mdAndUp ? 'border-e' : 'border-b'"
      >
        <div class="d-flex align-center gap-2 text-high-emphasis mb-4">
          <VIcon icon="tabler-map-pin" />
          <span class="text-base font-weight-medium"> Shipping </span>
        </div>

        <template v-for="item in selectedDeliveryAddress" :key="item.value">
          <p class="mb-1">
            {{ item.title }}
          </p>
          <p class="mb-4">
            {{ item.desc }}
          </p>

          <span class="font-weight-medium">+{{ item.subtitle }}</span>
        </template>
      </VCol>

      <VCol
        cols="12"
        md="4"
        class="pa-5"
        :class="$vuetify.display.mdAndUp ? 'border-e' : 'border-b'"
      >
        <div class="d-flex align-center gap-2 text-high-emphasis mb-4">
          <VIcon icon="tabler-credit-card" />
          <span class="text-base font-weight-medium"> Billing Address </span>
        </div>

        <template v-for="item in selectedDeliveryAddress" :key="item.value">
          <p class="mb-1">
            {{ item.title }}
          </p>
          <p class="mb-4">
            {{ item.desc }}
          </p>

          <span class="font-weight-medium">+{{ item.subtitle }}</span>
        </template>
      </VCol>

      <VCol cols="12" md="4" class="pa-5">
        <div class="d-flex align-center gap-2 text-high-emphasis mb-4">
          <VIcon icon="tabler-ship" />
          <span class="text-base font-weight-medium"> Shipping Method </span>
        </div>

        <p class="font-weight-medium">Preferred Method:</p>
        <p class="mb-0">
          {{ resolveDeliveryMethod.method }}
        </p>
        <span>( {{ resolveDeliveryMethod.desc }} )</span>
      </VCol>
    </VRow>

    <VRow>
      <VCol cols="12" md="9">
        <!-- 👉 cart items -->
        <div class="border rounded">
          <template
            v-for="(item, index) in props.checkoutData.cartItems"
            :key="item.name"
          >
            <div
              class="d-flex align-start gap-3 pa-5 position-relative flex-column flex-sm-row"
              :class="index ? 'border-t' : ''"
            >
              <div>
                <VImg width="80" :src="item.image" />
              </div>

              <div
                class="d-flex w-100 pt-3"
                :class="
                  $vuetify.display.width <= 700 ? 'flex-column' : 'flex-row'
                "
              >
                <div>
                  <h6 class="text-base font-weight-regular mb-4">
                    {{ item.name }}
                  </h6>
                  <div class="d-flex align-center text-no-wrap gap-2 text-base">
                    <span class="text-disabled">Sold by:</span>
                    <span class="text-primary">{{ item.seller }}</span>
                    <VChip :color="item.inStock ? 'success' : 'error'" label>
                      <span>
                        {{ item.inStock ? "In Stock" : "Out of Stock" }}
                      </span>
                    </VChip>
                  </div>
                </div>

                <VSpacer />

                <div
                  class="d-flex flex-column justify-space-between mt-3"
                  :class="
                    $vuetify.display.width <= 700 ? 'text-start' : 'text-end'
                  "
                >
                  <p class="text-base mb-0">
                    <span class="text-primary">${{ item.price }}</span>
                    <span>/</span>
                    <span class="text-decoration-line-through text-disabled"
                      >${{ item.discountPrice }}</span
                    >
                  </p>
                </div>
              </div>
            </div>
          </template>
        </div>
      </VCol>

      <VCol cols="12" md="3">
        <div class="border rounded">
          <div class="border-b pa-5">
            <h6 class="text-base font-weight-medium mb-3">Price Details</h6>

            <div class="d-flex align-center justify-space-between text-sm mb-3">
              <span class="text-high-emphasis">Order Total</span>
              <span>${{ props.checkoutData.orderAmount }}.00</span>
            </div>

            <div class="d-flex align-center justify-space-between text-sm">
              <span class="text-high-emphasis">Delivery Charges</span>
              <div v-if="props.checkoutData.deliverySpeed === 'free'">
                <span class="text-decoration-line-through text-disabled me-2"
                  >$5.00</span
                >
                <VChip color="success" label> Free </VChip>
              </div>
              <div v-else>
                <span>${{ props.checkoutData.deliveryCharges }}</span>
              </div>
            </div>
          </div>
          <div
            class="d-flex align-center justify-space-between text-high-emphasis font-weight-medium px-5 py-3"
          >
            <span>Total</span>
            <span
              >${{
                props.checkoutData.orderAmount +
                props.checkoutData.deliveryCharges
              }}.00</span
            >
          </div>
        </div>
      </VCol>
    </VRow>
  </section>
</template>
