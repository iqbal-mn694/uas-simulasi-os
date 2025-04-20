import { useState } from 'react';

const MemoryBlock = ({ id, size, allocated, onAllocate }) => (
  <div
    onClick={() => onAllocate(id)}
    className={`p-4 mb-4 rounded-md cursor-pointer transition-all duration-300 
      ${allocated ? 'bg-[--color-os-green]' : 'bg-[--color-os-gray]'} hover:scale-105 hover:bg-[--color-os-blue]`}
  >
    <div className="flex justify-between">
      <span className="font-semibold text-white">Proses {id}</span>
      <span className="text-white">Ukuran: {size}MB</span>
    </div>
    <div className="text-white mt-2">{allocated ? 'Memori Teralokasi' : 'Memori Belum Teralokasi'}</div>
  </div>
);

const MemoryManager = () => {
  const [memory, setMemory] = useState([
    { id: 1, size: 50, allocated: false },
    { id: 2, size: 30, allocated: false },
    { id: 3, size: 70, allocated: false },
  ]);

  const allocateMemory = (id) => {
    setMemory((prevMemory) =>
      prevMemory.map((block) =>
        block.id === id ? { ...block, allocated: !block.allocated } : block
      )
    );
  };

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold text-center">Manajemen Memori</h2>
      <div className="space-y-2">
        {memory.map((block) => (
          <MemoryBlock
            key={block.id}
            {...block}
            onAllocate={allocateMemory}
          />
        ))}
      </div>
    </div>
  );
};

export default MemoryManager;
