'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface DataType {
  items: string[];
}

export default function Home() {
  const [selectedRelation, setSelectedRelation] = useState('');
  const [selectedBeroep, setSelectedBeroep] = useState('');
  const [selectedLocatie, setSelectedLocatie] = useState('');
  const [selectedHobby, setSelectedHobby] = useState('');
  
  const [data, setData] = useState<{
    relaties: DataType;
    beroepen: DataType;
    locaties: DataType;
    hobbies: DataType;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [relatiesRes, beroepenRes, locatiesRes, hobbiesRes] = await Promise.all([
          fetch('/data/relaties.json'),
          fetch('/data/beroepen.json'),
          fetch('/data/locaties.json'),
          fetch('/data/hobbies.json')
        ]);

        const [relaties, beroepen, locaties, hobbies] = await Promise.all([
          relatiesRes.json(),
          beroepenRes.json(),
          locatiesRes.json(),
          hobbiesRes.json()
        ]);

        setData({ relaties, beroepen, locaties, hobbies });
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    fetchData();
  }, []);

  const getRandomItem = (items: string[]) => {
    return items[Math.floor(Math.random() * items.length)];
  };

  if (!data) return <div>Loading...</div>;

  return (
    <main className="min-h-screen p-4 bg-black">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/logo.png"
            alt="Lelluk Logo"
            width={100}
            height={100}
            className="mb-4"
          />
          <h1 className="text-2xl font-bold text-white text-center">
            LELLUK THEATER<br />
            SUGGESTIEGENERATOR
          </h1>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => setSelectedRelation(getRandomItem(data.relaties.items))}
            className="w-full p-4 bg-[#ffebaf] text-black rounded-lg shadow-lg hover:bg-[#ffd980] transition-colors"
          >
            Genereer een relatie
          </button>
          {selectedRelation && (
            <div className="p-4 bg-white rounded-lg shadow">
              <p className="text-black">{selectedRelation}</p>
            </div>
          )}

          <button
            onClick={() => setSelectedBeroep(getRandomItem(data.beroepen.items))}
            className="w-full p-4 bg-[#ffebaf] text-black rounded-lg shadow-lg hover:bg-[#ffd980] transition-colors"
          >
            Genereer een beroep
          </button>
          {selectedBeroep && (
            <div className="p-4 bg-white rounded-lg shadow">
              <p className="text-black">{selectedBeroep}</p>
            </div>
          )}

          <button
            onClick={() => setSelectedLocatie(getRandomItem(data.locaties.items))}
            className="w-full p-4 bg-[#ffebaf] text-black rounded-lg shadow-lg hover:bg-[#ffd980] transition-colors"
          >
            Genereer een locatie
          </button>
          {selectedLocatie && (
            <div className="p-4 bg-white rounded-lg shadow">
              <p className="text-black">{selectedLocatie}</p>
            </div>
          )}

          <button
            onClick={() => setSelectedHobby(getRandomItem(data.hobbies.items))}
            className="w-full p-4 bg-[#ffebaf] text-black rounded-lg shadow-lg hover:bg-[#ffd980] transition-colors"
          >
            Genereer een niet bestaande hobby
          </button>
          {selectedHobby && (
            <div className="p-4 bg-white rounded-lg shadow">
              <p className="text-black">{selectedHobby}</p>
            </div>
          )}
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={() => {
              setSelectedRelation('');
              setSelectedBeroep('');
              setSelectedLocatie('');
              setSelectedHobby('');
            }}
            className="w-1/2 p-2 bg-[#404040] text-white rounded-lg shadow-lg hover:bg-[#606060] transition-colors text-sm"
          >
            Reset alle keuzes
          </button>
        </div>
      </div>
    </main>
  );
}