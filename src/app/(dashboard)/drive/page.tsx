"use client";

import { useState } from "react";

const folders = [
  { name: "Marketing", files: 24, size: "1.2 GB", modified: "Dec 18, 2024", icon: "folder" },
  { name: "Campaign Assets", files: 156, size: "3.4 GB", modified: "Dec 15, 2024", icon: "folder" },
  { name: "Templates", files: 42, size: "890 MB", modified: "Dec 10, 2024", icon: "folder" },
  { name: "Reports", files: 18, size: "456 MB", modified: "Dec 8, 2024", icon: "folder" },
];

const recentFiles = [
  { name: "Q4-Report.pdf", type: "pdf", size: "2.4 MB", modified: "2 hours ago", owner: "Sarah J." },
  { name: "Campaign-Brief.docx", type: "doc", size: "156 KB", modified: "5 hours ago", owner: "Mike C." },
  { name: "Logo-Final.png", type: "image", size: "1.8 MB", modified: "1 day ago", owner: "Emily R." },
  { name: "Analytics-Dashboard.xlsx", type: "spreadsheet", size: "342 KB", modified: "2 days ago", owner: "David K." },
  { name: "Product-Demo.mp4", type: "video", size: "45.6 MB", modified: "3 days ago", owner: "Lisa W." },
  { name: "Brand-Guidelines.pdf", type: "pdf", size: "8.9 MB", modified: "5 days ago", owner: "James W." },
];

const typeIcons: Record<string, string> = {
  pdf: "picture_as_pdf",
  doc: "description",
  image: "image",
  spreadsheet: "table_chart",
  video: "movie",
};

const typeColors: Record<string, string> = {
  pdf: "text-secondary",
  doc: "text-blue-500",
  image: "text-success",
  spreadsheet: "text-tertiary",
  video: "text-purple-500",
};

function MaterialIcon({ name, className }: { name: string; className?: string }) {
  return <span className={`material-symbols-outlined ${className || ""}`}>{name}</span>;
}

export default function DrivePage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [uploading, setUploading] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary">Drive</h2>
          <p className="text-sm text-gray-500 mt-1">5.9 GB of 50 GB used</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <MaterialIcon name="create_new_folder" className="text-lg" />
            New Folder
          </button>
          <button
            onClick={() => setUploading(true)}
            className="px-4 py-2 bg-secondary hover:bg-secondary-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            <MaterialIcon name="upload" className="text-lg" />
            Upload
          </button>
        </div>
      </div>

      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-secondary rounded-full" style={{ width: "11.8%" }} />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-primary mb-3">Folders</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {folders.map((folder) => (
            <div key={folder.name} className="bg-white p-4 rounded-xl border border-gray-100 hover:border-secondary/20 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-tertiary/10 rounded-lg flex items-center justify-center">
                  <MaterialIcon name="folder" className="text-tertiary text-xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-primary truncate">{folder.name}</div>
                  <div className="text-xs text-gray-400">{folder.files} files &middot; {folder.size}</div>
                </div>
              </div>
              <div className="text-xs text-gray-400">Modified {folder.modified}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-primary">Recent Files</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView("grid")}
              className={`p-1.5 rounded ${view === "grid" ? "bg-gray-100" : "text-gray-400"}`}
            >
              <MaterialIcon name="grid_view" className="text-lg" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-1.5 rounded ${view === "list" ? "bg-gray-100" : "text-gray-400"}`}
            >
              <MaterialIcon name="view_list" className="text-lg" />
            </button>
          </div>
        </div>

        {view === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentFiles.map((file) => (
              <div key={file.name} className="bg-white p-4 rounded-xl border border-gray-100 hover:border-secondary/20 hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                    <MaterialIcon name={typeIcons[file.type]} className={`${typeColors[file.type]} text-xl`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-primary truncate">{file.name}</div>
                    <div className="text-xs text-gray-400">{file.size}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{file.owner}</span>
                  <span>{file.modified}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Size</th>
                  <th className="px-5 py-3">Owner</th>
                  <th className="px-5 py-3">Modified</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentFiles.map((file) => (
                  <tr key={file.name} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <MaterialIcon name={typeIcons[file.type]} className={`${typeColors[file.type]} text-xl`} />
                        <span className="text-sm font-medium text-primary">{file.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-600">{file.size}</td>
                    <td className="px-5 py-3 text-sm text-gray-600">{file.owner}</td>
                    <td className="px-5 py-3 text-xs text-gray-400">{file.modified}</td>
                    <td className="px-5 py-3">
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <MaterialIcon name="more_vert" className="text-lg" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
