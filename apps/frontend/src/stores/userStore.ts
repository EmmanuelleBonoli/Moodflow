import {create} from 'zustand'

interface UserState {
    userName: string
    setUserName: (name: string) => void
}

export const useUserStore = create<UserState>((set, get) => ({
    userName: "",

    setUserName: (userName: string) => set({userName}),
}))