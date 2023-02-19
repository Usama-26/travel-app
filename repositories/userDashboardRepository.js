import Repository, { baseUrl, getError } from "./genericRepository";

const routes = {
  updateProfilePic: "/users/update_profile_pic/",
  getUser: "/users/",
  updateProfile: "/users/update_profile/",
  getFreelancer: "/users/freelancers/",
  postTrip: "/posts/create_post",
  updateTrip: "/posts/update_post/",
  deletePost: "/posts/",
  latestPosts: "/posts/query_posts?limit=5",
};

class UserDashboardRepository {
  async updateUserProfilePic(payload, userId) {
    try {
      const request = await Repository.post(
        `${baseUrl}${routes.updateProfilePic}${userId}`,
        payload
      );
      const { data } = request;
      return { result: data };
    } catch (error) {
      throw getError(error);
    }
  }
  async updateUserProfile(payload, userId) {
    try {
      const request = await Repository.post(
        `${baseUrl}${routes.updateProfile}${userId}`,
        payload
      );
      const { data } = request;
      return { result: data };
    } catch (error) {
      throw getError(error);
    }
  }
  async getUser(userId) {
    try {
      const request = await Repository.get(
        `${baseUrl}${routes.getUser}${userId}`
      );
      const { data } = request;
      return { result: data };
    } catch (error) {
      throw getError(error);
    }
  }
  async getFreelancers(query) {
    try {
      const request = await Repository.get(
        `${baseUrl}${routes.getFreelancer}${query}`
      );
      const { data } = request;
      return { result: data };
    } catch (error) {
      throw getError(error);
    }
  }
  async postTrip(payload) {
    try {
      const request = await Repository.post(
        `${baseUrl}${routes.postTrip}`,
        payload
      );
      const { data } = request;
      return { result: data };
    } catch (error) {
      throw getError(error);
    }
  }
  async updateTrip(postId, payload) {
    try {
      const request = await Repository.put(
        `${baseUrl}${routes.updateTrip}${postId}`,
        payload
      );
      const { data } = request;
      return { result: data };
    } catch (error) {
      throw getError(error);
    }
  }
  async deleteTrip(payload) {
    try {
      const request = await Repository.delete(
        `${baseUrl}${routes.deletePost}${payload}`
      );
      const { data } = request;
      return { result: data };
    } catch (error) {
      throw getError(error);
    }
  }
  async latestPosts() {
    try {
      const request = await Repository.get(`${baseUrl}${routes.latestPosts}`);
      const { data } = request;
      return { result: data };
    } catch (error) {
      throw getError(error);
    }
  }
}

export default new UserDashboardRepository();
