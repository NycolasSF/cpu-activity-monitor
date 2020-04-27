const contrib = require("blessed-contrib");
const { system, quicklook, upTime, processList } = require("../services/api");
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

  createScreen(grid, blessed){
   
    let _system_info = {
      label: "System Info",
      fg: "green",
      tags: true,
      border: { type: "line", fg: "cyan" },
    };

    let _monitor_processes = {
      label: "Monitor Process",
      showNthLabel: 5,
      wholeNumbersOnly: false,
      showLegend: true,
      legend: { width: 5 },
    };

    let _active_processes = {
      label: "Active Processes",
      keys: true,
      vi: true,
      selectedFg: "white",
      selectedBg: "blue",
      fg: "green",
      columnSpacing: 5,
      columnWidth: [12, 10, 10],
    };
    
    // ? row 1
    const system_info = grid.set(0, 0, 4, 4, contrib.log, _system_info);
    const monitor_processes = grid.set(0, 4, 5.5, 8, contrib.line, _monitor_processes);
    
    // ? row 2
    const active_processes = grid.set(4, 0, 8, 4, contrib.table, _active_processes);
    active_processes.focus();

    const logs = grid.set(5.5, 4, 3.5, 4, blessed.box, { content: "Logs" });
    const batery = grid.set(5.5, 8, 3.5, 4, blessed.box, { content: "Batery" });

    // ? row 3
    const cores = grid.set(9, 4, 3.5 , 8, blessed.box, { content: "Cores" });

    return {
      system_info,
      monitor_processes,
      active_processes,
      logs,
      batery,
      cores,
    };
  },

  system_info(log, url){
    let data = system(url);        
    
    data.then(({type , body})=>{
      if(type === 'response'){
        log.log(`User: ${body.hostname}`);
        log.log(`OS: ${body.os_name}`);
        log.log(`platform: ${body.platform}`);
      }
    });

  },

  monitor_processes(line, url, {lineCPU, lineMEM}){

    upTime(url).then(({type, body})=> {
      let uptime = body;
      
      quicklook(url).then(({ type, body }) => {  
        lineCPU.x.push(uptime);
        lineMEM.x.push(uptime);
        lineMEM.y.push(body.mem);
        lineCPU.y.push(body.cpu);
      });
    });
    
    setLineData([lineCPU, lineMEM], line);
  },
  
  active_processes(table, url, {headers , data}){    
    let processlist = processList(url);
    
    processlist.then(({ type, body }) => {
      body.forEach((_process)=>{
        data.push([_process.name, _process.cpu_percent, _process.memory_percent]);
      });
    });
    
    table.setData({headers: headers, data: data});
  }

}
