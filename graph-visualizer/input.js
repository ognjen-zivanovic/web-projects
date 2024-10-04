function mousePressed() {
  //test.draw();

  for (let i = 0; i < n; i++) {
    if (
      arr[i].is_clicked(
        (mouseX - camera_x) / scale,
        (mouseY - camera_y) / scale
      )
    ) {
      clicked_node = arr[i];
    }
  }

  if (!clicked_node && myRadio.value() == "edge") {
    node1 = null;
    node2 = null;
  }

  if (clicked_node && myRadio.value() == "edge") {
    if (!node1) node1 = clicked_node;
    else if (!node2) {
      node2 = clicked_node;

      addEdge(node1.i, node2.i, true);
    }
  }
  return; //todo
  if (!clicked_node && myRadio.value() == "node") {
    addNode(mouseX, mouseY);
  }
}

function mouseDragged(event) {
  if (event.buttons == 1) {
    if (clicked_node) {
      clicked_node.x = (mouseX - camera_x) / scale;
      clicked_node.y = (mouseY - camera_y) / scale;
    }
  }
  else if (event.buttons == 4) {
    camera_x += event.movementX;
    camera_y += event.movementY;
  }
}

function mouseReleased() {
  clicked_node = null;
}

function mouseWheel(event) {
  scrollDelta = event.delta;
  if (scrollDelta < 0) scale *= 0.9;
  else scale *= 1.1;
}
