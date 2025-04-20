import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ProcessBlock = ({ pid, state, burstTime, arrivalTime }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ type: 'spring', stiffness: 300 }}
    className={`p-3 rounded-xl text-white font-medium text-sm shadow-md w-fit
      ${state === 'Running' ? 'bg-green-500' : state === 'Ready' ? 'bg-blue-500' : 'bg-yellow-500'}`}
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
      ${status === 'Used' ? 'bg-red-400 text-white' : 'bg-gray-200 text-gray-800'}`}
  >
    {status}
  </motion.div>
);

export default function OSSimulator() {
  const [processes, setProcesses] = useState([]);
  const [memory, setMemory] = useState(Array(10).fill('Free')); // 10 blocks of memory
  const [history, setHistory] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [globalTime, setGlobalTime] = useState(0);

  // Simulasi proses masuk
  const addProcess = () => {
    const pid = processes.length + 1;
    const arrivalTime = Math.floor(Math.random() * 10) * 1000; // Random Arrival Time
    const burstTime = Math.floor(Math.random() * 5 + 1) * 1000; // Random Burst Time
    setProcesses([...processes, { pid, state: 'Ready', arrivalTime, burstTime, completionTime: 0 }]);
  };

  // Proses eksekusi dengan algoritma FCFS
  const runNextProcess = () => {
    setProcesses(prev => {
      if (prev.length === 0) return prev;
      
      const updated = [...prev];
      const readyProcess = updated.find(p => p.state === 'Ready' && p.arrivalTime <= currentTime);
      if (readyProcess) {
        readyProcess.state = 'Running';
        setHistory(h => [...h, `PID ${readyProcess.pid} is now Running at ${currentTime}ms`]);
        setCurrentTime(currentTime + readyProcess.burstTime);
        readyProcess.state = 'Completed';
        readyProcess.completionTime = currentTime + readyProcess.burstTime;
        setHistory(h => [...h, `PID ${readyProcess.pid} completed at ${readyProcess.completionTime}ms`]);
      }
      return updated;
    });
  };

  // Mengalokasikan memori
  const allocateMemory = () => {
    const idx = memory.findIndex(m => m === 'Free');
    if (idx !== -1) {
      const updated = [...memory];
      updated[idx] = 'Used';
      setMemory(updated);
      setHistory(h => [...h, `Memory block ${idx} allocated`]);
    }
  };

  // Membebaskan memori
  const freeMemory = () => {
    const idx = memory.findIndex(m => m === 'Used');
    if (idx !== -1) {
      const updated = [...memory];
      updated[idx] = 'Free';
      setMemory(updated);
      setHistory(h => [...h, `Memory block ${idx} freed`]);
    }
  };

  // Memulai simulasi otomatis
  // useEffect(() => {
  //   if (isRunning) {
  //     const interval = setInterval(() => {
  //       runNextProcess();
  //     }, 2000); // Set interval 2 detik untuk eksekusi proses berikutnya

  //     return () => clearInterval(interval);
  //   }
  // }, [isRunning, currentTime]);
  useEffect(() => {
    if (!isRunning) return;
  
    const interval = setInterval(() => {
      setGlobalTime(prev => prev + 1000); // Waktu berjalan tiap 1 detik
    }, 1000);
  
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (!isRunning) return;
  
    setProcesses(prev => {
      const updated = [...prev];
      const running = updated.find(p => p.state === 'Running');
      
      if (running) {
        // Jika ada proses sedang berjalan, jangan jalankan proses lain
        return updated;
      }
  
      const readyProcess = updated.find(p => p.state === 'Ready' && p.arrivalTime <= globalTime);
      if (readyProcess) {
        readyProcess.state = 'Running';
        setHistory(h => [...h, `PID ${readyProcess.pid} is now Running at ${globalTime}ms`]);
  
        setTimeout(() => {
          setProcesses(latest => {
            const afterRun = [...latest];
            const target = afterRun.find(p => p.pid === readyProcess.pid);
            if (target) {
              target.state = 'Completed';
              target.completionTime = globalTime + target.burstTime;
              setHistory(h => [...h, `PID ${target.pid} completed at ${target.completionTime}ms`]);
            }
            return afterRun;
          });
        }, readyProcess.burstTime);
      }
  
      return updated;
    });
  }, [globalTime, isRunning]);
  

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">🧠 OS Simulator: Process & Memory Management</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Process Management */}
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
                onClick={() => setIsRunning(true)}
                className="px-3 py-1 text-sm rounded-md bg-green-500 text-white hover:bg-green-600"
              >
                ▶ Start Simulation
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {processes.map(p => (
              <ProcessBlock key={p.pid} pid={p.pid} state={p.state} burstTime={p.burstTime} arrivalTime={p.arrivalTime} />
            ))}
          </div>
        </div>

        {/* Memory Management */}
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
      </div>

      {/* History Log */}
      <div className="bg-white p-4 rounded-xl shadow-xl">
        <div className="text-sm text-gray-700">
          ⏱ Waktu Simulasi: {globalTime} ms
        </div>
        <h2 className="text-xl font-semibold mb-3">📋 System Log</h2>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          {history.map((entry, i) => (
            <li key={i}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
