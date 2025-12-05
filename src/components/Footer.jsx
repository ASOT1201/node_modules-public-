import React from 'react'

export default function Footer(){
  return (
    <footer className="mt-12 bg-slate-50 p-6 text-sm text-slate-600">
      <div className="max-w-6xl mx-auto">
        <div>Apostolic School of Theology • 4735 2nd Ave. N., Birmingham, AL</div>
        <div className="mt-2">© {new Date().getFullYear()} ASOT</div>
      </div>
    </footer>
  )
}

