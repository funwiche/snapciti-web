<template>
  <section class="xl py-6">
    <h1>{{ tn("index") }}</h1>
    <div class="flex gap-2">
      <button
        v-for="theme in themes"
        :key="theme.value"
        @click="setTheme(theme.value)"
        :class="[
          'flex items-center space-x-1 px-3 py-1.5 text-[10px] uppercase font-bold rounded-full',
          colorMode === theme.value ? 'bg-info text-white' : 'hover',
        ]"
      >
        {{ theme.label }}
      </button>
    </div>

    <hr class="my-3" />
    <div v-if="user" class="text-xs">
      <pre>{{ user }}</pre>
      <img
        v-if="user.avatar"
        :src="$asset(user.avatar)"
        :alt="user.name"
        class="size-24 object-cover object-center rounded-full"
      />

      <span v-else class="size-24 bg-secondary rounded-full" />
      <div class="py-3">
        <input type="file" accept="image/*" @change="upload" />
      </div>
      <hr class="my-4" />
      <div v-if="errorMessage" class="pb-3 text-error">{{ errorMessage }}</div>
      <button @click="SIGN_OUT" class="btn-primary bg-error uppercase">
        Sign Out
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
const title = "address";
useSeoData({ title, desc: "address-settings-desc" });

const colorMode = useCookie("color_mode");
const time = ref("09:00");
const { user } = useAppState();
const errorCode = ref<string | null>(null);
const { $auth } = useNuxtApp();
const errorMessage = ref<string>("");
const result: any = ref(null);
const image = ref<string>("");
const times = $f
  .array(24)
  .flatMap((hh) => {
    return $f
      .array(60)
      .map((mm) =>
        mm % 5 == 0 || (hh == 23 && mm == 59)
          ? `${$f.pad(hh, 2)}:${$f.pad(mm, 2)}`
          : null,
      );
  })
  .filter((el) => el);
