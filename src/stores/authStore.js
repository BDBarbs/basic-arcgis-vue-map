import { defineStore } from 'pinia';
import { ref } from "vue";

export const useAuthStore
    = defineStore('useAuthStore', () => {

        const userAuthenticated = ref(false);
        const username = ref(null);
        const userToken = ref(null);

        let avgOccupancy = ref("43");
        let maxOccupancy = ref("61");
        let minOccupancy = ref("18");
        let avgLengthOfStay = ref("19.5");
        let maxLengthOfStay = ref("80");
        let medianLengthOfStay = ref("11.5");

        return {
            avgOccupancy,
            maxOccupancy,
            minOccupancy,
            avgLengthOfStay,
            medianLengthOfStay,
            maxLengthOfStay,
            userAuthenticated,
            username,
            userToken
        }
    })