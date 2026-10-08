"use client";

import { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    skills: "",
    education: "",
    experience: "",
    resume: ""
  });

  function saveProfile(e) {
    e.preventDefault();

    localStorage.setItem(
      "careerhub-profile",
      JSON.stringify(profile)
    );

    alert("Profile saved successfully!");
  }

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
            Jobs
          </Link>

        </div>

      </nav>


      <section className="max-w-3xl mx-auto px-6 py-12">

        <div className="bg-white rounded-xl p-8 shadow-sm">

          <h1 className="text-3xl font-bold">
            My Profile
          </h1>

          <p className="text-gray-500 mt-2">
            Create your professional profile.
          </p>

          <form
            onSubmit={saveProfile}
            className="mt-8 space-y-4"
          >

            <input
              required
              className="w-full border p-3 rounded-lg"
              placeholder="Full Name"
              value={profile.name}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  name: e.target.value
                })
              }
            />

            <input
              required
              type="email"
              className="w-full border p-3 rounded-lg"
              placeholder="Email"
              value={profile.email}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  email: e.target.value
                })
              }
            />

            <input
              className="w-full border p-3 rounded-lg"
              placeholder="Phone"
              value={profile.phone}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  phone: e.target.value
                })
              }
            />

            <input
              className="w-full border p-3 rounded-lg"
              placeholder="Location"
              value={profile.location}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  location: e.target.value
                })
              }
            />

            <input
              className="w-full border p-3 rounded-lg"
              placeholder="Skills — e.g. Java, React, Python"
              value={profile.skills}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  skills: e.target.value
                })
              }
            />

            <input
              className="w-full border p-3 rounded-lg"
              placeholder="Education"
              value={profile.education}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  education: e.target.value
                })
              }
            />

            <textarea
              className="w-full border p-3 rounded-lg"
              rows="4"
              placeholder="Work Experience"
              value={profile.experience}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  experience: e.target.value
                })
              }
            />

            <div>

              <label className="block font-semibold mb-2">
                Upload Resume
              </label>

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="w-full border p-3 rounded-lg"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setProfile({
                      ...profile,
                      resume:
                        e.target.files[0].name
                    });
                  }
                }}
              />

              {profile.resume && (
                <p className="text-green-600 mt-2">
                  ✓ {profile.resume} selected
                </p>
              )}

            </div>

            <button
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
            >
              Save Profile
            </button>

          </form>

        </div>

      </section>

    </main>
  );
}