import React from 'react'

const features = [
  { title: 'Pomodoro Timer & Session Tracker', desc: 'Focus better with timed study sessions, track duration, and maximize productivity.' },
  { title: 'Task Manager', desc: 'Organize your to-dos, mark completed tasks, and never miss deadlines.' },
  { title: 'Analytics Dashboard', desc: 'View your study hours, completed tasks, session count, and progress visually.' },
  { title: 'AI Tools', desc: 'AI-powered features coming soon — flashcards, summaries, courses, and chatbot.' }
]

export default function FeaturesSection(){
  return (
    <section id="features" className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 md:px-20 py-24">
      {features.map((f, i) => (
        <div key={i} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col items-start gap-3 max-w-xs">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-md flex items-center justify-center">{f.title.split(' ')[0].slice(0,1)}</div>
          <h4 className="text-xl font-semibold text-gray-900">{f.title}</h4>
          <p className="text-gray-600 text-sm">{f.desc}</p>
          {i === 3 && <div className="ml-auto mt-3 text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">Coming Soon</div>}
        </div>
      ))}
    </section>
  )
}
