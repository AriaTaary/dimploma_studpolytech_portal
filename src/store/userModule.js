import api from '../network/api'
import moment from 'moment'

const helper = {
  getUserObjectFromResponse (response) {
    moment.locale('ru')
    const data = response.data.data

    return {
      id: data.id,
      username: data.username,
      email: data.email,
      phone: data.phone,
      last_name: data.last_name,
      first_name: data.first_name,
      middle_name: data.middle_name,
      gender: data.gender,
      date_birth: data.date_birth,
      prepared_date_birth: moment(data.date_birth).format('LL'),
      created_at: data.created_at,
      updated_at: data.updated_at
    }
  }
}

export default {
  state: {
    user: {
      id: '',
      username: '',
      email: '',
      phone: '',
      last_name: '',
      first_name: '',
      middle_name: '',
      gender: '',
      date_birth: '',
      prepared_date_birth: '',
      created_at: '',
      updated_at: ''
    },
    roles: JSON.parse(localStorage.getItem('roles')) || null,
    permissions: JSON.parse(localStorage.getItem('permissions')) || null,
  },
  getters: {
    getUser (state) {
      return state.user
    },
    getRoles (state) {
      return state.roles
    }
  },
  actions: {
    async getUserData (state) {
      if (!state.getters.getAuthToken) {
        return null
      }

      const response = await api.getUserData(state.getters.getAuthToken, state.getters.getUser.updated_at)
      if (response.status === 200) {
        const user = helper.getUserObjectFromResponse(response)
        state.commit('setUser', user)
      }
    },
    async updateUserData (state, user) {
      if (!state.getters.getAuthToken) {
        state.commit('setUser', {})
        return null
      }

      const response = await api.updateUserData(state.getters.getAuthToken, user)
      if (response.status === 200) {
        const user = helper.getUserObjectFromResponse(response)
        state.commit('setUser', user)
      }
    },
    async getUserPermissions({ rootGetters, commit}) {
      const response = await api.getUserRoles(rootGetters.getAuthToken);
      if (response.status === 200) {
        let roles = [];
        let permissions = [];

        response.data.data.roles.forEach(function (role) {
          roles.push(role.name);
        });
        response.data.data.permissions.forEach(function (permission) {
          permissions.push(permission.name);
        });

        commit("setRoles", roles);
        commit("setPermissions", permissions);
      }
    },
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    setRoles (state, roles) {
      state.roles = roles;
      localStorage.setItem("roles", JSON.stringify(roles))
    },
    setPermissions(state, permissions) {
      state.permissions = permissions;
      localStorage.setItem("permissions", JSON.stringify(permissions))
    }
  }
}
