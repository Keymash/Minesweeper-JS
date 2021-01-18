var Cell = function(x, y) {
  this.x = x;
  this.y = y;
  this.hasMine = false;
  this.adjMines = 0;
  this.state = "inactive";
  this.adj = [8];
  this.adjEmpty = [8];

  this.click = function() {
    // if mine, kaboom
    if (this.hasMine)
    {
      this.state = "bomb";
    } else {
      if (this.state == "inactive") {
        this.state = "clicked";
        this.getAdj();
        this.getBombs();

        if (this.adjMines == 0)
        {
          this.revealAdj();
        }
      }
    }
    // Show number of adj bombs


    // or click adj cells
  };

  this.getAdj = function()
  {
    if (this.y > 0) {
      this.adj[0] = grid[this.x][this.y -1];
      if (this.x < 19)
      {
        this.adj[1] = grid[this.x +1][this.y -1];
      }
      if (this.x > 0)
      {
        this.adj[7] = grid[this.x -1][this.y -1];
      }
    }
    if (this.y < 19) {
      this.adj[4] = grid[this.x][this.y +1];
      if (this.x < 19) {
        this.adj[3] = grid[this.x +1][this.y +1];
      }
      if (this.x > 0) {
        this.adj[5] = grid[this.x -1][this.y +1];
      }
    }
    if (this.x > 0) {
      this.adj[2] = grid[this.x -1][this.y];
    }
    if (this.x < 19) {
      this.adj[6] = grid[this.x + 1][this.y];
    }
  }

  this.getBombs = function()
  {
    for (let i = 0; i < 8; i++) {
      if (this.adj[i] != null)
      {
        if (this.adj[i].hasMine)
        {
          this.adjMines++;
        } else {
          this.adjEmpty[i] = this.adj[i];
        }
      }
    }
  }

  this.show = function()
  {
    switch(this.state) {
    case "inactive":
      fill(150);
      break;
    case "clicked":
      fill(255);
      break;
    case "bomb":
      fill(255, 0, 0);
      break;
    }
    stroke(80);
    rect(this.x * cellSize, this.y * cellSize, cellSize -1, cellSize -1);
    if (this.state == "clicked" && this.adjMines > 0) {
      fill(0);
      text(this.adjMines, this.x * cellSize + 5, this.y * cellSize + 12);
    }
  };

  this.revealAdj = function() {
    for (let i = 0; i < 8; i++)
    {
      if (this.adjEmpty[i] != null)
      {
        let targCell = this.adjEmpty[i];
        //let x = this.adjEmpty[i].x;
        //let y = this.adjEmpty[i].y;
        if (targCell.state == "inactive") {
          targCell.click();
        }
      }
    }
  };
};
