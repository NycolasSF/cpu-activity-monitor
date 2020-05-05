const { system, quicklook, upTime, now, processList, pluginsList, sensors, perCpu } = require("../services/api");
const { setLineData, setTableData, setLogsData } = require('./utils');

module.exports = {

  apiError(screen, error, contrib){
    var lcd = contrib.lcd({
      label: `ERROR: ${error} \n PRESS CTRL-C TO EXIT`,
      elements: 4,
      display: 3210,
      elementSpacing: 10,
      elementPadding: 8,
    });
    screen.append(lcd);body

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
  
  system_info(log, url){
    
    system(url).then(({type , body})=>{
      if(type === 'response'){
        log.log(`User: ${body.hostname}`);
        log.log(`OS: ${body.os_name}`);
        log.log(`Platform: ${body.hr_name}`);
        log.log(`Version: ${body.os_version}`);
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

  active_processes(table, url, { headers, data }){    

    processList(url).then(({ type, body }) => {
      body.forEach((_process)=>{
        data.push([_process.name, _process.cpu_percent, _process.memory_percent]);
      });
    });
    
    table.focus()
    setTableData(table, headers, data);
  },

  logs(log, url){
    log.log(`Starting logs`);


    setInterval(() => {
      now(url).then(({ type, body }) => {
        if (type === "response") log.log(`Date/Hour: ${body}`);
      });
    }, 20000);

    
    pluginsList(url).then(({ type, body }) => {
      if (type === 'response') {
        setTimeout(()=>{
          log.log(`Plugins on`);
          log.log(`Listing...`);
          
          let i = 0;
          setInterval(()=>{
            if(i < body.length){
              setLogsData(log, body, i);
              i++;            
            } 
          }, 2000);

        }, 800);
      }
    });

  },

  battery(gauge, url){
    sensors(url).then(({ type, body }) => {
      body.forEach((_sensors)=>{
        if (_sensors.type === 'battery') {
          gauge.setPercent(_sensors.value);
          setInterval(() => {
            gauge.setPercent(_sensors.value);
          }, 10000);
        }
      })
    });
  },

  cores(donut, url){

    perCpu(url).then(({type, body})=>{
      let data = [];

      if(type !== 'response' ) return data.push({percent: 0, label: 'ERROR'})
      body.forEach((cpu)=>{
        data.push({
          percent: parseFloat((cpu.total + 0.0) % 1).toFixed(2),
          label: `Core ${cpu.cpu_number}`,
          color: "green",
        });
      });

      donut.setData(data);
    })
  }
}
