import { Button } from "../ui/Button";
import { Upload, X } from "lucide-react";
import { useRef } from "react";

export default function ImageUploader({ images, addImage, removeImage }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const previewUrl = URL.createObjectURL(file);
      addImage(previewUrl);
    });
  };

  return (
    <div>
      {/* input real escondido */}
      <input
        type="file"
        accept="image/*"
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <Button
        type="button"
        onClick={() => fileInputRef.current.click()}
        className="flex items-center gap-2 bg-emerald-600 text-white hover:bg-emerald-700"
      >
        <Upload size={16} />
        Adicionar Fotos
      </Button>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50 group"
            >
              <img
                src={img}
                alt={`preview-${idx}`}
                className="w-full h-32 object-cover transition-transform group-hover:scale-105"
              />

              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
