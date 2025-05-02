import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlayIcon,
  StopIcon,
  PlusIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";

const ProcessBlock = ({
  pid,
  state,
  burstTime,
  arrivalTime,
  completionTime,
  waitTime,
  isAboutToRun = false,
}) => {
  const getStateStyle = () => {
    if (isAboutToRun) return "bg-yellow-500 shadow-md";

    switch (state) {
      case "Running":
        return "bg-green-500 shadow-md";
      case "Ready":
        if (waitTime > 3000) return "bg-orange-500";
        if (waitTime > 1000) return "bg-yellow-500";
        return "bg-blue-500";
      case "Completed":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`p-4 rounded-lg text-white font-medium w-56 ${getStateStyle()}`}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="font-bold text-lg">PID: {pid}</span>
        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
          {state}
        </span>
      </div>
      <div className="space-y-1 text-xs">
        <div className="flex justify-between">
          <span className="text-white/80">Burst Time:</span>
          <span className="font-mono">{burstTime}ms</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/80">Arrival:</span>
          <span className="font-mono">{arrivalTime}ms</span>
        </div>
        {state === "Ready" && waitTime > 0 && (
          <div className="flex justify-between">
            <span className="text-white/80">Waiting:</span>
            <span className="font-mono">{waitTime}ms</span>
          </div>
        )}
        {state === "Completed" && (
          <>
            <div className="flex justify-between">
              <span className="text-white/80">Completed:</span>
              <span className="font-mono">{completionTime}ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/80">Turnaround:</span>
              <span className="font-mono">
                {completionTime - arrivalTime}ms
              </span>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

const ProcessManager = () => {
  const [processes, setProcesses] = useState([]);
  const [history, setHistory] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [globalTime, setGlobalTime] = useState(0);
  const [nextArrivalOffset, setNextArrivalOffset] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [nextProcessToRun, setNextProcessToRun] = useState(null);

  const addProcess = () => {
    const arrivalTime = nextArrivalOffset + Math.floor(Math.random() * 2000);
    const burstTime = Math.floor(Math.random() * 5 + 1) * 1000;

    const newProcess = {
      pid: processes.length + 1,
      state: "Ready",
      arrivalTime,
      burstTime,
      completionTime: 0,
      waitTime: 0,
    };

    setProcesses([...processes, newProcess]);
    setNextArrivalOffset(arrivalTime);
    setHistory([
      ...history,
      `Process ${newProcess.pid} added (Arrives at ${arrivalTime}ms)`,
    ]);
  };

  const resetSimulation = () => {
    setProcesses([]);
    setHistory([]);
    setGlobalTime(0);
    setNextArrivalOffset(0);
    setIsRunning(false);
    setNextProcessToRun(null);
  };

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setGlobalTime((prev) => prev + 100 * speed);
    }, 100);

    return () => clearInterval(interval);
  }, [isRunning, speed]);

  useEffect(() => {
    if (!isRunning) return;

    // Update wait times for ready processes
    setProcesses((prev) =>
      prev.map((p) => {
        if (p.state === "Ready" && p.arrivalTime <= globalTime) {
          return { ...p, waitTime: globalTime - p.arrivalTime };
        }
        return p;
      })
    );

    const runningProcess = processes.find((p) => p.state === "Running");
    if (runningProcess) return;

    const readyProcesses = processes
      .filter((p) => p.state === "Ready" && p.arrivalTime <= globalTime)
      .sort((a, b) => a.arrivalTime - b.arrivalTime);

    if (readyProcesses.length > 0) {
      const nextProcess = readyProcesses[0];

      // Highlight the next process to run 1 second before execution
      if (!nextProcessToRun && readyProcesses.length > 0) {
        setNextProcessToRun(nextProcess.pid);
        setTimeout(() => {
          setNextProcessToRun(null);

          // Start the process execution
          setProcesses((prev) =>
            prev.map((p) =>
              p.pid === nextProcess.pid ? { ...p, state: "Running" } : p
            )
          );

          setHistory((h) => [
            ...h,
            `PID ${nextProcess.pid} started execution at ${globalTime}ms`,
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
              }ms (Duration: ${nextProcess.burstTime}ms)`,
            ]);
          }, nextProcess.burstTime / speed);
        }, 1000 / speed);
      }
    }
  }, [globalTime, isRunning, processes, speed, nextProcessToRun]);

  const completedProcesses = processes.filter((p) => p.state === "Completed");
  const readyProcesses = processes.filter((p) => p.state === "Ready");
  const runningProcess = processes.find((p) => p.state === "Running");

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto min-h-screen bg-gray-50">
      {/* Header Section */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-xl shadow-md p-6"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              FCFS Process Scheduler
            </h1>
            <p className="text-gray-500">
              First-Come-First-Served scheduling visualization
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={addProcess}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            >
              <PlusIcon className="w-5 h-5" />
              Add Process
            </button>
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg ${
                isRunning
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              } text-white transition-colors`}
            >
              {isRunning ? (
                <>
                  <StopIcon className="w-5 h-5" />
                  Stop
                </>
              ) : (
                <>
                  <PlayIcon className="w-5 h-5" />
                  Start
                </>
              )}
            </button>
            <button
              onClick={resetSimulation}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors"
            >
              <ArrowPathIcon className="w-5 h-5" />
              Reset
            </button>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 shadow-sm">
            <div className="text-sm text-blue-600 font-medium">
              Simulation Time
            </div>
            <div className="text-2xl font-bold text-blue-700">
              {globalTime}ms
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 shadow-sm">
            <div className="text-sm text-purple-600 font-medium">
              Total Processes
            </div>
            <div className="text-2xl font-bold text-purple-700">
              {processes.length}
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 shadow-sm">
            <div className="text-sm text-green-600 font-medium">Completed</div>
            <div className="text-2xl font-bold text-green-700">
              {completedProcesses.length}
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 shadow-sm">
            <div className="text-sm text-blue-600 font-medium">Waiting</div>
            <div className="text-2xl font-bold text-blue-700">
              {readyProcesses.length}
            </div>
          </div>
        </div>

        {/* Speed Control */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Simulation Speed:</span>
          <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
            {[0.5, 1, 2, 5].map((spd) => (
              <button
                key={spd}
                onClick={() => setSpeed(spd)}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  speed === spd
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Content - Three Queues */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ready Queue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Ready Queue</h2>
            <span className="text-xs bg-blue-500 text-white px-3 py-1 rounded-full">
              {readyProcesses.length} waiting
            </span>
          </div>
          {readyProcesses.length > 0 ? (
            <div className="space-y-4">
              <AnimatePresence>
                {readyProcesses
                  .sort((a, b) => a.arrivalTime - b.arrivalTime)
                  .map((p) => (
                    <ProcessBlock
                      key={`ready-${p.pid}`}
                      {...p}
                      isAboutToRun={nextProcessToRun === p.pid}
                    />
                  ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="p-8 bg-blue-50 rounded-lg text-center">
              <div className="text-blue-400 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-gray-500">No processes in ready queue</p>
            </div>
          )}
        </motion.div>

        {/* Running Process */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Currently Executing
            </h2>
            <span className="text-xs bg-green-500 text-white px-3 py-1 rounded-full">
              {runningProcess ? "1 running" : "Idle"}
            </span>
          </div>
          <AnimatePresence>
            {runningProcess ? (
              <ProcessBlock
                key={`running-${runningProcess.pid}`}
                {...runningProcess}
              />
            ) : (
              <div className="p-8 bg-green-50 rounded-lg text-center">
                <div className="text-green-400 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-gray-500">No process running</p>
              </div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Completed Queue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Completed</h2>
            <span className="text-xs bg-purple-500 text-white px-3 py-1 rounded-full">
              {completedProcesses.length} finished
            </span>
          </div>
          {completedProcesses.length > 0 ? (
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              <AnimatePresence>
                {completedProcesses
                  .sort((a, b) => a.completionTime - b.completionTime)
                  .map((p) => (
                    <ProcessBlock key={`completed-${p.pid}`} {...p} />
                  ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="p-8 bg-purple-50 rounded-lg text-center">
              <div className="text-purple-400 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-gray-500">No completed processes yet</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Execution Log */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-md p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Execution Timeline
          </h2>
          <span className="text-sm bg-blue-500 text-white px-3 py-1 rounded-full">
            {history.length} events
          </span>
        </div>

        {history.length > 0 ? (
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {history.map((entry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
                className={`p-4 rounded-lg ${
                  entry.includes("started")
                    ? "bg-green-50"
                    : entry.includes("completed")
                    ? "bg-purple-50"
                    : "bg-blue-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-1 flex-shrink-0 ${
                      entry.includes("started")
                        ? "text-green-500"
                        : entry.includes("completed")
                        ? "text-purple-500"
                        : "text-blue-500"
                    }`}
                  >
                    {entry.includes("started") ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : entry.includes("completed") ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <div>
                    <div className="font-mono text-xs text-gray-500 mb-1">
                      [{globalTime}ms]
                    </div>
                    <div className="text-gray-700">{entry}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="p-8 bg-gray-50 rounded-lg text-center">
            <div className="text-gray-400 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <p className="text-gray-500">No events logged yet</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProcessManager;
