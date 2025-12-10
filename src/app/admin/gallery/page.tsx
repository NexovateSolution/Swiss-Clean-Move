'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Upload,
  Camera,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Image as ImageIcon,
  X,
  Trash2,
  Eye,
  Plus
} from 'lucide-react';
import toast from 'react-hot-toast';
import AdminLayout from '@/components/admin/AdminLayout';

interface Photo {
  id: string;
  filename: string;
  url: string;
  createdAt: string;
}

interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string;
  address: string;
  serviceType: string;
  status: string;
  createdAt: string;
  photos: Photo[];
}

export default function GalleryPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch('/api/admin/clients?limit=1000');
      const data = await response.json();
      setClients(data.clients || []);
    } catch (error) {
      console.error('Failed to fetch clients:', error);
      toast.error('Failed to load clients');
    } finally {
      setLoading(false);
    }
  };

  const filteredClients = clients.filter((client) => {
    const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
    const search = searchTerm.toLowerCase();
    return (
      fullName.includes(search) ||
      client.email?.toLowerCase().includes(search) ||
      client.phone.includes(search) ||
      client.serviceType.toLowerCase().includes(search)
    );
  });

  const handleFileSelect = (client: Client) => {
    setSelectedClient(client);
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0 || !selectedClient) return;

    setUploading(true);
    const formData = new FormData();
    
    Array.from(files).forEach((file) => {
      formData.append('photos', file);
    });
    formData.append('clientId', selectedClient.id);

    try {
      const response = await fetch('/api/admin/photos/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast.success(`${files.length} photo(s) uploaded successfully!`);
        fetchClients(); // Refresh to show new photos
      } else {
        toast.error('Failed to upload photos');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Error uploading photos');
    } finally {
      setUploading(false);
      setSelectedClient(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDeletePhoto = async (clientId: string, photoId: string) => {
    if (!confirm('Are you sure you want to delete this photo?')) return;

    try {
      const response = await fetch(`/api/admin/photos/${photoId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Photo deleted successfully');
        fetchClients();
      } else {
        toast.error('Failed to delete photo');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Error deleting photo');
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Camera className="w-8 h-8 text-blue-600" />
              Client Gallery
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Upload and manage photos for client profiles
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {filteredClients.length} clients
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search clients by name, email, phone, or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />

        {/* Clients List */}
        {filteredClients.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No clients found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchTerm
                ? 'Try adjusting your search criteria'
                : 'Clients will appear here once they are added to the system'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredClients.map((client) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Client Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                        {client.firstName[0]}{client.lastName[0]}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {client.firstName} {client.lastName}
                        </h3>
                        <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                          {client.serviceType}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium ${
                        client.status === 'PAID'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : client.status === 'UNPAID'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}
                    >
                      {client.status}
                    </span>
                  </div>

                  {/* Client Info */}
                  <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    {client.email && (
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>{client.email}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>{client.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{client.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(client.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Photos Section */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      Photos ({client.photos?.length || 0})
                    </h4>
                    <button
                      onClick={() => handleFileSelect(client)}
                      disabled={uploading}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      {uploading && selectedClient?.id === client.id
                        ? 'Uploading...'
                        : 'Add Photos'}
                    </button>
                  </div>

                  {/* Photo Grid */}
                  {client.photos && client.photos.length > 0 ? (
                    <div className="grid grid-cols-3 gap-3">
                      {client.photos.map((photo) => (
                        <div
                          key={photo.id}
                          className="relative group aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden"
                        >
                          <img
                            src={photo.url}
                            alt={photo.filename}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                              <button
                                onClick={() => window.open(photo.url, '_blank')}
                                className="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeletePhoto(client.id, photo.id)}
                                className="p-2 bg-white rounded-full text-red-600 hover:bg-red-50 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        No photos yet
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        Click "Add Photos" to upload
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
