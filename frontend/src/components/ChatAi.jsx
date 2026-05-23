import { useForm } from 'react-hook-form';
import { Send } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import axiosClient from '../utils/axios';

const ChatAi = ({ problem }) => {
  const [messages, setMessages] = useState([
    { role: 'model', parts: [{ text: 'Hi, how can I help you with this problem?' }] },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const onSubmit = async (data) => {
    const newUserMessage = { role: 'user', parts: [{ text: data.userinput }] };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    reset();

    try {
      const response = await axiosClient.post('/chat/Ai', {
        messages: updatedMessages,
        title: problem.title,
        description: problem.description,
        visibleTestCases: problem.visibleTestCases,
        startCode: problem.startCode,
      });

      setMessages((prev) => [
        ...prev,
        { role: 'model', parts: [{ text: response.data.message }] },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'model', parts: [{ text: 'Sorry, I encountered an error. Please try again.' }] },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border border-gray-200 rounded-xl shadow-sm">
      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] max-h-[500px]">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                msg.role === 'user'
                  ? 'bg-green-600 text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              {msg.parts[0].text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit(onSubmit)} className="border-t border-gray-200 p-4 flex gap-2">
        <input
          {...register('userinput', { required: 'Message cannot be empty' })}
          placeholder="Ask something about this problem..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition text-gray-700 placeholder-gray-400"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition flex items-center justify-center"
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </form>

      {/* Validation error */}
      {errors.userinput && (
        <p className="text-red-600 text-sm px-4 pb-2">{errors.userinput.message}</p>
      )}
    </div>
  );
};

export default ChatAi;