import { useState } from 'react';

const Process = ({ id, name, status, onToggleStatus }) => (
  <div
    className={`p-4 mb-2 border rounded-lg flex justify-between items-center shadow-md transition-all duration-300 
      ${status === 'Running' ? 'bg-[--color-os-green]' : status === 'Waiting' ? 'bg-[--color-os-blue]' : 'bg-[--color-os-orange]'} hover:scale-105`}
  >
    <span className="text-white font-bold">{name} (ID: {id})</span>
    <button
      onClick={() => onToggleStatus(id)}
      className="px-4 py-2 rounded-lg text-white font-semibold transition-colors duration-300 hover:bg-white hover:text-black"
    >
      {status}
    </button>
  </div>
);

const ProcessManager = () => {
  const [processes, setProcesses] = useState([
    { id: 1, name: 'Proses 1', status: 'Running' },
    { id: 2, name: 'Proses 2', status: 'Waiting' },
    { id: 3, name: 'Proses 3', status: 'Stopped' },
  ]);

  const toggleProcessStatus = (id) => {
    setProcesses((prevProcesses) =>
      prevProcesses.map((process) =>
        process.id === id
          ? {
              ...process,
              status:
                process.status === 'Running'
                  ? 'Waiting'
                  : process.status === 'Waiting'
                  ? 'Stopped'
                  : 'Running',
            }
          : process
      )
    );
  };

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold text-center">Manajemen Proses</h2>
      <div className="space-y-2">
        {processes.map((process) => (
          <Process
            key={process.id}
            {...process}
            onToggleStatus={toggleProcessStatus}
          />
        ))}
      </div>
    </div>
  );
};

export default ProcessManager;
