import { atom, useAtom } from 'jotai';

export const listTableAtom = atom([]);

export function useListTableAtom() {
    return useAtom(listTableAtom);
}