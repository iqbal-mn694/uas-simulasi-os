import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MemoryBlock = ({ id, status, size, processId, processSize }) => {
  const blockStyles = {
    Used: "bg-red-400 border-red-500",
    Free: "bg-green-300 border-green-400",
    Reserved: "bg-yellow-300 border-yellow-400",
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={`p-3 m-1 rounded-lg border ${blockStyles[status]} flex flex-col justify-between`}
    >
      <div className="flex justify-between items-start">
        <span className="text-xs font-medium text-gray-800">Block {id}</span>
        <span className="text-xs font-semibold text-gray-700">{size}KB</span>
      </div>

      <div className="text-center">
        {status === "Used" ? (
          <div className="text-xs">
            <div className="font-semibold truncate text-gray-800">{processId}</div>
            <div className="text-gray-700">{processSize}KB used</div>
          </div>
        ) : (
          <div className="text-xs font-semibold text-gray-700">Available</div>
        )}
      </div>
    </motion.div>
  );
};

const MemoryManager = () => {
  const [memory, setMemory] = useState(
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      status: "Free",
      size: Math.floor(Math.random() * 128) + 64,
      processId: null,
      processSize: null,
    }))
  );

  const [history, setHistory] = useState([]);
  const [globalTime, setGlobalTime] = useState(0);
  const [processSize, setProcessSize] = useState(64);
  const [processName, setProcessName] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setGlobalTime((prev) => prev + 100);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const allocateMemory = () => {
    const suitableBlocks = memory.filter(
      (m) => m.status === "Free" && m.size >= processSize
    );

    if (suitableBlocks.length === 0) {
      setHistory((h) => [
        ...h,
        `Allocation failed: No block large enough for ${processSize}KB request`,
      ]);
      return;
    }

    const bestBlock = suitableBlocks.reduce((prev, current) =>
      prev.size < current.size ? prev : current
    );

    const idx = memory.findIndex((m) => m.id === bestBlock.id);
    const updated = [...memory];
    updated[idx] = {
      ...updated[idx],
      status: "Used",
      processId: processName || `Process-${Math.floor(Math.random() * 1000)}`,
      processSize: processSize,
    };

    setMemory(updated);
    setHistory((h) => [
      ...h,
      `Allocated ${processSize}KB in Block ${idx} (${bestBlock.size}KB) for ${updated[idx].processId}`,
    ]);
  };

  const freeMemory = () => {
    const idx = memory.findIndex((m) => m.status === "Used");
    if (idx === -1) return;

    const processInfo = memory[idx].processId;
    const updated = [...memory];
    updated[idx] = {
      ...updated[idx],
      status: "Free",
      processId: null,
      processSize: null,
    };

    setMemory(updated);
    setHistory((h) => [
      ...h,
      `Freed Block ${idx} (${updated[idx].size}KB) from ${processInfo}`,
    ]);
  };

  const calculateMemoryStats = () => {
    const totalMemory = memory.reduce((sum, block) => sum + block.size, 0);
    const usedMemory = memory.reduce(
      (sum, block) => (block.status === "Used" ? sum + block.size : sum), 0
    );
    const freeBlocks = memory.filter((block) => block.status === "Free");
    const largestFree = freeBlocks.reduce(
      (max, block) => Math.max(max, block.size), 0
    );

    return {
      totalMemory,
      usedMemory,
      freeMemory: totalMemory - usedMemory,
      largestFree,
      fragmentation: freeBlocks.length > 1
        ? (freeBlocks.reduce((sum, b) => sum + b.size, 0) - largestFree) /
        (totalMemory - usedMemory) * 100
        : 0,
    };
  };

  const memoryStats = calculateMemoryStats();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Controls and Memory Visualization */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              Memory Allocation Simulator
            </h1>
            <p className="text-gray-600 mb-4">
              Best-Fit Algorithm Visualization
            </p>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Process Size (KB)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={processSize}
                    onChange={(e) =>
                      setProcessSize(parseInt(e.target.value) || 0)
                    }
                    className="w-full px-3 py-2 rounded-md border border-gray-300 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 
                 focus:border-blue-500 hover:border-gray-400 
                 transition duration-150"
                  />
                </div>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Process Name
                </label>
                <input
                  type="text"
                  placeholder="Optional"
                  value={processName}
                  onChange={(e) => setProcessName(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 
               focus:outline-none focus:ring-2 focus:ring-blue-500 
               focus:border-blue-500 hover:border-gray-400 
               transition duration-150"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={allocateMemory}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Allocate Memory
              </button>
              <button
                onClick={freeMemory}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Free Memory
              </button>
            </div>

            {/* Combined Memory Status and Blocks */}
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Memory Blocks
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  <AnimatePresence>
                    {memory.map((block) => (
                      <MemoryBlock
                        key={block.id}
                        id={block.id}
                        status={block.status}
                        size={block.size}
                        processId={block.processId}
                        processSize={block.processSize}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Memory Status
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Total Memory:</span>
                      <span className="font-medium">
                        {memoryStats.totalMemory} KB
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-gray-400 h-2.5 rounded-full"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Used Memory:</span>
                      <span className="font-medium text-red-500">
                        {memoryStats.usedMemory} KB (
                        {(
                          (memoryStats.usedMemory / memoryStats.totalMemory) *
                          100
                        ).toFixed(1)}
                        %)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-red-400 h-2.5 rounded-full"
                        style={{
                          width: `${
                            (memoryStats.usedMemory / memoryStats.totalMemory) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Largest Free Block:</span>
                      <span className="font-medium text-green-500">
                        {memoryStats.largestFree} KB
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Fragmentation:</span>
                      <span className="font-medium">
                        {memoryStats.fragmentation.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-yellow-400 h-2.5 rounded-full"
                        style={{ width: `${memoryStats.fragmentation}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Operation Log */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 h-full flex flex-col">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Operation Log
            </h2>
            <div className="flex-1 overflow-y-auto space-y-2 pr-2 mb-3">
              {history.length === 0 ? (
                <p className="text-gray-500 italic text-sm">
                  No operations recorded yet
                </p>
              ) : (
                history.map((entry, i) => (
                  <div
                    key={i}
                    className={`p-2 text-sm rounded ${
                      entry.includes("failed")
                        ? "bg-red-50 text-red-700 border border-red-100"
                        : entry.includes("Allocated")
                        ? "bg-blue-50 text-blue-700 border border-blue-100"
                        : entry.includes("Freed")
                        ? "bg-green-50 text-green-700 border border-green-100"
                        : "bg-gray-50 text-gray-700 border border-gray-100"
                    }`}
                  >
                    {entry}
                  </div>
                ))
              )}
            </div>
            <div className="text-xs text-gray-500 border-t pt-2">
              System time: {globalTime} ms
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryManager;