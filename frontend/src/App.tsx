import { FormEvent, useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("/");

console.log(socket);

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ message: string; from: string }[]>(
    []
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(message);

    // se emite el evento al servidor
    socket.emit("message", message);

    setMessages((prev) => [...prev, { from: "Me", message: message }]);

    setMessage("");
  };

  useEffect(() => {
    // inicializa la escucha de un evento por parte del server
    socket.on("message", (data: { message: string; from: string }) =>
      setMessages((prev) => [...prev, data])
    );

    return () => {
      // apaga la escha del evento una vez el componente muera
      socket.off("message");
    };
  }, []);

  return (
    <div>
      <ul>
        {messages.map((data, index) => (
          <li key={index}>
            {data.from}:{data.message}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Write  your message..."
          value={message}
          onChange={({ target: { value } }) => setMessage(value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
