'use client'

import { useRef, useState } from 'react'
import { FormSliceProps, hasCleaningService, hasMovingService } from '../types'
import { Upload, X } from 'lucide-react'

interface ReviewSubmitSliceProps extends FormSliceProps {
  images: File[];
  onImagesChange: (files: File[]) => void;
}

export default function ReviewSubmitSlice({ data, updateData, t, images, onImagesChange }: ReviewSubmitSliceProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onImagesChange([...images, ...Array.from(e.target.files)]);
    }
  };

  const removeImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index));
  };

  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-sm bg-white focus:ring-1 focus:ring-swiss-red focus:border-swiss-red outline-none text-sm";
  const labelClass = "block text-sm font-semibold text-[#0A1C3E] mb-1";

  return (
    <div className="space-y-6">
      {/* Consent */}
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={data.agreeToTerms}
          onChange={e => updateData({ agreeToTerms: e.target.checked })}
          className="accent-swiss-red w-4 h-4 mt-0.5 flex-shrink-0 border-gray-300 rounded-sm"
        />
        <span className="text-sm font-medium text-[#0A1C3E]">
          {t('universalForm.review.consent')}
        </span>
      </label>

      {/* Ort/Datum and Signature Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
        <div>
          <label className={labelClass}>
            {t('universalForm.review.placeDate')}
          </label>
          <input
            type="text"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>
            {t('universalForm.review.signature')}
          </label>
          <input
            type="text"
            className={inputClass}
          />
        </div>
      </div>

      <p className="text-xs text-swiss-body mt-2">
        {t('universalForm.review.note')}
      </p>

      {/* Image Upload */}
      <div className="border-t border-gray-300 mt-8 pt-6">
        <h4 className={labelClass}>
          {t('universalForm.review.photosLabel')}
        </h4>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border border-dashed border-gray-300 bg-gray-50 rounded-sm p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-swiss-red/5 hover:border-swiss-red transition-all"
        >
          <Upload className="w-6 h-6 text-[#0A1C3E] mb-2" />
          <span className="text-sm font-medium text-[#0A1C3E]">{t('universalForm.review.photosDesc')}</span>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple accept="image/*,.pdf" className="hidden" />
        </div>
        {images.length > 0 && (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {images.map((img, i) => (
              <div key={i} className="relative group">
                <div className="w-full h-16 bg-white rounded-sm border border-gray-300 flex items-center justify-center overflow-hidden relative">
                  {img.type.startsWith('image/') ? (
                    <img src={URL.createObjectURL(img)} alt={img.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs text-center px-2 truncate block w-full text-swiss-body">{img.name}</span>
                  )}
                </div>
                <button onClick={(e) => { e.stopPropagation(); removeImage(i); }} className="absolute -top-2 -right-2 bg-swiss-red text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
