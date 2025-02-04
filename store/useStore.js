import { create } from "zustand";
import { data } from "./data"; 

export const useStore = create((set) => ({
  selectedImage: require("../assets/super-mario-party-jamboree-website-board-1.jpg"), 
  selectedIcon: require("../assets/super-mario-party-jamboree-board-icon-1.png"),
  getRandomBoard: () => {
    const randomBoard = data[Math.floor(Math.random() * data.length)];
    set({ 
      selectedImage: randomBoard.boardView,
      selectedIcon: randomBoard.boardIcon
    });
  },
}));