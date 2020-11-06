import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
// lib
import { onError } from '../../lib/errorHandler';
import { useAuth } from '../../lib/AuthContext';
// components
import { Link } from 'react-router-dom';
import PuffLoader from 'react-spinners/PuffLoader';

export default function Home() {
  const { isAuthenticated } = useAuth()!;
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState<INote[]>([]);

  useEffect(() => {
    function loadNotes() {
      return API.get('notes', '/notes', {});
    }

    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }
      try {
        const notes = await loadNotes();
        setNotes(notes);
      } catch (e) {
        onError(e);
      }
      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return (
      <div className="container mx-auto pt-24">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-medium text-gray-700">Your notes</h1>
          <Link
            to="notes/new"
            className="block rounded py-3 px-4 transition ease-in-out duration-150 bg-indigo-600 text-white hover:bg-indigo-400"
          >
            Add note
          </Link>
        </div>
        <div className="mt-8 text-left divide-y divide-gray-300 border rounded">
          {notes.length > 0 ? (
            notes.map((note, i) => (
              <Link
                className="block hover:bg-gray-100"
                key={note.noteId}
                to={`/notes/${note.noteId}`}
              >
                <div className="p-6">
                  <h2 className="text-2xl font-medium text-gray-700">
                    {note.content}
                  </h2>
                  <p className="text-sm">
                    Created: {new Date(note.createdAt).toLocaleString()}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="flex justify-center py-6 items-center">
              <PuffLoader color="#5a67d8" />
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="container mx-auto pt-24 text-center">
        <h1 className="text-3xl font-medium text-gray-700">Note App</h1>
        <p>A simple note taking app</p>
      </div>
    );
  }
}
