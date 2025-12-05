import React from 'react'

export default function ModuleCard({ module, onEnroll }){
  return (
    <div className="bg-white p-4 rounded shadow flex flex-col justify-between">
      <div>
        <div className="text-xs text-slate-400">{module.id}</div>
        <h3 className="font-semibold mt-1">{module.title}</h3>
        <p className="text-sm text-slate-600 mt-2">{module.desc}</p>
      </div>
      <div className="mt-4 flex gap-2">
        <button className="px-3 py-2 border rounded">View</button>
        <button onClick={onEnroll} className="px-3 py-2 bg-indigo-600 text-white rounded">Enroll</button>
      </div>
    </div>
  )
}

