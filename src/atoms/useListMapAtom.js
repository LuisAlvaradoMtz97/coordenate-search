import { atom, useAtom } from 'jotai';

export const listMapAtom = atom([]);

export function useListMapAtom() {
    return useAtom(listMapAtom);
}