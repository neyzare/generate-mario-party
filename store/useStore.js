import { create } from "zustand";
import { data } from "./data"; 

export const useStore = create((set, get) => ({
  logo: require("../assets/Super_Mario_Party_Jamboree_Logo.png"),
  selectedImage: require("../assets/super-mario-party-jamboree-website-board-1.jpg"), 
  selectedIcon: require("../assets/super-mario-party-jamboree-board-icon-1.png"),
  previousBoardIndex: null,

  getRandomBoard: () => {
    let newIndex;

    do {
      newIndex = Math.floor(Math.random() * data.length);
    } while (newIndex === get().previousBoardIndex);

    set({ 
      selectedImage: data[newIndex].boardView,
      selectedIcon: data[newIndex].boardIcon,
      previousBoardIndex: newIndex,
    });
  },
}));