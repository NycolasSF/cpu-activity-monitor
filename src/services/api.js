const axios = require("axios");

module.exports = {

  async system(url) {
    let data = await axios
      .get(`${url}/system`)
      .then((response) => {
        return {
          type: "response",
          body: response.data,
        };
      })
      .catch((error) => {
        return {
          type: "error",
          body: error,
        };
      });

    return data;
  },

  async quicklook(url) {
    let data = await axios
      .get(`${url}/quicklook`)
      .then((response) => {
        return {
          type: "response",
          body: response.data,
        };
      })
      .catch((error) => {
        return {
          type: "error",
          body: error,
        };
      });
    return data;
  },

  async processList(url) {
    let data = await axios
      .get(`${url}/processlist`)
      .then((response) => {
        return {
          type: "response",
          body: response.data,
        };
      })
      .catch((error) => {
        return {
          type: "error",
          body: error,
        };
      });

    return data;
  },

  async pluginsList(url) {
    let data = await axios
      .get(`${url}/pluginslist`)
      .then((response) => {
        return {
          type: "response",
          body: response.data,
        };
      })
      .catch((error) => {
        return {
          type: "error",
          body: error,
        };
      });

    return data;
  },

  async sensors(url) {
    let data = await axios
      .get(`${url}/sensors`)
      .then((response) => {
        return {
          type: "response",
          body: response.data,
        };
      })
      .catch((error) => {
        return {
          type: "error",
          body: error,
        };
      });

    return data;
  },

  async perCpu(url) {
    let data = await axios
      .get(`${url}/percpu`)
      .then((response) => {
        return {
          type: "response",
          body: response.data,
        };
      })
      .catch((error) => {
        return {
          type: "error",
          body: error,
        };
      });

    return data;
  },

  async upTime(url) {
    let data = await axios
      .get(`${url}/uptime`)
      .then((response) => {
        return {
          type: "response",
          body: response.data,
        };
      })
      .catch((error) => {
        return {
          type: "error",
          body: error,
        };
      });

    return data;
  },

  async now(url) {
    let data = await axios
      .get(`${url}/now`)
      .then((response) => {
        return {
          type: "response",
          body: response.data,
        };
      })
      .catch((error) => {
        return {
          type: "error",
          body: error,
        };
      });

    return data;
  },
};
      