const themes = [
  { value: "system", label: "Device", icon: "💻" },
  { value: "light", label: "Light", icon: "☀️" },
  { value: "dark", label: "Dark", icon: "🌙" },
];
const data = reactive({
  name: "Fini Hotel",
  slug: "fini.hotel",
  description:
    "Offering an outdoor pool and a restaurant, Fini Hotel Bobende is located in Limbe. Free Wi-Fi access is available.\n\nRooms here will provide you with a TV, air conditioning and cable channels. Private bathrooms also come with a shower. Some rooms have a sea view and a garden view.\n\nAt Fini Hotel Bobende you will find a 24-hour front desk. Other facilities offered include a nightclub/dj and a tour desk.\n\nThe property offers free parking.",
  website: "https://www.booking.com/hotel/cm/fini-bobende.html",
  categories: ["hotels_lodging,hotel"],
  images: [
    "https://cf.bstatic.com/xdata/images/hotel/max1080/486597090.jpg?k=405cb0475a374e7db659220eac3edb3d4d83aa7d94b1ae75fe3527697b14ece5&o=&hp=1",
    "https://cf.bstatic.com/xdata/images/hotel/max1080/256754311.jpg?k=48e89d6a1dce969ac56e18ff3e4d56db95341351372e55f49ba76da143cfb2ea&o=&hp=1",
    "https://cf.bstatic.com/xdata/images/hotel/max1080/486597034.jpg?k=e710f0c5d09c83e48747ff281da2767c35c1b87306bc6d40d53bd304d282c579&o=&hp=1",
    "https://cf.bstatic.com/xdata/images/hotel/max1080/486597078.jpg?k=ed3e4da85b3bb65bafb8dc585aa697ca152495479f2cccac3f48a77ee9295cba&o=&hp=1",
    "https://cf.bstatic.com/xdata/images/hotel/max1080/256754297.jpg?k=4cb1363a0fbf2bd396d8903b46361f77bbe8f591bde3086af718b2ca3f8f18be&o=&hp=1",
    "https://cf.bstatic.com/xdata/images/hotel/max1080/256754300.jpg?k=33a140564a9d01875ac99411ed4d7253e554bee4ce1f7562d5abd67e26fa475f&o=&hp=1",
    "https://cf.bstatic.com/xdata/images/hotel/max1080/256754305.jpg?k=dce5e7853bb0b86d67e7e056d8e5f38c4d2ed62299bb45f682933a2fd03b6f2f&o=&hp=1",
    "https://cf.bstatic.com/xdata/images/hotel/max1080/256755346.jpg?k=975af7c3c0c16ab57df24ed59044ace5ab5226b2257134cf91d0e2d5b4affaaa&o=&hp=1",
  ],
  languages: ["en-GB", "fr-FR"],
  amenities: [
    "2 swimming pools",
    "Airport shuttle",
    "Free Wifi",
    "Non-smoking rooms",
    "Spa",
    "Restaurant",
    "Room service",
    "Fitness center",
    "Bar",
    "Wonderful Breakfast",
    "Outdoor furniture",
    "Sun deck",
    "Terrace",
    "Garden",
    "Aerobics",
    "Live sports events (broadcast)",
    "Tour or class about local culture",
    "Themed dinners",
    "Beach",
    "Game room",
    "Fruit",
    "Wine/Champagne",
    "Kids' meals",
    "Snack bar",
    "Breakfast in the room",
    "Accessible parking",
    "Invoice provided",
    "Concierge",
    "Baggage storage",
    "Tour desk",
    "24-hour front desk",
    "Daily housekeeping",
    "Ironing service",
    "Laundry",
    "Fax/Photocopying",
    "Meeting/Banquet facilities",
    "Fire extinguishers",
    "CCTV outside property",
    "CCTV in common areas",
    "Smoke alarms",
    "Security alarm",
    "Key card access",
    "24-hour security",
    "Safe",
    "Shuttle service",
    "Shared lounge/TV area",
    "Designated smoking area",
    "Air conditioning",
    "Smoke-free property",
    "Car rental",
    "Family rooms",
    "Hair/Beauty salon",
    "Opening times",
    "Open all year",
    "All ages welcome",
    "Plunge pool",
    "Shallow end",
    "Swimming pool toys",
    "Beach chairs/Loungers",
    "Adults only",
    "Kids' pool",
    "Personal trainer",
    "Fitness classes",
    "Fitness",
    "Massage chair",
    "Spa/Wellness packages",
    "Foot bath",
    "Spa lounge/Relaxation area",
    "Steam room",
    "Spa facilities",
    "Body scrub",
    "Body treatments",
    "Hairstyling",
    "Hair coloring",
    "Haircut",
    "Pedicure",
    "Manicure",
    "Hair treatments",
    "Makeup services",
    "Facial treatments",
    "Beauty services",
    "Hot tub/Jacuzzi",
    "Massage",
    "Sauna",
    "English",
    "French",
  ],
  hours: {
    mon: "24-hours",
    tue: "24-hours",
    wed: "24-hours",
    thu: "24-hours",
    fri: "24-hours",
    sat: "24-hours",
    sun: "24-hours",
  },
  location: { type: "Point", coordinates: [4.01377262, 9.14531258] },
  address: {
    country: "cm",
    state: "Southwest",
    city: "Limbe",
    currency: "XAF",
    timezone: "Africa/Douala",
    directions: true,
  },
});
async function SIGN_OUT() {
  try {
    await $auth.signOut();
    await $fetch("/api/auth/logout", { method: "POST" });
    location.href = "/";
  } catch (error: any) {
    errorCode.value = error.code;
  }
}
async function upload(ev: any) {
  // let files = ev.target.files;
  // if (!files.length) return;
  // const body = new FormData();
  // for (const file of files) body.append("image", file);
  // body.append("body", JSON.stringify(data));
  try {
    const res = await $fetch("/api/businesses", { method: "POST", body: data });
    result.value = res;
  } catch (error) {
    errorMessage.value = handleError(error);
  }
}
async function avatar(ev: any) {
  let [file] = ev.target.files;
  if (!file) return;
  image.value = await $f.imageEditor.dataURL(file);
  const body = new FormData();
  body.append("avatar", file);
  try {
    const res = await $fetch("/api/users/avatar", { method: "POST", body });
    if (res) user.value = res.user;
  } catch (error) {
    errorMessage.value = handleError(error);
  }
}
function setTheme(theme: string) {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  let themeColorMeta = document.querySelector("meta[name='theme-color']");
  if (!themeColorMeta) {
    themeColorMeta = document.createElement("meta");
    themeColorMeta.setAttribute("name", "theme-color");
    document.head.appendChild(themeColorMeta);
  }
  colorMode.value = theme;
  if ((theme == "system" && isDark) || theme == "dark") {
    themeColorMeta.setAttribute("content", "#000000");
    document.documentElement.classList.add("dark");
    document.documentElement.style.setProperty("color-scheme", "dark");
  } else {
    themeColorMeta.setAttribute("content", "#ffffff");
    document.documentElement.classList.remove("dark");
    document.documentElement.style.setProperty("color-scheme", "light");
  }
}
</script>

<style scoped></style>
