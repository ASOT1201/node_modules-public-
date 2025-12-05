import React from 'react'

export default function Header(){
  return (
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded flex items-center justify-center text-white font-bold">AS</div>
          <div>
            <div className="font-semibold">Apostolic School of Theology</div>
            <div className="text-xs text-slate-500">Spirit-led leadership training</div>
          </div>
        </div>
        <nav>
          <a className="px-3">Home</a>
          <a className="px-3">Degrees</a>
          <a className="px-3 bg-indigo-600 text-white px-4 py-2 rounded">Apply</a>
        </nav>
      </div>
    </header>
  )
}

