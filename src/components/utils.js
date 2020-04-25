module.exports = {
  setLineData(mockData, line) {
    for (var i = 0; i < mockData.length; i++) {
      var last = mockData[i].y[mockData[i].y.length - 1];
      mockData[i].y.shift();
      var num = Math.max(last + Math.round(Math.random() * 10) - 5, 10);
      mockData[i].y.push(num);
    }

    line.setData(mockData);
  },
  setFormatTime(s){
    return(s-(s%=60))/60+(9<s?':':':0')+s;
  }
};