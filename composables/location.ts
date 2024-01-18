/**
 * @name useLocation
 * @description Get location data from API
 * @param {string} slug
 * @param {string} city
 * @returns {object} Location data
 */
export const useLocation = () => {
  const nuxtApp = useNuxtApp();
  const route = useRoute();

  const slug = ref(route.params.slug);
  const city = ref(route.params.city);

  const apiUrl = ref('/api/locations/' + city.value + '/' + (Array.isArray(slug.value) ? slug.value.join('/') : slug.value));

  const { pending, data:location, error } = useFetch(apiUrl.value, {
    key: 'location-' + slug.value,
    lazy: true,
    server: false,
  })

  const getLocation = ref(location.value);

  return {
    pending,
    slug,
    city,
    getLocation,
    error,
  };
};

/**
 * @name isLocationOpen
 * @description Return if location is open or not
 * @returns {boolean} Location is open
 * @returns {string} Current time
 * @returns {string} Current day
 */
export const isLocationOpen = () => {
  const getLocation = useLocation();
  const getBusinesseHours = ref(getLocation.businesses_hours);

  const now = new Date();
  const day = now.toLocaleString("en-US", { weekday: "long" }); // Get current day
  const currentTime = now.getHours() + ":" + now.getMinutes().toString().padStart(2, "0");
  const todayHours = getBusinesseHours[day];

  if (!todayHours) return false; // Closed if day not in businessHours

  const isOpen = currentTime >= todayHours.open && currentTime <= todayHours.close; 
  
  return {
    isOpen,
    todayHours,
    currentTime,
    day,
  }

}
