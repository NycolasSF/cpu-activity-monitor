module.exports = {
  setLineData(data, line) {
    for(let i = 0; i < data.length; i++){

      if(data[i].x.length >= 20){
       data[i].x.shift();
       data[i].y.shift();
      }             
    };    
    line.setData(data);
  } 
};