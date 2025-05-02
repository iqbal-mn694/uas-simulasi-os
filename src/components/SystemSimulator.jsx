import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const ProcessBlock = ({ pid, state, burstTime, arrivalTime }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ type: "spring", stiffness: 300 }}
    className={`p-3 rounded-xl text-white font-medium text-sm shadow-md w-fit
      ${
        state === "Running"
          ? "bg-green-500"
          : state === "Ready"
          ? "bg-blue-500"
          : "bg-yellow-500"
      }`}
  >
    PID: {pid} ({state}) <br />
    Burst Time: {burstTime}ms | Arrival: {arrivalTime}ms
  </motion.div>
);

const MemoryBlock = ({ id, status }) => (
  <motion.div
    initial={{ y: 10, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.3 }}
    className={`w-16 h-10 rounded-lg flex items-center justify-center text-xs font-bold shadow
      ${
        status === "Used"
          ? "bg-red-400 text-white"
          : "bg-gray-200 text-gray-800"
      }`}
  >
    {status}
  </motion.div>
);

const ProcessManager = () => {
  const [processes, setProcesses] = useState([]);
  const [history, setHistory] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [globalTime, setGlobalTime] = useState(0);
  const [nextArrivalOffset, setNextArrivalOffset] = useState(0);

  const addProcess = () => {
    const arrivalTime = nextArrivalOffset + Math.floor(Math.random() * 2000);
    const burstTime = Math.floor(Math.random() * 5 + 1) * 1000;

    const newProcess = {
      pid: processes.length + 1,
      state: "Ready",
      arrivalTime,
      burstTime,
      completionTime: 0,
    };

    setProcesses([...processes, newProcess]);
    setNextArrivalOffset(arrivalTime);
  };

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setGlobalTime((prev) => prev + 100);
    }, 100);

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (!isRunning) return;

    const runningProcess = processes.find((p) => p.state === "Running");
    if (runningProcess) return;

    const readyProcesses = processes
      .filter((p) => p.state === "Ready" && p.arrivalTime <= globalTime)
      .sort((a, b) => a.pid - b.pid);

    if (readyProcesses.length > 0) {
      const nextProcess = readyProcesses[0];

      setProcesses((prev) =>
        prev.map((p) =>
          p.pid === nextProcess.pid ? { ...p, state: "Running" } : p
        )
      );

      setHistory((h) => [
        ...h,
        `PID ${nextProcess.pid} started at ${globalTime}ms`,
      ]);

      setTimeout(() => {
        setProcesses((prev) =>
          prev.map((p) =>
            p.pid === nextProcess.pid
              ? {
                  ...p,
                  state: "Completed",
                  completionTime: globalTime + p.burstTime,
                }
              : p
          )
        );
        setHistory((h) => [
          ...h,
          `PID ${nextProcess.pid} completed at ${
            globalTime + nextProcess.burstTime
          }ms`,
        ]);
      }, nextProcess.burstTime);
    }
  }, [globalTime, isRunning, processes]);

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white p-4 rounded-xl shadow-xl">
        <div className="flex justify-between mb-3">
          <h2 className="text-xl font-semibold">Process Manager</h2>
          <div className="space-x-2">
            <button
              onClick={addProcess}
              className="px-3 py-1 text-sm rounded-md bg-blue-500 text-white hover:bg-blue-600"
            >
              + Add Process
            </button>
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`px-3 py-1 text-sm rounded-md ${
                isRunning ? "bg-red-500" : "bg-green-500"
              } text-white`}
            >
              {isRunning ? "⏹ Stop" : "▶ Start"}
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {processes.map((p) => (
            <ProcessBlock
              key={p.pid}
              pid={p.pid}
              state={p.state}
              burstTime={p.burstTime}
              arrivalTime={p.arrivalTime}
            />
          ))}
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-xl">
        <div className="text-sm text-gray-700">
          ⏱ Global Time: {globalTime} ms
        </div>
        <h2 className="text-xl font-semibold mb-3">📋 Process Log</h2>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 max-h-40 overflow-y-auto">
          {history.map((entry, i) => (
            <li key={i}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const MemoryManager = () => {
  const [memory, setMemory] = useState(Array(10).fill("Free"));
  const [history, setHistory] = useState([]);
  const [globalTime, setGlobalTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlobalTime((prev) => prev + 100);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const allocateMemory = () => {
    const idx = memory.findIndex((m) => m === "Free");
    if (idx !== -1) {
      const updated = [...memory];
      updated[idx] = "Used";
      setMemory(updated);
      setHistory((h) => [
        ...h,
        `Memory block ${idx} allocated at ${globalTime}ms`,
      ]);
    }
  };

  const freeMemory = () => {
    const idx = memory.findIndex((m) => m === "Used");
    if (idx !== -1) {
      const updated = [...memory];
      updated[idx] = "Free";
      setMemory(updated);
      setHistory((h) => [...h, `Memory block ${idx} freed at ${globalTime}ms`]);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white p-4 rounded-xl shadow-xl">
        <div className="flex justify-between mb-3">
          <h2 className="text-xl font-semibold">Memory Manager</h2>
          <div className="space-x-2">
            <button
              onClick={allocateMemory}
              className="px-3 py-1 text-sm rounded-md bg-purple-500 text-white hover:bg-purple-600"
            >
              + Allocate
            </button>
            <button
              onClick={freeMemory}
              className="px-3 py-1 text-sm rounded-md bg-gray-500 text-white hover:bg-gray-600"
            >
              ✖ Free
            </button>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {memory.map((m, i) => (
            <MemoryBlock key={i} id={i} status={m} />
          ))}
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-xl">
        <div className="text-sm text-gray-700">
          ⏱ Global Time: {globalTime} ms
        </div>
        <h2 className="text-xl font-semibold mb-3">📋 Memory Log</h2>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 max-h-40 overflow-y-auto">
          {history.map((entry, i) => (
            <li key={i}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        🧠 OS Simulator: Process & Memory Management
      </h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Link
          to="/process"
          className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow text-center"
        >
          <h2 className="text-xl font-semibold mb-3">Process Management</h2>
          <p className="text-gray-600">
            Simulate process scheduling with FCFS algorithm
          </p>
        </Link>
        <Link
          to="/memory"
          className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow text-center"
        >
          <h2 className="text-xl font-semibold mb-3">Memory Management</h2>
          <p className="text-gray-600">
            Simulate memory allocation and deallocation
          </p>
        </Link>
      </div>
    </div>
  );
};

const OSSimulator = () => {
  return (
    <Router>
      <nav className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex space-x-4">
          <Link
            to="/"
            className="px-3 py-1 rounded-md hover:bg-gray-100 font-medium"
          >
            Home
          </Link>
          <Link
            to="/process"
            className="px-3 py-1 rounded-md hover:bg-gray-100 font-medium"
          >
            Process Manager
          </Link>
          <Link
            to="/memory"
            className="px-3 py-1 rounded-md hover:bg-gray-100 font-medium"
          >
            Memory Manager
          </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/process" element={<ProcessManager />} />
        <Route path="/memory" element={<MemoryManager />} />
      </Routes>
    </Router>
  );
};

export default OSSimulator;
