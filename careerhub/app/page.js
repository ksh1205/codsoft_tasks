"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  const filteredJobs = jobs.filter((job) =>
    `${job.title} ${job.company} ${job.location}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#070b18] text-slate-100">

      {/* NAVBAR */}
      <nav className="border-b border-slate-800 bg-slate-950/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

          <Link
            href="/"
            className="text-2xl font-extrabold tracking-tight"
          >
            <span className="text-blue-400">Career</span>
            <span className="text-white">Hub</span>
          </Link>

          <div className="hidden md:flex items-center gap-7 text-sm">

            <Link
              href="/"
              className="text-blue-400 font-semibold"
            >
              Jobs
            </Link>

            <Link
              href="/applications"
              className="text-slate-300 hover:text-white transition"
            >
              Applications
            </Link>

            <Link
              href="/profile"
              className="text-slate-300 hover:text-white transition"
            >
              Profile
            </Link>

            <Link
              href="/employer"
              className="bg-blue-600 hover:bg-blue-500 px-5 py-2.5 rounded-lg font-semibold transition"
            >
              Employer
            </Link>

          </div>

        </div>
      </nav>


      {/* HERO */}
      <section className="relative overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-950 to-purple-950" />

        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-sm mb-7">
            ✦ Find your next opportunity
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight">

            Build your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              {" "}future.
            </span>

          </h1>

          <p className="max-w-2xl mx-auto text-slate-400 text-lg mt-6">
            Discover great jobs, connect with companies,
            and take the next step in your career.
          </p>


          {/* SEARCH */}

          <div className="max-w-3xl mx-auto mt-10">

            <div className="bg-white/10 backdrop-blur border border-white/10 rounded-2xl p-2">

              <input
                className="w-full bg-transparent px-5 py-4 text-white placeholder-slate-500 outline-none text-lg"
                placeholder="Search jobs, companies or locations..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

          </div>

        </div>

      </section>


      {/* JOBS */}

      <section className="max-w-7xl mx-auto px-6 py-14">

        <div className="flex justify-between items-end">

          <div>

            <p className="text-blue-400 font-semibold text-sm uppercase tracking-wider">
              Opportunities
            </p>

            <h2 className="text-3xl font-bold mt-2">
              Latest Jobs
            </h2>

            <p className="text-slate-400 mt-2">
              Find an opportunity that matches your skills.
            </p>

          </div>

          <span className="text-slate-500">
            {filteredJobs.length} jobs
          </span>

        </div>


        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

          {filteredJobs.map((job) => (

            <div
              key={job.id}
              className="group bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 hover:-translate-y-1 transition-all duration-200"
            >

              <div className="flex justify-between items-start">

                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-2xl">
                  💼
                </div>

                <span className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-full">
                  Open
                </span>

              </div>


              <h3 className="text-xl font-bold mt-6 group-hover:text-blue-400 transition">
                {job.title}
              </h3>

              <p className="text-blue-400 font-medium mt-1">
                {job.company}
              </p>


              <div className="flex flex-wrap gap-2 mt-5">

                <span className="bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg text-xs">
                  📍 {job.location}
                </span>

                <span className="bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg text-xs">
                  💼 {job.type}
                </span>

                {job.salary && (
                  <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-lg text-xs">
                    💰 {job.salary}
                  </span>
                )}

              </div>


              <p className="text-slate-400 text-sm mt-5 line-clamp-2">
                {job.description}
              </p>


              <Link
                href={`/jobs/${job.id}`}
                className="block text-center mt-6 bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-semibold transition"
              >
                View Job →
              </Link>

            </div>

          ))}

        </div>

      </section>


      {/* FOOTER */}

      <footer className="border-t border-slate-800 py-8 text-center text-slate-500 text-sm">
        © 2026 CareerHub · Find. Apply. Grow.
      </footer>

    </main>
  );
}