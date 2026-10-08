"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ApplicationsPage() {
  const [applications, setApplications] =
    useState([]);

  useEffect(() => {
    fetch("/api/applications")
      .then((res) => res.json())
      .then((data) => setApplications(data));
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">

      <nav className="bg-white shadow-sm px-6 py-5">

        <div className="max-w-6xl mx-auto flex justify-between">

          <Link
            href="/"
            className="text-2xl font-bold text-blue-600"
          >
            💼 CareerHub
          </Link>

          <Link href="/">
            Browse Jobs
          </Link>

        </div>

      </nav>


      <section className="max-w-5xl mx-auto px-6 py-12">

        <h1 className="text-4xl font-bold">
          My Applications
        </h1>

        <div className="space-y-5 mt-8">

          {applications.map((application) => (

            <div
              key={application.id}
              className="bg-white p-6 rounded-xl shadow-sm"
            >

              <div className="flex justify-between">

                <div>

                  <h2 className="text-xl font-bold">
                    {application.job.title}
                  </h2>

                  <p className="text-blue-600">
                    {application.job.company}
                  </p>

                  <p className="text-gray-500 mt-2">
                    Applied by {application.applicant.name}
                  </p>

                </div>

                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full h-fit">
                  {application.status}
                </span>

              </div>

              <p className="text-sm text-gray-400 mt-5">
                Applied on{" "}
                {new Date(
                  application.appliedAt
                ).toLocaleDateString()}
              </p>

            </div>

          ))}

          {applications.length === 0 && (
            <div className="bg-white p-10 rounded-xl text-center">
              <p className="text-gray-500">
                You haven't applied for any jobs yet.
              </p>

              <Link
                href="/"
                className="inline-block mt-5 bg-blue-600 text-white px-6 py-3 rounded-lg"
              >
                Browse Jobs
              </Link>
            </div>
          )}

        </div>

      </section>

    </main>
  );
}