class Edge {
  constructor(u, v) {
    this.u = u;
    this.v = v;
  }

  draw() {
    fill(255, 0, 0);
    strokeWeight(5 * scale);
    stroke(0, 0, 0);
    line(
      arr[this.u].x * scale + camera_x,
      arr[this.u].y * scale + camera_y,
      arr[this.v].x * scale + camera_x,
      arr[this.v].y * scale + camera_y
    );
  }
}



function addEdge(u, v, recalculate_distances) {
  var new_edge = new Edge(u, v);
  arr2[m] = new_edge;
  m++;

  g[u].push(v);
  g[v].push(u);

  d[u][v] = 1;
  d[v][u] = 1;

  node1 = null;
  node2 = null;
  
  if (recalculate_distances) {
    for (let k = 0; k < n; ++k) {
      for (let i = 0; i < n; ++i) {
        for (let j = 0; j < n; ++j) {
          d[i][j] = min(d[i][j], d[i][k] + d[k][j]);
        }
      }
    }
  }
}