import io from "socket.io-client";

const socket = io("/");

console.log(socket);

function App() {
  return <div>Hello World</div>;
}

export default App;
