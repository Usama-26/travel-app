import Repository, { baseUrl, getError } from "./genericRepository";

const routes = {
  userRegister: "/auth/register",
  login: "/auth/login",
  forgetPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
  googleAuth: "/auth/google-auth",
  chnagePassword: "/auth/change-password",
};

class AuthenticationRepository {
  async userRegister(payload) {
    try {
      const request = await Repository.post(
        `${baseUrl}${routes.userRegister}`,
        payload
      );
      const { data } = request;
      console.log(data);
      return {
        message: data.message,
        description: data.description,
      };
    } catch (error) {
      throw getError(error);
    }
  }

  async login(payload) {
    try {
      const postObject = { ...payload };
      const request = await Repository.post(
        `${baseUrl}${routes.login}`,
        postObject
      );
      const { data } = request;
      return {
        tokens: data.tokens,
        user: data.user,
      };
    } catch (error) {
      throw getError(error);
    }
  }

  async forgetPassword(payload) {
    try {
      await Repository.post(`${baseUrl}${routes.forgetPassword}`, payload);
    } catch (error) {
      throw getError(error);
    }
  }
  async resetPassword(payload, token) {
    try {
      await Repository.post(`${baseUrl}${routes.resetPassword}`, payload);
    } catch (error) {
      throw getError(error);
    }
  }

  async googleAuth(payload) {
    try {
      await Repository.get(
        `${baseUrl}${routes.googleAuth}?userType=${payload.userType}`
      );
    } catch (error) {
      console.log(error);
      throw getError(error);
    }
  }
  async changePassword(payload) {
    try {
      await Repository.post(`${baseUrl}${routes.chnagePassword}`, payload);
    } catch (error) {
      console.log(error);
      throw getError(error);
    }
  }
}

export default new AuthenticationRepository();
