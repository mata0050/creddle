import create from "zustand";

type Store = {
  bears: number;
  education: [];
  employment: [];
  project: [];
  skill: [];
  user: [];
};
const useStore = create<Store>((set) => ({
  bears: 0,
  education: [],
  employment: [],
  project: [],
  skill: [],
  user: [],
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));
