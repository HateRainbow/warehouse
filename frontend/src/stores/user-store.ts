import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    lastName: "",
    firsName: "",
    email: "",
    twoFactorEnabled: false,
  }),
  actions: {
    setUser(user: {
      firstName: string;
      lastName: string;
      email: string;
      twoFactorEnabled?: boolean;
    }) {
      this.firsName = user.firstName;
      this.lastName = user.lastName;
      this.email = user.email;
      this.twoFactorEnabled = this.twoFactorEnabled ?? false;
    },
  },
  getters: {
    fullName: (state) => `${state.firsName} ${state.lastName}`,
  },
});
