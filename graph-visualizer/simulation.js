function simulate() {
  for (let i = 0; i < n; i++) {
      delta_x[i] = 0;
      delta_y[i] = 0;
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i == j) continue;
      let dx = arr[i].x - arr[j].x;
      let dy = arr[i].y - arr[j].y;
      
      let dist = dx * dx + dy * dy;
      dist = sqrt(dist);
      if (dist < 10 * optimal_edge_len) {
        let h1 = speed2 / (dist * dist * dist);
        delta_x[i] += h1 * dx;
        delta_y[i] += h1 * dy;
      }
      
    
      if (d[i][j] != 1) continue;
      let len = optimal_edge_len;
      let h2 = (dist - len) * speed / dist;
      delta_x[i] -= h2 * dx;
      delta_y[i] -= h2 * dy;

    }
  }
  
  let sumx = 0;
  let sumy = 0;
  for (let i = 0; i < n; i++) {
    //delta_x[i] = constrain(delta_x[i], -50, 50);
    //delta_y[i] = constrain(delta_y[i], -50, 50);
    arr[i].x += delta_x[i];
    arr[i].y += delta_y[i];
    
    sumx += arr[i].x;
    sumy += arr[i].y;
  }
  //console.log(sumx, sumy);
}