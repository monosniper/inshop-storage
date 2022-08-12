import store from "../store/store";

const useUser = () => {
    return store.user.data;
}

export default useUser