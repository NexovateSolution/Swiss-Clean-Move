'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Mail, Send, User, Search, Filter, Inbox, Trash2, Archive } from 'lucide-react';
import toast from 'react-hot-toast';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
  source?: 'contact' | 'quote' | 'client';
}

interface Quote {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  details: string;
  status: string;
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
}

export default function EmailCommunicationPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeTab, setActiveTab] = useState<'contacts' | 'clients'>('contacts');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchAllContacts();
    fetchClients();
  }, []);

  const fetchAllContacts = async () => {
    try {
      // Fetch from all three sources
      const [contactsRes, quotesRes, clientsForContactsRes] = await Promise.all([
        fetch('/api/admin/contacts'),
        fetch('/api/admin/quotes'),
        fetch('/api/admin/clients?limit=1000')
      ]);

      const contactsData = await contactsRes.json();
      const quotesData = await quotesRes.json();
      const clientsData = await clientsForContactsRes.json();

      // Transform and combine all sources
      const allContacts: Contact[] = [
        // Contact form submissions
        ...contactsData.map((c: any) => ({
          ...c,
          source: 'contact' as const
        })),
        // Quote requests
        ...quotesData.map((q: Quote) => ({
          id: q.id,
          name: q.name,
          email: q.email,
          phone: q.phone,
          subject: `Quote Request: ${q.service}`,
          message: q.details,
          status: q.status,
          createdAt: q.createdAt,
          source: 'quote' as const
        })),
        // Clients (only those with email)
        ...(clientsData.clients || [])
          .filter((c: Client) => c.email)
          .map((c: Client) => ({
            id: c.id,
            name: `${c.firstName} ${c.lastName}`,
            email: c.email!,
            phone: c.phone,
            subject: `Client: ${c.serviceType}`,
            message: `Address: ${c.address}`,
            status: c.status,
            createdAt: c.createdAt,
            source: 'client' as const
          }))
      ];

      setContacts(allContacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await fetch('/api/admin/clients?limit=1000');
      const data = await response.json();
      setClients(data.clients || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast.error('Failed to load clients');
    }
  };

  // Helper function to format message display
  const formatMessage = (message: string, source?: string) => {
    if (!message) return 'No message';
    
    // If it's a quote, try to parse the JSON details
    if (source === 'quote') {
      try {
        const details = typeof message === 'string' ? JSON.parse(message) : message;
        return `
Address: ${details.address || 'N/A'}
City: ${details.city || 'N/A'}, ${details.postalCode || 'N/A'}
Property Type: ${details.propertyType || 'N/A'}
Rooms: ${details.rooms || 'N/A'}
Area: ${details.area || 'N/A'} m²
Preferred Date: ${details.preferredDate || 'N/A'}
Urgency: ${details.urgency || 'N/A'}
${details.additionalServices?.length > 0 ? `Additional Services: ${details.additionalServices.join(', ')}` : ''}
${details.message ? `\nMessage: ${details.message}` : ''}
        `.trim();
      } catch (e) {
        return message;
      }
    }
    
    return message;
  };

  const handleSendEmail = async () => {
    const recipientEmail = selectedContact?.email || selectedClient?.email;
    
    if (!recipientEmail || !emailSubject || !emailBody) {
      toast.error('Please fill in all fields');
      return;
    }

    setSending(true);
    
    try {
      const payload = {
        to: recipientEmail,
        subject: emailSubject,
        body: emailBody,
        contactId: selectedContact?.id,
        clientId: selectedClient?.id,
        source: selectedContact?.source || 'client',
      };
      
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      if (response.ok) {
        const data = await response.json();
        toast.success('Email sent successfully!');
        setEmailSubject('');
        setEmailBody('');
        // Refresh the lists to update status
        if (selectedContact) {
          fetchAllContacts();
        }
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to send email');
      }
    } catch (error) {
      console.error('💥 Exception:', error);
      toast.error('Error sending email: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setSending(false);
    }
  };

  const handleSelectClient = (client: Client) => {
    if (!client.email) {
      toast.error('This client has no email address');
      return;
    }
    setSelectedClient(client);
    setSelectedContact(null);
    // Leave subject empty so admin can write their own
    setEmailSubject('');
  };

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || contact.status.toLowerCase() === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const filteredClients = clients.filter((client) => {
    if (!client.email) return false; // Only show clients with email
    
    const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.serviceType.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
    setSelectedClient(null);
    // Leave subject empty so admin can write their own (not a reply)
    setEmailSubject('');
  };

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Mail className="w-8 h-8 text-blue-600" />
            Email Communication
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Send emails to customers and manage communication
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contacts/Clients List */}
          <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              {/* Tabs */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setActiveTab('contacts')}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'contacts'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Contacts ({contacts.length})
                </button>
                <button
                  onClick={() => setActiveTab('clients')}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'clients'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Clients ({filteredClients.length})
                </button>
              </div>

              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={activeTab === 'contacts' ? 'Search contacts...' : 'Search clients...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {activeTab === 'contacts' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setFilterStatus('all')}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filterStatus === 'all'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilterStatus('new')}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filterStatus === 'new'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    New
                  </button>
                  <button
                    onClick={() => setFilterStatus('replied')}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filterStatus === 'replied'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Replied
                  </button>
                </div>
              )}
            </div>

            <div className="overflow-y-auto max-h-[600px]">
              {loading ? (
                <div className="p-8 text-center text-gray-500">Loading...</div>
              ) : activeTab === 'contacts' ? (
                filteredContacts.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">No contacts found</div>
                ) : (
                  filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => handleSelectContact(contact)}
                    className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      selectedContact?.id === contact.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <h3 className="font-semibold text-gray-900 dark:text-white">{contact.name}</h3>
                          {contact.source && (
                            <span className={`px-2 py-0.5 text-xs rounded-full ${
                              contact.source === 'contact' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                              contact.source === 'quote' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                              'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                            }`}>
                              {contact.source === 'contact' ? '📧 Contact' : contact.source === 'quote' ? '💰 Quote' : '👤 Client'}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{contact.email}</p>
                        {contact.phone && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">📞 {contact.phone}</p>
                        )}
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">
                          {contact.subject}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          contact.status === 'NEW' || contact.status === 'new'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : contact.status === 'REPLIED' || contact.status === 'replied'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {contact.status}
                      </span>
                    </div>
                  </div>
                ))
                )
              ) : (
                filteredClients.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">No clients found</div>
                ) : (
                  filteredClients.map((client) => (
                    <div
                      key={client.id}
                      onClick={() => handleSelectClient(client)}
                      className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                        selectedClient?.id === client.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {client.firstName} {client.lastName}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{client.email}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">📞 {client.phone}</p>
                          <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-2">
                            {client.serviceType}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {new Date(client.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            client.status === 'UNPAID'
                              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              : client.status === 'PAID'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          }`}
                        >
                          {client.status}
                        </span>
                      </div>
                    </div>
                  ))
                )
              )}
            </div>
          </div>

          {/* Email Composer */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            {selectedContact || selectedClient ? (
              <div className="p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Compose Email
                  </h2>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    {selectedContact ? (
                      <>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          <strong>To:</strong> {selectedContact.name} ({selectedContact.email})
                        </p>
                        {selectedContact.phone && (
                          <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                            <strong>Phone:</strong> {selectedContact.phone}
                          </p>
                        )}
                      </>
                    ) : selectedClient && (
                      <>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          <strong>To:</strong> {selectedClient.firstName} {selectedClient.lastName} ({selectedClient.email})
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                          <strong>Phone:</strong> {selectedClient.phone}
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                          <strong>Service:</strong> {selectedClient.serviceType}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Original Message (only for contacts) */}
                {selectedContact && (
                  <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Original Message:
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {formatMessage(selectedContact.message, selectedContact.source)}
                    </p>
                  </div>
                )}

                {/* Email Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Email subject"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      value={emailBody}
                      onChange={(e) => setEmailBody(e.target.value)}
                      rows={12}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Type your message here..."
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleSendEmail}
                      disabled={sending || !emailSubject || !emailBody}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      <Send className="w-5 h-5" />
                      {sending ? 'Sending...' : 'Send Email'}
                    </button>
                    <button
                      onClick={() => {
                        setSelectedContact(null);
                        setSelectedClient(null);
                        setEmailSubject('');
                        setEmailBody('');
                      }}
                      className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center">
                <Inbox className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No Contact Selected
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Select a contact from the list to compose an email
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
