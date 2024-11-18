import React, { useState } from 'react';
import { 
  Folder, 
  File, 
  Image, 
  FileText, 
  Music, 
  Video,
  ChevronRight,
  ChevronDown,
  MoreVertical,
  Clock,
  Star,
  Trash,
  HardDrive
} from 'lucide-react';

const MOCK_FILES = {
  documents: [
    { name: 'Project Proposal.pdf', type: 'pdf', size: '2.4 MB', modified: '2024-03-15' },
    { name: 'Meeting Notes.docx', type: 'doc', size: '1.1 MB', modified: '2024-03-14' }
  ],
  images: [
    { name: 'Vacation.jpg', type: 'image', size: '3.7 MB', modified: '2024-03-13' },
    { name: 'Profile.png', type: 'image', size: '0.8 MB', modified: '2024-03-12' }
  ],
  music: [
    { name: 'Summer Mix.mp3', type: 'audio', size: '8.2 MB', modified: '2024-03-11' }
  ]
};

function FileIcon({ type }: { type: string }) {
  switch (type) {
    case 'pdf':
    case 'doc':
      return <FileText className="w-5 h-5 text-blue-500" />;
    case 'image':
      return <Image className="w-5 h-5 text-green-500" />;
    case 'audio':
      return <Music className="w-5 h-5 text-purple-500" />;
    case 'video':
      return <Video className="w-5 h-5 text-red-500" />;
    default:
      return <File className="w-5 h-5 text-gray-500" />;
  }
}

function App() {
  const [selectedFolder, setSelectedFolder] = useState('documents');
  const [expandedFolders, setExpandedFolders] = useState(['documents']);

  const toggleFolder = (folder: string) => {
    setExpandedFolders(prev => 
      prev.includes(folder) 
        ? prev.filter(f => f !== folder)
        : [...prev, folder]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 px-2 py-1.5 text-sm font-medium text-gray-600">
            <HardDrive className="w-5 h-5" />
            <span>File Explorer</span>
          </div>
          
          <div className="space-y-1">
            {['documents', 'images', 'music'].map(folder => (
              <div 
                key={folder}
                className={`flex items-center space-x-2 px-2 py-1.5 rounded-lg cursor-pointer ${
                  selectedFolder === folder ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => {
                  setSelectedFolder(folder);
                  toggleFolder(folder);
                }}
              >
                {expandedFolders.includes(folder) ? 
                  <ChevronDown className="w-4 h-4" /> : 
                  <ChevronRight className="w-4 h-4" />
                }
                <Folder className={`w-5 h-5 ${selectedFolder === folder ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className="capitalize">{folder}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 space-y-2">
          <button className="flex items-center space-x-2 px-2 py-1.5 w-full text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
            <Clock className="w-5 h-5" />
            <span>Recent</span>
          </button>
          <button className="flex items-center space-x-2 px-2 py-1.5 w-full text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
            <Star className="w-5 h-5" />
            <span>Starred</span>
          </button>
          <button className="flex items-center space-x-2 px-2 py-1.5 w-full text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
            <Trash className="w-5 h-5" />
            <span>Trash</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800 capitalize">{selectedFolder}</h1>
        </div>

        {/* File List */}
        <div className="p-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="grid grid-cols-12 px-4 py-2 border-b border-gray-200 text-sm font-medium text-gray-500">
              <div className="col-span-6">Name</div>
              <div className="col-span-2">Size</div>
              <div className="col-span-3">Modified</div>
              <div className="col-span-1"></div>
            </div>

            {MOCK_FILES[selectedFolder as keyof typeof MOCK_FILES].map((file, index) => (
              <div 
                key={index}
                className="grid grid-cols-12 px-4 py-3 hover:bg-gray-50 items-center text-sm"
              >
                <div className="col-span-6 flex items-center space-x-3">
                  <FileIcon type={file.type} />
                  <span className="text-gray-700">{file.name}</span>
                </div>
                <div className="col-span-2 text-gray-500">{file.size}</div>
                <div className="col-span-3 text-gray-500">{file.modified}</div>
                <div className="col-span-1 flex justify-end">
                  <button className="p-1 hover:bg-gray-100 rounded-full">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;