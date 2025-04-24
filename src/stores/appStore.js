import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('appStore', () => {
  // Default data
  // const count = ref(0)
  // const doubleCount = computed(() => count.value * 2)
  // function increment() {
  //   count.value++
  // }

  // GeoJSON Data
  const axiosGeoJsonIn = ref({
    type: 'FeatureCollection',
    features: []
  })
  const axiosGeoJsonOut = ref({
    type: 'FeatureCollection',
    features: []
  })
  const pointsTableData = ref([])
  const selectedPointsTableData = ref([])

  const pointsCurrent = ref(null)
  const inPointsFlg = ref(false)
  const outPointsFlg = ref(false)

  const geoJsonFlg = ref(false)


  return {
    axiosGeoJsonIn,
    axiosGeoJsonOut,
    pointsTableData,
    selectedPointsTableData,
    pointsCurrent,
    inPointsFlg,
    outPointsFlg,
    geoJsonFlg,
  }
})
