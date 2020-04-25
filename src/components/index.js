const contrib = require("blessed-contrib");
const { system, quicklook, upTime } = require("../services/api");
const { setLineData, setFormatTime } = require('./utils');

module.exports = {

  apiError(screen, error){
    var lcd = contrib.lcd({
      label: `ERROR: ${error} \n PRESS CTRL-C TO EXIT`,
      elements: 4,
      display: 3210,
      elementSpacing: 10,
      elementPadding: 8,
    });
    screen.append(lcd);

    setInterval(function () {

      var text = ["ERROR", "404"];

      var value = Math.round(Math.random() * 1000);
      lcd.setDisplay(text[value % text.length]);
      lcd.setOptions({
        color: [
          255,
          Math.random() * 255,
          Math.random() * 255,
        ],
        elementPadding: 8,
      });
      
      screen.render();
    }, 1000);

    return screen.render();
  },

  system_info(grid, url){
      
    let options = {
      fg: "green",
      label: "System Info",
      tags: true,
      border: { type: "line", fg: "cyan" },
    }
    
    let log = grid.set(0, 0, 4, 4, contrib.log, options);

    let data = system(url);        
    
    data.then(({type , body})=>{
      if(type === 'response'){
        log.log(`User: ${body.hostname}`);
        log.log(`OS: ${body.os_name}`);
        log.log(`platform: ${body.platform}`);
      }
    });

  },

  monitor_processes(grid, url){

    let options = {
      showNthLabel: 5,
      maxY: 100,
      label: "Monitor Process",
      showLegend: true,
      legend: { width: 10 },
    };

    let line = grid.set(0, 4, 5.5, 8, contrib.line, options);


    let uptime = upTime(url).then(({type, body})=> body);

    setInterval(()=>{
      uptime = setFormatTime(uptime);


      let data = quicklook(url);

      let response = data.then(({ type, body }) => {
        if (type === "response") {
  
          return {
            lineCPU:  {
              title: "CPU",
              style: { line: "red" },
              x: [...uptime],
              y: [...body.cpu],
            },
            lineMEM: {
              title: "MEM",
              style: { line: "blue" },
              x: [...uptime],
              y: [...body.mem],
            }    
          }
          
        }
      });

      // setLineData([response.lineCPU, response.lineMEM], line);

      // uptime *= 0.8; 

    }, 800);

    
  }

    

}
