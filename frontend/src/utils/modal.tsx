import { useSelector } from 'react-redux';
import store from '../store';
import { append, destroy, destroyAll } from '../store/modal';

export const useModals = () => useSelector((state: any) => state.modal.modals);
export const createModal = (name: any, data = false) => store.dispatch(append({ name }));
export const destroyModal = () => store.dispatch(destroy());
export const destroyAllModals = () => store.dispatch(destroyAll());