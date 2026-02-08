'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { MessageSquare, Mail, Phone, User, Filter, Download, Eye, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import toast from 'react-hot-toast'
import { exportContactToPDF } from '@/utils/pdfExport'

interface ContactSubmission {
    id: string
    name: string
    email: string
    phone?: string
    subject: string
    message: string
    status: string
    createdAt: string
}

export default function ContactsPage() {
    const t = useTranslations('admin.contacts')
    const [contacts, setContacts] = useState<ContactSubmission[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState<string>('ALL')
    const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null)

    useEffect(() => {
        fetchContacts()
    }, [])

    const fetchContacts = async () => {
        try {
            const response = await fetch('/api/admin/contacts')
            if (!response.ok) throw new Error(t('errors.fetch'))
            const data = await response.json()
            setContacts(data)
        } catch (error) {
            toast.error(t('errors.load'))
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const updateStatus = async (id: string, status: string) => {
        try {
            const response = await fetch('/api/admin/contacts', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status })
            })
            if (!response.ok) throw new Error(t('errors.updateStatus'))
            toast.success(t('toast.statusUpdated'))
            fetchContacts()
        } catch (error) {
            toast.error(t('errors.updateStatus'))
        }
    }

    const filteredContacts = filter === 'ALL'
        ? contacts
        : contacts.filter(c => c.status === filter)

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'NEW': return 'bg-blue-100 text-blue-800'
            case 'READ': return 'bg-yellow-100 text-yellow-800'
            case 'REPLIED': return 'bg-green-100 text-green-800'
            case 'ARCHIVED': return 'bg-gray-100 text-gray-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'NEW': return t('status.new')
            case 'READ': return t('status.read')
            case 'REPLIED': return t('status.replied')
            case 'ARCHIVED': return t('status.archived')
            default: return status
        }
    }

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </AdminLayout>
        )
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('title')}</h1>
                        <p className="text-gray-600 dark:text-gray-300">{t('subtitle')}</p>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center space-x-4">
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                            <option value="ALL">{t('filter.allStatus')}</option>
                            <option value="NEW">{t('status.new')}</option>
                            <option value="READ">{t('status.read')}</option>
                            <option value="REPLIED">{t('status.replied')}</option>
                            <option value="ARCHIVED">{t('status.archived')}</option>
                        </select>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{t('stats.totalMessages')}</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{contacts.length}</p>
                            </div>
                            <MessageSquare className="w-8 h-8 text-blue-600" />
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{t('status.new')}</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {contacts.filter(c => c.status === 'NEW').length}
                                </p>
                            </div>
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 font-bold">N</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{t('status.read')}</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {contacts.filter(c => c.status === 'READ').length}
                                </p>
                            </div>
                            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                                <span className="text-yellow-600 font-bold">R</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{t('status.replied')}</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {contacts.filter(c => c.status === 'REPLIED').length}
                                </p>
                            </div>
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="text-green-600 font-bold">✓</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contacts List */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-900">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        {t('table.name')}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        {t('table.contact')}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        {t('table.subject')}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        {t('table.date')}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        {t('table.status')}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        {t('table.actions')}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredContacts.map((contact) => (
                                    <tr key={contact.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <User className="h-5 w-5 text-blue-600" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {contact.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 dark:text-white">
                                                <div className="flex items-center space-x-1">
                                                    <Mail className="w-4 h-4" />
                                                    <span>{contact.email}</span>
                                                </div>
                                                {contact.phone && (
                                                    <div className="flex items-center space-x-1 mt-1">
                                                        <Phone className="w-4 h-4" />
                                                        <span>{contact.phone}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900 dark:text-white max-w-xs truncate">
                                                {contact.subject}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(contact.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(contact.status)}`}>
                                                {getStatusLabel(contact.status)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                            <select
                                                value={contact.status}
                                                onChange={(e) => updateStatus(contact.id, e.target.value)}
                                                className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                            >
                                                <option value="NEW">{t('status.new')}</option>
                                                <option value="READ">{t('status.read')}</option>
                                                <option value="REPLIED">{t('status.replied')}</option>
                                                <option value="ARCHIVED">{t('status.archived')}</option>
                                            </select>
                                            <button
                                                onClick={() => setSelectedContact(contact)}
                                                className="inline-flex items-center px-3 py-1 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                                title={t('actions.viewDetails')}
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => exportContactToPDF(contact)}
                                                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                                title={t('actions.downloadPdf')}
                                            >
                                                <Download className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* View Details Modal */}
                {selectedContact && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                        <MessageSquare className="w-7 h-7 text-blue-600" />
                                        {t('modal.title')}
                                    </h2>
                                    <button
                                        onClick={() => setSelectedContact(null)}
                                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    {/* Contact Information Section */}
                                    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-600 px-6 py-3 border-b border-gray-200 dark:border-gray-600">
                                            <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                                <span className="text-xl">👤</span>
                                                {t('modal.contactInfo')}
                                            </h4>
                                        </div>
                                        <div className="p-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('fields.name')}</label>
                                                    <p className="text-base text-gray-900 dark:text-white font-medium">{selectedContact.name}</p>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('fields.email')}</label>
                                                    <p className="text-base text-gray-900 dark:text-white font-medium">{selectedContact.email}</p>
                                                </div>
                                                {selectedContact.phone && (
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('fields.phone')}</label>
                                                        <p className="text-base text-gray-900 dark:text-white font-medium">{selectedContact.phone}</p>
                                                    </div>
                                                )}
                                                <div className="space-y-2">
                                                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('fields.submitted')}</label>
                                                    <p className="text-base text-gray-900 dark:text-white font-medium">
                                                        {new Date(selectedContact.createdAt).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Message Section */}
                                    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-600 px-6 py-3 border-b border-gray-200 dark:border-gray-600">
                                            <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                                <span className="text-xl">📧</span>
                                                {t('modal.messageDetails')}
                                            </h4>
                                        </div>
                                        <div className="p-6">
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('fields.subject')}</label>
                                                    <p className="text-base text-gray-900 dark:text-white font-medium">{selectedContact.subject}</p>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('fields.message')}</label>
                                                    <p className="text-base text-gray-900 dark:text-white whitespace-pre-wrap leading-relaxed">{selectedContact.message}</p>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('fields.status')}</label>
                                                    <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusColor(selectedContact.status)}`}>
                                                        {getStatusLabel(selectedContact.status)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end space-x-3">
                                    <button
                                        onClick={() => exportContactToPDF(selectedContact)}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                    >
                                        <Download className="w-4 h-4 mr-2" />
                                        {t('actions.downloadPdfButton')}
                                    </button>
                                    <button
                                        onClick={() => setSelectedContact(null)}
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    >
                                        {t('actions.close')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    )
}
