const contrib = require("blessed-contrib");
const { system, quicklook, upTime } = require("../services/api");
const { setLineData } = require('./utils');

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
      label: "System Info",
      fg: "green",
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

  monitor_processes(grid, url, {lineCPU, lineMEM}){

    let options = {
      label: "Monitor Process",
      showNthLabel: 5,
      wholeNumbersOnly: false,
      showLegend: true,
      legend: { width: 5 },
    };

    let line = grid.set(0, 4, 5.5, 8, contrib.line, options);


    upTime(url).then(({type, body})=> {
      let uptime = body;
      
      quicklook(url).then(({ type, body }) => {
        let cpu = body.cpu,
            mem = body.mem;       
        lineCPU.x.push(uptime);
        lineMEM.x.push(uptime);
        lineMEM.y.push(mem);
        lineCPU.y.push(cpu);
      });
    });
    
    setLineData([lineCPU, lineMEM], line);

  
  },
  
  active_processes(grid, url){

  }

}
