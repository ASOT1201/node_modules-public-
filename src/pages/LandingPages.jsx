import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ModuleCard from '../components/ModuleCard'

const MODULES = [
  { id: 'M1', title: 'Foundations of Apostolic Doctrine', desc: 'Core beliefs and Scripture authority.' },
  { id: 'M2', title: 'Biblical Hermeneutics & Interpretation', desc: 'Interpretation principles.' },
  { id: 'M3', title: 'Church History & Polity', desc: 'History & governance.' },
  { id: 'M4', title: 'Pastoral Ministry & Counseling', desc: 'Care & counseling basics.' },
  { id: 'M5', title: 'Practical Theology & Worship', desc: 'Worship & leadership.' }
]

export default function LandingPage() {
  const [selected, setSelected] = useState(null)
  return (
    <div>
      <Header />
      <main className="max-w-6xl mx-auto p-6">
        <section className="grid md:grid-cols-2 gap-6">
          <div>
            <h1 className="text-4xl font-extrabold">Apostolic School of Theology</h1>
            <p className="mt-3 text-slate-600">Five focused degree modules...</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3>Quick Enroll (Preview)</h3>
            <p className="text-sm text-slate-500">This is a preview — no PII is transmitted.</p>
          </div>
        </section>

        <section className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODULES.map(m => <ModuleCard key={m.id} module={m} onEnroll={() => setSelected(m)} />)}
        </section>
      </main>
      <Footer />
    </div>
  )
}

