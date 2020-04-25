const axios = require("axios");

module.exports = {
  /* 
    
   FIND FUNCTIONS 
    SYSTEM_INFO = { system, quicklook{'cpu-mem'} }  
    TIMERS = { uptime, now{'date'} }

  */

  //  * --- SYSTEM_INFO --- \\
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

  // * --- TIMERS --- \\
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
    //get data
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
      