const connectionTester = require("connection-tester");
const { apiError, system_info, monitor_processes, active_processes, logs, battery, cores } = require("./components");

module.exports = class Terminal{

  constructor(blessed, contrib, screen, grid){
    this.blessed = blessed;
    this.contrib = contrib;
    this.screen = screen;
    this.grid = grid;
    
    this.url = "localhost";
    this.port = 61208;
    this.compURL = `http://${this.url}:${this.port}/api/3`;

    this.data = {
      monitor_processes: {
        lineCPU: {
          title: "CPU",
          style: { line: "magenta" },
          x: ["0:00:00"],
          y: [0],
        },
        lineMEM: {
          title: "MEM",
          style: { line: "yellow" },
          x: ["0:00:00"],
          y: [0],
        },
      },
      active_processes: {
        headers: ['Process', 'CPU %', 'MEMORY %'],
        data: []
      },
      cores: []
    };
    this.objectsScreen = this.createScreen();
  }

  async createTerminal() {
    await connectionTester.test(this.url, this.port, 500, (err, output) => {

      if(output.success === true){

        system_info(this.objectsScreen.system_info, this.compURL);
        logs(this.objectsScreen.logs, this.compURL);
        battery(this.objectsScreen.battery, this.compURL);
        
        setInterval(()=>{
          cores(this.objectsScreen.cores, this.compURL, this.data.cores);
          active_processes(this.objectsScreen.active_processes, this.compURL, this.data.active_processes);
          monitor_processes(this.objectsScreen.monitor_processes, this.compURL, this.data.monitor_processes);
          this.screen.render();
        }, 1000);
        
      }else{
        apiError(this.screen, output.error, this.contrib);
        return;
      }

    });
  }

  createScreen(){

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
      interactive: true,
      vi: true,
      width: '100%',
      height: '100%',
      selectedFg: "white",
      selectedBg: "blue",
      fg: "green",
      columnSpacing: 5,
      columnWidth: [12, 10, 10],
    };

    let _logs = {
      label: "Logs",
      fg: "green",
      tags: true,
      border: { type: "line", fg: "cyan" },
    };

    let _battery = {
      label: "Batery Percent",
       stroke: 'green', 
       fill: 'black'
    };

    let _cores = {
      label: "Cores usage",
      radius: 8,
      arcWidth: 3,
      yPadding: 2,
    };

    // ? row 1
    const system_info = this.grid.set(0, 0, 4, 4, this.contrib.log, _system_info);
    const monitor_processes = this.grid.set(0, 4, 5.5, 8, this.contrib.line, _monitor_processes);

    // ? row 2
    const active_processes = this.grid.set(4, 0, 8, 4, this.contrib.table, _active_processes);

    const logs = this.grid.set(5.5, 4, 3.5, 4, this.contrib.log, _logs);
    const battery = this.grid.set(5.5, 8, 3.5, 4, this.contrib.gauge, _battery);

    // ? row 3
    const cores = this.grid.set(9, 4, 3.5, 8, this.contrib.donut, _cores);

    return {
      system_info,
      monitor_processes,
      active_processes,
      logs,
      battery,
      cores,
    };
  }

  onResize(){
    this.screen.on('resize',()=>{
      this.objectsScreen.system_info.emit('attach');
      this.objectsScreen.monitor_processes.emit('attach');
      this.objectsScreen.active_processes.emit('attach');
      this.objectsScreen.logs.emit('attach');
      this.objectsScreen.batery.emit('attach');
      this.objectsScreen.cores.emit('attach');
    });
  }

  onFocus(){
    this.screen.on('focus', ()=>{
      this.objectsScreen.active_processes.focus();
    })
  }

} 
