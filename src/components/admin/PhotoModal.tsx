'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Camera, Upload, Loader2, Image as ImageIcon, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

interface Client {
  id: string
  firstName: string
  lastName: string
  photos?: Photo[]
}

interface Photo {
  id: string
  filename: string
  originalName: string
  url: string
  size: number
  mimeType: string
  createdAt: string
}

interface PhotoModalProps {
  isOpen: boolean
  onClose: () => void
  client?: Client
  onSuccess: () => void
}

export default function PhotoModal({ isOpen, onClose, client, onSuccess }: PhotoModalProps) {
  const [loading, setLoading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [photos, setPhotos] = useState<Photo[]>(client?.photos || [])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (files: FileList | null) => {
    if (!files || !client) return

    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        uploadPhoto(file)
      } else {
        toast.error(`${file.name} is not a valid image file`)
      }
    })
  }

  const uploadPhoto = async (file: File) => {
    try {
      setLoading(true)
      
      const formData = new FormData()
      formData.append('file', file)
      formData.append('clientId', client!.id)

      const response = await fetch('/api/admin/photos', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Failed to upload photo')
      }

      const newPhoto = await response.json()
      setPhotos(prev => [newPhoto, ...prev])
      toast.success('Photo uploaded successfully')
      onSuccess()
    } catch (error) {
      toast.error('Failed to upload photo')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const deletePhoto = async (photoId: string) => {
    try {
      const response = await fetch(`/api/admin/photos?id=${photoId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete photo')
      }

      setPhotos(prev => prev.filter(photo => photo.id !== photoId))
      toast.success('Photo deleted successfully')
      onSuccess()
    } catch (error) {
      toast.error('Failed to delete photo')
      console.error(error)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  if (!client) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-500 bg-opacity-75"
              onClick={onClose}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="bg-indigo-100 p-2 rounded-lg">
                    <Camera className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Photo Album</h2>
                    <p className="text-sm text-gray-500">{client.firstName} {client.lastName}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
                <div className="p-6">
                  {/* Upload Area */}
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragOver
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="flex flex-col items-center space-y-4">
                      <div className="bg-gray-100 p-4 rounded-full">
                        <Upload className="w-8 h-8 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Upload Photos</h3>
                        <p className="text-gray-600">Drag and drop photos here, or click to select</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Supports: JPG, PNG, GIF, WebP (Max 10MB each)
                        </p>
                      </div>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={loading}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                      >
                        {loading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <ImageIcon className="w-4 h-4" />
                        )}
                        <span>{loading ? 'Uploading...' : 'Select Photos'}</span>
                      </button>
                    </div>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileSelect(e.target.files)}
                    className="hidden"
                  />

                  {/* Photos Grid */}
                  {photos.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Photos ({photos.length})
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {photos.map((photo) => (
                          <motion.div
                            key={photo.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative group bg-gray-100 rounded-lg overflow-hidden aspect-square"
                          >
                            <img
                              src={photo.url}
                              alt={photo.originalName}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                              <button
                                onClick={() => deletePhoto(photo.id)}
                                className="opacity-0 group-hover:opacity-100 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-all duration-200"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <p className="text-xs truncate">{photo.originalName}</p>
                              <p className="text-xs text-gray-300">{formatFileSize(photo.size)}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {photos.length === 0 && (
                    <div className="mt-8 text-center py-12">
                      <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                        <ImageIcon className="w-8 h-8 text-gray-400 mx-auto" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Photos Yet</h3>
                      <p className="text-gray-600">Upload some photos to get started</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end p-6 border-t border-gray-200 bg-gray-50">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
