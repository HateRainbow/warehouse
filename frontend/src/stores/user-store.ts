import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    firstName: "",
    lastName: "",
    email: "",
    twoFactorEnabled: false,
    isAdmin: false,
  }),
  actions: {
    setUser(user: {
      firstName: string;
      lastName: string;
      email: string;
      twoFactorEnabled?: boolean;
      isAdmin?: boolean;
    }) {
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.email = user.email;
      this.twoFactorEnabled = user.twoFactorEnabled ?? false;
      this.isAdmin = user.isAdmin ?? false;
    },
    setAdmin(isAdmin: boolean) {
      this.isAdmin = isAdmin;
    },
  },
  getters: {
    fullName: (state) => `${state.firstName} ${state.lastName}`,
  },
});
