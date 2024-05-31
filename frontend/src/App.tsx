import { FormEvent, useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("/");

console.log(socket);

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ message: string; from: string }[]>(
    []
  );
  const messageEndRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    // mueve el scroll hacia abajo cada que llege un nuevo mensaje
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="h-screen bg-zinc-800 text-white flex items-center justify-center flex-row-reverse">
      <ul className="ml-5 p-6 w-1/3 h-1/2 overflow-auto  scrollbar-webkit bg-black rounded-md">
        {messages.map((data, index) => (
          <li
            key={index}
            className={`my-2 p-5 table rounded-md ${
              data.from === "Me" ? `bg-gray-900 ml-auto` : `bg-gray-800`
            }`}
          >
            <span className=" text-xs  text-slate-500 block mb-2">
              {data.from}
            </span>
            <span className="text-md pl-2">{data.message}</span>
          </li>
        ))}
        <div ref={messageEndRef}></div>
      </ul>
      <div className="w-1/4">
        <h1 className="text-2xl font-bold my-2 text-center">Chat</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 p-10 flex rounded-md"
        >
          <input
            className="border-2 border-zinc-500 p-2 w-full text-black rounded-l-md outline-none"
            type="text"
            placeholder="Write  your message..."
            value={message}
            onChange={({ target: { value } }) => setMessage(value)}
          />
          <button className="bg-slate-500 p-3 rounded-r-md" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
