const connectionTester = require("connection-tester");
const { apiError, createScreen, system_info, monitor_processes, active_processes } = require("./components");

module.exports = class Terminal{

  constructor(blessed, screen, grid){
    this.blessed = blessed;
    this.screen = screen;
    this.grid = grid;
    
    this.url = "localhost";
    this.port = 61208;
    this.compURL = `http://${this.url}:${this.port}/api/3`;

    this.data = {
      monitor_processes: {
        lineCPU: {
          title: "CPU",
          style: { line: "red" },
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
    };
  }

  async createTerminal() {
    await connectionTester.test(this.url, this.port, 200, (err, output) => {

      if(output.success === true){
        const objects = createScreen(this.grid, this.blessed);

        system_info(objects.system_info, this.compURL);
        
        objects.active_processes.focus();
        setInterval(()=>{
          active_processes(objects.active_processes, this.compURL, this.data.active_processes);
          monitor_processes(objects.monitor_processes, this.compURL, this.data.monitor_processes);
          this.screen.render();
        }, 300);

      }else{
        apiError(this.screen, output.error);
        return;
      }
    });
  }
} 
