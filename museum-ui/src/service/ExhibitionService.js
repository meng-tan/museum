import { config } from "../config";

import axiosInstance from "./axiosInstance";
import urlConfig from "./urlConfig";
export default class ExhibitionService {
  static instance = null;
  static getInstance() {
    if (ExhibitionService.instance === null) {
      ExhibitionService.instance = new ExhibitionService();
    }

    return this.instance;
  }

  listExhibitions = () => {
    return axiosInstance.get(urlConfig.listAll);
  };

  findByDate = (date, page) => {
    return fetch(
      config.api + "/exhibitions/date/" + date + "/page/" + page
    ).then((res) => res.json());
  };

  findByKeywords = (keywords, page) => {
    return fetch(
      config.api + "/exhibitions/search?keywords=" + keywords + "&page=" + page
    ).then((res) => res.json());
  };

  findById = (id) => {
    return fetch(config.api + "/exhibitions/id/" + id).then((res) =>
      res.json()
    );
  };
}
