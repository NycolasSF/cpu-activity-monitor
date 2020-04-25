const connectionTester = require("connection-tester");
const { apiError, system_info, monitor_processes } = require("./components");

module.exports = class Terminal{

  constructor(screen, grid){
    this.screen = screen;
    this.grid = grid;
    
    this.url = "localhost";
    this.port = 61208;
    this.compURL = `http://${this.url}:${this.port}/api/3`;
  }

  async createTerminal() {
    return await connectionTester.test(this.url, this.port, 200, (err, output) => {

      if(output.success === true){

        system_info(this.grid, this.compURL);
        monitor_processes(this.grid, this.compURL);
        
      }else{
        apiError(this.screen, output.error);
        return;
      }

    });
  }



} 
