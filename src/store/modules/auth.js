import axios from 'axios';

const auth = {
  namespaced: true,
  state: {
    token: localStorage.getItem('user-token') || '',
    status: '',
  },
  getters: {
    isAuthenticated: state => state.token.length > 0, // !!state.tokenを変更
    authStatus: state => state.status
  },
  mutations: {
    AUTH_REQUEST: state => {
      state.status = 'loading';
    },
    AUTH_SUCCESS: (state, token) => {
      state.status = 'success';
      state.token = token;
    },
    AUTH_ERROR: state => {
      state.status = 'error';
    },
    AUTH_LOGOUT: state => {
      state.token = '';
    }
  },
  actions: {
    AUTH_REQUEST: ({ commit, dispatch }, user) => {
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST');
        axios({ url: 'auth', data: user, method: 'POST'})
          .then(res => {
            const token = res.data.token;
            localStorage.setItem('user-token', token);
            commit('AUTH_SUCCESS');

            dispatch('USER_REQUEST');
            resolve(res);
          })
          .catch(err => {
            commit('AUTH_ERROR');
            localStorage.removeItem('user-token');
            reject(err);
          });
      });
    },
    AUTH_LOGOUT: ({ commit }) => {
      return new Promise((resolve) => {
        commit('AUTH_LOGOUT');
        localStorage.removeItem('user-token');
        resolve();
      })
    }
  },
};

export default auth;