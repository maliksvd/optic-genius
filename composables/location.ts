/**
 * @name useLocation
 * @description Get location data from API
 * @param {string} slug
 * @param {string} city
 * @returns {object} Location data
 */
export const useLocation = () => {
  const route = useRoute();

  const slug = ref(route.params.slug);
  const city = ref(route.params.city);

  const { data, pending, error, refresh } = useFetch(
    "/api/locations/" + city.value + "/" + slug.value.join("/"),
    {}
  );

  const getLocation = ref(data.value);

  return {
    getLocation,
    slug,
    city,
    pending,
    error,
    refresh,
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
