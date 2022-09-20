class Node {
    constructor(val, priority) {
      this.val = val;
      this.priority = priority;
    }
  }
  
  class PriorityQueue {
    constructor() {
      this.values = [];
    }
    enqueue(val, priority) {
      let newNode = new Node(val, priority);
      this.values.push(newNode);
      this.bubbleUp();
    }
    bubbleUp() {
      let idx = this.values.length - 1;
      const element = this.values[idx];
      while (idx > 0) {
        let parentIdx = Math.floor((idx - 1) / 2);
        let parent = this.values[parentIdx];
        if (element.priority >= parent.priority) break;
        this.values[parentIdx] = element;
        this.values[idx] = parent;
        idx = parentIdx;
      }
    }
    dequeue() {
      const min = this.values[0];
      const end = this.values.pop();
      if (this.values.length > 0) {
        this.values[0] = end;
        this.sinkDown();
      }
      return min;
    }
    sinkDown() {
      let idx = 0;
      const length = this.values.length;
      const element = this.values[0];
      while (true) {
        let leftChildIdx = 2 * idx + 1;
        let rightChildIdx = 2 * idx + 2;
        let leftChild, rightChild;
        let swap = null;
  
        if (leftChildIdx < length) {
          leftChild = this.values[leftChildIdx];
          if (leftChild.priority < element.priority) {
            swap = leftChildIdx;
          }
        }
        if (rightChildIdx < length) {
          rightChild = this.values[rightChildIdx];
          if (
            (swap === null && rightChild.priority < element.priority) ||
            (swap !== null && rightChild.priority < leftChild.priority)
          ) {
            swap = rightChildIdx;
          }
        }
        if (swap === null) break;
        this.values[idx] = this.values[swap];
        this.values[swap] = element;
        idx = swap;
      }
    }
  }
  
  //Dijkstra's algorithm only works on a weighted graph.
  
  class WeightedGraph {
    constructor() {
      this.adjacencyList = {};
    }
    addVertex(vertex) {
      if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }
    addEdge(vertex1, vertex2, weight) {
      this.adjacencyList[vertex1].push({ node: vertex2, weight });
      this.adjacencyList[vertex2].push({ node: vertex1, weight });
    }
    Dijkstra(start, finish) {
      const nodes = new PriorityQueue();
      const distances = {};
      const previous = {};
      let path = []; //to return at end
      let smallest;
      //build up initial state
      for (let vertex in this.adjacencyList) {
        if (vertex === start) {
          distances[vertex] = 0;
          nodes.enqueue(vertex, 0);
        } else {
          distances[vertex] = Infinity;
          nodes.enqueue(vertex, Infinity);
        }
        previous[vertex] = null;
      }
      // as long as there is something to visit
      while (nodes.values.length) {
        smallest = nodes.dequeue().val;
        if (smallest === finish) {
          //WE ARE DONE
          //BUILD UP PATH TO RETURN AT END
          while (previous[smallest]) {
            path.push(smallest);
            smallest = previous[smallest];
          }
          break;
        }
        if (smallest || distances[smallest] !== Infinity) {
          for (let neighbor in this.adjacencyList[smallest]) {
            //find neighboring node
            let nextNode = this.adjacencyList[smallest][neighbor];
            //calculate new distance to neighboring node
            let candidate = distances[smallest] + nextNode.weight;
            let nextNeighbor = nextNode.node;
            if (candidate < distances[nextNeighbor]) {
              //updating new smallest distance to neighbor
              distances[nextNeighbor] = candidate;
              //updating previous - How we got to neighbor
              previous[nextNeighbor] = smallest;
              //enqueue in priority queue with new priority
              nodes.enqueue(nextNeighbor, candidate);
            }
          }
        }
      }
      return path.concat(smallest).reverse();
    }
  }
  
  //====================================================

  //Puntos
  var graph = new WeightedGraph();
  graph.addVertex("Entrada Calchaqui");
  graph.addVertex("Mosconi Subsuelo");
  graph.addVertex("Mosconi PB"); //planta baja
  graph.addVertex("Mosconi P1");
  graph.addVertex("Mosconi P2");
  graph.addVertex("Mosconi P3");
  graph.addVertex("Mosconi P4");
  graph.addVertex("Savio PB");
  graph.addVertex("Savio P1");
  graph.addVertex("Pistarini");
  graph.addVertex("Silvio Dessy");
  graph.addVertex("Abrales");
  graph.addVertex("Hudson");
  graph.addVertex("Lanteri");
  graph.addVertex("Ugarte PB");
  graph.addVertex("Ugarte P1");
  graph.addVertex("Manzi");
  
  //Conexiones (partida, destino, longitud camino)
  graph.addEdge("Entrada Calchaqui", "Mosconi PB", 2);
  graph.addEdge("Entrada Calchaqui", "Silvio Dessy", 10);
  
  graph.addEdge("Mosconi PB", "Mosconi P1", 2);
  graph.addEdge("Mosconi P1", "Mosconi P2", 2);
  graph.addEdge("Mosconi P2", "Mosconi P3", 2);
  graph.addEdge("Mosconi P3", "Mosconi P4", 2);
  graph.addEdge("Mosconi PB", "Mosconi Subsuelo", 1);
  graph.addEdge("Mosconi PB", "Savio PB", 4);
  graph.addEdge("Mosconi PB", "Manzi", 5);
  
  graph.addEdge("Savio PB", "Savio P1", 2);
  graph.addEdge("Savio PB", "Abrales", 5);
  graph.addEdge("Savio PB", "Pistarini", 5)
  
  graph.addEdge("Abrales", "Silvio Dessy", 10);
  graph.addEdge("Abrales", "Hudson", 2);
  
  graph.addEdge("Hudson", "Lanteri", 5);
  graph.addEdge("Hudson", "Pistarini", 4);
  
  graph.addEdge("Lanteri", "Ugarte PB", 5);
  
  graph.addEdge("Ugarte PB", "Manzi", 3);
  graph.addEdge("Ugarte PB", "Ugarte P1", 2);
  graph.addEdge("Ugarte PB", "Ugarte P1", 2);
  graph.addEdge("Ugarte PB", "Pistarini", 4);
  
  graph.addEdge("Manzi", "Pistarini", 5);
  
  //De donde estoy, a donde quiero ir...
  // graph.Dijkstra("Entrada Calchaqui", "Ugarte P1");

  module.exports = { graph };